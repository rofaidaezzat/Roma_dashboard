import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Product, StockStatus } from "../types/product";
import { Button } from "./ui/button";
import { useUpdateProductMutation } from "../Redux/Services/productApi";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface EditProductDrawerProps {
  product: Product | null;
  onClose: () => void;
}

const CATEGORIES = [
  "Prayer beads",
  "Special Pieces",
  "Bookmarks",
  "Coasters",
  "Rings",
  "Bracelets",
  "Necklaces",
  "Keychains",
  "Mugs",
  "Earrings",
  "Large Art pieces",
  "Small Art pieces",
];

const COLLECTIONS = [
  "Coastal",
  "Boho",
  "Pharaonic",
  "Natural Flowers",
  "Space",
  "Royal",
  "Afro",
  "Vintage",
];

const SECTIONS = [
  "Featured Pieces",
  "One-of-a-Kind Picks",
  "Refill Request",
  "you May Also Love",
];

export function EditProductDrawer({ product, onClose }: EditProductDrawerProps) {
  const [formData, setFormData] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<(File | null)[]>([null, null, null]);
  const [materialsStr, setMaterialsStr] = useState("");
  const [notesStr, setNotesStr] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
      setImageFile(null);
      setAdditionalFiles([null, null, null]);
      setMaterialsStr(product.materials?.join(", ") || "");
      setNotesStr(product.notes?.join(", ") || "");
      setColors(product.colors || []);
    } else {
      setFormData(null);
      setMaterialsStr("");
      setNotesStr("");
      setColors([]);
    }
  }, [product]);

  if (!formData) return null;

  const handleCategoryChange = (category: string) => {
    setFormData({ ...formData, category });
  };

  const handleSectionToggle = (section: string) => {
    const sections = formData.sections.includes(section)
      ? formData.sections.filter((s) => s !== section)
      : [...formData.sections, section];
    setFormData({ ...formData, sections });
  };

  const handleCollectionToggle = (collection: string) => {
    const collections = formData.collections.includes(collection)
      ? formData.collections.filter((c) => c !== collection)
      : [...formData.collections, collection];
    setFormData({ ...formData, collections });
  };

  const handleQuantityChange = (val: string) => {
    const quantity = val === "" ? "" : Number(val);
    const stockStatus: StockStatus = Number(quantity) > 0 ? "In Stock" : "Out of Stock";
    setFormData({ ...formData, quantity: quantity as number, stockStatus });
  };

  const handleSave = async () => {
    if (!formData) return;
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    formData.sections.forEach(s => data.append("sections", s));
    formData.collections.forEach(c => data.append("collections", c));
    colors.forEach(color => data.append("colors", color));
    data.append("stock", formData.quantity.toString());
    data.append("price", formData.price.toString());
    if (formData.description) data.append("description", formData.description);
    if (materialsStr) {
      materialsStr.split(',').forEach(m => {
        if (m.trim()) data.append("materials", m.trim());
      });
    }
    if (notesStr) {
      notesStr.split(',').forEach(n => {
        if (n.trim()) data.append("notes", n.trim());
      });
    }
    
    if (imageFile) {
      data.append("primaryImage", imageFile);
    }
    
    // Send remaining existing Cloudinary URLs as string array
    const remainingImages = (formData.images || []).filter(img => img);
    remainingImages.forEach(url => data.append("images", url));

    // Also append any newly selected file uploads
    additionalFiles.forEach(file => {
      if (file) data.append("images", file);
    });

    try {
      await updateProduct({ id: formData.id, formData: data }).unwrap();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-[600px] bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f9e5f2] p-6 pb-4">
          <h2 className="text-2xl font-semibold text-[#141414]">Edit Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f9e5f2] rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-[#464646]" />
          </button>
        </div>

        <div className="px-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">
              Basic Information
            </h3>
            <div>
              <Label className="text-xs text-[#757575]">Product ID</Label>
              <Input value={formData.productId} disabled className="mt-1 bg-gray-50" />
            </div>
            <div>
              <Label className="text-xs text-[#757575]">Product Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-[#757575]">Primary Image</Label>
              <div className="mt-1">
                <input
                  id="edit-primary-image-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, image: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full text-sm text-[#464646] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-b file:from-[#da3b90] file:to-[#c3237a] file:text-white hover:file:from-[#c32d84] hover:file:to-[#b01f72] file:cursor-pointer border border-[#f4dfee] rounded-lg p-2"
                />
              </div>
              {formData.image && (
                <div className="mt-2 w-32 h-32 rounded-lg overflow-hidden border border-[#f9e5f2] relative group">
                  <img src={formData.image} alt="Primary preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, image: "" });
                      setImageFile(null);
                      const fileInput = document.getElementById("edit-primary-image-input") as HTMLInputElement;
                      if (fileInput) fileInput.value = "";
                    }}
                    className="absolute top-1.5 right-1.5 bg-white shadow-md rounded-full p-1 hover:bg-[#ffebee] transition-colors"
                  >
                    <X className="w-4 h-4 text-[#d32f2f]" />
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-[#757575]">Additional Images (Up to 3)</Label>
              <div className="mt-1 space-y-2">
                {[0, 1, 2].map((index) => (
                  <input
                    id={`edit-additional-image-input-${index}`}
                    key={index}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData((prev) => {
                            const images = [...(prev?.images || [])];
                            images[index] = reader.result as string;
                            return { ...prev!, images };
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-sm text-[#464646] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#fef5fc] file:text-[#8e264f] file:border file:border-[#f4cde4] hover:file:bg-[#fde9f6] file:cursor-pointer border border-[#f4dfee] rounded-lg p-2"
                  />
                ))}
              </div>
              {formData.images && formData.images.filter(img => img).length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {formData.images.map((img, idx) => 
                    img ? (
                      <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-[#f9e5f2] relative group">
                        <img src={img} alt={`Additional preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setAdditionalFiles((prev) => {
                              const newFiles = [...prev];
                              newFiles[idx] = null;
                              return newFiles;
                            });
                            setFormData((prev) => {
                              if (!prev) return prev;
                              const images = [...(prev.images || [])];
                              images[idx] = "";
                              return { ...prev, images };
                            });
                            const fileInput = document.getElementById(`edit-additional-image-input-${idx}`) as HTMLInputElement;
                            if (fileInput) fileInput.value = "";
                          }}
                          className="absolute top-1.5 right-1.5 bg-white shadow-md rounded-full p-1 hover:bg-[#ffebee] transition-colors"
                        >
                          <X className="w-4 h-4 text-[#d32f2f]" />
                        </button>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">
              Classification
            </h3>
            <div>
              <Label className="text-xs text-[#757575] mb-2 block">Category</Label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-2 text-sm rounded-md border transition-colors text-left ${
                      formData.category === category
                        ? "bg-[#fef5fc] text-[#8e264f] border-[#f4cde4] font-medium"
                        : "bg-white text-[#464646] border-[#f4dfee] hover:bg-[#fef0f8]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs text-[#757575] mb-2 block">Section (Multi-select)</Label>
              <div className="grid grid-cols-2 gap-2">
                {SECTIONS.map((section) => (
                  <div key={section} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-section-${section}`}
                      checked={formData.sections.includes(section)}
                      onCheckedChange={() => handleSectionToggle(section)}
                    />
                    <Label
                      htmlFor={`edit-section-${section}`}
                      className="text-sm text-[#464646] cursor-pointer"
                    >
                      {section}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs text-[#757575] mb-2 block">
                Collection (Multi-select)
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {COLLECTIONS.map((collection) => (
                  <div key={collection} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-collection-${collection}`}
                      checked={formData.collections.includes(collection)}
                      onCheckedChange={() => handleCollectionToggle(collection)}
                    />
                    <Label
                      htmlFor={`edit-collection-${collection}`}
                      className="text-sm text-[#464646] cursor-pointer"
                    >
                      {collection}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors (optional) */}
            <div>
              <Label className="text-xs text-[#757575] mb-2 block">
                Colors <span className="font-normal text-[#aaa]">(optional)</span>
              </Label>
              <div className="flex flex-wrap gap-3">
                {['red', 'blue', 'green', 'black', 'white', 'yellow', 'orange', 'purple', 'pink', 'gray', 'brown', 'beige', 'navy', 'teal', 'maroon', 'lime', 'olive', 'cyan', 'magenta', 'gold', 'silver', 'indigo', 'violet', 'turquoise', 'lavender', 'coral', 'crimson', 'khaki', 'plum', 'salmon', 'tan', 'wheat', 'burgundy', 'baby blue'].map((color) => (
                  <div key={color}>
                    <label
                      htmlFor={`edit-color-${color}`}
                      className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-200 shadow-sm transition-all hover:scale-110 ${
                        colors.includes(color) ? 'ring-2 ring-[#da3b90] ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: color === 'baby blue' ? '#89CFF0' : color === 'burgundy' ? '#800020' : color }}
                      title={color}
                    >
                      <input
                        id={`edit-color-${color}`}
                        type="checkbox"
                        value={color}
                        checked={colors.includes(color)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setColors([...colors, color]);
                          } else {
                            setColors(colors.filter((c) => c !== color));
                          }
                        }}
                        className="sr-only"
                      />
                      {colors.includes(color) && (
                        <svg
                          className={`h-4 w-4 ${
                            ['white', 'yellow', 'beige', 'lime', 'gold', 'silver', 'wheat', 'tan', 'khaki', 'lavender', 'cyan', 'baby blue'].includes(color)
                              ? 'text-black'
                              : 'text-white'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </label>
                  </div>
                ))}
              </div>
              {colors.length > 0 && (
                <p className="mt-1.5 text-xs text-[#8e264f]">
                  Selected: {colors.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Inventory & Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">
              Inventory & Pricing
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-[#757575]">Quantity</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-[#757575]">Stock Status (Auto)</Label>
                <div className="mt-1">
                  <span
                    className={`inline-block px-3 py-2 rounded-md text-sm font-medium border ${
                      formData.stockStatus === "In Stock"
                        ? "bg-[#e8f5e9] text-[#2e7d32] border-[#b9debb]"
                        : "bg-[#fce8ef] text-[#c2185b] border-[#f4b8d0]"
                    }`}
                  >
                    {formData.stockStatus}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Label className="text-xs text-[#757575]">Price (EGP)</Label>
              <Input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value === "" ? "" as unknown as number : Number(e.target.value) })}
                className="mt-1"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">
              Additional Information
            </h3>
            <div>
              <Label className="text-xs text-[#757575]">Description</Label>
              <Textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
                rows={3}
                placeholder="Product description..."
              />
            </div>
            <div>
              <Label className="text-xs text-[#757575]">Materials</Label>
              <Input
                value={materialsStr}
                onChange={(e) => setMaterialsStr(e.target.value)}
                className="mt-1"
                placeholder="e.g., Sterling silver, pearls"
              />
            </div>
            <div>
              <Label className="text-xs text-[#757575]">Notes</Label>
              <Textarea
                value={notesStr}
                onChange={(e) => setNotesStr(e.target.value)}
                className="mt-1"
                rows={2}
                placeholder="Internal notes..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 pb-6 border-t border-[#f9e5f2] mb-0">
            <Button onClick={onClose} variant="outline" className="flex-1 border-[#f4dfee]">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-b from-[#da3b90] to-[#c3237a] hover:from-[#c32d84] hover:to-[#b01f72] text-white disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}