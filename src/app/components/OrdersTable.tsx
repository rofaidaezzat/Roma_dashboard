import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { Trash2, Eye, Edit, MoreVertical } from "lucide-react";
import { Order } from "../types/order";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Checkbox } from "./ui/checkbox";

interface OrdersTableProps {
  orders: Order[];
  selectedOrders: string[];
  onSelectOrder: (orderId: string) => void;
  onSelectAll: (selected: boolean) => void;
  onViewOrder: (order: Order) => void;
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (order: Order) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-[#fef6e7] text-[#9a6c0c] border-[#f4e0a8]",
  shipped: "bg-[#e3f2fd] text-[#1565c0] border-[#90caf9]",
  delivered: "bg-[#e8f5e9] text-[#2e7d32] border-[#b9debb]",
  cancelled: "bg-[#fce8ef] text-[#c2185b] border-[#f4b8d0]",
};

export function OrdersTable({
  orders,
  selectedOrders,
  onSelectOrder,
  onSelectAll,
  onViewOrder,
  onEditOrder,
  onDeleteOrder,
}: OrdersTableProps) {
  const allSelected = orders.length > 0 && selectedOrders.length === orders.length;
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openMenuId]);

  return (
    <div className="bg-white relative rounded-[12px] border border-[#f9e5f2] px-[8px] py-[0px]">
      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f9e5f2]">
              <th className="px-2 py-3 text-left w-[60px]">
                <Checkbox checked={allSelected} onCheckedChange={onSelectAll} className="border-[#767676]" />
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">Order ID</th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">Items</th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">Customer</th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">Phone</th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">Price</th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">Date</th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">Status</th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">City</th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-[#8e8e8e] text-sm">
                  No orders found.
                </td>
              </tr>
            ) : orders.map((order) => (
              <tr key={order._id} className="border-b border-[#f9e5f2] transition-colors">
                <td className="px-2 py-4">
                  <Checkbox checked={selectedOrders.includes(order._id)} onCheckedChange={() => onSelectOrder(order._id)} className="border-[#767676]" />
                </td>
                <td className="px-2 py-4 text-[13px] font-medium text-[#464646]">
                  #{order._id.slice(-6).toUpperCase()}
                </td>
                <td className="px-2 py-4 text-[14px] text-[#464646]">
                  <div className="max-w-[180px]">
                    <div className="flex items-center gap-2">
                      <img src={order.cartItems[0]?.primaryImage} alt="" className="w-8 h-8 rounded object-cover border border-[#f9e5f2]" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-[#464646]">
                          {order.cartItems.length} item{order.cartItems.length !== 1 ? "s" : ""}
                        </span>
                        {(() => {
                          const allColors = Array.from(new Set(order.cartItems.flatMap(item => item.colors || [])));
                          if (allColors.length === 0) return null;
                          return (
                            <div className="flex flex-wrap gap-1">
                              {allColors.slice(0, 3).map((color) => (
                                <div
                                  key={color}
                                  className="h-2.5 w-2.5 rounded-full border border-gray-200 shadow-sm"
                                  style={{ backgroundColor: color.toLowerCase() === 'baby blue' ? '#89CFF0' : color.toLowerCase() === 'burgundy' ? '#800020' : color }}
                                  title={color}
                                />
                              ))}
                              {allColors.length > 3 && (
                                <span className="text-[10px] text-[#8e8e8e]">+{allColors.length - 3}</span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4 text-[14px] text-[#464646]">{order.userInfo.name}</td>
                <td className="px-2 py-4 text-[14px] text-[#464646]">{order.userInfo.phone}</td>
                <td className="px-2 py-4 text-[14px] font-medium text-[#464646]">
                  EGP {order.totalOrderPrice.toLocaleString()}
                </td>
                <td className="px-2 py-4 text-[14px] text-[#464646]">
                  {format(new Date(order.createdAt), "dd MMM yyyy")}
                </td>
                <td className="px-2 py-4">
                  <span className={`px-3 py-1.5 rounded-md text-xs font-medium border ${statusColors[order.orderStatus] || statusColors.pending}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                </td>
                <td className="px-2 py-4 text-[14px] text-[#464646]">{order.shippingAddress.city}</td>
                <td className="px-2 py-4">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setOpenMenuId(openMenuId === order._id ? null : order._id)}
                      className="h-8 w-8 p-0 hover:bg-[#f9e5f2] text-[#464646]"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    {openMenuId === order._id && (
                      <div ref={menuRef} className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg border border-[#f4dfee] shadow-lg py-1 min-w-[120px]">
                        <button onClick={() => { onViewOrder(order); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#fef0f8] transition-colors text-[#464646]">
                          <Eye className="h-4 w-4" />View
                        </button>
                        <button onClick={() => { onEditOrder(order); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#fef0f8] transition-colors text-[#464646]">
                          <Edit className="h-4 w-4" />Edit
                        </button>
                        <button onClick={() => { onDeleteOrder(order); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-red-50 transition-colors text-red-600">
                          <Trash2 className="h-4 w-4" />Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}