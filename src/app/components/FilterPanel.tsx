import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { format, parseISO } from "date-fns";
import { OrderStatus } from "../types/order";

interface FilterPanelProps {
  onApplyFilters: (filters: FilterState) => void;
  onReset: () => void;
  onClose?: () => void;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  statuses: OrderStatus[];
  startDate?: Date;
  endDate?: Date;
}

export function FilterPanel({ onApplyFilters, onReset, onClose }: FilterPanelProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedStatuses, setSelectedStatuses] = useState<OrderStatus[]>([]);
  const [startDateStr, setStartDateStr] = useState("");
  const [endDateStr, setEndDateStr] = useState("");

  const handleStatusToggle = (status: OrderStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      minPrice,
      maxPrice,
      statuses: selectedStatuses,
      startDate: startDateStr ? parseISO(startDateStr) : undefined,
      endDate: endDateStr ? parseISO(endDateStr) : undefined,
    });
    onClose?.();
  };

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setSelectedStatuses([]);
    setStartDateStr("");
    setEndDateStr("");
    onReset();
    onClose?.();
  };

  const setQuickDate = (days: number) => {
    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - days);
    setStartDateStr(format(start, "yyyy-MM-dd"));
    setEndDateStr(format(today, "yyyy-MM-dd"));
  };

  return (
    <div className="w-[300px] p-4 space-y-5">
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

      {/* Status Filter */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-[#141414]">Status</h4>
        <div className="flex gap-3">
          {(["Pending", "Completed", "Canceled"] as OrderStatus[]).map((status) => (
            <div key={status} className="flex items-center space-x-1.5">
              <Checkbox
                id={`status-${status}`}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => handleStatusToggle(status)}
              />
              <Label
                htmlFor={`status-${status}`}
                className="text-xs font-normal text-[#464646] cursor-pointer"
              >
                {status}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm text-[#141414]">Date Range</h4>

        {/* Quick Presets */}
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setQuickDate(0)}
            className="flex-1 text-xs h-7 px-2 rounded border border-[#f4dfee] bg-white text-[#464646] hover:bg-[#fef0f8] transition-colors"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setQuickDate(7)}
            className="flex-1 text-xs h-7 px-2 rounded border border-[#f4dfee] bg-white text-[#464646] hover:bg-[#fef0f8] transition-colors"
          >
            Last 7 Days
          </button>
          <button
            type="button"
            onClick={() => setQuickDate(30)}
            className="flex-1 text-xs h-7 px-2 rounded border border-[#f4dfee] bg-white text-[#464646] hover:bg-[#fef0f8] transition-colors"
          >
            Last 30 Days
          </button>
        </div>

        {/* Date Inputs */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Label className="text-xs text-[#464646]">Start Date</Label>
            <input
              type="date"
              value={startDateStr}
              onChange={(e) => setStartDateStr(e.target.value)}
              className="mt-1 w-full h-8 px-2 text-xs border border-[#f4dfee] rounded-md bg-white text-[#464646] outline-none focus:ring-1 focus:ring-[#da3b90]/30"
            />
          </div>
          <div className="flex-1">
            <Label className="text-xs text-[#464646]">End Date</Label>
            <input
              type="date"
              value={endDateStr}
              onChange={(e) => setEndDateStr(e.target.value)}
              className="mt-1 w-full h-8 px-2 text-xs border border-[#f4dfee] rounded-md bg-white text-[#464646] outline-none focus:ring-1 focus:ring-[#da3b90]/30"
            />
          </div>
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