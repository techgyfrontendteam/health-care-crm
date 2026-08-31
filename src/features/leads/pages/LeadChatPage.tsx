import { useParams, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  ArrowLeft,
  Search,
  MoreVertical,
  Plus,
  Send,
  User,
  CheckCheck,
  Loader2,
  FileText,
  Table,
  Image as ImageIcon,
  Play,
  FolderOpen,
  X
} from "lucide-react";
import { useSendWhatsappMessageMutation, useGetProjectWiseTemplatesMutation, useGetProjectWiseContentsMutation } from "../../master-data/api/manageMasterDataSlice";
import { S3_BASE_URL } from "../../../config/constants";
import { useUploadFileMutation, useDownloadUrlMutation } from "../../../shared/api/s3ApiSlice";
import { uploadLargeFileToS3Only } from "../../../shared/utils/multipartUpload";
import { useGetLeadByIdQuery } from "../api/leadsApi";
import { useGetAllUsersQuery } from "../../users/api/usersApi";
import { usePermissions } from "../../../hooks/usePermissions";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../utils";
import { ChatMessageMedia } from "../components/ChatMessageMedia";
import { ChatMessageContent, parseLocationUrlOrData } from "../components/ChatMessageContent";

const shouldHideTextMessage = (text?: string | null, mediaUrl?: string | null) => {
  if (!text) return true;
  const trimmed = text.trim();
  if (!trimmed || trimmed.startsWith('[')) return true;
  if (/^(maps|location|file)$/i.test(trimmed)) return true;
  if (mediaUrl && trimmed === mediaUrl.trim()) return true;
  if (mediaUrl && parseLocationUrlOrData(mediaUrl) && parseLocationUrlOrData(trimmed)) return true;
  return false;
};

interface Template {
  id: string;
  display_name: string;
  variables: string[];
  category: string;
  message: string;
}

const parseTimestamp = (val: any): number => {
  if (!val) return 0;
  if (typeof val === 'number') {
    if (val < 9999999999) return val * 1000;
    return val;
  }
  const num = Number(val);
  if (!isNaN(num)) {
    if (num < 9999999999) return num * 1000;
    return num;
  }
  const parsed = Date.parse(val);
  return isNaN(parsed) ? 0 : parsed;
};

const formatName = (name: string) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const formatTemplateMessage = (template: string, values: string[] = []) => {
  let formatted = template.replace(/{{(\d+)}}/g, (_, index) => {
    let value = values[Number(index) - 1];
    value = value?.trim() ? formatName(value.trim()) : "______";
    return value;
  });

  const firstVal = values[0]?.trim();
  const displayName = firstVal ? formatName(firstVal) : "______";
  formatted = formatted.replace(/{{name}}/gi, displayName);

  if (firstVal) {
    formatted = formatted.replace(/_+/g, "");
  }

  return formatted.replace(" ,", ",");
};

