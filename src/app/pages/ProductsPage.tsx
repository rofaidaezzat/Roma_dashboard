import { useState, useMemo, useRef, useEffect } from "react";
import { Filter, ArrowUpDown, Trash2, Check } from "lucide-react";
import { Product } from "../types/product";
import { useGetProductsQuery, useDeleteProductMutation } from "../Redux/Services/productApi";
import { ProductsTable } from "../components/ProductsTable";
import { TableSkeleton } from "../components/TableSkeleton";
import { ProductFilterPanel, ProductFilterState } from "../components/ProductFilterPanel";
import { ViewProductDrawer } from "../components/ViewProductDrawer";
import { EditProductDrawer } from "../components/EditProductDrawer";
import { AddProductModal } from "../components/AddProductModal";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "name-az" | "name-za" | "quantity-low" | "quantity-high";

function InputBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<{ additionalClassNames?: string }>) {
  return (
    <div className={`bg-white relative rounded-[10px] shrink-0 ${additionalClassNames}`}>
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

export function ProductsPage() {
  const { data: apiResponse, isLoading, refetch } = useGetProductsQuery();
  const [deleteProductApi] = useDeleteProductMutation();
  
  const products: Product[] = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data.map(p => ({
      ...p,
      id: p._id,
      productId: p._id.slice(-6).toUpperCase(),
      image: p.primaryImage,
      quantity: p.stock,
      stockStatus: p.stock > 0 ? "In Stock" as const : "Out of Stock" as const,
      dateAdded: new Date(p.createdAt),
    }));
  }, [apiResponse]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ProductFilterState | null>(null);

  // Custom dropdown open states (no portals)
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Drawer/Modal states
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.productId.toLowerCase().includes(query) ||
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.sections.some((s) => s.toLowerCase().includes(query)) ||
          product.collections.some((c) => c.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (filters) {
      result = result.filter((product) => {
        const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;
        const nameMatch = !filters.nameSearch || product.name.toLowerCase().includes(filters.nameSearch.toLowerCase());
        const stockMatch = filters.stockStatuses.length === 0 || filters.stockStatuses.includes(product.stockStatus);
        const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
        const collectionMatch = filters.collections.length === 0 || filters.collections.some(c => product.collections.includes(c));
        const sectionMatch = filters.sections.length === 0 || filters.sections.some(s => product.sections.includes(s));
        return priceMatch && nameMatch && stockMatch && categoryMatch && collectionMatch && sectionMatch;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.dateAdded.getTime() - a.dateAdded.getTime();
        case "oldest":
          return a.dateAdded.getTime() - b.dateAdded.getTime();
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-az":
          return a.name.localeCompare(b.name);
        case "name-za":
          return b.name.localeCompare(a.name);
        case "quantity-low":
          return a.quantity - b.quantity;
        case "quantity-high":
          return b.quantity - a.quantity;
        default:
          return 0;
      }
    });

    return result;
  }, [products, searchQuery, filters, sortBy]);

  // Pagination
  const totalProducts = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalProducts / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalProducts);
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedProducts(selected ? paginatedProducts.map((p) => p.id) : []);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    // Rely on invalidation tags to update table automatically
  };

  const handleAddProduct = (newProduct: Product) => {
    // Rely on invalidation tags to update table automatically
  };

  const handleDeleteSingle = async () => {
    if (deleteProduct) {
      try {
        await deleteProductApi(deleteProduct._id).unwrap();
        setDeleteProduct(null);
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedProducts.map(id => deleteProductApi(id).unwrap()));
      setSelectedProducts([]);
      setBulkDeleteConfirm(false);
    } catch(err) {
      console.error("Bulk delete failed", err);
    }
  };

  const handleApplyFilters = (newFilters: ProductFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(null);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="content-stretch flex flex-col gap-[12px] items-start justify-center p-[14.8px] relative size-full">
        {/* Header */}
        <div className="relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[0.6px] relative size-full">
            <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0">
              <div className="content-stretch flex flex-col items-start pb-[0.6px] relative shrink-0">
                <div className="flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[38px] whitespace-nowrap">
                  <p className="leading-[38px]">Products</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0">
                <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#464646] text-[14px] whitespace-nowrap">
                  <p className="leading-[normal]">Manage product details, stock, collections, and visibility</p>
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
              <Button
                onClick={() => setShowAddProduct(true)}
                className="bg-gradient-to-b from-[#da3b90] to-[#c3237a] hover:from-[#c32d84] hover:to-[#b01f72] border-[#cf2d84] text-white font-bold text-[12.8px] px-[12.8px] py-[10px] h-auto"
              >
                Add Product
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
                  placeholder="Search products, categories, collections..."
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
                <Filter className="h-3.5 w-3.5" />
                Filter
                {filters && <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-[#da3b90] inline-block" />}
              </Button>
              {filterOpen && (
                <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg border border-[#f4dfee] shadow-lg">
                  <ProductFilterPanel
                    onApplyFilters={handleApplyFilters}
                    onReset={handleResetFilters}
                    onClose={() => setFilterOpen(false)}
                  />
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
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sort
              </Button>
              {sortOpen && (
                <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg border border-[#f4dfee] shadow-lg py-1 min-w-[190px]">
                  {([
                    { value: "newest", label: "Newest first" },
                    { value: "oldest", label: "Oldest first" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                    { value: "name-az", label: "Name: A–Z" },
                    { value: "name-za", label: "Name: Z–A" },
                    { value: "quantity-low", label: "Quantity: Low to High" },
                    { value: "quantity-high", label: "Quantity: High to Low" },
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

            {selectedProducts.length > 0 && (
              <div className="flex gap-2 ml-auto">
                <span className="text-sm text-[#464646] font-['Manrope:Regular',sans-serif] flex items-center">
                  {selectedProducts.length} selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBulkDeleteConfirm(true)}
                  className="bg-white border-[#f4dfee] text-red-600 h-[36px] gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 w-full overflow-auto">
          {isLoading ? (
            <TableSkeleton columns={8} />
          ) : (
            <ProductsTable
              products={paginatedProducts}
              selectedProducts={selectedProducts}
              onSelectProduct={handleSelectProduct}
              onSelectAll={handleSelectAll}
              onViewProduct={setViewProduct}
              onEditProduct={setEditProduct}
              onDeleteProduct={setDeleteProduct}
            />
          )}
        </div>

        {/* Pagination */}
        <div className="h-[36px] relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap items-center justify-between relative size-full">
            <div className="content-center flex flex-wrap gap-[0px_8px] items-center relative shrink-0">
              <span className="text-[16px] font-normal text-[#464646] font-['Manrope:Regular',sans-serif]">
                Rows per page
              </span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="bg-white border-[#f4dfee] h-[36px] w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-[16px] font-normal text-[#464646] font-['Manrope:Regular',sans-serif]">
              {totalProducts === 0 ? "0-0" : `${startIndex + 1}-${endIndex}`} of {totalProducts} products
            </span>
            <div className="content-center flex flex-wrap gap-[0px_8px] items-center relative shrink-0">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="bg-white border-[#f4dfee] text-black font-bold text-[12.9px] px-[12.8px] h-[36px]"
              >
                Previous
              </Button>
              <span className="text-[16px] font-normal text-[#464646] font-['Manrope:Regular',sans-serif]">
                Page {currentPage}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="bg-white border-[#f4dfee] text-black font-bold text-[12.4px] px-[12.8px] h-[36px]"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawers and Modals */}
      <ViewProductDrawer
        product={viewProduct}
        onClose={() => setViewProduct(null)}
        onEdit={setEditProduct}
      />

      <EditProductDrawer
        product={editProduct}
        onClose={() => setEditProduct(null)}
      />

      <AddProductModal
        open={showAddProduct}
        onClose={() => setShowAddProduct(false)}
      />

      <DeleteConfirmDialog
        open={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDeleteSingle}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />

      <DeleteConfirmDialog
        open={bulkDeleteConfirm}
        onClose={() => setBulkDeleteConfirm(false)}
        onConfirm={handleBulkDelete}
        title="Delete Selected Products"
        description={`Are you sure you want to delete ${selectedProducts.length} selected product${selectedProducts.length !== 1 ? 's' : ''}? This action cannot be undone.`}
      />
    </>
  );
}
