import { format } from "date-fns";
import { useGetStatsQuery } from "../Redux/Services/statsApi";
import type { StatsOverview, TopProduct, RecentOrder, SalesDay } from "../Redux/Services/statsApi";
import "./overview.css";

// ─── Skeleton helpers ───────────────────────────────────────────────────────
function SkeletonBox({ w = "w-full", h = "h-4" }: { w?: string; h?: string }) {
  return <div className={`${w} ${h} rounded-lg bg-[#f9e5f2] animate-pulse`} />;
}

// ─── KPI Cards ──────────────────────────────────────────────────────────────
const KPI_CONFIG: { key: keyof StatsOverview; label: string; prefix?: string; suffix?: string; trend?: string }[] = [
  { key: "totalRevenue",      label: "Total Revenue",      prefix: "EGP ", trend: "All time" },
  { key: "last7DaysRevenue",  label: "7-Day Revenue",      prefix: "EGP ", trend: "Last 7 days" },
  { key: "totalOrders",       label: "Total Orders",       trend: "All time" },
  { key: "ordersToday",       label: "Orders Today",       trend: "Today" },
  { key: "totalProducts",     label: "Total Products",     trend: "In catalogue" },
  { key: "totalCustomers",    label: "Total Customers",    trend: "Registered" },
];

function KpiGrid({ overview }: { overview: StatsOverview }) {
  return (
    <section className="kpi-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
      {KPI_CONFIG.map(({ key, label, prefix = "", trend }) => {
        const raw = overview[key];
        const value = typeof raw === "number"
          ? `${prefix}${raw.toLocaleString("en-US")}`
          : String(raw);
        return (
          <article className="kpi-card" key={key}>
            <p>{label}</p>
            <h3>{value}</h3>
            <small>{trend}</small>
          </article>
        );
      })}
    </section>
  );
}

function KpiGridSkeleton() {
  return (
    <section className="kpi-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <article className="kpi-card" key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SkeletonBox w="w-24" h="h-3" />
          <SkeletonBox w="w-32" h="h-6" />
          <SkeletonBox w="w-16" h="h-3" />
        </article>
      ))}
    </section>
  );
}

// ─── Sales Chart ─────────────────────────────────────────────────────────────
function SalesChart({ points }: { points: SalesDay[] }) {
  if (!points.length) return null;

  const revenues = points.map((p) => p.revenue);
  const max = Math.max(...revenues);
  const min = Math.min(...revenues);
  const W = 620;
  const H = 150;
  const PAD = 10;

  const toX = (i: number) =>
    points.length === 1 ? W / 2 : PAD + (i / (points.length - 1)) * (W - PAD * 2);
  const toY = (v: number) => H - PAD - ((v - min) / (max - min || 1)) * (H - PAD * 2);

  const coords = revenues.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");

  // filled area path
  const areaPath = [
    `M ${toX(0)},${H}`,
    ...revenues.map((v, i) => `L ${toX(i)},${toY(v)}`),
    `L ${toX(revenues.length - 1)},${H}`,
    "Z",
  ].join(" ");

  const first = points[0]?.date;
  const last = points[points.length - 1]?.date;

  return (
    <section className="panel">
      <h4>Sales — Last 30 Days</h4>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="30-day sales chart">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d52685" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#d52685" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGrad)" />
        <polyline points={coords} />
        {revenues.map((v, i) => (
          <circle key={i} cx={toX(i)} cy={toY(v)} r="4" fill="#d52685" stroke="#fff" strokeWidth="2" />
        ))}
      </svg>
      <div className="axis">
        <span>{first ? format(new Date(first), "dd MMM") : "—"}</span>
        <span>{last && last !== first ? format(new Date(last), "dd MMM") : ""}</span>
      </div>
    </section>
  );
}

function SalesChartSkeleton() {
  return (
    <section className="panel" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <SkeletonBox w="w-40" h="h-4" />
      <div style={{ height: 160, borderRadius: 10, background: "linear-gradient(180deg,#f9e5f2,#fdf5fb)", animation: "pulse 1.5s ease-in-out infinite" }} />
      <SkeletonBox w="w-full" h="h-3" />
    </section>
  );
}

