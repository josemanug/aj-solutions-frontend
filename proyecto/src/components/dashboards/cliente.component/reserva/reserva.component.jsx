import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../main";
import styles from "./reserva.module.css";
import { useNavigate } from "react-router-dom";

const AppointmentBooking = ({ user }) => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Obtener servicios desde API externa
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/servicios`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al obtener servicios");
                }

                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchServices();
    }, []);

    // Guardar reserva
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedService || !date || !time) {
            setMessage("Todos los campos son obligatorios");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                `${API_BASE_URL}/reservar`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        username: user?.name,
                        serviceId: selectedService,
                        date,
                        time,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error al guardar la reserva");
            }

            setMessage("Reserva realizada correctamente");
            setSelectedService("");
            setDate("");
            setTime("");

            navigate("/home");
        } catch (error) {
            console.error(error);
            setMessage("No se pudo realizar la reserva");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>Reservar Cita</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.group}>
                        <label>Servicio</label>
                        <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                        >
                            <option value="">Selecciona un servicio</option>

                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.group}>
                        <label>Fecha</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className={styles.group}>
                        <label>Hora</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Guardando..." : "Reservar"}
                    </button>

                    {message && <p className={styles.message}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default AppointmentBooking;