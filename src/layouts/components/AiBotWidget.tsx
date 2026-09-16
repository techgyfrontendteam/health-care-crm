import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, User, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "../../utils";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "bot",
    text: "Hello! I am your AI Healthcare Assistant. How can I help you manage leads, appointments, or doctors today?",
    time: "Just now",
  },
];

export const AiBotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I can help you review that. For quick operations, check out the leads dashboard, appointments calendar, or doctor directory.";
      const lower = text.toLowerCase();
      if (lower.includes("doctor") || lower.includes("dr")) {
        botResponse = "You can filter doctors by OPD/IPD specialization or hospital branch directly from the Doctor Directory.";
      } else if (lower.includes("appointment") || lower.includes("visit")) {
        botResponse = "Scheduled visits and OPD consultations are tracked in real-time under Appointments.";
      } else if (lower.includes("lead") || lower.includes("sales")) {
        botResponse = "Lead conversion metrics, follow-up queues, and SLA alerts can be viewed in the Sales & Follow-ups modules.";
      }

      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, replyMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Popover Window */}
      {isOpen && (
        <div className="mb-3 w-[min(380px,calc(100vw-2rem))] h-[500px] max-h-[80vh] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-zinc-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#063669] to-[#0022ff] px-4 py-3.5 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold tracking-wide">CRM AI Assistant</h3>
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-white/80 font-medium">Healthcare Copilot</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-zinc-900/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-end gap-2 text-xs",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.sender === "bot" && (
                  <div className="h-6 w-6 rounded-full bg-[#063669] text-white flex items-center justify-center shrink-0 mb-1">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-2xs leading-relaxed",
                    msg.sender === "user"
                      ? "bg-[#063669] text-white rounded-br-xs"
                      : "bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 rounded-bl-xs"
                  )}
                >
                  <p className="text-[12px]">{msg.text}</p>
                  <span
                    className={cn(
                      "block text-[9px] mt-1 font-medium text-right",
                      msg.sender === "user" ? "text-white/70" : "text-slate-400 dark:text-zinc-500"
                    )}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs">
                <div className="h-6 w-6 rounded-full bg-[#063669] text-white flex items-center justify-center shrink-0">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 px-3.5 py-2 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Input Form */}
          <form
            onSubmit={handleSend}
            className="p-2.5 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about patients or leads..."
              className="flex-1 h-9 px-3 text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-[#063669] text-slate-800 dark:text-zinc-100 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="h-9 w-9 rounded-xl bg-[#063669] hover:bg-[#052b53] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button (Right Bottom) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative h-13 w-13 rounded-full bg-gradient-to-tr from-[#063669] to-[#0022ff] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer border-2 border-white/30"
        aria-label="Open AI Assistant"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
        {isOpen ? (
          <X className="h-5 w-5 transition-transform group-hover:rotate-90 duration-200" />
        ) : (
          <Bot className="h-6 w-6 transition-transform group-hover:scale-110 duration-200" />
        )}
      </button>
    </div>
  );
};

