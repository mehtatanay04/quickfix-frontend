import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="navbar">
            <h2 className="navbar-logo">Service Booking Platform</h2>

            <div className="navbar-right">
                <span className="navbar-role">Role: {role}</span>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;