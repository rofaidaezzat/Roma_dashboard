import { useState, useMemo, useRef, useEffect } from "react";
import { Filter, ArrowUpDown, Check } from "lucide-react";
import { Order } from "../types/order";
import { useGetOrdersQuery } from "../Redux/Services/orderApi";
import { OrdersTable } from "../components/OrdersTable";
import { TableSkeleton } from "../components/TableSkeleton";
import { ViewOrderDrawer } from "../components/ViewOrderDrawer";
import { EditOrderDrawer } from "../components/EditOrderDrawer";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "name-az" | "name-za";

function InputBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<{ additionalClassNames?: string }>) {
  return (
    <div className={`bg-white relative rounded-[10px] shrink-0 ${additionalClassNames}`}>
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function OrdersPage() {
  const { data: apiResponse, isLoading, isError } = useGetOrdersQuery();

  const orders: Order[] = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data;
  }, [apiResponse]);

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [deleteOrder, setDeleteOrder] = useState<Order | null>(null);

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o._id.toLowerCase().includes(q) ||
          o.userInfo.name.toLowerCase().includes(q) ||
          o.shippingAddress.city.toLowerCase().includes(q) ||
          o.orderStatus.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "price-low": return a.totalOrderPrice - b.totalOrderPrice;
        case "price-high": return b.totalOrderPrice - a.totalOrderPrice;
        case "name-az": return a.userInfo.name.localeCompare(b.userInfo.name);
        case "name-za": return b.userInfo.name.localeCompare(a.userInfo.name);
        default: return 0;
      }
    });

    return result;
  }, [orders, searchQuery, sortBy]);

  const totalOrders = filteredAndSortedOrders.length;
  const totalPages = Math.ceil(totalOrders / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalOrders);
  const paginatedOrders = filteredAndSortedOrders.slice(startIndex, endIndex);

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedOrders(selected ? paginatedOrders.map((o) => o._id) : []);
  };

  return (
    <>
      <div className="content-stretch flex flex-col gap-[12px] items-start justify-center p-[14.8px] relative size-full">
        {/* Header */}
        <div className="relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[0.6px] relative size-full">
            <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0">
              <div className="flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[38px] whitespace-nowrap">
                <p className="leading-[38px]">Orders</p>
              </div>
              <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#464646] text-[14px] whitespace-nowrap">
                <p className="leading-[normal]">Track, filter, update, and manage customer orders</p>
              </div>
            </div>
            <div className="content-center flex flex-wrap gap-[0px_7.99px] items-center relative shrink-0">
              <Button variant="outline" className="bg-white border-[#f4dfee] text-black font-bold text-[12.7px] px-[12.8px] py-[10px] h-auto">
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap gap-[0px_8px] items-center relative w-full">
            <InputBackgroundImage additionalClassNames="h-[36px] w-[320px]">
              <div className="absolute content-stretch flex items-center left-[10.8px] right-[10.8px] top-[10px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders, customers..."
                  className="flex-1 bg-transparent border-0 outline-none text-[12.5px] text-[#757575] font-['Inter:Regular',sans-serif]"
                />
              </div>
            </InputBackgroundImage>

            {/* Sort Dropdown */}
            <div ref={sortRef} className="relative">
              <Button
                variant="outline"
                onClick={() => { setSortOpen((v) => !v); setFilterOpen(false); }}
                className={`bg-white border-[#f4dfee] text-black font-bold text-[12.6px] px-[12.8px] h-[36px] gap-1.5 ${sortOpen ? "border-[#da3b90] ring-1 ring-[#da3b90]/20" : ""}`}
              >
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sort
              </Button>
              {sortOpen && (
                <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg border border-[#f4dfee] shadow-lg py-1 min-w-[170px]">
                  {([
                    { value: "newest", label: "Newest first" },
                    { value: "oldest", label: "Oldest first" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                    { value: "name-az", label: "Customer: A–Z" },
                    { value: "name-za", label: "Customer: Z–A" },
                  ] as { value: SortOption; label: string }[]).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#fef0f8] transition-colors ${sortBy === opt.value ? "text-[#da3b90] font-semibold" : "text-[#464646]"}`}
                    >
                      {sortBy === opt.value && <Check className="h-3.5 w-3.5 shrink-0" />}
                      {sortBy !== opt.value && <span className="w-3.5 shrink-0" />}
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 w-full overflow-auto">
          {isLoading ? (
            <TableSkeleton columns={10} />
          ) : isError ? (
            <div className="flex items-center justify-center h-48 text-red-500">Failed to load orders.</div>
          ) : (
            <OrdersTable
              orders={paginatedOrders}
              selectedOrders={selectedOrders}
              onSelectOrder={handleSelectOrder}
              onSelectAll={handleSelectAll}
              onViewOrder={setViewOrder}
              onEditOrder={setEditOrder}
              onDeleteOrder={setDeleteOrder}
            />
          )}
        </div>

        {/* Pagination */}
        <div className="h-[36px] relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap items-center justify-between relative size-full">
            <div className="content-center flex flex-wrap gap-[0px_8px] items-center relative shrink-0">
              <span className="text-[16px] font-normal text-[#464646] font-['Manrope:Regular',sans-serif]">Rows per page</span>
              <Select value={rowsPerPage.toString()} onValueChange={(v) => { setRowsPerPage(Number(v)); setCurrentPage(1); }}>
                <SelectTrigger className="bg-white border-[#f4dfee] h-[36px] w-[80px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-[16px] font-normal text-[#464646] font-['Manrope:Regular',sans-serif]">
              {totalOrders === 0 ? "0-0" : `${startIndex + 1}-${endIndex}`} of {totalOrders} orders
            </span>
            <div className="content-center flex flex-wrap gap-[0px_8px] items-center relative shrink-0">
              <Button variant="outline" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="bg-white border-[#f4dfee] text-black font-bold text-[12.9px] px-[12.8px] h-[36px]">Previous</Button>
              <span className="text-[16px] font-normal text-[#464646] font-['Manrope:Regular',sans-serif]">Page {currentPage}</span>
              <Button variant="outline" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="bg-white border-[#f4dfee] text-black font-bold text-[12.4px] px-[12.8px] h-[36px]">Next</Button>
            </div>
          </div>
        </div>
      </div>

      <ViewOrderDrawer order={viewOrder} open={!!viewOrder} onClose={() => setViewOrder(null)} onEdit={(o) => { setViewOrder(null); setEditOrder(o); }} />
      <EditOrderDrawer order={editOrder} open={!!editOrder} onClose={() => setEditOrder(null)} />
      <DeleteConfirmDialog
        open={!!deleteOrder}
        onClose={() => setDeleteOrder(null)}
        onConfirm={() => setDeleteOrder(null)}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
      />
    </>
  );
}