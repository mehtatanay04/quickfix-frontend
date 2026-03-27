import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8081/api/auth/login",
                { email, password }
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            navigate("/dashboard");

        } catch (error){
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            alert("Login Failed");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h2 className="auth-title">Login</h2>

                <form className="auth-form" onSubmit={handleLogin}>

                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={password}
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

export default Login;