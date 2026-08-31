import React, { useState } from "react";
import {
  Outlet,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  UserCircle,
  ChevronRight,
  FlaskConical,
  ChevronLeft,
  X,
  User,
  Phone,
  Mail,
  Lock,
  Pencil,
  ArrowLeft,
  Eye,
  EyeOff,
  UserStar,
  Contact,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import { SidebarNotifications } from "./components/SidebarNotifications";
import { usePermissions } from "../hooks/usePermissions";
import { Button } from "../components/ui/button";
import { cn } from "../utils";
import { GlobalApiLoader } from "../shared/components/GlobalApiLoader";
import { useUpdatePasswordMutation } from "../features/auth/api/authApi";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../features/users/api/usersApi";
import { useUploadFileMutation } from "../shared/api/s3ApiSlice";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../features/auth/store/authSlice";
import { storage } from "../shared/utils/localStorage";

const NavIcon = ({ name }: { name: string }) => (
  <div
    className="w-[22px] h-[22px] bg-current"
    style={{
      maskImage: `url(/icons/${name}.svg?v=8)`,
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      maskSize: 'contain',
      WebkitMaskImage: `url(/icons/${name}.svg?v=8)`,
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      WebkitMaskSize: 'contain',
    }}
  />
);

export const MainLayout = () => {
  const { isAuthenticated, isFirstLogin, user, logout } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ old_password?: string; new_password?: string; confirm_password?: string }>({});

  const dispatch = useDispatch();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFirstName, setEditFirstName] = useState((user as any)?.first_name || (user?.name?.split(' ')[0]) || "");
  const [editLastName, setEditLastName] = useState((user as any)?.last_name || (user?.name?.split(' ').slice(1).join(' ')) || "");
  const [editPhone, setEditPhone] = useState((user as any)?.phone || (user as any)?.phone_number || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const [updateUser, { isLoading: isUpdatingProfile }] = useUpdateUserMutation();
  const [uploadFile] = useUploadFileMutation();

  const handleProfileUpdate = async () => {
    if (!user?.id) return;
    try {
      await updateUser({
        id: Number(user.id),
        first_name: editFirstName,
        last_name: editLastName,
        phone_number: editPhone,
        email: editEmail,
      }).unwrap();

      dispatch(updateUserProfile({
        first_name: editFirstName,
        last_name: editLastName,
        phone_number: editPhone,
        phone: editPhone,
        email: editEmail,
        name: `${editFirstName} ${editLastName}`.trim()
      }));

      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;
    setIsUploadingAvatar(true);
    try {
      const formData = new FormData();
      const finalKey = `users/${file.name}`;
      formData.append("file", file);
      formData.append("key", finalKey);
      const res = await uploadFile(formData).unwrap();

      // Use the URL directly returned by the S3 upload API
      const profilePicUrl = res.url || res.key;

      await updateUser({
        id: Number(user.id),
        first_name: (user as any).first_name || user.name?.split(' ')[0] || "",
        last_name: (user as any).last_name || user.name?.split(' ').slice(1).join(' ') || "",
        phone_number: (user as any).phone_number || (user as any).phone || "",
        email: user.email || "",
        // role_id: (user as any).role_id || 1,
        profile_pic_location: profilePicUrl,
      }).unwrap();

      dispatch(updateUserProfile({
        profile_pic_location: `${profilePicUrl}?t=${Date.now()}`
      }));

      toast.success("Avatar updated successfully!");
    } catch (err: any) {
      console.error("Avatar upload error:", err);
      toast.error(err?.data?.message || "Failed to upload avatar");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const [updatePasswordMutation, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const errors: typeof formErrors = {};
    if (!oldPassword) errors.old_password = "Current password is required";
    if (!newPassword) {
      errors.new_password = "New password is required";
    } else if (newPassword.length < 12) {
      errors.new_password = "Minimum 12 characters required";
    } else if (!/[A-Z]/.test(newPassword)) {
      errors.new_password = "Must include at least one uppercase letter";
    } else if (!/[0-9]/.test(newPassword)) {
      errors.new_password = "Must include at least one number";
    } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
      errors.new_password = "Must include at least one special symbol";
    }
    if (!confirmPassword) {
      errors.confirm_password = "Confirm your password";
    } else if (newPassword !== confirmPassword) {
      errors.confirm_password = "Passwords do not match";
    }
    if (oldPassword && newPassword && oldPassword === newPassword) {
      errors.new_password = "New password must be different from current password";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    try {
      const res = await updatePasswordMutation({
        old_password: oldPassword,
        new_password: newPassword,
      }).unwrap();

      if (!res || res.success !== true) {
        toast.error(res?.message || "Current password is incorrect");
        return;
      }

      toast.success("Password updated successfully!");
      setIsUpdatePasswordOpen(false);

      // Clear fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Current password is incorrect");
    }
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { roleCode } = usePermissions();

  const displayName = React.useMemo(() => {
    if (user?.name) return user.name;
    if (user?.email) {
      const part = user.email.split("@")[0];
      return part
        .replace(/[0-9]/g, "")
        .replace(/[._-]/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return "User";
  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isFirstLogin) {
    return <Navigate to="/set-password" replace />;
  }

  // ────────────────────────────────────────────────────────────────────────
  // Role-based sidebar config
  // Each role has its own ordered list of nav items.
  // ────────────────────────────────────────────────────────────────────────

  const navItemsByRole: Record<string, { label: string; path: string; icon: React.ReactNode }[]> = {
    // Super Admin & Admin — full set, in spec order
    SADMIN: [
      { label: 'Manage Leads', path: '/leads', icon: <NavIcon name="manage" /> },
      { label: 'Doctors', path: '/doctors', icon: <UserStar size={22} /> },
      { label: 'Revenue Dashboard', path: '/revenue', icon: <IndianRupee size={22} /> },
      { label: 'Sales Dashboard', path: '/sales', icon: <TrendingUp size={22} /> },
      { label: 'Sales Heads', path: '/relationship-managers', icon: <NavIcon name="relation" /> },
      { label: 'Appointments', path: '/scheduled-visits', icon: <NavIcon name="schedule" /> },
      { label: 'Follow ups', path: '/follow-ups', icon: <NavIcon name="follow-ups" /> },
      { label: 'Reports', path: '/reports', icon: <NavIcon name="reports" /> },
    ],
    ADMIN: [
      { label: 'Manage Leads', path: '/leads', icon: <NavIcon name="manage" /> },
      { label: 'Doctors', path: '/doctors', icon: <UserStar size={22} /> },
      { label: 'Revenue Dashboard', path: '/revenue', icon: <IndianRupee size={22} /> },
      { label: 'Sales Dashboard', path: '/sales', icon: <TrendingUp size={22} /> },
      { label: 'Sales Heads', path: '/relationship-managers', icon: <NavIcon name="relation" /> },
      { label: 'Appointments', path: '/scheduled-visits', icon: <NavIcon name="schedule" /> },
      { label: 'Follow ups', path: '/follow-ups', icon: <NavIcon name="follow-ups" /> },
      { label: 'Reports', path: '/reports', icon: <NavIcon name="reports" /> },
    ],
    // Relationship Manager — scoped set, their dashboard first
    RELMNG: [
      { label: 'Dashboard', path: '/relationship-managers/dashboard', icon: <LayoutDashboard size={22} fill="currentColor" /> },
      { label: 'Leads Dashboard', path: '/leads', icon: <NavIcon name="manage" /> },
      { label: 'Doctors', path: '/doctors', icon: <UserStar size={22} /> },
      { label: 'Revenue Dashboard', path: '/revenue', icon: <IndianRupee size={22} /> },
      { label: 'Sales Dashboard', path: '/sales', icon: <TrendingUp size={22} /> },
      { label: 'Appointments', path: '/scheduled-visits', icon: <NavIcon name="schedule" /> },
      { label: 'Follow ups', path: '/follow-ups', icon: <NavIcon name="follow-ups" /> },
    ],
    // Experience Manager — scoped set, their dashboard first
    EXPMNG: [
      { label: 'Dashboard', path: '/agents/dashboard', icon: <LayoutDashboard size={22} fill="currentColor" /> },
      { label: 'Leads', path: '/leads', icon: <NavIcon name="manage" /> },
      { label: 'Doctors', path: '/doctors', icon: <UserStar size={22} /> },
      { label: 'Revenue Dashboard', path: '/revenue', icon: <IndianRupee size={22} /> },
      { label: 'Sales Dashboard', path: '/sales', icon: <TrendingUp size={22} /> },
      { label: 'Appointments', path: '/scheduled-visits', icon: <NavIcon name="schedule" /> },
      { label: 'Follow ups', path: '/follow-ups', icon: <NavIcon name="follow-ups" /> },
    ],
  };

  const navItems = navItemsByRole[roleCode] ?? navItemsByRole['ADMIN'];

  const getInitials = () => {
    if (!displayName || displayName === "User") {
      return user?.email?.[0]?.toUpperCase() || "U";
    }
    return displayName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getRoleLabel = () => {
    if (!user) return "User";
    if (user.role_id === 1) return "Business Owner";
    if (user.role_id === 2) return "CRM Admin";
    if (user.role_id === 3) return "Sales Head";
    if (user.role_id === 4) return "Sales Executive";
    return "User";
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <GlobalApiLoader />
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white/80 dark:bg-white/80 backdrop-blur-md border-r border-border min-h-screen hidden md:flex flex-col transition-all duration-300 relative z-50",
          isSidebarOpen ? "w-64" : "w-16",
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-5 bg-white rounded-full p-1 border border-border text-primary hover:bg-accent transition-colors z-10 shadow-sm"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        <div
          className={cn(
            "p-6 flex flex-col justify-center h-20 whitespace-nowrap overflow-hidden transition-all duration-300",
            isSidebarOpen ? "items-start" : "items-center",
          )}
        >
          {isSidebarOpen ? (
            <div className="flex flex-col opacity-100">
              <h2 className="text-2xl font-bold text-primary tracking-tight leading-none">
                TechGy CRM
              </h2>
            </div>
          ) : (
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-white shrink-0">
              TG
            </div>
          )}
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path + '/'));
            return (
              <Link
                key={item.path}
                to={item.path}
                title={!isSidebarOpen ? item.label : undefined}
                className={cn(
                  "flex items-center rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-[#002d62] text-white font-bold"
                    : "text-muted-foreground hover:bg-slate-100 hover:text-[#002d62]",
                  isSidebarOpen ? "space-x-4 px-4 py-3" : "justify-center w-10 h-10 mx-auto px-0 py-0",
                )}
              >
                <div
                  className={cn(
                    "shrink-0 transition-colors duration-200",
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-[#002d62]",
                  )}
                >
                  {item.icon}
                </div>
                <span
                  className={cn(
                    "whitespace-nowrap text-sm overflow-hidden transition-all duration-300",
                    isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile - Bottom of Sidebar */}
        <div className="mt-auto p-4 flex flex-col gap-2 border-t border-border">
          
          <SidebarNotifications isSidebarOpen={isSidebarOpen} />

          {isSidebarOpen ? (
            <div className="w-full">
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-50 transition-all duration-200 w-full text-left cursor-pointer group border border-transparent hover:border-slate-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#002d62] to-[#1a4d9e] text-xs font-black text-white uppercase shrink-0 shadow-sm overflow-hidden">
                  {user?.profile_pic_location ? (
                    <img src={user.profile_pic_location} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    getInitials()
                  )}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[13px] font-bold text-slate-800 truncate leading-tight group-hover:text-[#002d62] transition-colors">
                    {displayName}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold truncate leading-none mt-0.5">
                    {getRoleLabel()}
                  </span>
                </div>
                <ChevronRight size={14} className="text-slate-300 shrink-0 group-hover:text-[#002d62] transition-colors" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#002d62] to-[#1a4d9e] text-xs font-black text-white uppercase shrink-0 cursor-pointer shadow-sm hover:shadow-md transition-all hover:scale-105 border-2 border-white overflow-hidden"
            >
              {user?.profile_pic_location ? (
                <img src={user.profile_pic_location} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                getInitials()
              )}
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Removed as requested */}

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background dark:bg-background p-6 relative">
          <Outlet />
        </main>
      </div>

      {/* Centered Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsProfileOpen(false)}
          />

          {/* Modal Container */}
          <div className="bg-white rounded-[24px] w-full max-w-[380px] overflow-hidden border border-slate-100 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Title / Close Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Profile</h3>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Profile Avatar / Info */}
            <div className="flex flex-col items-center pt-6 pb-2">
              <div className="relative">
                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#f1f5f9] text-lg font-black text-[#002d62] uppercase shadow-sm border border-slate-100 overflow-hidden">
                  {user?.profile_pic_location ? (
                    <img src={user.profile_pic_location} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    getInitials()
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-[22px] h-[22px] rounded-full bg-[#002d62] text-white flex items-center justify-center border border-white shadow cursor-pointer hover:bg-[#1a4d9e] transition-colors overflow-hidden group">
                  {isUploadingAvatar ? <Loader2 size={10} className="animate-spin" /> : <Pencil size={10} />}
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={isUploadingAvatar} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
              <h4 className="text-[15px] font-extrabold text-slate-800 mt-3 leading-tight">
                {isEditingProfile ? `${editFirstName} ${editLastName}`.trim() : displayName}
              </h4>
              <p className="text-[11px] text-slate-400 font-semibold mt-1">{getRoleLabel()}</p>
            </div>

            {/* Account Information Section */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-3.5">
                <h5 className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase m-0">
                  Account Information
                </h5>
                {isEditingProfile ? (
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditingProfile(false)} className="text-[10px] font-bold text-slate-400 hover:text-slate-600">CANCEL</button>
                    <button onClick={handleProfileUpdate} disabled={isUpdatingProfile} className="text-[10px] font-bold text-primary hover:text-primary/80 flex items-center gap-1">
                      {isUpdatingProfile && <Loader2 size={10} className="animate-spin" />} SAVE
                    </button>
                  </div>
                ) : (
                  <button onClick={() => {
                    setEditFirstName((user as any)?.first_name || (user?.name?.split(' ')[0]) || "");
                    setEditLastName((user as any)?.last_name || (user?.name?.split(' ').slice(1).join(' ')) || "");
                    setEditPhone((user as any)?.phone || (user as any)?.phone_number || "--");
                    setEditEmail(user?.email || "");
                    setIsEditingProfile(true);
                  }} className="text-[10px] font-bold text-primary hover:text-primary/80 flex items-center gap-1">
                    <Pencil size={10} /> EDIT
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="flex items-center gap-3">
                  <div className="w-[34px] h-[34px] rounded-xl bg-slate-50 border border-slate-100/80 flex items-center justify-center text-slate-500 shrink-0">
                    <User size={15} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] text-slate-400 font-semibold leading-none">Full Name</span>
                    {isEditingProfile ? (
                      <div className="flex gap-2 mt-1">
                        <input type="text" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} className="w-full text-[12px] font-bold text-slate-700 border border-slate-200 rounded px-2 py-1 outline-none focus:border-primary" placeholder="First Name" />
                        <input type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} className="w-full text-[12px] font-bold text-slate-700 border border-slate-200 rounded px-2 py-1 outline-none focus:border-primary" placeholder="Last Name" />
                      </div>
                    ) : (
                      <span className="text-[12px] font-bold text-slate-700 truncate mt-1">{displayName}</span>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-3">
                  <div className="w-[34px] h-[34px] rounded-xl bg-slate-50 border border-slate-100/80 flex items-center justify-center text-slate-500 shrink-0">
                    <Phone size={15} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] text-slate-400 font-semibold leading-none">Phone Number</span>
                    {isEditingProfile ? (
                      <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="mt-1 w-full text-[12px] font-bold text-slate-700 border border-slate-200 rounded px-2 py-1 outline-none focus:border-primary" placeholder="Phone Number" />
                    ) : (
                      <span className="text-[12px] font-bold text-slate-700 truncate mt-1">{(user as any)?.phone || (user as any)?.phone_number || "--"}</span>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center gap-3">
                  <div className="w-[34px] h-[34px] rounded-xl bg-slate-50 border border-slate-100/80 flex items-center justify-center text-slate-500 shrink-0">
                    <Mail size={15} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] text-slate-400 font-semibold leading-none">Email Address</span>
                    {isEditingProfile ? (
                      <input type="email" value={editEmail} disabled className="mt-1 w-full text-[12px] font-bold text-slate-400 bg-slate-100 cursor-not-allowed border border-slate-200 rounded px-2 py-1 outline-none" placeholder="Email Address" title="Email address cannot be changed" />
                    ) : (
                      <span className="text-[12px] font-bold text-slate-700 truncate mt-1">{user?.email || "amitmishrachow@gmail.com"}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Security & Preferences Section */}
            <div className="px-6 pb-6 pt-4 border-t border-slate-100/80">
              <h5 className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-3">
                Security & Preferences
              </h5>

              <div className="space-y-3">
                {/* Update Password */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsUpdatePasswordOpen(true);
                  }}
                  className="flex items-center justify-between w-full p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-pointer border border-slate-100/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 group-hover:text-[#002d62] transition-colors border border-slate-100">
                      <Lock size={13} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">Update Password</span>
                  </div>
                  <ChevronRight size={13} className="text-slate-400 group-hover:translate-x-0.5 transition-transform mr-1" />
                </button>

                {/* Logout */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-red-50 hover:bg-red-100/70 transition-colors text-red-600 font-extrabold text-[11px] cursor-pointer border border-red-100/40"
                >
                  <LogOut size={13} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Centered Update Password Modal */}
      {isUpdatePasswordOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => {
              setIsUpdatePasswordOpen(false);
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setFormErrors({});
            }}
          />

          {/* Modal Container */}
          <form
            onSubmit={handleUpdatePassword}
            className="bg-white rounded-[24px] w-full max-w-[380px] overflow-hidden border border-slate-100 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Title / Close Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsUpdatePasswordOpen(false);
                    setIsProfileOpen(true);
                  }}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
                <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Update Password</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsUpdatePasswordOpen(false);
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setFormErrors({});
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-6 space-y-4">
              {/* Current Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-[#002d62] focus:border-[#002d62] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formErrors.old_password && (
                  <span className="text-[10px] text-red-500 font-semibold">{formErrors.old_password}</span>
                )}
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-[#002d62] focus:border-[#002d62] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formErrors.new_password && (
                  <span className="text-[10px] text-red-500 font-semibold">{formErrors.new_password}</span>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-[#002d62] focus:border-[#002d62] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formErrors.confirm_password && (
                  <span className="text-[10px] text-red-500 font-semibold">{formErrors.confirm_password}</span>
                )}
              </div>

              {/* Hint card */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-[10px] leading-relaxed text-slate-400 font-medium">
                  Secure passwords should be at least 12 characters long and include a mix of uppercase letters, numbers, and special symbols.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="w-full h-11 bg-[#002d62] hover:bg-[#1a4d9e] text-white font-bold text-xs rounded-xl transition-all duration-200 shadow-md shadow-blue-900/10 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isUpdatingPassword ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
