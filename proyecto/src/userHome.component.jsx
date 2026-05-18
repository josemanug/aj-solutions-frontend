import Header from "./components/header/header.component"
import { useAuth } from "./AuthContext";
import { dashboards } from "./components/dashboards";


function UserHome() {

    const { user, loading } = useAuth();

    if (loading) return <h2>Cargando...</h2>;

    const Dashboard = dashboards[user?.role];

    if (!Dashboard) {
        return (
            <div>
                <h2>No existe dashboard para el rol</h2>
                <p>Rol recibido: {user.role}</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <section className="text-center mb-5">
                <main className="container py-5">
                    <Dashboard user={user} />
                </main>
            </section >
        </>

    )
}

export default UserHome;