import { useState } from "react";
import { Order, Product } from "../types/order";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { X, Plus } from "lucide-react";

interface AddOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
}

const availableProducts = [
  "Palm Weave Basket",
  "Ceramic Candle Cup",
  "Handwoven Rug",
  "Macrame Wall Hanging",
  "Clay Pottery Vase",
  "Woven Table Runner",
  "Bamboo Serving Tray",
  "Handmade Soap Set",
  "Rattan Storage Basket",
  "Jute Placemat Set",
  "Ceramic Dinner Plate Set",
  "Wool Throw Blanket",
  "Cotton Cushion Covers",
  "Leather Journal",
  "Beaded Bookmark",
  "Terracotta Plant Pot",
  "Succulent Plant Set",
];

export function AddOrderModal({ open, onClose, onSave }: AddOrderModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Cairo");
  const [notes, setNotes] = useState("");
  const [products, setProducts] = useState<Product[]>([
    { id: "p1", name: "", price: 0, quantity: 1 },
  ]);

  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const addProduct = () => {
    setProducts([
      ...products,
      { id: `p${Date.now()}`, name: "", price: 0, quantity: 1 },
    ]);
  };

  const totalPrice = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const handleSave = () => {
    const newOrder: Order = {
      id: `${Date.now()}`,
      orderNumber: `#BR-${1000 + Math.floor(Math.random() * 9000)}`,
      products: products.filter((p) => p.name),
      customerName,
      phone,
      email: email || undefined,
      totalPrice,
      date: new Date(),
      status: "Pending",
      address,
      city,
      notes: notes || undefined,
    };
    onSave(newOrder);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCustomerName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setCity("Cairo");
    setNotes("");
    setProducts([{ id: "p1", name: "", price: 0, quantity: 1 }]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light font-['Cormorant_Garamond'] text-[#141414]">
            Add New Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Customer Information</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-[#757575]">Customer Name *</Label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1"
                  placeholder="Enter customer name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-[#757575]">Phone *</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1"
                    placeholder="+20 123 456 7890"
                  />
                </div>
                <div>
                  <Label className="text-xs text-[#757575]">Email (Optional)</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Products */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Products</h3>
              <Button
                onClick={addProduct}
                size="sm"
                variant="outline"
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
            <div className="space-y-3">
              {products.map((product, index) => (
                <div key={product.id} className="p-3 border border-[#f9e5f2] rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <Label className="text-xs text-[#757575]">Product Name</Label>
                        <Select
                          value={product.name}
                          onValueChange={(value) =>
                            handleProductChange(index, "name", value)
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableProducts.map((p) => (
                              <SelectItem key={p} value={p}>
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-[#757575]">Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={product.quantity}
                          onChange={(e) =>
                            handleProductChange(index, "quantity", Number(e.target.value))
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-[#757575]">Price (EGP)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={product.price}
                          onChange={(e) =>
                            handleProductChange(index, "price", Number(e.target.value))
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                    {products.length > 1 && (
                      <Button
                        onClick={() => removeProduct(index)}
                        variant="ghost"
                        size="sm"
                        className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {product.name && (
                    <div className="text-xs text-[#757575]">
                      Subtotal: EGP {(product.price * product.quantity).toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Delivery Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Delivery Information</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-[#757575]">Address *</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1"
                  placeholder="Street address"
                />
              </div>
              <div>
                <Label className="text-xs text-[#757575]">City *</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alexandria">Alexandria</SelectItem>
                    <SelectItem value="Cairo">Cairo</SelectItem>
                    <SelectItem value="Giza">Giza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-[#757575]">Notes (Optional)</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1"
                  rows={3}
                  placeholder="Special instructions or notes..."
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center py-3 px-4 rounded-lg border border-[#f9e5f2]">
            <p className="text-sm font-semibold text-[#141414] uppercase tracking-wide">Total</p>
            <p className="text-xl font-bold text-[#d52685]">EGP {totalPrice.toLocaleString()}</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => { resetForm(); onClose(); }} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!customerName || !phone || !address || products.filter(p => p.name).length === 0}
            className="flex-1 bg-gradient-to-b from-[#da3b90] to-[#c3237a] hover:from-[#c32d84] hover:to-[#b01f72] disabled:opacity-50"
          >
            Save Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}