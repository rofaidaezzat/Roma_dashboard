import { useState, useEffect } from "react";
import { Order } from "../types/order";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { useUpdateOrderStatusMutation } from "../Redux/Services/orderApi";
import { toast } from "sonner";

interface EditOrderDrawerProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

const ORDER_STATUSES = ["pending", "shipped", "delivered", "cancelled"];

export function EditOrderDrawer({ order, open, onClose }: EditOrderDrawerProps) {
  const [status, setStatus] = useState("");
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  useEffect(() => {
    if (order) setStatus(order.orderStatus);
  }, [order]);

  if (!order) return null;

  const handleSave = async () => {
    try {
      await updateOrderStatus({ id: order._id, orderStatus: status }).unwrap();
      toast.success("Order status updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-2xl font-light font-['Cormorant_Garamond'] text-[#141414]">
            Edit Order
          </SheetTitle>
        </SheetHeader>

        <div className="px-6 space-y-6">
          {/* Order Summary (read-only) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Order Summary</h3>
            <div className="p-4 bg-[#fef9fd] rounded-lg border border-[#f9e5f2] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#757575]">Order ID</span>
                <span className="font-medium text-[#141414]">#{order._id.slice(-6).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#757575]">Customer</span>
                <span className="text-[#464646]">{order.userInfo.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#757575]">Total</span>
                <span className="font-bold text-[#d52685]">EGP {order.totalOrderPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#757575]">Items</span>
                <span className="text-[#464646]">{order.cartItems.length} item{order.cartItems.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Status Update */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Update Status</h3>
            <div>
              <Label className="text-xs text-[#757575]">Order Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Cart Items (read-only) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Items</h3>
            <div className="space-y-2">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3 p-2 rounded-lg border border-[#f9e5f2]">
                  <img src={item.primaryImage} alt="Product" className="w-10 h-10 rounded object-cover border border-[#f9e5f2]" />
                  <div className="flex-1">
                    <p className="text-xs text-[#757575]">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-[#464646]">EGP {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="px-6 pb-6 mt-8 gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-b from-[#da3b90] to-[#c3237a] hover:from-[#c32d84] hover:to-[#b01f72] disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}