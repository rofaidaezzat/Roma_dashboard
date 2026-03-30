import { useState, useRef, useEffect } from "react";
import { Trash2, Eye, Edit, MoreVertical } from "lucide-react";
import { Product, StockStatus } from "../types/product";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface ProductsTableProps {
  products: Product[];
  selectedProducts: string[];
  onSelectProduct: (productId: string) => void;
  onSelectAll: (selected: boolean) => void;
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

const stockStatusColors = {
  "In Stock": "bg-[#e8f5e9] text-[#2e7d32] border-[#b9debb]",
  "Out of Stock": "bg-[#fce8ef] text-[#c2185b] border-[#f4b8d0]",
};

export function ProductsTable({
  products,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductsTableProps) {
  const allSelected = products.length > 0 && selectedProducts.length === products.length;
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
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
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                  className="border-[#767676]"
                />
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Product ID
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Image
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Name
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Category
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Section
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Collection
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Quantity
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Stock Status
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Price
              </th>
              <th className="px-2 py-3 text-left text-[11px] font-bold text-[#464646] tracking-[0.44px] uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-[#f9e5f2] transition-colors">
                <td className="px-2 py-4">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => onSelectProduct(product.id)}
                    className="border-[#767676]"
                  />
                </td>
                <td className="px-2 py-4 text-[14px] font-medium text-[#464646]">
                  {product.productId}
                </td>
                <td className="px-2 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#f9e5f2]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-2 py-4 text-[14px] text-[#464646]">
                  <div className="max-w-[200px]">
                    <div className="font-medium">{product.name}</div>
                    {product.materials && (
                      <div className="text-xs text-[#8e8e8e] mt-0.5">{product.materials}</div>
                    )}
                  </div>
                </td>
                <td className="px-2 py-4 text-[14px] text-[#464646]">
                  {product.category}
                </td>
                <td className="px-2 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {product.sections.map((section, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs rounded-md bg-[#f5f5f5] text-[#464646] border border-[#e0e0e0]"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-2 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {product.collections.slice(0, 2).map((collection, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs rounded-md bg-[#fef5fc] text-[#8e264f] border border-[#f4cde4]"
                      >
                        {collection}
                      </span>
                    ))}
                    {product.collections.length > 2 && (
                      <span className="text-xs text-[#8e264f]">
                        +{product.collections.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-2 py-4 text-[14px] text-[#464646]">
                  {product.quantity}
                </td>
                <td className="px-2 py-4">
                  <span
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border ${
                      stockStatusColors[product.stockStatus]
                    }`}
                  >
                    {product.stockStatus}
                  </span>
                </td>
                <td className="px-2 py-4 text-[14px] font-medium text-[#464646]">
                  EGP {product.price.toLocaleString()}
                </td>
                <td className="px-2 py-4">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                      className="h-8 w-8 p-0 hover:bg-[#f9e5f2] text-[#464646]"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    {openMenuId === product.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg border border-[#f4dfee] shadow-lg py-1 min-w-[120px]"
                      >
                        <button
                          onClick={() => {
                            onViewProduct(product);
                            setOpenMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#fef0f8] transition-colors text-[#464646]"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                        <button
                          onClick={() => {
                            onEditProduct(product);
                            setOpenMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#fef0f8] transition-colors text-[#464646]"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            onDeleteProduct(product);
                            setOpenMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-red-50 transition-colors text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
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