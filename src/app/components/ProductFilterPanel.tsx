import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { StockStatus } from "../types/product";

interface ProductFilterPanelProps {
  onApplyFilters: (filters: ProductFilterState) => void;
  onReset: () => void;
  onClose?: () => void;
}

export interface ProductFilterState {
  minPrice: number;
  maxPrice: number;
  nameSearch: string;
  stockStatuses: StockStatus[];
  categories: string[];
  collections: string[];
  sections: string[];
}

const CATEGORIES = [
  "Rings",
  "Earrings",
  "Necklaces",
  "Bracelets",
  "Sebha",
  "Mugs",
  "Keychains",
  "Art Pieces",
  "Coasters",
  "Bookmarks",
  "Special Pieces",
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
  "Featured",
  "One of a Kind",
  "New Arrival",
  "Best Seller",
  "Recommended",
];

export function ProductFilterPanel({ onApplyFilters, onReset, onClose }: ProductFilterPanelProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [nameSearch, setNameSearch] = useState("");
  const [selectedStockStatuses, setSelectedStockStatuses] = useState<StockStatus[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const handleStockStatusToggle = (status: StockStatus) => {
    setSelectedStockStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleCollectionToggle = (collection: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collection) ? prev.filter((c) => c !== collection) : [...prev, collection]
    );
  };

  const handleSectionToggle = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      minPrice,
      maxPrice,
      nameSearch,
      stockStatuses: selectedStockStatuses,
      categories: selectedCategories,
      collections: selectedCollections,
      sections: selectedSections,
    });
    onClose?.();
  };

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setNameSearch("");
    setSelectedStockStatuses([]);
    setSelectedCategories([]);
    setSelectedCollections([]);
    setSelectedSections([]);
    onReset();
    onClose?.();
  };

  return (
    <div className="w-[350px] max-h-[600px] overflow-y-auto p-4 space-y-5">
      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-[#141414]">Price Range (EGP)</h4>
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="min-price" className="text-xs text-[#464646]">
              Min Price
            </Label>
            <Input
              id="min-price"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="mt-1 h-8 text-sm"
              placeholder="0"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="max-price" className="text-xs text-[#464646]">
              Max Price
            </Label>
            <Input
              id="max-price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-1 h-8 text-sm"
              placeholder="10000"
            />
          </div>
        </div>
      </div>

      {/* Name Search */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-[#141414]">Product Name</h4>
        <Input
          type="text"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          className="h-8 text-sm"
          placeholder="Search by product name"
        />
      </div>

      {/* Stock Status Filter */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-[#141414]">Stock Status</h4>
        <div className="flex gap-3">
          {(["In Stock", "Out of Stock"] as StockStatus[]).map((status) => (
            <div key={status} className="flex items-center space-x-1.5">
              <Checkbox
                id={`stock-${status}`}
                checked={selectedStockStatuses.includes(status)}
                onCheckedChange={() => handleStockStatusToggle(status)}
              />
              <Label
                htmlFor={`stock-${status}`}
                className="text-xs font-normal text-[#464646] cursor-pointer"
              >
                {status}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-[#141414]">Category</h4>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-1.5">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-xs font-normal text-[#464646] cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Collection Filter */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-[#141414]">Collection</h4>
        <div className="grid grid-cols-2 gap-2">
          {COLLECTIONS.map((collection) => (
            <div key={collection} className="flex items-center space-x-1.5">
              <Checkbox
                id={`collection-${collection}`}
                checked={selectedCollections.includes(collection)}
                onCheckedChange={() => handleCollectionToggle(collection)}
              />
              <Label
                htmlFor={`collection-${collection}`}
                className="text-xs font-normal text-[#464646] cursor-pointer"
              >
                {collection}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Section Filter */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-[#141414]">Section</h4>
        <div className="grid grid-cols-2 gap-2">
          {SECTIONS.map((section) => (
            <div key={section} className="flex items-center space-x-1.5">
              <Checkbox
                id={`section-${section}`}
                checked={selectedSections.includes(section)}
                onCheckedChange={() => handleSectionToggle(section)}
              />
              <Label
                htmlFor={`section-${section}`}
                className="text-xs font-normal text-[#464646] cursor-pointer"
              >
                {section}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button
          onClick={handleApply}
          className="flex-1 h-8 text-xs bg-gradient-to-b from-[#da3b90] to-[#c3237a] hover:from-[#c32d84] hover:to-[#b01f72] text-white"
        >
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1 h-8 text-xs border-[#f4dfee]">
          Reset
        </Button>
      </div>
    </div>
  );
}
