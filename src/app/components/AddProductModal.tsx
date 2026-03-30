import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useCreateProductMutation } from "../Redux/Services/productApi";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface AddProductModalProps {
  open: boolean;
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

export function AddProductModal({ open, onClose }: AddProductModalProps) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<(File | null)[]>([null, null, null]);
  const [image, setImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number | "">(1);
  const [price, setPrice] = useState<number | "">(0);
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState("");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  const handleSectionToggle = (section: string) => {
    setSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleCollectionToggle = (collection: string) => {
    setCollections((prev) =>
      prev.includes(collection) ? prev.filter((c) => c !== collection) : [...prev, collection]
    );
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    sections.forEach(s => formData.append("sections", s));
    collections.forEach(c => formData.append("collections", c));
    formData.append("stock", quantity === "" ? "0" : quantity.toString());
    formData.append("price", price === "" ? "0" : price.toString());
    if (description) formData.append("description", description);
    if (materials) {
      materials.split(',').forEach(m => {
        if (m.trim()) formData.append("materials", m.trim());
      });
    }
    if (notes) {
      notes.split(',').forEach(n => {
        if (n.trim()) formData.append("notes", n.trim());
      });
    }
    
    if (imageFile) {
      formData.append("primaryImage", imageFile);
    }
    additionalFiles.forEach(file => {
      if (file) formData.append("images", file);
    });

    try {
      await createProduct(formData).unwrap();
      // Reset form
      setName("");
      setImageFile(null);
      setImage("");
      setAdditionalFiles([null, null, null]);
      setAdditionalImages([]);
      setCategory("");
      setSections([]);
      setCollections([]);
      setQuantity(1);
      setPrice(0);
      setDescription("");
      setMaterials("");
      setNotes("");
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#f9e5f2] p-6">
            <h2 className="text-2xl font-semibold text-[#141414]">Add New Product</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#f9e5f2] rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[#464646]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">
                Basic Information
              </h3>
              <div>
                <Label className="text-xs text-[#757575]">Product Name *</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                  placeholder="e.g., Pearl Wave Ring"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-[#757575]">Primary Image *</Label>
                <div className="mt-1">
                  <input
                    id="primary-image-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-sm text-[#464646] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-b file:from-[#da3b90] file:to-[#c3237a] file:text-white hover:file:from-[#c32d84] hover:file:to-[#b01f72] file:cursor-pointer border border-[#f4dfee] rounded-lg p-2"
                  />
                </div>
                {image && (
                  <div className="mt-2 w-32 h-32 rounded-lg overflow-hidden border border-[#f9e5f2] relative group">
                    <img src={image} alt="Primary preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImage("");
                        setImageFile(null);
                        const fileInput = document.getElementById("primary-image-input") as HTMLInputElement;
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
                      id={`additional-image-input-${index}`}
                      key={index}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setAdditionalFiles((prev) => {
                            const newFiles = [...prev];
                            newFiles[index] = file;
                            return newFiles;
                          });
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setAdditionalImages((prev) => {
                              const newImages = [...prev];
                              newImages[index] = reader.result as string;
                              return newImages;
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full text-sm text-[#464646] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#fef5fc] file:text-[#8e264f] file:border file:border-[#f4cde4] hover:file:bg-[#fde9f6] file:cursor-pointer border border-[#f4dfee] rounded-lg p-2"
                    />
                  ))}
                </div>
                {additionalImages.filter(img => img).length > 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    {additionalImages.map((img, idx) => 
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
                              setAdditionalImages((prev) => {
                                const newImages = [...prev];
                                newImages[idx] = "";
                                return newImages;
                              });
                              const fileInput = document.getElementById(`additional-image-input-${idx}`) as HTMLInputElement;
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
                <Label className="text-xs text-[#757575] mb-2 block">Category *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors text-left ${
                        category === cat
                          ? "bg-[#fef5fc] text-[#8e264f] border-[#f4cde4] font-medium"
                          : "bg-white text-[#464646] border-[#f4dfee] hover:bg-[#fef0f8]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-xs text-[#757575] mb-2 block">
                  Section (Multi-select)
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {SECTIONS.map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                      <Checkbox
                        id={`add-section-${section}`}
                        checked={sections.includes(section)}
                        onCheckedChange={() => handleSectionToggle(section)}
                      />
                      <Label
                        htmlFor={`add-section-${section}`}
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
                        id={`add-collection-${collection}`}
                        checked={collections.includes(collection)}
                        onCheckedChange={() => handleCollectionToggle(collection)}
                      />
                      <Label
                        htmlFor={`add-collection-${collection}`}
                        className="text-sm text-[#464646] cursor-pointer"
                      >
                        {collection}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inventory & Pricing */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[#141414] uppercase tracking-wide">
                Inventory & Pricing
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-[#757575]">Quantity *</Label>
                  <Input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-[#757575]">Price (EGP) *</Label>
                  <Input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="text-xs text-[#8e8e8e]">
                Stock Status: {Number(quantity) > 0 ? "In Stock" : "Out of Stock"}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>
              <div>
                <Label className="text-xs text-[#757575]">Materials</Label>
                <Input
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="mt-1"
                  placeholder="e.g., Sterling silver, pearls"
                />
              </div>
              <div>
                <Label className="text-xs text-[#757575]">Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1"
                  rows={2}
                  placeholder="Internal notes..."
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#f9e5f2] p-6 flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 border-[#f4dfee]">
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={!name || !category || Number(price) <= 0 || isLoading}
              className="flex-1 bg-gradient-to-b from-[#da3b90] to-[#c3237a] hover:from-[#c32d84] hover:to-[#b01f72] text-white disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}