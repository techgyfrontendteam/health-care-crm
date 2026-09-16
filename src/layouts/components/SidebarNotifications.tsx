import React, { useState, useEffect } from "react";
import { Bell, RefreshCw } from "lucide-react";
import { cn } from "../../utils";

const initialNotifications: Array<{
  id: number;
  title: string;
  subtitle: string;
  time: string;
  desc: string;
  unread: boolean;
}> = [];

interface SidebarNotificationsProps {
  isSidebarOpen: boolean;
  placement?: "sidebar" | "navbar";
}

export const SidebarNotifications: React.FC<SidebarNotificationsProps> = ({ isSidebarOpen, placement = "sidebar" }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  useEffect(() => {
    const handlePushNotification = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { id, title, body, time } = customEvent.detail;
      
      setNotifications(prev => [
        {
          id,
          title,
          subtitle: "Just now",
          time,
          desc: `• Alert\n${body}`,
          unread: true,
        },
        ...prev
      ]);
    };

    window.addEventListener("push_notification_received", handlePushNotification);
    return () => window.removeEventListener("push_notification_received", handlePushNotification);
  }, []);

  return (
    <div className={cn("flex relative", placement === "sidebar" && "w-full", isSidebarOpen ? "justify-start" : "justify-center")}>

      <div className={cn("relative", placement === "sidebar" && "w-full")}>
        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className={cn(
            "relative flex items-center text-slate-600 hover:text-[#111625] transition-colors cursor-pointer",
            placement === "navbar"
              ? "h-9 w-9 justify-center rounded-full border border-[#e2e8f0] hover:bg-[#f8f9fa] hover:border-slate-300"
              : cn(
                  "h-11 hover:bg-[#f8f9fa]",
                  isSidebarOpen ? "w-full gap-3 px-3 justify-start" : "w-11 justify-center"
                )
          )}
          aria-label="Notifications"
        >
          <Bell size={18} />
          {isSidebarOpen && placement !== "navbar" && <span className="text-sm font-medium">Notifications</span>}
          {notifications.some(n => n.unread) && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          )}
        </button>
        
        {/* Notifications Popover */}
        {isNotificationsOpen && (
          <div className={cn(
            "crm-popup bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 z-[110] overflow-hidden flex flex-col cursor-default",
            placement === "navbar"
              ? "absolute right-0 top-12 w-[min(350px,calc(100vw-2rem))]"
              : isSidebarOpen
                ? "fixed bottom-6 left-[252px] w-[350px]"
                : "fixed bottom-6 left-[88px] w-[350px]"
          )} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800 text-[13px]">Notifications</h3>
              <button className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <RefreshCw size={14} />
              </button>
            </div>
            {/* List */}
            <div className="max-h-[400px] overflow-y-auto p-2 space-y-1">
              {notifications.length === 0 && (
                <div className="px-4 py-10 text-center">
                  <Bell className="mx-auto mb-3 h-5 w-5 text-slate-400" />
                  <p className="text-xs font-medium text-slate-600">No notifications yet</p>
                  <p className="mt-1 text-[11px] text-slate-400">New care activity will appear here.</p>
                </div>
              )}
              {notifications.map(n => (
                <div 
                  key={n.id} 
                  onClick={() => markAsRead(n.id)}
                  className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors relative group"
                >
                   <div className="flex justify-between items-start mb-1 gap-2">
                     <h4 className="font-bold text-[11px] text-slate-800 pr-2">
                       {n.title} <span className="text-slate-400 font-medium ml-1 text-[9px]">{n.subtitle}</span>
                     </h4>
                     <span className="text-[9px] text-slate-400 whitespace-nowrap shrink-0">{n.time}</span>
                   </div>
                   <p className="text-[10px] text-slate-400 font-semibold mb-0.5 leading-snug">{n.desc.split('\n')[0]}</p>
                   <p className="text-[10px] text-slate-500 leading-snug pr-4">{n.desc.split('\n')[1]}</p>
                   {n.unread && <span className="absolute top-4 right-3 w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
