import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <div className="home-page">

            {/* NAVBAR */}
            <div className="home-navbar">

                <h2 className="home-logo">QuickFix</h2>

                <div>
                    <button
                        className="home-btn secondary"
                        onClick={() => navigate("/login")}
                    >
                        User Login
                    </button>

                    <button
                        className="home-btn primary"
                        onClick={() => navigate("/register")}
                    >
                        Signup
                    </button>

                    <button
                        className="home-btn secondary"
                        onClick={() => navigate("/provider-login")}
                    >
                        Provider Login
                    </button>

                    <button
                        className="home-btn primary"
                        onClick={() => navigate("/provider-register")}
                    >
                        Become a Provider
                    </button>
                </div>

            </div>


            {/* HERO */}
            <div className="hero-section">

                <h1>Home Services at Your Doorstep</h1>

                <p>
                    Book trusted professionals for cleaning, plumbing,
                    electrical, and more — anytime, anywhere.
                </p>

                <button
                    className="home-btn primary large"
                    onClick={() => navigate("/register")}
                >
                    Book a Service
                </button>

            </div>


            {/* CATEGORIES */}
            <div className="home-services-preview">

                <h2>Explore Services</h2>

                <div className="services-preview-grid">

                    <div className="preview-card">🔧 Plumbing</div>
                    <div className="preview-card">🧹 Cleaning</div>
                    <div className="preview-card">💡 Electrician</div>
                    <div className="preview-card">🛠 Appliance Repair</div>
                    <div className="preview-card">🎨 Painting</div>
                    <div className="preview-card">❄️ AC Service</div>

                </div>

            </div>


            {/* FEATURES */}
            <div className="features-section">

                <h2 className="section-title">Why Choose Us</h2>

                <div className="features-grid">

                    <div className="feature-card">
                        <h3>Verified Professionals</h3>
                        <p>All service providers are background checked and approved.</p>
                    </div>

                    <div className="feature-card">
                        <h3>Easy Booking</h3>
                        <p>Book services in just a few clicks with instant confirmation.</p>
                    </div>

                    <div className="feature-card">
                        <h3>Affordable Pricing</h3>
                        <p>Transparent pricing with no hidden charges.</p>
                    </div>

                    <div className="feature-card">
                        <h3>24/7 Support</h3>
                        <p>We are always here to help you anytime.</p>
                    </div>

                </div>

            </div>


            {/* FOOTER */}
            <div className="footer">

                <p>© 2026 QuickFix. All rights reserved.</p>

            </div>

        </div>
    );
}

export default Home;