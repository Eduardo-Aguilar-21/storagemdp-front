import { Login } from "./page/auth/Login";
import { Dashboard } from "./components/Dashboard";
import { MainLayout } from "./components/MainLayout";
import { Movimientos } from "./page/Movimientos";


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
        ],
    }
]