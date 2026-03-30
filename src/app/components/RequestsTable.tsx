import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { Request, RequestStatus } from "../types/request";
import { useState, useRef, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";

interface RequestsTableProps {
  requests: Request[];
  selectedRequests: string[];
  onToggleRequest: (id: string) => void;
  onToggleAll: () => void;
  onViewRequest: (request: Request) => void;
  onEditRequest: (request: Request) => void;
  onDeleteRequest: (request: Request) => void;
}

function StatusChip({ status }: { status: RequestStatus }) {
  const statusStyles: Record<RequestStatus, string> = {
    pending: "bg-[#fef6e7] text-[#b8860b] border-[#f9e5b8]",
    confirmed: "bg-[#e7f6ef] text-[#2d7a4f] border-[#c3e6d4]",
    cancelled: "bg-[#fef0f0] text-[#c62828] border-[#f8d7d7]",
  };

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-[6px] border ${statusStyles[status] || ""}`}>
      <span className="text-[11px] font-medium capitalize">{status}</span>
    </div>
  );
}

function KebabMenu({
  onView,
  onEdit,
  onDelete,
}: {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 hover:bg-[#fef5fc] rounded-md transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-[#8e8e8e]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-[140px] bg-white rounded-[10px] shadow-lg border border-[#f4dfee] py-1 z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
              setIsOpen(false);
            }}
            className="w-full px-3 py-2 text-left text-[12px] text-[#464646] hover:bg-[#fef5fc] flex items-center gap-2 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              setIsOpen(false);
            }}
            className="w-full px-3 py-2 text-left text-[12px] text-[#464646] hover:bg-[#fef5fc] flex items-center gap-2 transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </button>
          <div className="border-t border-[#f4dfee] my-1" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setIsOpen(false);
            }}
            className="w-full px-3 py-2 text-left text-[12px] text-[#c62828] hover:bg-[#fef0f0] flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export function RequestsTable({
  requests,
  selectedRequests,
  onToggleRequest,
  onToggleAll,
  onViewRequest,
  onEditRequest,
  onDeleteRequest,
}: RequestsTableProps) {
  const allSelected = requests.length > 0 && selectedRequests.length === requests.length;
  const someSelected = selectedRequests.length > 0 && selectedRequests.length < requests.length;

  return (
    <div className="bg-white rounded-[12px] border border-[#f9e5f2] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f9e5f2]">
              <th className="text-left p-4 w-[50px]">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onToggleAll}
                  className="border-[#767676]"
                />
              </th>
              <th className="text-left px-2 py-3 text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Name
              </th>
              <th className="text-left px-2 py-3 text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Email
              </th>
              <th className="text-left px-2 py-3 text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Phone Number
              </th>
              <th className="text-left px-2 py-3 text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Message
              </th>
              <th className="text-left px-2 py-3 text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Status
              </th>
              <th className="text-left px-2 py-3 text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase w-[80px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request._id}
                className="border-b border-[#f9e5f2] transition-colors"
                onClick={() => onViewRequest(request)}
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedRequests.includes(request._id)}
                    onCheckedChange={() => onToggleRequest(request._id)}
                    className="border-[#767676]"
                  />
                </td>
                <td className="px-2 py-4">
                  <div className="text-[14px] font-medium text-[#464646]">
                    {request.name}
                  </div>
                </td>
                <td className="px-2 py-4">
                  <div className="text-[14px] text-[#464646]">
                    {request.email}
                  </div>
                </td>
                <td className="px-2 py-4">
                  <div className="text-[14px] text-[#464646]">
                    {request.phone || "N/A"}
                  </div>
                </td>
                <td className="px-2 py-4">
                  <div className="text-[14px] text-[#464646] max-w-[300px] truncate">
                    {request.message}
                  </div>
                </td>
                <td className="px-2 py-4">
                  <StatusChip status={request.status} />
                </td>
                <td className="px-2 py-4" onClick={(e) => e.stopPropagation()}>
                  <KebabMenu
                    onView={() => onViewRequest(request)}
                    onEdit={() => onEditRequest(request)}
                    onDelete={() => onDeleteRequest(request)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {requests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[14px] font-['Inter:Regular',sans-serif] text-[#8e8e8e]">
            No requests found
          </p>
        </div>
      )}
    </div>
  );
}