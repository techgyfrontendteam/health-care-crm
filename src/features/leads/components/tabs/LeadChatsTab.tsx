import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Loader2, User, Bot, AlertCircle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';
import { formatDate } from '../../../../utils';
import type { LeadChat } from '../../types';
import { usePermissions } from '../../../../hooks/usePermissions';
import { useGetAllUsersQuery } from '../../../users/api/usersApi';
import { S3_BASE_URL } from '../../../../config/constants';
import { ChatMessageMedia } from '../ChatMessageMedia';
import { ChatMessageContent, parseLocationUrlOrData } from '../ChatMessageContent';

const shouldHideTextMessage = (text?: string | null, mediaUrl?: string | null) => {
  if (!text) return true;
  const trimmed = text.trim();
  if (!trimmed || trimmed.startsWith('[')) return true;
  if (/^(maps|location|file)$/i.test(trimmed)) return true;
  if (mediaUrl && trimmed === mediaUrl.trim()) return true;
  if (mediaUrl && parseLocationUrlOrData(mediaUrl) && parseLocationUrlOrData(trimmed)) return true;
  return false;
};

interface ChatMessage {
  timestamp: string;
  uuid: string;
  direction: 'sent' | 'received';
  from_number: string;
  to_number: string;
  message: string;
  message_media?: string | null;
  template_name?: string;
}

interface LeadChatsTabProps {
  chats?: LeadChat[];
  leadUuid?: string;
  phoneNumber?: string;
  selectedChatType?: 'CM';
}

