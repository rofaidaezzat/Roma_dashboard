import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { toast } from "sonner";
import { Request, RequestStatus } from "../types/request";
import { useUpdateRequestStatusMutation } from "../Redux/Services/requestApi";

interface EditRequestDrawerProps {
  request: Request | null;
  isOpen: boolean;
  onClose: () => void;
}

function InputBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<{ additionalClassNames?: string }>) {
  return (
    <div className={`bg-white relative rounded-[10px] shrink-0 ${additionalClassNames}`}>
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

export function EditRequestDrawer({ request, isOpen, onClose }: EditRequestDrawerProps) {
  const [status, setStatus] = useState<RequestStatus>("pending");
  const [updateRequestStatus, { isLoading }] = useUpdateRequestStatusMutation();

  useEffect(() => {
    if (request) {
      setStatus(request.status);
    }
  }, [request]);

  if (!isOpen || !request) return null;

  const handleSave = async () => {
    try {
      await updateRequestStatus({ id: request._id, status }).unwrap();
      toast.success("Request status updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update request status.");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#f4dfee] flex items-center justify-between">
          <h2 className="text-[20px] font-['Cormorant_Garamond',sans-serif] text-[#141414]">
            Edit Request
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#fef5fc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#8e8e8e]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-4">
            {/* Status — editable */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Status
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as RequestStatus)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif] cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </InputBackgroundImage>
            </div>

            {/* Name — read-only */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Name
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="text"
                  readOnly
                  disabled
                  value={request.name}
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 outline-none text-[13px] text-[#8e8e8e] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>

            {/* Email — read-only */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Email
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="email"
                  readOnly
                  disabled
                  value={request.email}
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 outline-none text-[13px] text-[#8e8e8e] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>

            {/* Phone — read-only */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Phone Number
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="tel"
                  readOnly
                  disabled
                  value={request.phone || "N/A"}
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 outline-none text-[13px] text-[#8e8e8e] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>

            {/* Message — read-only */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Message
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <textarea
                  readOnly
                  disabled
                  rows={5}
                  value={request.message}
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 outline-none text-[13px] text-[#8e8e8e] font-['Inter:Regular',sans-serif] resize-none"
                />
              </InputBackgroundImage>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#f4dfee] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-[10px] text-[13px] font-['Inter:Regular',sans-serif] font-medium text-[#464646] bg-white border border-[#f4dfee] hover:bg-[#fef5fc] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-[10px] text-[13px] font-['Inter:Regular',sans-serif] font-medium text-white bg-[#d52685] hover:bg-[#8e264f] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}
