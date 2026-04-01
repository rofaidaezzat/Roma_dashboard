import { X } from "lucide-react";
import { Product } from "../types/product";
import { Button } from "./ui/button";

interface ViewProductDrawerProps {
  product: Product | null;
  onClose: () => void;
  onEdit: (product: Product) => void;
}

export function ViewProductDrawer({ product, onClose, onEdit }: ViewProductDrawerProps) {
  if (!product) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-[500px] bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#f9e5f2] p-6 pb-4">
            <h2 className="text-2xl font-semibold text-[#141414]">Product Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#f9e5f2] rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[#464646]" />
            </button>
          </div>

          <div className="px-6 space-y-6">
            {/* Product Image */}
            <div className="space-y-3">
              <div className="w-full aspect-square rounded-lg overflow-hidden border border-[#f9e5f2]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
            {/* Additional Images */}
              {product.images && product.images.filter(img => img).length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {product.images.filter(img => img).map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-[#f9e5f2]">
                      <img
                        src={img}
                        alt={`${product.name} - Image ${idx + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product ID */}
            <div>
              <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-1">Product ID</div>
              <div className="text-lg font-medium text-[#141414]">{product.productId}</div>
            </div>

            {/* Product Name */}
            <div>
              <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-1">Product Name</div>
              <div className="text-xl font-semibold text-[#141414]">{product.name}</div>
            </div>

            {/* Category */}
            <div>
              <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-1">Category</div>
              <div className="text-base text-[#464646]">{product.category}</div>
            </div>

            {/* Section */}
            <div>
              <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-2">Section</div>
              <div className="flex flex-wrap gap-2">
                {product.sections.map((section, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-sm rounded-md bg-[#f5f5f5] text-[#464646] border border-[#e0e0e0]"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>

            {/* Collection */}
            <div>
              <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-2">Collection</div>
              <div className="flex flex-wrap gap-2">
                {product.collections.map((collection, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-sm rounded-md bg-[#fef5fc] text-[#8e264f] border border-[#f4cde4]"
                  >
                    {collection}
                  </span>
                ))}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-2">Colors</div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <div key={color} className="flex flex-col items-center gap-1">
                      <div
                        className="h-8 w-8 rounded-full border border-gray-200 shadow-sm"
                        style={{ backgroundColor: color === 'baby blue' ? '#89CFF0' : color === 'burgundy' ? '#800020' : color }}
                        title={color}
                      />
                      <span className="text-[10px] text-[#757575] capitalize">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Stock Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-1">Quantity</div>
                <div className="text-2xl font-bold text-[#141414]">{product.quantity}</div>
              </div>
              <div>
                <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-1">Stock Status</div>
                <span
                  className={`inline-block px-3 py-1.5 rounded-md text-sm font-medium border ${
                    product.stockStatus === "In Stock"
                      ? "bg-[#e8f5e9] text-[#2e7d32] border-[#b9debb]"
                      : "bg-[#fce8ef] text-[#c2185b] border-[#f4b8d0]"
                  }`}
                >
                  {product.stockStatus}
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-1">Price</div>
              <div className="text-3xl font-bold text-[#da3b90]">
                EGP {product.price.toLocaleString()}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-1">Description</div>
                <div className="text-base text-[#464646] leading-relaxed">{product.description}</div>
              </div>
            )}

            {/* Materials */}
            {product.materials && (
              <div>
                <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-1">Materials</div>
                <div className="text-base text-[#464646]">{product.materials}</div>
              </div>
            )}

            {/* Notes */}
            {product.notes && (
              <div>
                <div className="text-xs text-[#8e8e8e] uppercase tracking-wide mb-1">Notes</div>
                <div className="text-base text-[#464646] italic">{product.notes}</div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 pb-6 border-t border-[#f9e5f2]">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-[#f4dfee]"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  onEdit(product);
                  onClose();
                }}
                className="flex-1 bg-gradient-to-b from-[#da3b90] to-[#c3237a] hover:from-[#c32d84] hover:to-[#b01f72] text-white"
              >
                Edit Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}