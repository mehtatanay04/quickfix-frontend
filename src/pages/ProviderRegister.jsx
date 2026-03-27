import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProviderRegister() {

    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            await axios.post(
                "http://localhost:8081/api/provider/register",
                form
            );

            alert("Registered! Wait for admin approval.");
            navigate("/provider-login");

        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <h2 className="auth-title">Provider Register</h2>

                <input className="auth-input" name="name" placeholder="Name" onChange={handleChange} />
                <input className="auth-input" name="email" placeholder="Email" onChange={handleChange} />
                <input className="auth-input" name="phone" placeholder="Phone" onChange={handleChange} />
                <input className="auth-input" name="category" placeholder="Category" onChange={handleChange} />
                <input className="auth-input" name="experience" placeholder="Experience" onChange={handleChange} />
                <input className="auth-input" type="password" name="password" placeholder="Password" onChange={handleChange} />

                <button className="auth-button" onClick={handleRegister}>
                    Register
                </button>

            </div>
        </div>
    );
}

export default ProviderRegister;