import { useState, useMemo, useRef, useEffect } from "react";
import { Filter, ArrowUpDown, Trash2, Check } from "lucide-react";
import { Request, RequestStatus } from "../types/request";
import { RequestsTable } from "../components/RequestsTable";
import { TableSkeleton } from "../components/TableSkeleton";
import { ViewRequestDrawer } from "../components/ViewRequestDrawer";
import { EditRequestDrawer } from "../components/EditRequestDrawer";
import { Button } from "../components/ui/button";
import { 
  useGetRequestsQuery, 
  useDeleteRequestMutation,
} from "../Redux/Services/requestApi";

type SortOption = "newest" | "oldest" | "name-asc" | "name-desc" | "status-asc";

function InputBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<{ additionalClassNames?: string }>) {
  return (
    <div className={`bg-white relative rounded-[10px] shrink-0 ${additionalClassNames}`}>
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

export function RequestsPage() {
  const { data: requestData, isLoading } = useGetRequestsQuery();
  const requests = requestData?.data?.data || [];
  
  const [deleteRequestMutation] = useDeleteRequestMutation();

  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [viewRequest, setViewRequest] = useState<Request | null>(null);
  const [editRequest, setEditRequest] = useState<Request | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAndSortedRequests = useMemo(() => {
    let filtered = requests;

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name?.toLowerCase().includes(query) ||
          r.email?.toLowerCase().includes(query) ||
          r.phone?.toLowerCase().includes(query) ||
          r.message?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "status-asc":
        sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }

    return sorted;
  }, [requests, searchQuery, statusFilter, sortBy]);

  const handleToggleRequest = (id: string) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((reqId) => reqId !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedRequests.length === filteredAndSortedRequests.length && filteredAndSortedRequests.length > 0) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(filteredAndSortedRequests.map((r) => r._id));
    }
  };

  const handleDeleteRequest = async (request: Request) => {
    if (window.confirm(`Are you sure you want to delete the request from ${request.name}?`)) {
      try {
        await deleteRequestMutation(request._id).unwrap();
        setSelectedRequests((prev) => prev.filter((id) => id !== request._id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedRequests.length} request(s)?`)) {
      try {
        await Promise.all(selectedRequests.map((id) => deleteRequestMutation(id).unwrap()));
        setSelectedRequests([]);
        setBulkDeleteConfirm(false);
      } catch (err) {
        console.error(err);
      }
    }
  };


  return (
    <>
      <div className="content-stretch flex flex-col gap-[12px] items-start justify-start p-[14.8px] relative size-full bg-[#ffffff00]">
        {/* Header */}
        <div className="relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[0.6px] relative size-full">
            <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0">
              <div className="content-stretch flex flex-col items-start pb-[0.6px] relative shrink-0">
                <div className="flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[38px] whitespace-nowrap">
                  <p className="leading-[38px]">Requests</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0">
                <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#464646] text-[14px] whitespace-nowrap">
                  <p className="leading-[normal]">Manage custom and out-of-stock requests from customers</p>
                </div>
              </div>
            </div>
            <div className="content-center flex flex-wrap gap-[0px_7.99px] items-center relative shrink-0">
              <Button
                variant="outline"
                className="bg-white border-[#f4dfee] text-black font-bold text-[12.7px] px-[12.8px] py-[10px] h-auto"
              >
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
                  placeholder="Search requests, names, emails..."
                  className="flex-1 bg-transparent border-0 outline-none text-[12.5px] text-[#757575] font-['Inter:Regular',sans-serif]"
                />
              </div>
            </InputBackgroundImage>
            
            {/* Filter Dropdown */}
            <div ref={filterRef} className="relative">
              <Button
                variant="outline"
                onClick={() => { setFilterOpen((v) => !v); setSortOpen(false); }}
                className={`bg-white border-[#f4dfee] text-black font-bold text-[12.6px] px-[12.8px] h-[36px] gap-1.5 ${filterOpen ? "border-[#da3b90] ring-1 ring-[#da3b90]/20" : ""}`}
              >
                <Filter className="w-3.5 h-3.5" />
                Status
              </Button>

              {filterOpen && (
                <div className="absolute left-0 top-full mt-2 w-[180px] bg-white rounded-[10px] shadow-lg border border-[#f4dfee] py-2 z-50">
                  <button
                    onClick={() => { setStatusFilter("all"); setFilterOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-[12.5px] hover:bg-[#fef5fc] transition-colors ${statusFilter === "all" ? "text-[#d52685] font-medium" : "text-[#464646]"}`}
                  >
                    All Statuses
                  </button>
                  <button
                    onClick={() => { setStatusFilter("pending"); setFilterOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-[12.5px] hover:bg-[#fef5fc] transition-colors ${statusFilter === "pending" ? "text-[#d52685] font-medium" : "text-[#464646]"}`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => { setStatusFilter("confirmed"); setFilterOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-[12.5px] hover:bg-[#fef5fc] transition-colors ${statusFilter === "confirmed" ? "text-[#d52685] font-medium" : "text-[#464646]"}`}
                  >
                    Confirmed
                  </button>
                  <button
                    onClick={() => { setStatusFilter("cancelled"); setFilterOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-[12.5px] hover:bg-[#fef5fc] transition-colors ${statusFilter === "cancelled" ? "text-[#d52685] font-medium" : "text-[#464646]"}`}
                  >
                    Cancelled
                  </button>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div ref={sortRef} className="relative">
              <Button
                variant="outline"
                onClick={() => { setSortOpen((v) => !v); setFilterOpen(false); }}
                className={`bg-white border-[#f4dfee] text-black font-bold text-[12.6px] px-[12.8px] h-[36px] gap-1.5 ${sortOpen ? "border-[#da3b90] ring-1 ring-[#da3b90]/20" : ""}`}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort
              </Button>

              {sortOpen && (
                <div className="absolute left-0 top-full mt-2 w-[180px] bg-white rounded-[10px] shadow-lg border border-[#f4dfee] py-2 z-50">
                  <button
                    onClick={() => { setSortBy("newest"); setSortOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-[12.5px] hover:bg-[#fef5fc] transition-colors ${sortBy === "newest" ? "text-[#d52685] font-medium" : "text-[#464646]"}`}
                  >
                    Newest first
                  </button>
                  <button
                    onClick={() => { setSortBy("oldest"); setSortOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-[12.5px] hover:bg-[#fef5fc] transition-colors ${sortBy === "oldest" ? "text-[#d52685] font-medium" : "text-[#464646]"}`}
                  >
                    Oldest first
                  </button>
                  <button
                    onClick={() => { setSortBy("name-asc"); setSortOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-[12.5px] hover:bg-[#fef5fc] transition-colors ${sortBy === "name-asc" ? "text-[#d52685] font-medium" : "text-[#464646]"}`}
                  >
                    Name A–Z
                  </button>
                  <button
                    onClick={() => { setSortBy("name-desc"); setSortOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-[12.5px] hover:bg-[#fef5fc] transition-colors ${sortBy === "name-desc" ? "text-[#d52685] font-medium" : "text-[#464646]"}`}
                  >
                    Name Z–A
                  </button>
                  <button
                    onClick={() => { setSortBy("status-asc"); setSortOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-[12.5px] hover:bg-[#fef5fc] transition-colors ${sortBy === "status-asc" ? "text-[#d52685] font-medium" : "text-[#464646]"}`}
                  >
                    Status A–Z
                  </button>
                </div>
              )}
            </div>

            {/* Delete Selected */}
            {selectedRequests.length > 0 && (
              <Button
                variant="outline"
                onClick={() => setBulkDeleteConfirm(true)}
                className="bg-white border-[#f4dfee] text-[#c62828] hover:bg-[#fef0f0] font-bold text-[12.6px] px-[12.8px] h-[36px] gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Selected ({selectedRequests.length})
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="relative shrink-0 w-full px-[8px] py-[0px]">
          {isLoading ? (
            <TableSkeleton columns={7} />
          ) : (
            <RequestsTable
              requests={filteredAndSortedRequests}
              selectedRequests={selectedRequests}
              onToggleRequest={handleToggleRequest}
              onToggleAll={handleToggleAll}
              onViewRequest={setViewRequest}
              onEditRequest={setEditRequest}
              onDeleteRequest={handleDeleteRequest}
            />
          )}
        </div>
      </div>

      {/* Modals and Drawers */}
      <ViewRequestDrawer
        request={viewRequest}
        isOpen={!!viewRequest}
        onClose={() => setViewRequest(null)}
      />

      <EditRequestDrawer
        request={editRequest}
        isOpen={!!editRequest}
        onClose={() => setEditRequest(null)}
      />

      {/* Bulk Delete Confirmation */}
      {bulkDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-[16px] shadow-2xl w-full max-w-[420px] mx-4 p-6">
            <h3 className="text-[18px] font-['Cormorant_Garamond',sans-serif] text-[#141414] mb-2">
              Delete Selected Requests
            </h3>
            <p className="text-[13px] font-['Inter:Regular',sans-serif] text-[#464646] mb-6">
              Are you sure you want to delete {selectedRequests.length} request(s)? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setBulkDeleteConfirm(false)}
                className="px-5 py-2.5 rounded-[10px] text-[13px] font-['Inter:Regular',sans-serif] font-medium text-[#464646] bg-white border border-[#f4dfee] hover:bg-[#fef5fc] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSelected}
                className="px-5 py-2.5 rounded-[10px] text-[13px] font-['Inter:Regular',sans-serif] font-medium text-white bg-[#c62828] hover:bg-[#a52020] transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
