import { Login } from "./page/auth/Login";
import { Dashboard } from "./components/Dashboard";
import { MainLayout } from "./components/MainLayout";
import { Movimientos } from "./page/Movimientos";
import { Inventory } from "./components/Inventory";
import Reports from "./page/reports/Reports";
import { Sales } from "./page/sales/Sales";


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
            { path: '/gestionar-venta', element: <Sales /> },
        ],
    }
]