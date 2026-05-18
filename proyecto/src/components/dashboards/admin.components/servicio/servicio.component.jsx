import React, { useEffect, useState } from "react";
import styles from "./servicio.module.css";
import { API_BASE_URL } from "../../../../main";
import Header from "../../../header/header.component";

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/servicios`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al cargar servicios");
                }

                const data = await response.json();
                setServices(Array.isArray(data) ? data : data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) return <p>Cargando servicios...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h2>Servicios disponibles</h2>

                {services.length === 0 ? (
                    <p>No hay servicios disponibles.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Duracion en minutos </th>
                            </tr>
                        </thead>

                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td>{service.id}</td>
                                    <td>{service.nombre}</td>
                                    <td>{service.descripcion}</td>
                                    <td>
                                        {service.precio != null
                                            ? `${service.precio} €`
                                            : "—"}
                                    </td>
                                    <td>{service.duracion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default ServicesList;