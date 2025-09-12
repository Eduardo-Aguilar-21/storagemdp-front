import { useState } from "react";
import { Nav } from "react-bootstrap";
import {
    FaBars,
    FaHome,
    FaChartBar,
    FaBell,
    FaChartPie,
    FaWallet,
    FaSignOutAlt,
    FaMoon,
    FaSun,
    FaCog,
    FaTruckLoading,
    FaUserCircle,
    FaTags,
    FaTruck,
    FaCashRegister,
    FaExclamationTriangle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export function Sidebar() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { dark, setDark } = useTheme();

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""} ${dark ? "dark" : ""}`}>
            <div className="sidebar-header d-flex justify-content-between align-items-center p-2">
                <span className="logo-text">Gestión de Almacenes</span>
                <button
                    className="btn btn-sm btn-toggle"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <FaBars />
                </button>
            </div>

            <Nav className="flex-column sidebar-menu">
                <Nav.Link href="/dashboard">
                    <FaHome className="icon" />
                    <span className="text">Dashboard</span>
                </Nav.Link>

                <Nav.Link href="/ventas">
                    <FaWallet className="icon" />
                    <span className="text">Gestionar Venta</span>
                </Nav.Link>

                <Nav.Link href="/compras">
                    <FaTruckLoading className="icon" />
                    <span className="text">Ingresos a Inventario</span>
                </Nav.Link>

                <Nav.Link href="/inventario">
                    <FaChartBar className="icon" />
                    <span className="text">Inventario</span>
                </Nav.Link>

                <Nav.Link href="/movimientos">
                    <FaBell className="icon" />
                    <span className="text">Movimientos</span>
                </Nav.Link>

                <Nav.Link href="/promociones">
                    <FaTags className="icon" />
                    <span className="text">Promociones y Descuentos</span>
                </Nav.Link>

                <Nav.Link href="/logistica">
                    <FaTruck className="icon" />
                    <span className="text">Logística</span>
                </Nav.Link>

                <Nav.Link href="/finanzas">
                    <FaCashRegister className="icon" />
                    <span className="text">Cajas y Finanzas</span>
                </Nav.Link>

                <Nav.Link href="/alertas">
                    <FaExclamationTriangle className="icon" />
                    <span className="text">Notificaciones y Alertas</span>
                </Nav.Link>

                <Nav.Link href="/reportes">
                    <FaChartPie className="icon" />
                    <span className="text">Reportes</span>
                </Nav.Link>

                <Nav.Link href="/admin">
                    <FaCog className="icon" />
                    <span className="text">Administración</span>
                </Nav.Link>

                <Nav.Link href="/perfil">
                    <FaUserCircle className="icon" />
                    <span className="text">Perfil</span>
                </Nav.Link>
            </Nav>

            <div className="sidebar-footer mt-auto p-2 d-flex flex-column gap-2">
                <button
                    className="btn btn-outline-danger d-flex align-items-center"
                    onClick={() => navigate("/login")}
                >
                    <FaSignOutAlt className="icon me-2" />
                    Logout
                </button>
                <button
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
                    onClick={() => setDark(!dark)}
                >
                    <span>{dark ? <FaSun /> : <FaMoon />}</span>
                    <span className="ms-2">{dark ? "Light Mode" : "Dark Mode"}</span>
                </button>
            </div>
        </div>
    );
}
