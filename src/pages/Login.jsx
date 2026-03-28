import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/dashboard");
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:8081/api/auth/login",
                { email, password }
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            navigate("/dashboard");
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-glow"></div>

            <div className="auth-card">
                <div className="auth-logo" onClick={() => navigate("/")}>
                    <span className="logo-mark">Q</span>
                    <span>QuickFix</span>
                </div>

                <div className="auth-header">
                    <h2 className="auth-title">Welcome back</h2>
                    <p className="auth-subtitle">Sign in to your account</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="auth-field">
                        <label className="auth-label">Email</label>
                        <input
                            className="auth-input"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? <span className="auth-spinner"></span> : "Sign In"}
                    </button>
                </form>

                <div className="auth-divider"><span>or</span></div>

                <div className="auth-footer">
                    <p>Don't have an account?{" "}
                        <span className="auth-link" onClick={() => navigate("/register")}>
                            Sign up
                        </span>
                    </p>
                    <p>
                        <span className="auth-link" onClick={() => navigate("/provider-login")}>
                            Sign in as Provider →
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;