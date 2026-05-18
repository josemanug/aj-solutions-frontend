import { useEffect, useState, useMemo } from "react";
import EmpleadoCalendar from "./empleado.components/citas/empleado.component";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../main";

function EmployeeDashboard({ user }) {

    const [services, setServices] = useState([]);
    const cards = [
        {
            title: "Calendario de servicios",
            text: "Consulta los servicios programados para el día.",
            button: "Ver citas",
            path: `/empleado/citas`,
            color: "primary"
        }
    ];

    return (
        <div>
            {/* Header */}
            <section className="text-center mb-5">
                <h1 className="display-5 fw-bold">
                    Panel del empleado
                </h1>

                <p className="lead mt-3">
                    Bienvenido. Gestiona el trabajo que tengas desde aquí.
                </p>

            </section>

            {/* Cards */}
            <section className="row g-4">
                {cards.map((card, index) => (
                    <div className="col-md-6 col-lg-3" key={index}>
                        <div className="card shadow-sm h-100 border-0">
                            <div className="card-body d-flex flex-column">
                                <h3 className="card-title h5 fw-bold">
                                    {card.title}
                                </h3>
                                <p className="card-text text-muted flex-grow-1">
                                    {card.text}
                                </p>
                                <Link
                                    to={card.path}
                                    className={`btn btn-${card.color} mt-3`}>
                                    {card.button}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default EmployeeDashboard;