export const LeadChatsTab = ({ chats, leadUuid, phoneNumber, selectedChatType = 'CM' }: LeadChatsTabProps) => {
  const { user: currentUser, roleCode } = usePermissions();
  const { data: users = [] } = useGetAllUsersQuery({ offset: 0 });
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const isInitialLoadRef = useRef<boolean>(true);

  useEffect(() => {
    isInitialLoadRef.current = true;
  }, [leadUuid, phoneNumber, selectedChatType]);

  // Identify current user's phone number to filter irrelevant chat files
  const currentUserPhone = useMemo(() => {
    const loginUser = users.find(u => String(u.id) === String(currentUser?.id));
    return loginUser?.phone_number;
  }, [users, currentUser]);

  const fetchChatData = React.useCallback(async () => {
    let fetchUrl = '';
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

    // 1. Prioritize matching chat file from the backend's chats array
    if (chats && chats.length > 0 && selectedChatType) {
      const matchingChat = chats.find(c =>
        c.chat_file_location?.toLowerCase().includes(`_${selectedChatType.toLowerCase()}.json`)
      );
      if (matchingChat) {
        fetchUrl = normalizeS3Url(matchingChat.chat_file_location || '');
      }
    }

    // 2. Fallback to manual construction if not found in array but lead info exists
    if (!fetchUrl && leadUuid && phoneNumber && selectedChatType) {
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const finalPhone = (cleanPhone.length === 10 && !cleanPhone.startsWith('91'))
        ? `91${cleanPhone}`
        : cleanPhone;

      fetchUrl = `${S3_BASE_URL}/lead/${leadUuid}/chats/${finalPhone}_${selectedChatType}.json`;
    }

    // 3. Final legacy fallback
    if (!fetchUrl && chats && chats.length > 0) {
      const validChat = chats.find(c => {
        if (!c.chat_file_location) return false;
        if (currentUserPhone && c.chat_file_location.includes(currentUserPhone)) return false;
        return true;
      }) || chats[0];
      fetchUrl = normalizeS3Url(validChat?.chat_file_location || '');
    }

    if (!fetchUrl) return;

    setIsLoading(true);
    setError(null);

    try {
      // ✅ Add timestamp to bypass browser cache
      const cacheBuster = `?t=${Date.now()}`;
      const response = await fetch(fetchUrl + cacheBuster, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      if (response.status === 404) {
        setMessages((prev) => (prev.length === 0 ? prev : []));
        setError(null);
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch chat messages');
      const data = await response.json();
      const newMsgs: ChatMessage[] = Array.isArray(data) ? data : [];

      setMessages((prev) => {
        // ✅ Compare old vs new messages: if identical, return prev to prevent state updates & scroll jumps
        if (prev.length === newMsgs.length) {
          const isIdentical = prev.every((m, idx) => {
            const t = newMsgs[idx];
            return (
              m.uuid === t.uuid &&
              (m.message || "").trim() === (t.message || "").trim() &&
              m.timestamp === t.timestamp
            );
          });
          if (isIdentical) return prev;
        }

        // New message arrived! Scroll container to bottom
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 50);

        return newMsgs;
      });

      setError(null);
    } catch (err) {
      // Treat fetch errors as "no chats" instead of red alert per user request
      setMessages([]);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, [chats, currentUserPhone, leadUuid, phoneNumber, selectedChatType]);

  useEffect(() => {
    fetchChatData();
  }, [fetchChatData]);

  const handleStartChat = () => {
    const cleanPhone = phoneNumber?.replace(/\D/g, '') || "";
    const finalPhone = (cleanPhone.length === 10 && !cleanPhone.startsWith('91'))
      ? `91${cleanPhone}`
      : cleanPhone;

    navigate(`/chat/${leadUuid || 'direct'}`, {
      state: {
        phone: finalPhone,
        name: finalPhone,
        type: selectedChatType
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-zinc-500">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-indigo-500" />
        <p className="text-sm font-medium">Fetching secure chat history...</p>
      </div>
    );
  }



  if (messages.length === 0) {
    return (
      <div className="p-12 text-center text-zinc-500 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl mt-4 bg-white dark:bg-zinc-950">
        <MessageCircle className="h-10 w-10 text-zinc-300 mx-auto mb-4" />

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          No Chats Available
        </h3>

        <p className="text-sm mb-4">
          No chat history found. Start a conversation to engage with the lead.
        </p>

        <div className="flex justify-center mt-4">
          <Button
            onClick={handleStartChat}
            className="rounded-lg shadow-lg bg-[#075e54] hover:bg-[#054c44] text-white gap-2 px-6 py-3"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-semibold text-sm">Start Chat</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col h-[600px] bg-[#efeae2] dark:bg-zinc-900 shadow-inner relative">
        {/* WhatsApp style header */}
        <div className="bg-[#075e54] text-white px-4 py-3 flex items-center gap-3 shadow-md">
          <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm">
              Company Number Chat
            </h3>
            <p className="text-[10px] opacity-80 italic">End-to-end encrypted</p>
          </div>
        </div>

        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
          {messages.map((msg, idx) => {
            const isSent = msg.direction === 'sent';

            return (
              <div
                key={`${msg.uuid}-${idx}`}
                className={`flex w-full ${isSent ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex flex-col max-w-[85%] ${isSent ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm leading-relaxed shadow-sm relative ${isSent
                      ? 'bg-[#dcf8c6] dark:bg-emerald-900/30 text-zinc-800 dark:text-zinc-100 rounded-tr-none'
                      : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-tl-none'
                      }`}
                  >
                    {/* Media attachment OR Message content */}
                    {msg.message_media ? (
                      <>
                        <ChatMessageMedia mediaUrl={msg.message_media} isSent={isSent} />
                        {!shouldHideTextMessage(msg.message, msg.message_media) && (
                          <div className="mt-1">
                            <ChatMessageContent content={msg.message} isSent={isSent} />
                          </div>
                        )}
                      </>
                    ) : (
                      msg.message && <ChatMessageContent content={msg.message} isSent={isSent} />
                    )}

                    {/* Timestamp inside bubble for true WA look */}
                    <div className={`text-[9px] mt-1 text-right flex items-center justify-end gap-1 opacity-60 ${isSent ? 'text-emerald-900 dark:text-emerald-400' : 'text-zinc-500'
                      }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isSent && <span className="text-blue-500 font-bold ml-0.5">✓✓</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Safe Bottom Padding */}
          <div className="h-2" />
        </div>

        {/* Footer bar for completeness */}
        <div className="bg-[#f0f2f5] dark:bg-zinc-950 p-2 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-[10px] text-zinc-400">Interaction logged from Official WhatsApp Business API</p>
        </div>
      </div>

      {/* Start Chat Button - Positioned BELOW the chat ui as per sketch */}
      <div className="flex justify-end">
        <Button
          onClick={handleStartChat}
          className="rounded-lg shadow-xl bg-[#075e54] hover:bg-[#054c44] text-white gap-2 px-8 py-6 transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-bold text-sm uppercase tracking-wide">Start Chat</span>
        </Button>
      </div>
    </div>
  );
};