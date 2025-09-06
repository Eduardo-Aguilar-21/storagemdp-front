import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaBox, FaCheck, FaLock, FaUser } from "react-icons/fa";

export function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulación de login
        setTimeout(() => {
            setIsLoading(false);
            navigate("/dashboard"); // redirige al dashboard después de login
        }, 1500);
    };

    return (
        <div className="login-container">
            {/* Panel de login */}
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Iniciar sesión</h2>

                <div className="input-group">
                    <label htmlFor="username"> <FaUser /> Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username o email"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password"> <FaLock className="input-icon" /> Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>

                <button type="submit" className="login-btn" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Ingresar"}
                </button>

                <p className="login-footer">
                    ¿No tienes cuenta? <a href="/register">Regístrate</a>
                </p>
            </form>

            {/* Panel informativo */}
            <div className="info-panel">
                <FaBox className="title-icon" />
                <h2>Gestión de Almacenes</h2>
                <p>
                    Este sistema permite administrar inventarios, controlar entradas y salidas de productos,
                    optimizar el espacio de almacenamiento y generar reportes en tiempo real.
                </p>
                <ul>
                    <li><FaCheck className="list-icon" /> Control de stock</li>
                    <li><FaCheck className="list-icon" /> Registro de movimientos</li>
                    <li><FaCheck className="list-icon" /> Reportes detallados</li>
                </ul>
            </div>
        </div>
    );
}
