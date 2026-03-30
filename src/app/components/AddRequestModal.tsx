import { X, Check } from "lucide-react";
import { Request, RequestStatus } from "../types/request";
import { useState } from "react";

interface AddRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (request: Omit<Request, "id" | "createdAt">) => void;
}

function InputBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<{ additionalClassNames?: string }>) {
  return (
    <div className={`bg-white relative rounded-[10px] shrink-0 ${additionalClassNames}`}>
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

export function AddRequestModal({ isOpen, onClose, onAdd }: AddRequestModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    description: "",
    status: "Pending" as RequestStatus,
  });

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    onAdd(formData);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      description: "",
      status: "Pending",
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      description: "",
      status: "Pending",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        onClick={handleCancel}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-[16px] shadow-2xl w-full max-w-[520px] mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#f4dfee] flex items-center justify-between">
            <h2 className="text-[20px] font-['Cormorant_Garamond',sans-serif] text-[#141414]">
              Add New Request
            </h2>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-[#fef5fc] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#8e8e8e]" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[calc(100vh-220px)] overflow-y-auto">
            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                  Status
                </label>
                <InputBackgroundImage additionalClassNames="w-full">
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as RequestStatus })
                    }
                    className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif] cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </InputBackgroundImage>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                  Full Name <span className="text-[#d52685]">*</span>
                </label>
                <InputBackgroundImage additionalClassNames="w-full">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                    placeholder="Enter full name"
                  />
                </InputBackgroundImage>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                  Email <span className="text-[#d52685]">*</span>
                </label>
                <InputBackgroundImage additionalClassNames="w-full">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                    placeholder="Enter email address"
                  />
                </InputBackgroundImage>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                  Phone Number <span className="text-[#d52685]">*</span>
                </label>
                <InputBackgroundImage additionalClassNames="w-full">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                    placeholder="+20 100 000 0000"
                  />
                </InputBackgroundImage>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                  Description <span className="text-[#d52685]">*</span>
                </label>
                <InputBackgroundImage additionalClassNames="w-full">
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif] resize-none"
                    placeholder="Describe the custom request or inquiry"
                  />
                </InputBackgroundImage>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#f4dfee] flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-[10px] text-[13px] font-['Inter:Regular',sans-serif] font-medium text-[#464646] bg-white border border-[#f4dfee] hover:bg-[#fef5fc] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-[10px] text-[13px] font-['Inter:Regular',sans-serif] font-medium text-white bg-[#d52685] hover:bg-[#8e264f] transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Add Request
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
