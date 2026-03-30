import { Order } from "../types/order";
import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface ViewOrderDrawerProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onEdit: (order: Order) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-[#fef6e7] text-[#9a6c0c] border-[#f4e0a8]",
  shipped: "bg-[#e3f2fd] text-[#1565c0] border-[#90caf9]",
  delivered: "bg-[#e8f5e9] text-[#2e7d32] border-[#b9debb]",
  cancelled: "bg-[#fce8ef] text-[#c2185b] border-[#f4b8d0]",
};

export function ViewOrderDrawer({ order, open, onClose, onEdit }: ViewOrderDrawerProps) {
  if (!order) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-2xl font-light font-['Cormorant_Garamond'] text-[#141414]">
            Order Details
          </SheetTitle>
        </SheetHeader>

        <div className="px-6 space-y-6">
          {/* Order Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-[#757575] uppercase tracking-wide">Order ID</p>
                <p className="text-lg font-semibold text-[#141414] mt-1">#{order._id.slice(-6).toUpperCase()}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-md text-xs font-medium border ${statusColors[order.orderStatus] || statusColors.pending}`}>
                {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
              </span>
            </div>
            <div>
              <p className="text-xs text-[#757575] uppercase tracking-wide">Date</p>
              <p className="text-sm text-[#464646] mt-1">{format(new Date(order.createdAt), "dd MMMM yyyy")}</p>
            </div>
            <div>
              <p className="text-xs text-[#757575] uppercase tracking-wide">Payment</p>
              <p className="text-sm text-[#464646] mt-1 capitalize">{order.paymentMethodType}</p>
            </div>
          </div>

          <Separator />

          {/* Customer Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Customer Information</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-[#757575]">Name</p>
                <p className="text-sm text-[#464646]">{order.userInfo.name}</p>
              </div>
              <div>
                <p className="text-xs text-[#757575]">Phone</p>
                <p className="text-sm text-[#464646]">{order.userInfo.phone}</p>
              </div>
              <div>
                <p className="text-xs text-[#757575]">Email</p>
                <p className="text-sm text-[#464646]">{order.userInfo.email}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Delivery Information</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-[#757575]">Address</p>
                <p className="text-sm text-[#464646]">{order.shippingAddress.address}</p>
              </div>
              <div>
                <p className="text-xs text-[#757575]">City</p>
                <p className="text-sm text-[#464646]">{order.shippingAddress.city}</p>
              </div>
              {order.shippingAddress.notes && (
                <div>
                  <p className="text-xs text-[#757575]">Delivery Notes</p>
                  <p className="text-sm text-[#464646] p-3 rounded-lg border border-[#f9e5f2] mt-1">{order.shippingAddress.notes}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Cart Items */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Ordered Items</h3>
            <div className="space-y-3">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3 py-2 border-b border-[#f9e5f2] last:border-0">
                  <img src={item.primaryImage} alt="Product" className="w-12 h-12 rounded-lg object-cover border border-[#f9e5f2]" />
                  <div className="flex-1">
                    <p className="text-xs text-[#757575]">Qty: {item.quantity}</p>
                    <p className="text-xs text-[#8e8e8e] truncate max-w-[160px]">{item.product}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#464646]">EGP {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center py-3 px-4 rounded-lg border border-[#f9e5f2]">
            <p className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Total</p>
            <p className="text-xl font-bold text-[#d52685]">EGP {order.totalOrderPrice.toLocaleString()}</p>
          </div>
        </div>

        <SheetFooter className="px-6 pb-6 mt-8 gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
          <Button onClick={() => { onClose(); onEdit(order); }} className="flex-1 bg-gradient-to-b from-[#da3b90] to-[#c3237a] hover:from-[#c32d84] hover:to-[#b01f72]">
            Edit Order
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}