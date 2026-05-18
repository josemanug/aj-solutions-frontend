import React, { useEffect, useState } from "react";
import styles from "./empleado.module.css";
import { API_BASE_URL } from "../../../../main";
import Header from "../../../header/header.component";

const EmployeeDailyAgenda = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        const fetchAppointments = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/citas`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener citas");
                }

                const data = await response.json();
                setAppointments(data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Agrupar por fecha
    const grouped = (appointments || []).reduce((acc, item) => {
        if (!acc[item.date]) acc[item.date] = [];
        acc[item.date].push(item);
        return acc;
    }, {});

    if (loading) {
        return <p className={styles.loading}>Cargando agenda...</p>;
    }

    return (

        <>
            <Header />
            <div className={styles.agendaContainer}>
                <h2>Agenda del Empleado</h2>

                {Object.keys(grouped).length === 0 ? (
                    <p>No hay citas programadas</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Servicio</th>
                                <th>Usuario</th>
                                <th>Hora</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Object.keys(grouped)
                                .sort((a, b) => new Date(a) - new Date(b))
                                .map((date) =>
                                    grouped[date]
                                        .sort((a, b) => a.time.localeCompare(b.time))
                                        .map((appt, index) => (
                                            <tr key={appt.id}>
                                                <td>{appt.date}</td>
                                                <td>{appt.service}</td>
                                                <td>{appt.user}</td>
                                                <td>{appt.time}</td>
                                                <td>
                                                    <span
                                                        className={`${styles.status} ${styles[appt.status?.toLowerCase()]}`}
                                                    >
                                                        {appt.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                )}
                        </tbody>
                    </table>
                )}
            </div>
        </>


    );
};

export default EmployeeDailyAgenda;