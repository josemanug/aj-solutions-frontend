import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../main";
import styles from "./listarUsuario.module.css";
import Header from "../../../header/header.component";
import { Link } from "react-router-dom";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${API_BASE_URL}/auth/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener usuarios");
            }

            const data = await response.json();

            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "¿Seguro que deseas eliminar este usuario?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `${API_BASE_URL}/auth/user/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo eliminar el usuario");
            }

            setUsers(users.filter((user) => user.id !== id));


            fetchUsers();


        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.usersTitle}>Usuarios registrados</h2>

                <Link to="/nuevoEmpleado">
                    <button className="btn btn-primary" type="submit">
                        Nuevo empleado
                    </button>
                </Link>


                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.userId}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {(user.roles ?? []).map((role, index) => (
                                            <span key={`${user.id}-${role}-${index}`} >
                                                {role}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() =>
                                                    console.log("Editar", user.id)
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteUser(user.userId)}
                                                style={{ marginLeft: "10px" }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">
                                    No hay usuarios registrados
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </>


    );
};

export default UsersList;