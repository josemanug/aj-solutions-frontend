import styles from "./registerEmpleado.module.css"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../../../../main";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        fullName: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const newErrors = {};

        // Email
        if (!formData.email) {
            newErrors.email = "El email es obligatorio";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Formato de email inválido";
        }

        // Username
        if (!formData.username.trim()) {
            newErrors.username = "El nombre de usuario es obligatorio";
        }

        // Password
        if (!formData.password.trim()) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (formData.password.length < 6) {
            newErrors.password = "Debe tener al menos 6 caracteres";
        }

        // Full name
        if (!formData.fullName.trim()) {
            newErrors.fullName = "El nombre completo es obligatorio";
        }

        // Phone (9 digits)
        if (!formData.phone) {
            newErrors.phone = "El teléfono es obligatorio";
        } else if (!/^\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Debe contener exactamente 9 dígitos";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setServerError(null);
        setSuccess(false);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/registerEmpleado`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Error al registrar usuario");
            }

            setSuccess(true);
            setFormData({
                email: "",
                username: "",
                password: "",
                fullName: "",
                phone: ""
            });
        } catch (err) {
            setServerError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div className={styles.container}>
                <h2 className={styles.title}>Registro de usuario</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}

                    <input
                        className={styles.input}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className={styles.error}>{errors.username}</p>}

                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className={styles.error}>{errors.password}</p>}

                    <input
                        className={styles.input}
                        type="text"
                        name="fullName"
                        placeholder="Nombre completo"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}

                    <input
                        className={styles.input}
                        type="text"
                        name="phone"
                        placeholder="Teléfono (9 dígitos)"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <p className={styles.error}>{errors.phone}</p>}

                    <button className={styles.button} type="submit" disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>

                    {success && (
                        <p className={{ ...styles.message, color: "green" }}>
                            Usuario registrado correctamente
                        </p>
                    )}

                    {serverError && (
                        <p className={{ ...styles.message, color: "red" }}>
                            {serverError}
                        </p>
                    )}
                </form>

                <Link to="/admin/users">
                    <button className={styles.loginBackButton}>
                        Volver atras
                    </button>
                </Link>
            </div>
        </>

    );
}