import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProviderLogin(){

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8081/api/provider/login",
                { email, password }
            );

            localStorage.setItem("token", res.data);
            localStorage.setItem("role", "PROVIDER");

            navigate("/provider-dashboard");

        } catch (err) {
            alert("Login failed or not approved yet");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h2 className="auth-title">Provider Login</h2>

                <form className="auth-form" onSubmit={handleLogin}>

                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="auth-button" type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default ProviderLogin;