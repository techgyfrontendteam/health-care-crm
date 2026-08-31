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
}

export const SidebarNotifications: React.FC<SidebarNotificationsProps> = ({ isSidebarOpen }) => {
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
    <div className={cn("flex relative", isSidebarOpen ? "px-1 justify-start" : "justify-center")}>

      <div className="relative">
        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer relative flex items-center justify-center"
        >
          <Bell size={18} />
          {notifications.some(n => n.unread) && (
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          )}
        </button>
        
        {/* Notifications Popover */}
        {isNotificationsOpen && (
          <div className={cn(
            "fixed bottom-6 bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-[110] overflow-hidden flex flex-col cursor-default animate-in fade-in zoom-in-95 duration-200",
            isSidebarOpen ? "left-[270px] w-[350px]" : "left-[80px] w-[350px]"
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
