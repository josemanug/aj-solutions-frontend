import { Link } from "react-router-dom";

function ClientDashboard({ user }) {

    const options = [
        {
            title: "Reservar servicio",
            text: "Solicita nuevos servicios de forma rápida y sencilla.",
            button: "Reservar",
            path: "/cliente/reserva",
            color: "primary"
        },
        {
            title: "Pagar servicio",
            text: "Permite realizar el pago del servicio recibido.",
            button: "Pagar ahora",
            path: "/cliente/pago",
            color: "success"
        },
        {
            title: "Historial de servicios",
            text: "Accede al historial completo de servicios realizados.",
            button: "Ver historial",
            path: "/cliente/historial",
            color: "warning"
        },
        {
            title: "Reseñas",
            text: "Valora los servicios recibidos y consulta tus reseñas.",
            button: "Ir a reseñas",
            path: "/cliente/reseña",
            color: "info"
        }
    ];

    return (
        <div>

            {/* Bienvenida */}
            <section className="text-center mb-5">

                <h1 className="display-5 fw-bold">
                    Bienvenido!!
                </h1>
                <p className="lead mt-3">
                    Gestiona tus servicios y reservas desde tu panel personal.
                </p>

            </section>

            {/* Tarjetas */}
            <section className="row g-4">
                {options.map((option, index) => (
                    <div className="col-md-6 col-lg-3" key={index}>
                        <div className="card shadow-sm h-100 border-0">
                            <div className="card-body d-flex flex-column">
                                <h3 className="card-title h5 fw-bold">
                                    {option.title}
                                </h3>
                                <p className="card-text text-muted flex-grow-1">
                                    {option.text}
                                </p>
                                <Link
                                    to={option.path}
                                    className={`btn btn-${option.color} mt-3`}
                                >
                                    {option.button}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default ClientDashboard;