import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  useGetTelephonyProvidersMutation,
  useGetExtensionTypesMutation,
  useUpsertTelephonyAgentMutation,
} from "../../leads/api/callsApi";
import { toast } from "sonner";
import { PhoneCall, Radio, Loader2, Phone } from "lucide-react";

interface TelephonyAgentDialogProps {
  open: boolean;
  onClose: () => void;
  userId?: number;
  userName?: string;
  initialPhone?: string;
  onSuccess?: () => void;
}

export const TelephonyAgentDialog: React.FC<TelephonyAgentDialogProps> = ({
  open,
  onClose,
  userId,
  userName,
  initialPhone,
  onSuccess,
}) => {
  const [getProviders, { isLoading: isProvidersLoading }] = useGetTelephonyProvidersMutation();
  const [getExtensionTypes, { isLoading: isExtensionsLoading }] = useGetExtensionTypesMutation();
  const [upsertAgent, { isLoading: isSubmitting }] = useUpsertTelephonyAgentMutation();

  const [providers, setProviders] = useState<any[]>([]);
  const [extensionTypes, setExtensionTypes] = useState<any[]>([]);

  const [providerId, setProviderId] = useState<string>("");
  const [extensionTypeId, setExtensionTypeId] = useState<string>("");
  const [agentNumber, setAgentNumber] = useState<string>("");
  const [callerId, setCallerId] = useState<string>("");
  const [sameAsUserPhone, setSameAsUserPhone] = useState<boolean>(true);

  // Extract clean 10-digit phone number
  const userPhone10 = React.useMemo(() => {
    if (!initialPhone) return "";
    const digits = initialPhone.replace(/\D/g, "");
    return digits.slice(-10);
  }, [initialPhone]);

  // Load dropdown data when dialog opens
  useEffect(() => {
    if (!open) return;

    // Reset fields with initial user info
    if (userPhone10) {
      setAgentNumber(userPhone10);
      setSameAsUserPhone(true);
    } else {
      setAgentNumber("");
      setSameAsUserPhone(false);
    }
    setCallerId("");
    setProviderId("");
    setExtensionTypeId("");

    // Fetch Providers
    getProviders()
      .unwrap()
      .then((res) => {
        const list = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res?.records)
              ? res.records
              : [];
        setProviders(list);
        if (list.length === 1) {
          const singleId = list[0].id ?? list[0].provider_id ?? list[0].value;
          if (singleId !== undefined) setProviderId(String(singleId));
        }
      })
      .catch((err) => {
        console.error("Failed to load telephony providers:", err);
      });

    // Fetch Extension Types
    getExtensionTypes()
      .unwrap()
      .then((res) => {
        const list = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res?.records)
              ? res.records
              : [];
        setExtensionTypes(list);
        if (list.length === 1) {
          const singleId = list[0].id ?? list[0].extension_type_id ?? list[0].value;
          if (singleId !== undefined) setExtensionTypeId(String(singleId));
        }
      })
      .catch((err) => {
        console.error("Failed to load extension types:", err);
      });
  }, [open, getProviders, getExtensionTypes, userPhone10]);

  const handleCheckboxChange = (checked: boolean) => {
    setSameAsUserPhone(checked);
    if (checked && userPhone10) {
      setAgentNumber(userPhone10);
    }
  };

  const handleAgentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    setAgentNumber(raw);
    if (raw !== userPhone10) {
      setSameAsUserPhone(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID is missing. Cannot configure telephony agent.");
      return;
    }

    if (!providerId) {
      toast.error("Please select a Telephony Provider");
      return;
    }

    if (!extensionTypeId) {
      toast.error("Please select an Extension Type");
      return;
    }

    if (!agentNumber || agentNumber.length !== 10) {
      toast.error("Agent Number must be exactly 10 digits");
      return;
    }

    if (!callerId.trim()) {
      toast.error("Please enter a Caller ID");
      return;
    }

    try {
      await upsertAgent({
        user_id: Number(userId),
        provider_id: Number(providerId),
        agent_number: agentNumber,
        caller_id: callerId.trim(),
        extension_type_id: Number(extensionTypeId),
        is_active: 1,
      }).unwrap();

      toast.success("Telephony Agent configured successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Failed to upsert telephony agent:", err);
      const msg = err?.data?.message || err?.message || "Failed to configure telephony agent";
      toast.error(msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v && !isSubmitting) onClose(); }}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden bg-white border border-zinc-200 rounded-2xl shadow-xl">
        <div className="p-6 bg-gradient-to-r from-[#063669]/5 via-[#063669]/10 to-transparent border-b border-zinc-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#063669] text-white flex items-center justify-center shadow-sm shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <DialogTitle className="text-base font-bold text-[#063669]">
              Configure Telephony Agent
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500 mt-0.5">
              {userName ? `Set up Tata Tele business calling for ${userName}` : "Set up Tata Tele business calling for the user"}
            </DialogDescription>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Provider Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-zinc-700">
              Telephony Provider <span className="text-rose-500">*</span>
            </Label>
            <Select
              value={providerId}
              onValueChange={setProviderId}
              disabled={isProvidersLoading || isSubmitting}
            >
              <SelectTrigger className="h-10 rounded-xl border-zinc-200 bg-zinc-50/50 text-xs font-medium focus:ring-[#063669]">
                <SelectValue placeholder={isProvidersLoading ? "Loading providers..." : "Select Provider"} />
              </SelectTrigger>
              <SelectContent className="bg-white text-zinc-900 z-[99999]">
                {providers.map((p) => {
                  const id = String(p.id ?? p.provider_id ?? p.value ?? "");
                  const label = p.name || p.provider_name || p.description || p.label || `Provider #${id}`;
                  return (
                    <SelectItem key={id} value={id} className="text-xs cursor-pointer">
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Extension Type Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-zinc-700">
              Extension Type <span className="text-rose-500">*</span>
            </Label>
            <Select
              value={extensionTypeId}
              onValueChange={setExtensionTypeId}
              disabled={isExtensionsLoading || isSubmitting}
            >
              <SelectTrigger className="h-10 rounded-xl border-zinc-200 bg-zinc-50/50 text-xs font-medium focus:ring-[#063669]">
                <SelectValue placeholder={isExtensionsLoading ? "Loading extension types..." : "Select Extension Type"} />
              </SelectTrigger>
              <SelectContent className="bg-white text-zinc-900 z-[99999]">
                {extensionTypes.map((ext) => {
                  const id = String(ext.id ?? ext.extension_type_id ?? ext.value ?? "");
                  const label = ext.name || ext.extension_type || ext.type || ext.description || ext.label || `Extension #${id}`;
                  return (
                    <SelectItem key={id} value={id} className="text-xs cursor-pointer">
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Agent Number */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-zinc-700">
                Agent Number (10 Digits) <span className="text-rose-500">*</span>
              </Label>
              {userPhone10 && (
                <div className="flex items-center gap-1.5">
                  <Checkbox
                    id="same-phone"
                    checked={sameAsUserPhone}
                    onCheckedChange={(checked) => handleCheckboxChange(Boolean(checked))}
                    className="h-3.5 w-3.5 rounded border-zinc-300 data-[state=checked]:bg-[#063669] data-[state=checked]:border-[#063669]"
                  />
                  <label
                    htmlFor="same-phone"
                    className="text-[11px] font-medium text-zinc-600 cursor-pointer select-none"
                  >
                    Same as user mobile
                  </label>
                </div>
              )}
            </div>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                value={agentNumber}
                onChange={handleAgentNumberChange}
                placeholder="Enter 10-digit number"
                maxLength={10}
                disabled={isSubmitting}
                className="pl-10 h-10 rounded-xl border-zinc-200 bg-zinc-50/50 text-xs font-medium focus-visible:ring-[#063669]"
              />
            </div>
          </div>

          {/* Caller ID */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-zinc-700">
              Caller ID <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <Radio className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                value={callerId}
                onChange={(e) => setCallerId(e.target.value)}
                placeholder="e.g. 04048967890 or Business Line"
                disabled={isSubmitting}
                className="pl-10 h-10 rounded-xl border-zinc-200 bg-zinc-50/50 text-xs font-medium focus-visible:ring-[#063669]"
              />
            </div>
          </div>

          <DialogFooter className="pt-3 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 rounded-xl h-10"
            >
              Skip for Now
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#063669] hover:bg-[#052b54] text-white text-xs font-bold rounded-xl h-10 px-5 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Telephony Agent"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
