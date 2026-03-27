import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import ProviderDashboard from "./ProviderDashboard";
import Navbar from "../components/Navbar";

function Dashboard() {

    const role = localStorage.getItem("role");

    return (
        <>
            <Navbar />

            <div className="dashboard-container">

                {role === "ADMIN" && <AdminDashboard />}
                {role === "USER" && <UserDashboard />}
                {role === "PROVIDER" && <ProviderDashboard />}

            </div>
        </>
    );
}

export default Dashboard;