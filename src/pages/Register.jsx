import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await axiosInstance.post(
                "/api/auth/register",
                { name, email, password }
            );
            navigate("/login");
        } catch (error) {
            setError("Registration failed. Please try again.");
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
                    <h2 className="auth-title">Create account</h2>
                    <p className="auth-subtitle">Book services in minutes</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleRegister}>
                    <div className="auth-field">
                        <label className="auth-label">Full Name</label>
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? <span className="auth-spinner"></span> : "Create Account"}
                    </button>
                </form>

                <div className="auth-divider"><span>or</span></div>

                <div className="auth-footer">
                    <p>Already have an account?{" "}
                        <span className="auth-link" onClick={() => navigate("/login")}>
                            Sign in
                        </span>
                    </p>
                    <p>
                        <span className="auth-link" onClick={() => navigate("/provider-register")}>
                            Register as Provider →
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;