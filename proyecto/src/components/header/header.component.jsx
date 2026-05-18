import { useState } from 'react';
import styles from './header.module.css'
import logo from "./img/logo.png"
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {

    const { user, logout, loading } = useAuth()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="container-fluid bg-light py-3 border-bottom">
            <div className="d-flex justify-content-between align-items-center">

                {/* Logo + texto */}
                <div className="d-flex align-items-center gap-3">
                    <img
                        src={logo}
                        alt="Logo"
                        className={styles.rounded}
                        style={{ width: "50px", height: "auto" }}
                    />
                    {
                        loading ? null : user ? (
                            <Link to="/home">
                                <h3 className="m-0">
                                    AJ Solutions
                                </h3>
                            </Link>
                        ) : (
                            <h3 className="m-0">
                                AJ Solutions
                            </h3>
                        )
                    }



                </div>

                {/* Botones */}
                <div className="d-flex gap-2">

                    {
                        loading ? null : user ?
                            (
                                <>
                                    <span className="me-2">{user.name}</span>

                                    <button
                                        className="btn btn-outline-danger btn-lg"
                                        onClick={handleLogout}
                                    >
                                        Cerrar sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-primary btn-lg">Iniciar sesión</Link>
                                    <Link to="/register" className="btn btn-success btn-lg">Registrarse</Link>
                                </>
                            )
                    }
                </div>

            </div>
        </header>
    )
}

export default Header;