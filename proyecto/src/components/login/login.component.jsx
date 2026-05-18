import styles from './login.module.css'
import React, { useState } from "react";
import Header from "../header/header.component";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext';
import { API_BASE_URL } from "../../main";

function LoginForm() {
    const { login } = useAuth();
    const naviagate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");

    // Manejo de cambios
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMensaje("");

        try {

            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMensaje("Login correcto");
                login(data.token);
                naviagate("/home");
            } else if (response.status === 401 || response.status === 403) {
                setMensaje("Usuario o contraseña incorrectas");
            } else {
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = {};
                }
                setMensaje(errorData.message || `Error en el login (status ${response.status})`);
            }

        } catch (error) {
            console.error(error);
            setMensaje("Error de conexión con la API");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            <div className={styles.loginOverlay}>
                <div className={styles.loginModal}>

                    <h2 className={styles.loginTitle}>
                        Iniciar sesión
                    </h2>

                    <form
                        className={styles.loginForm}
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            name="username"
                            placeholder="Usuario"
                            className={styles.loginInput}
                            value={formData.username}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            className={styles.loginInput}
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className={styles.loginButton}
                            disabled={loading}
                        >
                            {loading ? "Cargando..." : "Entrar"}
                        </button>

                    </form>

                    {mensaje && <p>{mensaje}</p>}

                    <Link to="/">
                        <button className={styles.loginBackButton}>
                            Volver al inicio
                        </button>
                    </Link>

                </div>
            </div>
        </>
    );
}

export default LoginForm;