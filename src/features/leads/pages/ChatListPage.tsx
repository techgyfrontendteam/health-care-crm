import { useNavigate } from "react-router-dom";
import { useGetLeadsQuery } from "../api/leadsApi";
import { useGetAllUsersQuery } from "../../users/api/usersApi";
import { usePermissions } from "../../../hooks/usePermissions";
import { Loader2, User } from "lucide-react";
import { useMemo } from "react";

export const ChatListPage = () => {
  const navigate = useNavigate();
  const { data: leadsData, isLoading } = useGetLeadsQuery({ offset: 0 });
  const leads = useMemo(() => Array.isArray(leadsData) ? leadsData : (leadsData?.data || []), [leadsData]);

  const { user: currentUser } = usePermissions();
  const { data: users = [] } = useGetAllUsersQuery({ offset: 0 });

  // Identify current user's phone number
  const currentUserPhone = useMemo(() => {
    const loginUser = users.find(u => String(u.id) === String(currentUser?.id));
    return loginUser?.phone_number;
  }, [users, currentUser]);

  const filteredLeads = useMemo(() => {
    if (!currentUserPhone) return leads;
    return leads.filter(lead => String(lead.rm_phone_number) === String(currentUserPhone));
  }, [leads, currentUserPhone]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#075E54]" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col">

      {/* HEADER */}
      <div className="bg-[#075E54] text-white px-4 py-4 text-lg font-semibold shadow-md z-10">
        Chats
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto">
        {filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <User className="h-16 w-16 mb-4 opacity-20" />
            <p>No chats available</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.uuid}
              onClick={() => navigate(`/chat/${lead.uuid}`, {
                state: {
                  name: lead.phone_number,
                  phone: lead.phone_number,
                  type: "CM"
                }
              })}
              className="flex items-center gap-3 px-4 py-3 border-b cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {/* Avatar */}
              <div className="w-12 h-12 bg-[#d1d7db] rounded-full flex items-center justify-center">
                <User className="h-7 w-7 text-white" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-[16px] text-[#111b21]">{lead.phone_number}</p>
                  <span className="text-[12px] text-gray-500">
                    {lead.created_on ? new Date(lead.created_on).toLocaleDateString() : ""}
                  </span>
                </div>

                <p className="text-sm text-gray-500 truncate mt-0.5">
                  {lead.first_name ? `${lead.first_name} ${lead.last_name || ""}` : "New Lead"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};