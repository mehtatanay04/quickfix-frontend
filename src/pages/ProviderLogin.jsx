import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProviderLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:8081/api/provider/login",
                { email, password }
            );
            localStorage.setItem("token", res.data);
            localStorage.setItem("role", "PROVIDER");
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data || "Login failed. Please check your credentials.");
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
                    <div className="auth-role-badge">Provider Portal</div>
                    <h2 className="auth-title">Provider Sign In</h2>
                    <p className="auth-subtitle">Access your service dashboard</p>
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
                    <p>Not registered yet?{" "}
                        <span className="auth-link" onClick={() => navigate("/provider-register")}>
                            Become a Provider
                        </span>
                    </p>
                    <p>
                        <span className="auth-link" onClick={() => navigate("/login")}>
                            ← User Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProviderLogin;