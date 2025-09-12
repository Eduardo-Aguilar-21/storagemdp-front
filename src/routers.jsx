import { Login } from "./page/auth/Login";
import { Dashboard } from "./components/Dashboard";
import { MainLayout } from "./components/MainLayout";
import { Movimientos } from "./page/Movimientos";
import { Inventory } from "./components/Inventory";
import Reports from "./page/reports/Reports";
import { Sales } from "./page/sales/Sales";
import Users from "./page/admin/users/Users";
import Companies from "./page/admin/company/Companies";
import AdminDashboard from "./page/AdminDashboard";



export const routes = [
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/main", component: <MainLayout /> },

    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/movimientos', element: <Movimientos /> },
            { path: '/inventario', element: <Inventory /> },
            { path: '/reportes', element: <Reports /> },
            { path: '/venta', element: <Sales /> },
            { path: '/admin', element: <AdminDashboard /> },
            { path: '/admin/users', element: <Users /> },
            { path: '/admin/empresas', element: <Companies /> },

        ],
    }
]

/*
    { path: '/admin/clients', element: <Clients /> },
            { path: '/admin/providers', element: <Providers /> },
            { path: '/admin/roles', element: <Roles /> },
            { path: '/admin/settings', element: <Settings /> },

*/