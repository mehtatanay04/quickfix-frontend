import { useNavigate } from "react-router-dom";
import  {useEffect} from "react";
function Home() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    },[token,navigate]);

    return (
        <div className="home-page">

            <nav className="home-navbar">
                <h2 className="home-logo">Service Booking Platform</h2>

                <div>
                    {!token && (
                        <>
                            <button
                                className="home-btn secondary"
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </button>

                            <button
                                className="home-btn primary"
                                onClick={() => navigate("/register")}
                            >
                                Sign Up
                            </button>
                        </>
                    )}

                    {token && (
                        <button
                            className="home-btn primary"
                            onClick={() => navigate("/dashboard")}
                        >
                            Go to Dashboard
                        </button>
                    )}
                </div>
            </nav>

            <div className="hero-section">
                <h1>Book Trusted Home Services</h1>
                <p>
                    Professional, verified experts for plumbing,
                    cleaning, electrical work and more.
                </p>

                {!token && (
                    <button
                        className="home-btn primary large"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>
                )}
            </div>

            <div className="home-services-preview">
                <h2>Popular Services</h2>

                <div className="services-preview-grid">
                    <div className="preview-card">Plumbing</div>
                    <div className="preview-card">Electrical</div>
                    <div className="preview-card">Cleaning</div>
                    <div className="preview-card">AC Repair</div>
                </div>
            </div>

        </div>
    );
}

export default Home;