// ─── Top Products ────────────────────────────────────────────────────────────
function TopProducts({ items }: { items: TopProduct[] }) {
  return (
    <section className="panel">
      <h4>Top Products</h4>
      {items.length === 0 && <p style={{ fontSize: 13, color: "#8e8e8e" }}>No data available.</p>}
      {items.map((item) => (
        <div className="row-between" key={item._id}>
          <div>
            <strong>{item.name}</strong>
            <p>{item.sold} sold</p>
          </div>
          <span>EGP {item.revenue.toLocaleString("en-US")}</span>
        </div>
      ))}
    </section>
  );
}

function TopProductsSkeleton() {
  return (
    <section className="panel" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <SkeletonBox w="w-28" h="h-4" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="row-between" style={{ alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
            <SkeletonBox w="w-32" h="h-3" />
            <SkeletonBox w="w-16" h="h-3" />
          </div>
          <SkeletonBox w="w-20" h="h-3" />
        </div>
      ))}
    </section>
  );
}

// ─── Status helpers ───────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  pending:   "pending",
  shipped:   "status",
  delivered: "done",
  cancelled: "cancel",
};

function statusClass(s: string) {
  return `status ${STATUS_STYLES[s] ?? "pending"}`;
}

// ─── Recent Orders Table ──────────────────────────────────────────────────────
function RecentOrdersTable({ orders }: { orders: RecentOrder[] }) {
  return (
    <section className="table-wrap">
      <h4>Recent Orders</h4>
      {orders.length === 0 && <p style={{ fontSize: 13, color: "#8e8e8e" }}>No recent orders.</p>}
      {orders.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>#{o._id.slice(-6).toUpperCase()}</td>
                <td>{o.userInfo.name}</td>
                <td>{o.userInfo.email}</td>
                <td>{o.userInfo.phone}</td>
                <td>EGP {o.totalOrderPrice.toLocaleString("en-US")}</td>
                <td>
                  <span className={statusClass(o.orderStatus)}>
                    {o.orderStatus.charAt(0).toUpperCase() + o.orderStatus.slice(1)}
                  </span>
                </td>
                <td>{format(new Date(o.createdAt), "dd MMM yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function RecentOrdersSkeleton() {
  return (
    <section className="table-wrap" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SkeletonBox w="w-36" h="h-4" />
      <table>
        <thead>
          <tr className="border-b border-[#f9e5f2]">
            {Array.from({ length: 7 }).map((_, i) => (
              <th key={i}><SkeletonBox w="w-16" h="h-3" /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, ri) => (
            <tr key={ri}>
              {Array.from({ length: 7 }).map((_, ci) => (
                <td key={ci}><SkeletonBox h="h-3" /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export function OverviewPage() {
  const { data, isLoading, isError } = useGetStatsQuery();
  const stats = data?.data;

  return (
    <div className="overview">
      {/* Header */}
      <section className="panel page-head">
        <div>
          <h2>Overview</h2>
          <p>Track orders, revenue, products, and customers for your handmade shop in one place.</p>
        </div>
      </section>

      {isError && (
        <div style={{ padding: "16px", background: "#fce8ef", border: "1px solid #f4b8d0", borderRadius: 12, color: "#c2185b", fontSize: 14 }}>
          Failed to load statistics. Please try again later.
        </div>
      )}

      {/* KPI Cards */}
      {isLoading || !stats ? <KpiGridSkeleton /> : <KpiGrid overview={stats.overview} />}

      {/* Chart + Top Products */}
      <section className="split">
        {isLoading || !stats
          ? <><SalesChartSkeleton /><TopProductsSkeleton /></>
          : (
            <>
              <SalesChart points={stats.charts.salesLast30Days} />
              <TopProducts items={stats.topProducts} />
            </>
          )}
      </section>

      {/* Recent Orders */}
      {isLoading || !stats
        ? <RecentOrdersSkeleton />
        : <RecentOrdersTable orders={stats.recentOrders} />}
    </div>
  );
}
