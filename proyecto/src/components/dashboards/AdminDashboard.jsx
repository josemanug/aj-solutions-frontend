import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../main";

function AdminDashboard({ user }) {

    const cards = [
        {
            title: "Calendario de servicios",
            text: "Consulta los servicios programados por día.",
            button: "Ver calendario",
            path: `/admin/calendario`,
            color: "primary"
        },
        {
            title: "Usuarios",
            text: "Gestiona empleados y clientes registrados.",
            button: "Ver usuarios",
            path: `/admin/users`,
            color: "success"
        },
        {
            title: "Reseñas",
            text: "Revisa y responde a las valoraciones de los clientes.",
            button: "Ver reseñas",
            path: `/admin/reseña`,
            color: "warning"
        },
        {
            title: "Servicios",
            text: "Administra los servicios ofrecidos por la empresa.",
            button: "Gestionar servicios",
            path: `/admin/servicio`,
            color: "info"
        }
    ];

    return (
        <div>

            {/* Header */}
            <section className="text-center mb-5">

                <h1 className="display-5 fw-bold">
                    Panel de administrador
                </h1>

                <p className="lead mt-3">
                    Bienvenido. Gestiona toda la plataforma desde aquí.
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
                                    className={`btn btn-${card.color} mt-3`}
                                >
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

export default AdminDashboard;