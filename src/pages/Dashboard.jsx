import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>

            {role === "ADMIN" && <AdminDashboard/>}
            {role === "USER" && <UserDashboard/>}

            <button
                onClick={handleLogout}
                style={{ marginTop: "20px" }}
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;