import { Link } from "react-router-dom"

function GuestHome() {
    return (
        <>
            {/* Sección bienvenida */}
            <section className="text-center mb-5">
                <h1 className="display-4 fw-bold">
                    Bienvenido a AJ Solutions
                </h1>

                <p className="lead mt-4">
                    Somos una PYME comprometida con ofrecer soluciones de calidad,
                    innovación y atención personalizada para nuestros clientes.
                </p>

                <div className="d-flex justify-content-center gap-3 mt-4">
                    <Link to="/register">
                        <button className="btn btn-primary btn-lg">Comenzar</button>
                    </Link>
                    <Link to="/login" className="btn btn-outline-primary btn-lg">
                        Iniciar sesión
                    </Link>
                </div>
            </section>

            {/* Sección información */}
            <section className="row text-center mt-5">

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h2 className="card-title">
                                Experiencia
                            </h2>

                            <p className="card-text">
                                Contamos con un equipo profesional preparado para ayudarte
                                a alcanzar tus objetivos empresariales.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h2 className="card-title">
                                Calidad
                            </h2>

                            <p className="card-text">
                                Trabajamos con altos estándares para garantizar resultados
                                confiables y eficientes.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h2 className="card-title">
                                Compromiso
                            </h2>

                            <p className="card-text">
                                Nuestra prioridad es construir relaciones duraderas basadas
                                en la confianza y la satisfacción del cliente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GuestHome