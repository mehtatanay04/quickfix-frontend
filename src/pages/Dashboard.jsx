import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import ProviderDashboard from "./ProviderDashboard";
import Navbar from "../components/Navbar";

function Dashboard() {
    const role = localStorage.getItem("role");

    return (
        <div className="dashboard-shell">
            <Navbar />
            <div className="dashboard-body">
                {role === "ADMIN" && <AdminDashboard />}
                {role === "USER" && <UserDashboard />}
                {role === "PROVIDER" && <ProviderDashboard />}
            </div>
        </div>
    );
}

export default Dashboard;