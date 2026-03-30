import { createBrowserRouter, Navigate } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { OrdersPage } from "./pages/OrdersPage";
import { ProductsPage } from "./pages/ProductsPage";
import { RequestsPage } from "./pages/RequestsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { OverviewPage } from "./pages/OverviewPage";

import { LoginPage } from "./pages/LoginPage";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "requests",
        element: <RequestsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);