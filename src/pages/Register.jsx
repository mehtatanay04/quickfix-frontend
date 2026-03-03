import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:8081/api/auth/register",
                { name, email, password }
            );

            alert("Registration Successful!");
            navigate("/");

        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <h2 className="auth-title">Create Account</h2>

                <form className="auth-form" onSubmit={handleRegister}>

                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="auth-button" type="submit">
                        Register
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Register;