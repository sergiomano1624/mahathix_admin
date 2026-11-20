import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

const AdminShell = lazy(() => import("@/shared/layouts/AdminShell"));
const Dashboard = lazy(() => import("@/projects/Vibemode/dashboard/routes/Dashboard"));
const Placeholder = lazy(() => import("@/features/placeholder/Placeholder"));
const Drops = lazy(() => import("@/projects/Vibemode/drops/routes/Drops"));
const Catalog = lazy(() => import("@/projects/Vibemode/catalog/routes/Catalog"));
const AddProduct = lazy(() => import("@/projects/Vibemode/catalog/routes/AddProduct"));
const EditProduct = lazy(() => import("@/projects/Vibemode/catalog/routes/EditProduct"));
const Orders = lazy(() => import("@/projects/Vibemode/orders/routes/Orders"));
const Customers = lazy(() => import("@/projects/Vibemode/customers/routes/Customers"));
const Analytics = lazy(() => import("@/projects/Vibemode/analytics/routes/Analytics"));
const Settings = lazy(() => import("@/projects/Vibemode/settings/routes/Settings"));
const Creators = lazy(() => import("@/projects/Vibemode/creators/routes/Creators"));
const Login = lazy(() => import("@/features/auth/routes/Login"));

export const routes: RouteDefinition[] = [
  { path: "/login", component: Login },
  {
    path: "/",
    component: AdminShell,
    children: [
      { path: "/", component: Dashboard },
      { path: "/dashboard", component: Dashboard },
      { path: "/drops", component: Drops },
      { path: "/studio", component: Placeholder },
      { path: "/catalog", component: Catalog },
      { path: "/catalog/new", component: AddProduct },
      { path: "/catalog/:id/edit", component: EditProduct },
      { path: "/orders", component: Orders },
      { path: "/customers", component: Customers },
      { path: "/creators", component: Creators },
      { path: "/votes", component: Placeholder },
      { path: "/analytics", component: Analytics },
      { path: "/settings", component: Settings },
    ],
  },
  { path: "*", component: Dashboard },
];
