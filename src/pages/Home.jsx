import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const services = [
        { icon: "🔧", label: "Plumbing", desc: "Pipes, leaks & fixtures" },
        { icon: "🧹", label: "Cleaning", desc: "Deep & regular cleaning" },
        { icon: "💡", label: "Electrician", desc: "Wiring & installations" },
        { icon: "🛠", label: "Appliance Repair", desc: "All brands serviced" },
        { icon: "🎨", label: "Painting", desc: "Interior & exterior" },
        { icon: "❄️", label: "AC Service", desc: "Service & installation" },
    ];

    const features = [
        {
            icon: "✦",
            title: "Verified Professionals",
            desc: "All service providers are background checked and approved.",
        },
        {
            icon: "⚡",
            title: "Easy Booking",
            desc: "Book services in just a few clicks with instant confirmation.",
        },
        {
            icon: "💰",
            title: "Affordable Pricing",
            desc: "Transparent pricing with no hidden charges.",
        },
        {
            icon: "🛡",
            title: "24/7 Support",
            desc: "We are always here to help you anytime.",
        },
    ];

    return (
        <div className="home-page">

            {/* NAVBAR */}
            <nav className="home-navbar">
                <div className="navbar-inner">
                    <div className="home-logo">
                        <span className="logo-mark">Q</span>
                        <span>QuickFix</span>
                    </div>
                    <div className="nav-actions">
                        <button className="nav-btn ghost" onClick={() => navigate("/login")}>
                            User Login
                        </button>
                        <button className="nav-btn ghost" onClick={() => navigate("/provider-login")}>
                            Provider Login
                        </button>
                        <button className="nav-btn outline" onClick={() => navigate("/provider-register")}>
                            Become a Provider
                        </button>
                        <button className="nav-btn solid" onClick={() => navigate("/register")}>
                            Sign Up Free
                        </button>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero-section">
                <div className="hero-bg-grid"></div>
                <div className="hero-glow"></div>
                <div className="hero-content">
                    <div className="hero-badge">🏠 Trusted by 50,000+ homeowners</div>
                    <h1 className="hero-title">
                        Home Services,<br />
                        <span className="hero-accent">Instantly Booked.</span>
                    </h1>
                    <p className="hero-sub">
                        Connect with verified professionals for cleaning, plumbing,
                        electrical, and more — right at your doorstep.
                    </p>
                    <div className="hero-cta-group">
                        <button className="cta-primary" onClick={() => navigate("/register")}>
                            Book a Service
                            <span className="cta-arrow">→</span>
                        </button>
                        <button className="cta-secondary" onClick={() => navigate("/provider-register")}>
                            Offer Services
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <strong>500+</strong>
                            <span>Professionals</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <strong>4.9★</strong>
                            <span>Avg Rating</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <strong>30min</strong>
                            <span>Avg Response</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="services-section">
                <div className="section-header">
                    <span className="section-label">What we offer</span>
                    <h2 className="section-title">Explore Services</h2>
                    <p className="section-desc">Find the right professional for any home task</p>
                </div>
                <div className="services-grid">
                    {services.map((s) => (
                        <div className="service-card" key={s.label}>
                            <div className="service-icon">{s.icon}</div>
                            <h3 className="service-name">{s.label}</h3>
                            <p className="service-desc-text">{s.desc}</p>
                            <span className="service-arrow">→</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section className="features-section">
                <div className="features-inner">
                    <div className="features-left">
                        <span className="section-label">Why QuickFix</span>
                        <h2 className="section-title">Built for peace<br />of mind</h2>
                        <p className="section-desc">
                            We handle the vetting so you can focus on what matters — getting the job done right.
                        </p>
                        <button className="cta-primary" onClick={() => navigate("/register")}>
                            Get Started →
                        </button>
                    </div>
                    <div className="features-right">
                        {features.map((f) => (
                            <div className="feature-card" key={f.title}>
                                <div className="feature-icon">{f.icon}</div>
                                <div>
                                    <h3 className="feature-title">{f.title}</h3>
                                    <p className="feature-desc">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <section className="cta-banner">
                <div className="cta-banner-inner">
                    <h2>Ready to get started?</h2>
                    <p>Join thousands of happy homeowners today.</p>
                    <button className="cta-banner-btn" onClick={() => navigate("/register")}>
                        Book Your First Service
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-inner">
                    <div className="home-logo">
                        <span className="logo-mark">Q</span>
                        <span>QuickFix</span>
                    </div>
                    <p className="footer-copy">© 2026 QuickFix. All rights reserved.</p>
                    <div className="footer-links">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Contact</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Home;