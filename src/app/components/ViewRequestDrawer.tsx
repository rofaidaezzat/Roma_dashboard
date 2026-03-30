import { X } from "lucide-react";
import { Request } from "../types/request";

interface ViewRequestDrawerProps {
  request: Request | null;
  isOpen: boolean;
  onClose: () => void;
}

function StatusChip({ status }: { status: "pending" | "confirmed" | "canceled" }) {
  const statusStyles = {
    pending: "bg-[#fef6e7] text-[#b8860b] border-[#f9e5b8]",
    confirmed: "bg-[#e7f6ef] text-[#2d7a4f] border-[#c3e6d4]",
    canceled: "bg-[#fef0f0] text-[#c62828] border-[#f8d7d7]",
  };

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-[6px] border ${statusStyles[status] || ""}`}>
      <span className="text-[11px] font-medium capitalize">{status}</span>
    </div>
  );
}

export function ViewRequestDrawer({ request, isOpen, onClose }: ViewRequestDrawerProps) {
  if (!isOpen || !request) return null;

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
            Request Details
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
          <div className="space-y-6">
            {/* Status */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#8e8e8e] mb-2">
                Status
              </label>
              <StatusChip status={request.status} />
            </div>

            {/* Name */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#8e8e8e] mb-2">
                Name
              </label>
              <p className="text-[14px] font-['Inter:Regular',sans-serif] text-[#141414]">
                {request.name}
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#8e8e8e] mb-2">
                Email
              </label>
              <p className="text-[14px] font-['Inter:Regular',sans-serif] text-[#141414]">
                {request.email}
              </p>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#8e8e8e] mb-2">
                Phone Number
              </label>
              <p className="text-[14px] font-['Inter:Regular',sans-serif] text-[#141414]">
                {request.phone || "N/A"}
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#8e8e8e] mb-2">
                Message
              </label>
              <p className="text-[14px] font-['Inter:Regular',sans-serif] text-[#464646] leading-relaxed">
                {request.message}
              </p>
            </div>

            {/* Created At */}
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#8e8e8e] mb-2">
                Submitted On
              </label>
              <p className="text-[14px] font-['Inter:Regular',sans-serif] text-[#141414]">
                {new Date(request.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#f4dfee] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-[10px] text-[13px] font-['Inter:Regular',sans-serif] font-medium text-[#464646] bg-white border border-[#f4dfee] hover:bg-[#fef5fc] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
