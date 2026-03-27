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

{/* LEFT LOGO */}
<div className="navbar-logo" onClick={() => navigate("/")}>
ServiceHub
</div>

{/* RIGHT SECTION */}
<div className="navbar-right">

{role && (
<span className="navbar-role">
{role}
</span>
)}

{role ? (
<button className="logout-btn" onClick={handleLogout}>
Logout
</button>
) : (
<>
<button className="nav-btn" onClick={() => navigate("/login")}>
Login
</button>

<button className="nav-btn primary" onClick={() => navigate("/register")}>
Sign Up
</button>
</>
)}

</div>

</div>
);
}

export default Navbar;