export const LeadChatPage = () => {
  const { leadUuid } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { user: currentUser } = usePermissions();
  const { data: users = [] } = useGetAllUsersQuery({ offset: 0 });
  const { data: lead } = useGetLeadByIdQuery(
    { uuid: leadUuid || "" },
    { skip: !leadUuid || leadUuid === "direct" }
  );
  const [sendWhatsappMessage] = useSendWhatsappMessageMutation();
  const [getProjectWiseTemplates] = useGetProjectWiseTemplatesMutation();
  const [getProjectWiseContents, { data: projectContents, isLoading: isContentsLoading }] = useGetProjectWiseContentsMutation();
  const [uploadFile] = useUploadFileMutation();
  const [downloadUrl] = useDownloadUrlMutation();

  // Identify current user's phone number for 'from_num'
  const currentUserPhone = useMemo(() => {
    const loginUser = users.find(u => String(u.id) === String(currentUser?.id));
    return loginUser?.phone_number || "919100043542"; // Fallback to provided number
  }, [users, currentUser]);

  // Read from navigation state (preferred) or search params (fallback)
  const state = location.state as { phone?: string; type?: string; name?: string } | null;
  const phone = state?.phone || searchParams.get("phone") || lead?.phone_number || "";
  const type = "CM";

  // Show phone number as name per user feedback
  const contactName = state?.name || phone || "Chat";

  // 🔹 Local Cache for Persistence before S3 sync
  const getLocalCache = () => {
    const key = `pending_msgs_${leadUuid}_${type}`;
    const cache = localStorage.getItem(key);
    if (!cache) return [];
    try {
      const parsed = JSON.parse(cache);
      // Filter out messages older than 10 minutes to avoid permanent stale data
      const tenMinAgo = Date.now() - 10 * 60 * 1000;
      return parsed.filter((m: any) => parseTimestamp(m.createdAt) > tenMinAgo);
    } catch {
      return [];
    }
  };

  const saveLocalCache = (msgs: any[]) => {
    const key = `pending_msgs_${leadUuid}_${type}`;
    localStorage.setItem(key, JSON.stringify(msgs));
  };

  const [messages, setMessages] = useState<any[]>(getLocalCache);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [input, setInput] = useState("");
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [isSendingContent, setIsSendingContent] = useState(false);
  const fetchMessagesRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [templateState, setTemplateState] = useState<{
    count: number;
    lastSentAt: number;
    lastTemplateId: string | null;
  }>({ count: 0, lastSentAt: 0, lastTemplateId: null });

  // 🔹 Template Throttling Logic Helpers (derived dynamically from messages history & local state)
  const getTemplateState = useCallback(() => {
    let count = 0;
    let lastSentAt = 0;
    let lastTemplateId: string | null = null;

    if (messages && messages.length > 0) {
      for (const m of messages) {
        if (m.from === "bot") {
          // Customer replied -> reset count
          count = 0;
          lastSentAt = 0;
          lastTemplateId = null;
        } else if (m.from === "user" && (m.template_name || m.template || (m as any).template_id)) {
          // User sent a template message (from mobile app or web)
          count++;
          const ts = parseTimestamp(m.createdAt);
          if (ts > lastSentAt) {
            lastSentAt = ts;
            lastTemplateId = m.template_name || m.template || null;
          }
        }
      }
    }

    // Check localStorage for any recent optimistic sends
    const key = `template_state_${phone}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.lastSentAt > lastSentAt) {
          count = Math.max(count, parsed.count);
          lastSentAt = parsed.lastSentAt;
          lastTemplateId = parsed.lastTemplateId || lastTemplateId;
        }
      } catch (e) {
        // ignore
      }
    }

    return { count, lastSentAt, lastTemplateId };
  }, [messages, phone]);

  const saveTemplateState = useCallback((updates: any) => {
    const key = `template_state_${phone}`;
    const current = getTemplateState();
    const newState = { ...current, ...updates };
    localStorage.setItem(key, JSON.stringify(newState));
    setTemplateState(newState);
  }, [phone, getTemplateState]);

  // Load state when messages or phone changes
  useEffect(() => {
    setTemplateState(getTemplateState());
  }, [getTemplateState]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);





  // 🔹 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Load templates
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoadingTemplates(true);
        const projectId = lead?.project_id || 0;
        const data = await getProjectWiseTemplates({ project_id: projectId }).unwrap();
        console.log("Project Wise Templates Response:", data);

        if (data && Array.isArray(data)) {
          setTemplates(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setTemplates(data.data);
        } else if (data?.templates && Array.isArray(data.templates)) {
          setTemplates(data.templates);
        } else {
          setTemplates(data || []);
        }
      } catch (err) {
      } finally {
        setLoadingTemplates(false);
      }
    };

    loadTemplates();
  }, [getProjectWiseTemplates, lead?.project_id]);

  // 🔹 Normalize phone numbers for reliable comparison (handles India 91 code)
  const normalizePhone = (num: string) => {
    if (!num) return "";
    const clean = num.replace(/\D/g, "");
    // Remove '91' prefix if it's a 12-digit number (India)
    return clean.length === 12 && clean.startsWith("91") ? clean.slice(2) : clean;
  };

  // 🔹 Load S3 chat history
  const processMessages = useCallback((data: any) => {
    const s3Msgs = (Array.isArray(data) ? data : []).map((msg: any) => {
      const dir = String(msg.direction || "").toLowerCase();
      const isSent = dir === "sent" || dir === "outbound" || dir === "user";
      const messageText = msg.message || msg.template_name || msg.template || msg.text || msg.body || msg.content || "";
      const mediaUrl = msg.message_media || msg.media || msg.media_url || msg.url || "";
      const timestamp = msg.timestamp || msg.createdAt || msg.time || msg.created_at || new Date().toISOString();

      return {
        id: msg.uuid || msg.id || Date.now() + Math.random(),
        text: messageText,
        media: mediaUrl,
        from: isSent ? "user" : "bot",
        createdAt: timestamp,
        // Store original numbers for filtering
        from_number: msg.from_number,
        to_number: msg.to_number,
        template_name: msg.template_name || msg.template
      };
    });

    // ✅ If there's a bot message (customer reply) sent AFTER the last template sent time, reset template usage flag
    const state = getTemplateState();
    const hasNewBotReply = s3Msgs.some(m =>
      m.from === "bot" &&
      parseTimestamp(m.createdAt) > state.lastSentAt - 5000
    );

    if (hasNewBotReply && state.count > 0) {
      localStorage.removeItem(`template_used_${phone}`);
      localStorage.removeItem(`template_state_${phone}`);
      setTemplateState({ count: 0, lastSentAt: 0, lastTemplateId: null });
    }

    setMessages(prev => {
      const newMessages: any[] = [];
      const matchedPrevIndices = new Set();

      // 1. Add all S3 messages as the source of truth
      s3Msgs.forEach(s3Msg => {
        newMessages.push(s3Msg);

        // Find if this corresponds to a message in prev so we know it's matched
        const s3Time = parseTimestamp(s3Msg.createdAt);
        const existingIdx = prev.findIndex((p, idx) =>
          !matchedPrevIndices.has(idx) &&
          (p.text || "").trim() === (s3Msg.text || "").trim() &&
          p.from === s3Msg.from &&
          (p.media || "").trim() === (s3Msg.media || "").trim() &&
          Math.abs(parseTimestamp(p.createdAt) - s3Time) < 5 * 60 * 1000 // 5 minutes fuzzy match
        );

        if (existingIdx !== -1) {
          matchedPrevIndices.add(existingIdx);
        }
      });

      // 2. Add unmatched recent messages (optimistic UI messages not yet in S3)
      prev.forEach((p, idx) => {
        if (!matchedPrevIndices.has(idx)) {
          const age = Date.now() - parseTimestamp(p.createdAt);
          if (age < 10 * 60 * 1000) { // Keep unmatched if less than 10 mins old
            newMessages.push(p);
          }
        }
      });

      const sorted = newMessages.sort((a, b) => parseTimestamp(a.createdAt) - parseTimestamp(b.createdAt));

      // ✅ Cache check: If messages are identical, return prev state reference to prevent unnecessary state updates & auto-scroll jumps
      if (prev.length === sorted.length) {
        const isIdentical = prev.every((msg, idx) => {
          const target = sorted[idx];
          return (
            msg.id === target.id &&
            (msg.text || "").trim() === (target.text || "").trim() &&
            (msg.media || "").trim() === (target.media || "").trim() &&
            msg.from === target.from &&
            msg.createdAt === target.createdAt
          );
        });

        if (isIdentical) {
          return prev;
        }
      }

      return sorted;
    });
  }, [phone, getTemplateState]);

  const fetchS3Messages = useCallback(async (showLoading = false) => {
    if (!leadUuid || !phone) return;

    try {
      if (showLoading) setIsHistoryLoading(true);
      const candidates: string[] = [];

      const normalizeS3Url = (loc: string) => {
        if (!loc) return "";
        const leadIndex = loc.indexOf("lead/");
        if (leadIndex !== -1) {
          return `${S3_BASE_URL}/${loc.substring(leadIndex)}`;
        }
        if (!loc.startsWith("http://") && !loc.startsWith("https://")) {
          const cleanPath = loc.startsWith("/") ? loc : `/${loc}`;
          return `${S3_BASE_URL}${cleanPath}`;
        }
        return loc;
      };

      // 1. Prioritize chat_file_location from lead data
      if (lead?.chats && lead.chats.length > 0) {
        const matchingChat = lead.chats.find(c =>
          c.chat_file_location?.toLowerCase().includes(`_${type.toLowerCase()}.json`) ||
          c.chat_file_location?.toLowerCase().includes(`/${phone}_`)
        );
        if (matchingChat?.chat_file_location) {
          candidates.push(normalizeS3Url(matchingChat.chat_file_location));
        }
      }

      // 2. Standard lead folder path
      const cleanPhone = phone.replace(/\D/g, "");
      const finalPhone = cleanPhone.length === 10 && !cleanPhone.startsWith("91")
        ? `91${cleanPhone}`
        : cleanPhone;

      if (leadUuid && leadUuid !== "direct") {
        candidates.push(`${S3_BASE_URL}/lead/${leadUuid}/chats/${finalPhone}_${type}.json`);
      }
      candidates.push(`${S3_BASE_URL}/chats/${finalPhone}_${type}.json`);

      let fetchedData = null;
      for (const url of candidates) {
        if (!url) continue;
        try {
          const cacheBuster = `?t=${Date.now()}`;
          const res = await fetch(url + cacheBuster, {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              fetchedData = data;
              break;
            }
          }
        } catch {
          // try next candidate
        }
      }

      if (fetchedData) {
        processMessages(fetchedData);
      }
    } catch (err) {
      console.error("S3 fetch error:", err);
    } finally {
      if (showLoading) setIsHistoryLoading(false);
    }
  }, [leadUuid, phone, type, lead, processMessages]);

  // ✅ Keep fetchMessagesRef updated with latest logic
  useEffect(() => {
    fetchMessagesRef.current = () => fetchS3Messages(false);
  }, [fetchS3Messages]);

  // ✅ Initial Load and Polling
  useEffect(() => {
    // Initial fetch using the ref to ensure latest logic is used
    if (fetchMessagesRef.current) {
      fetchMessagesRef.current(true);
    }

    const pollInterval = setInterval(() => {
      if (fetchMessagesRef.current) {
        fetchMessagesRef.current(false);
      }
    }, 3000);

    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  // ✅ Countdown timer for throttling
  useEffect(() => {
    const updateCountdown = () => {
      const state = getTemplateState();
      if (state.count === 0) {
        setTimeLeft(null);
        return;
      }

      const now = Date.now();
      const diff = now - state.lastSentAt;

      const waitTime = 4 * 60 * 60 * 1000; // Always 4 hours per template

      const remaining = waitTime - diff;
      if (remaining > 0) {
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(null);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [getTemplateState]);

  // ✅ Reset throttling state when customer replies (monitors messages state)
  useEffect(() => {
    const state = getTemplateState();
    if (state.count > 0) {
      let lastSentUserMsgIdx = -1;
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].from === "user") {
          lastSentUserMsgIdx = i;
          break;
        }
      }

      let hasReply = false;
      if (lastSentUserMsgIdx !== -1) {
        for (let i = lastSentUserMsgIdx + 1; i < messages.length; i++) {
          if (messages[i].from === "bot") {
            hasReply = true;
            break;
          }
        }
      }

      if (!hasReply) {
        hasReply = messages.some(m =>
          m.from === "bot" &&
          parseTimestamp(m.createdAt) > state.lastSentAt - 300000
        );
      }

      if (hasReply) {
        localStorage.removeItem(`template_used_${phone}`);
        localStorage.removeItem(`template_state_${phone}`);
        setTemplateState({ count: 0, lastSentAt: 0, lastTemplateId: null });
      }
    }
  }, [messages, phone, getTemplateState]);

  const isThrottled = useCallback(() => {
    const state = getTemplateState();
    if (state.count > 0) {
      // ✅ If the customer has replied since the last template, they are NOT throttled!
      let lastSentUserMsgIdx = -1;
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].from === "user") {
          lastSentUserMsgIdx = i;
          break;
        }
      }

      let hasReply = false;
      if (lastSentUserMsgIdx !== -1) {
        for (let i = lastSentUserMsgIdx + 1; i < messages.length; i++) {
          if (messages[i].from === "bot") {
            hasReply = true;
            break;
          }
        }
      }

      // Fallback to timestamp check
      if (!hasReply) {
        hasReply = messages.some(m =>
          m.from === "bot" &&
          parseTimestamp(m.createdAt) > state.lastSentAt - 300000
        );
      }

      if (hasReply) {
        return false;
      }

      const now = Date.now();
      const diff = now - state.lastSentAt;

      const waitTime = 4 * 60 * 60 * 1000; // Always 4 hours per template

      if (diff < waitTime) return true;
    }
    return false;
  }, [getTemplateState, messages]);

  const shouldShowTemplates = () => {
    // ✅ Throttling check (must always be verified first!)
    if (isThrottled()) return false;

    // ✅ If no messages yet, must use template to start
    if (!messages || messages.length === 0) return true;

    const currentCustomerPhone = normalizePhone(phone);
    // console.log(messages)
    // ✅ Filter messages to ensure we are only looking at this specific conversation
    const customerMessages = messages.filter((msg) => {
      const from = normalizePhone(msg.from_number);
      const to = normalizePhone(msg.to_number);
      return from === currentCustomerPhone;
    });

    if (customerMessages.length === 0) {
      return true;
    }

    // ✅ Find the latest message timestamp from the filtered list
    const lastMsg = customerMessages.reduce((latest, msg) => {
      const msgTime = parseTimestamp(msg.createdAt);
      const latestTime = parseTimestamp(latest.createdAt);
      return msgTime > latestTime ? msg : latest;
    }, customerMessages[0]);

    if (!lastMsg?.createdAt) return true;

    const lastTime = parseTimestamp(lastMsg.createdAt);
    const now = Date.now();
    const diffHours = (now - lastTime) / (1000 * 60 * 60);

    if (diffHours < 23.5) return false;

    return true;
  };

  // 🔹 Send message
  const sendMessage = async () => {
    if (selectedTemplate && !input.trim()) {
      alert("Please enter a name for the template");
      return;
    }
    if (!selectedTemplate && !input.trim()) return;

    const messageText = selectedTemplate
      ? formatTemplateMessage(selectedTemplate.message, [input])
      : input;

    const userMsg = {
      id: Date.now(),
      text: messageText,
      from: "user",
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    saveLocalCache([...getLocalCache(), userMsg]);

    const currentInput = input;
    const templateToSend = selectedTemplate;

    setInput("");
    setSelectedTemplate(null);
    setIsTyping(true);

    try {
      const cleanTargetPhone = phone.replace(/\D/g, "");
      const targetNumber = cleanTargetPhone.length >= 10
        ? cleanTargetPhone.slice(-10)
        : cleanTargetPhone;

      // Backend / Interakt Proxy Payload Requirements
      const isTemplate = Boolean(templateToSend);
      const payload: Record<string, any> = {
        countryCode: "+91",
        phoneNumber: targetNumber,
        type: isTemplate ? "Template" : "Text",
        ...(isTemplate
          ? {
            template: {
              name: (templateToSend as any).name || (templateToSend as any).template_name || templateToSend?.id,
              languageCode: (templateToSend as any).languageCode || (templateToSend as any).language || "en",
              bodyValues: currentInput.trim() ? [currentInput.trim()] : [],
              headerValues: [],
              buttonValues: {}
            }
          }
          : {
            data: {
              message: messageText
            }
          })
      };

      const res = await sendWhatsappMessage(payload).unwrap();

      if (res?.success || res) {
        if (templateToSend) {
          localStorage.setItem(`template_used_${phone}`, "true");

          // ✅ Update throttling state
          const state = getTemplateState();
          saveTemplateState({
            count: state.count + 1,
            lastSentAt: Date.now(),
            lastTemplateId: templateToSend.id
          });
        }
      }
    } catch (err) {
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so same file can be selected again if needed
    e.target.value = "";

    // 1. Validate file size <= 200MB
    if (file.size > 200 * 1024 * 1024) {
      alert("File size exceeds the 200MB limit. Please select a smaller file.");
      return;
    }

    try {
      setIsUploadingMedia(true);
      setUploadProgress(0);

      let s3Key = "";
      let s3Url = "";

      const folderPath = (leadUuid && leadUuid !== "direct")
        ? `lead/${leadUuid}/media`
        : "whatsapp_attachments";

      // 2. Upload file (small vs large)
      if (file.size > 5 * 1024 * 1024) {
        // Multipart upload for > 5MB
        const res = await uploadLargeFileToS3Only(file, folderPath, (prog) => {
          setUploadProgress(prog);
        });
        s3Key = res.key;
        s3Url = res.url || "";
      } else {
        // Standard upload for <= 5MB
        const cleanFilename = file.name.trim().replace(/\s+/g, '_');
        const key = `${folderPath}/${Date.now()}_${cleanFilename}`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("key", key);

        const uploadRes = await uploadFile(formData).unwrap();
        s3Key = uploadRes.key || key;
        s3Url = uploadRes.url || "";
      }

      // 3. Get accessible S3 URL if direct url is not available
      let mediaUrl = s3Url;
      if (!mediaUrl || !mediaUrl.startsWith("http")) {
        try {
          const dlRes = await downloadUrl({ key: s3Key }).unwrap();
          mediaUrl = dlRes.downloadUrl || dlRes.presignedUrl || dlRes.url || "";
        } catch (dlErr) {
          console.error("Failed to get download URL, falling back to S3_BASE_URL", dlErr);
          mediaUrl = `${S3_BASE_URL}/${s3Key}`;
        }
      }

      if (!mediaUrl) {
        throw new Error("Could not generate accessible URL for uploaded media.");
      }

      // 4. Determine Interakt media type
      const ext = file.name.includes('.') ? file.name.split('.').pop()?.toLowerCase() || "" : "";
      let mediaType = "Document";
      if (/^(jpg|jpeg|png|gif|webp|bmp)$/.test(ext) || file.type.startsWith("image/")) {
        mediaType = "Image";
      } else if (/^(mp4|3gp|mov|avi|webm|mkv)$/.test(ext) || file.type.startsWith("video/")) {
        mediaType = "Video";
      } else if (/^(mp3|ogg|wav|m4a|aac|flac)$/.test(ext) || file.type.startsWith("audio/")) {
        mediaType = "Audio";
      }

      // 5. Send Free Form Media Message to API
      const cleanTargetPhone = phone.replace(/\D/g, "");
      const targetNumber = cleanTargetPhone.length >= 10
        ? cleanTargetPhone.slice(-10)
        : cleanTargetPhone;

      const payload = {
        countryCode: "+91",
        phoneNumber: targetNumber,
        type: mediaType,
        data: {
          mediaUrl: mediaUrl
        }
      };

      console.log("Sending Free Form Media Message:", payload);
      await sendWhatsappMessage(payload).unwrap();

      // 6. Update local chat UI
      const userMsg = {
        id: Date.now(),
        text: "",
        media: mediaUrl,
        from: "user",
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => [...prev, userMsg]);
      saveLocalCache([...getLocalCache(), userMsg]);

    } catch (error) {
      console.error("Failed to upload and send media:", error);
      alert("Failed to send attachment. Please check console or try again.");
    } finally {
      setIsUploadingMedia(false);
      setUploadProgress(0);
    }
  };

  // Computed project contents list
  const displayedContent = useMemo(() => {
    if (!projectContents || !projectContents.data || projectContents.data.length === 0) return [];

    let allItems: any[] = [];
    if (lead?.project_id) {
      const projectData = projectContents.data.find((d: any) => d.project_id === lead.project_id);
      if (projectData && projectData.contents) {
        allItems = projectData.contents;
      } else {
        projectContents.data.forEach((pd: any) => {
          if (pd.contents) allItems.push(...pd.contents);
        });
      }
    } else {
      projectContents.data.forEach((pd: any) => {
        if (pd.contents) allItems.push(...pd.contents);
      });
    }

    return allItems.map((content: any) => {
      let fileName = content.s3_key ? content.s3_key.split('/').pop() : "Unknown File";
      if (!fileName) fileName = "Unknown File";

      const fileExt = fileName.split('.').pop()?.toLowerCase() || "pdf";
      let type: "pdf" | "xlsx" | "dwg" | "png" | "mp4" = "pdf";
      if (fileExt === "xlsx" || fileExt === "xls") type = "xlsx";
      else if (fileExt === "dwg") type = "dwg";
      else if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg") type = "png";
      else if (fileExt === "mp4" || fileExt === "mov") type = "mp4";

      return {
        id: content.id,
        fileName,
        fileType: type,
        title: content.content_type_description || fileName,
        s3_key: content.s3_key
      };
    });
  }, [projectContents, lead?.project_id]);

  // Icon renderer helper matching ContentPage
  const renderFileIcon = (fileType: "pdf" | "xlsx" | "dwg" | "png" | "mp4") => {
    switch (fileType) {
      case "pdf":
        return (
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center border border-red-200 dark:border-red-950 shrink-0">
            <FileText className="w-4 h-4 text-red-500" />
          </div>
        );
      case "xlsx":
        return (
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-zinc-800/30 flex items-center justify-center border border-slate-300 dark:border-zinc-800 shrink-0">
            <Table className="w-4 h-4 text-slate-500" />
          </div>
        );
      case "dwg":
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center border border-blue-200 dark:border-blue-900 shrink-0">
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
        );
      case "png":
        return (
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-zinc-800/30 flex items-center justify-center border border-slate-350 dark:border-zinc-800 shrink-0">
            <ImageIcon className="w-4 h-4 text-slate-450" />
          </div>
        );
      case "mp4":
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 flex items-center justify-center border border-[#002d62]/30 dark:border-blue-900/30 shrink-0">
            <Play className="w-4 h-4 fill-current text-[#002d62]" />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center border border-slate-200 dark:border-zinc-850 shrink-0">
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
        );
    }
  };

  const handleSendContentItem = async (content: any) => {
    try {
      setIsSendingContent(true);
      setIsContentModalOpen(false);

      console.log(`[Send Content] Calling /s3/downloadUrl for key: "${content.s3_key}"`);
      const response = await downloadUrl({
        key: content.s3_key
      }).unwrap();

      const targetUrl = response.url || response.downloadUrl || response.presignedUrl;
      if (!targetUrl) {
        throw new Error("No valid URL returned from /s3/downloadUrl");
      }

      const ext = content.fileName.includes('.') ? content.fileName.split('.').pop()?.toLowerCase() || "" : "";
      let mediaType = "Document";
      if (/^(jpg|jpeg|png|gif|webp|bmp)$/.test(ext)) {
        mediaType = "Image";
      } else if (/^(mp4|3gp|mov|avi|webm|mkv)$/.test(ext)) {
        mediaType = "Video";
      } else if (/^(mp3|ogg|wav|m4a|aac|flac)$/.test(ext)) {
        mediaType = "Audio";
      }

      const cleanTargetPhone = phone.replace(/\D/g, "");
      const targetNumber = cleanTargetPhone.length >= 10
        ? cleanTargetPhone.slice(-10)
        : cleanTargetPhone;

      const payload = {
        countryCode: "+91",
        phoneNumber: targetNumber,
        type: mediaType,
        data: {
          mediaUrl: targetUrl
        }
      };

      console.log("Sending Content Message:", payload);
      await sendWhatsappMessage(payload).unwrap();

      const userMsg = {
        id: Date.now(),
        text: "",
        media: targetUrl,
        from: "user",
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => [...prev, userMsg]);
      saveLocalCache([...getLocalCache(), userMsg]);
    } catch (error) {
      console.error("Failed to send content:", error);
      alert("Failed to send content. Please try again.");
    } finally {
      setIsSendingContent(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#efeae2] font-sans">

      {/* HEADER */}
      <div className="bg-[#075E54] px-4 py-2 flex items-center justify-between shrink-0 shadow-md z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-white/10 text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-white leading-tight">
                {contactName}
              </p>
              <p className="text-[12px] text-white/80">
                online
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Actions removed as requested */}
        </div>
      </div>

      {/* CHAT BODY */}
      <div
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2 relative"
        style={{
          backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
          backgroundBlendMode: "overlay",
          backgroundColor: "#efeae2"
        }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center my-4">
            <span className="bg-[#ffffff] dark:bg-[#182229] text-[#54656f] dark:text-[#8696a0] text-[12.5px] px-3 py-1.5 rounded-lg shadow-sm uppercase font-medium">
              Yesterday
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id + "_" + msg.createdAt}
              className={cn(
                "flex w-full mb-2",
                msg.from === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "px-3 py-2 rounded-lg max-w-[85%] md:max-w-[70%] text-[14.2px] shadow-sm relative group",
                  msg.from === "user"
                    ? "bg-[#dcf8c6] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-tr-none"
                    : "bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-tl-none"
                )}
              >
                {msg.media ? (
                  <>
                    <ChatMessageMedia mediaUrl={msg.media} isSent={msg.from === "user"} />
                    {!shouldHideTextMessage(msg.text, msg.media) && (
                      <div className="mt-1">
                        <ChatMessageContent content={msg.text} isSent={msg.from === "user"} />
                      </div>
                    )}
                  </>
                ) : (
                  msg.text && <ChatMessageContent content={msg.text} isSent={msg.from === "user"} />
                )}
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[11px] text-[#667781] dark:text-[#8696a0] opacity-90">
                    {new Date(parseTimestamp(msg.createdAt)).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}
                  </span>
                  {msg.from === "user" && (
                    <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Templates Section */}
          {templates.length > 0 && shouldShowTemplates() && (
            <div className="flex flex-col items-center gap-3 mt-8 pb-10">
              <div className="w-full flex items-center gap-4 text-[#8696a0]">
                <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
                <span className="text-xs font-semibold uppercase tracking-wider">Quick Templates</span>
                <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {loadingTemplates ? (
                  <div className="col-span-full py-4 text-center text-zinc-400 text-sm">
                    Loading professional templates...
                  </div>
                ) : (
                  templates
                    .filter((t, index) => {
                      if (templateState.lastTemplateId && t.id === templateState.lastTemplateId) {
                        return false;
                      }
                      return index >= templateState.count;
                    })
                    .map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedTemplate(t);
                          setInput("");

                          // Focus input so user can type
                          setTimeout(() => {
                            if (inputRef.current) {
                              inputRef.current.focus();
                            }
                          }, 0);
                        }}
                        className={cn(
                          "bg-white dark:bg-[#202c33] text-zinc-700 dark:text-[#d1d7db] px-4 py-3 rounded-xl shadow-sm text-left text-sm transition-all border hover:border-black/5",
                          selectedTemplate?.id === t.id
                            ? "border-[#00a884] ring-1 ring-[#00a884]"
                            : "border-transparent hover:bg-[#f0f2f5] dark:hover:bg-[#182229]"
                        )}
                      >
                        <p className="font-semibold text-[#075E54] dark:text-[#00a884] mb-0.5">{t.display_name}</p>
                        <p className="text-xs opacity-70 truncate">Category: {t.category}</p>
                      </button>
                    ))
                )}
              </div>

              {/* Throttling Indicator */}
              {timeLeft && (
                <div className="w-full bg-[#fff] dark:bg-[#202c33] border border-orange-200 dark:border-orange-900/30 p-3 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Next Template Available In:</span>
                  </div>
                  <span className="text-sm font-black text-[#075E54] dark:text-[#00a884] font-mono">{timeLeft}</span>
                </div>
              )}
            </div>
          )}



          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      {/* TEMPLATE PREVIEW */}
      {selectedTemplate && (
        <div className="bg-[#f0f2f5] dark:bg-[#202c33] px-4 py-3 text-sm text-[#111b21] dark:text-[#e9edef] border-t border-b dark:border-white/5 border-black/5 shadow-sm z-10 flex flex-col gap-1 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#00a884] uppercase tracking-wider">Template Preview</span>
            <button onClick={() => setSelectedTemplate(null)} className="text-xs text-zinc-400 hover:text-zinc-600">Cancel</button>
          </div>
          <p className="whitespace-pre-wrap mt-1">{formatTemplateMessage(selectedTemplate.message, [input])}</p>
        </div>
      )}

      {/* UPLOAD PROGRESS BAR */}
      {isUploadingMedia && (
        <div className="bg-white dark:bg-[#202c33] px-4 py-2 border-t border-b dark:border-white/5 flex items-center gap-3 shrink-0">
          <Loader2 className="h-4 w-4 animate-spin text-[#00a884] shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between text-xs font-semibold text-[#111b21] dark:text-[#e9edef] mb-1">
              <span>Uploading Attachment...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#00a884] h-full transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* INPUT AREA */}
      <div className="bg-[#f0f2f5] dark:bg-[#202c33] p-3 flex items-center gap-2 shrink-0 border-t dark:border-white/5">
        <div className="flex items-center gap-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="relative group/tooltip flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingMedia || isThrottled()}
              className="rounded-full text-[#54656f] dark:text-[#aebac1]"
            >
              {isUploadingMedia ? (
                <Loader2 className="h-6 w-6 animate-spin text-[#00a884]" />
              ) : (
                <Plus className="h-6 w-6" />
              )}
            </Button>
            <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-[#1f2c34] dark:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 z-[999]">
              Attach File (max 200MB)
              <div className="absolute top-full left-3 -mt-1 border-4 border-transparent border-t-[#1f2c34] dark:border-t-zinc-800" />
            </div>
          </div>
          <div className="relative group/tooltip flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsContentModalOpen(true);
                getProjectWiseContents({ project_ids: lead?.project_id ? [lead.project_id] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
              }}
              disabled={isSendingContent || isThrottled()}
              className="rounded-full text-[#54656f] dark:text-[#aebac1]"
            >
              {isSendingContent ? (
                <Loader2 className="h-6 w-6 animate-spin text-[#00a884]" />
              ) : (
                <FolderOpen className="h-6 w-6" />
              )}
            </Button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1f2c34] dark:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 z-[999]">
              Send Content
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1f2c34] dark:border-t-zinc-800" />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-lg px-4 py-1.5 flex items-center shadow-sm">
          {isThrottled() ? (
            <input
              disabled
              placeholder={`Messaging locked (Next template available in ${timeLeft || "4 hours"})`}
              className="flex-1 bg-transparent text-sm text-slate-400 dark:text-zinc-500 outline-none py-1 w-full cursor-not-allowed placeholder:text-orange-500/70 dark:placeholder:text-orange-500/50 font-semibold"
            />
          ) : (!shouldShowTemplates() || selectedTemplate) ? (
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={selectedTemplate ? "Enter Name..." : "Type a message"}
              className="flex-1 bg-transparent text-sm text-[#111b21] dark:text-[#e9edef] outline-none py-1 w-full"
            />
          ) : (
            <input
              disabled
              placeholder="Select a template above to reply"
              className="flex-1 bg-transparent text-sm text-slate-400 dark:text-zinc-500 outline-none py-1 w-full cursor-not-allowed"
            />
          )}
        </div>

        <Button
          onClick={() => sendMessage()}
          disabled={isThrottled() || !((!shouldShowTemplates() || selectedTemplate) && input.trim())}
          className="bg-[#00a884] hover:bg-[#008f6f] disabled:opacity-40 disabled:hover:bg-[#00a884] text-white rounded-full h-11 w-11 flex items-center justify-center p-0 transition-transform active:scale-95 shrink-0"
        >
          <Send className="h-5 w-5 ml-0.5" />
        </Button>
      </div>

      {/* SEND CONTENT MODAL */}
      {isContentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-slate-100 dark:border-zinc-800/80 w-full max-w-[700px] max-h-[80vh] flex flex-col p-6 shadow-2xl relative mx-4 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800 shrink-0">
              <div>
                <h3 className="text-base font-extrabold text-[#002d62] dark:text-zinc-150">
                  Select Content to Send
                </h3>
                <p className="text-[11px] text-slate-450 dark:text-zinc-500 mt-0.5">
                  Click on a file to immediately send it to <span className="font-bold text-[#00a884]">{contactName}</span>
                </p>
              </div>
              <button
                onClick={() => setIsContentModalOpen(false)}
                disabled={isSendingContent}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content List / Grid */}
            <div className="flex-1 overflow-y-auto py-4">
              {isContentsLoading ? (
                <div className="flex justify-center items-center p-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#00a884]" />
                </div>
              ) : displayedContent.length === 0 ? (
                <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-8 text-center text-xs font-bold text-slate-400">
                  No project content uploaded yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayedContent.map((content) => (
                    <div
                      key={content.id}
                      onClick={() => !isSendingContent && handleSendContentItem(content)}
                      className={`bg-white dark:bg-zinc-900/80 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 space-y-3 relative flex flex-col justify-between shadow-sm cursor-pointer hover:border-[#00a884] dark:hover:border-[#00a884] transition-all group ${isSendingContent ? "opacity-60 pointer-events-none" : ""}`}
                    >
                      <h4 className="font-extrabold text-xs text-[#002d62] dark:text-zinc-150 truncate group-hover:text-[#00a884] transition-colors" title={content.title}>
                        {content.title}
                      </h4>

                      <div className="flex items-center gap-3 bg-slate-50/50 dark:bg-zinc-950/40 border border-slate-100/70 dark:border-zinc-900 rounded-xl p-2.5">
                        {renderFileIcon(content.fileType)}
                        <div className="overflow-hidden flex-1">
                          <p className="font-bold text-[11px] text-slate-700 dark:text-zinc-300 truncate" title={content.fileName}>
                            {content.fileName}
                          </p>
                          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">
                            Click to send
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {isSendingContent && (
              <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-center gap-2 text-xs font-bold text-[#00a884]">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending content to WhatsApp...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};