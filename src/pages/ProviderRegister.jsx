import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

function ProviderRegister() {
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await axiosInstance.post(
                "/api/provider/register",
                form
            );
            navigate("/provider-login");
        } catch (err) {
            setError("Registration failed. Please check your details.");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: "name",       label: "Full Name",   placeholder: "John Doe",          type: "text"     },
        { name: "email",      label: "Email",        placeholder: "you@example.com",   type: "email"    },
        { name: "phone",      label: "Phone Number", placeholder: "+91 98765 43210",   type: "tel"      },
        { name: "category",   label: "Service Category", placeholder: "e.g. Plumbing, Cleaning…", type: "text" },
        { name: "experience", label: "Years of Experience", placeholder: "e.g. 3",    type: "number"   },
        { name: "password",   label: "Password",     placeholder: "Min. 8 characters", type: "password" },
    ];

    return (
        <div className="auth-page">
            <div className="auth-glow"></div>

            <div className="auth-card auth-card-wide">
                <div className="auth-logo" onClick={() => navigate("/")}>
                    <span className="logo-mark">Q</span>
                    <span>QuickFix</span>
                </div>

                <div className="auth-header">
                    <div className="auth-role-badge">Provider Portal</div>
                    <h2 className="auth-title">Become a Provider</h2>
                    <p className="auth-subtitle">Register and start earning — approval usually within 24 hrs</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleRegister}>
                    <div className="auth-grid-2">
                        {fields.map((f) => (
                            <div className="auth-field" key={f.name}>
                                <label className="auth-label">{f.label}</label>
                                <input
                                    className="auth-input"
                                    name={f.name}
                                    type={f.type}
                                    placeholder={f.placeholder}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div className="auth-notice">
                        🛡 Your profile will be reviewed by our team before activation.
                    </div>

                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? <span className="auth-spinner"></span> : "Submit Application"}
                    </button>
                </form>

                <div className="auth-divider"><span>or</span></div>

                <div className="auth-footer">
                    <p>Already registered?{" "}
                        <span className="auth-link" onClick={() => navigate("/provider-login")}>
                            Sign in
                        </span>
                    </p>
                    <p>
                        <span className="auth-link" onClick={() => navigate("/register")}>
                            ← User Registration
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProviderRegister;