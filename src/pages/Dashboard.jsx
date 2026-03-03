import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import Navbar from "../components/Navbar";

function Dashboard() {

    const role = localStorage.getItem("role");

    return (
        <>
            <Navbar />

            <div className="dashboard-container">

                {role === "ADMIN" && <AdminDashboard />}
                {role === "USER" && <UserDashboard />}

            </div>
        </>
    );
}

export default Dashboard;