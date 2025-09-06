import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    //const isLoading = false

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
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Iniciar sesión</h2>
                <div className="input-group">
                    <label htmlFor="username">Usuario</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username or email" required />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>


                <button type="submit" className="login-btn" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Ingresar"}
                </button>

                <p className="login-footer">
                    ¿No tienes cuenta? <a href="/register">Regístrate</a>
                </p>
            </form>
        </div>
    );
}