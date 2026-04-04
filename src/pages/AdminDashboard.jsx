import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [providers, setProviders] = useState([]);
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState("bookings");
    const [newService, setNewService] = useState({ name: "", description: "", price: "" });
    const [addingService, setAddingService] = useState(false);

    const authHeader = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };

    useEffect(() => {
        fetchAllBookings();
        fetchProviders();
        fetchServices();
    }, []);

    const fetchAllBookings = async () => {
        const res = await axiosInstance.get("/api/admin/bookings", authHeader);
        setBookings(res.data);
    };
    const fetchProviders = async () => {
        const res = await axiosInstance.get("/api/admin/providers", authHeader);
        setProviders(res.data);
    };
    const fetchServices = async () => {
        const res = await axiosInstance.get("/api/user/services", authHeader);
        setServices(res.data);
    };

    const updateStatus = async (bookingId, newStatus) => {
        await axiosInstance.put(`/api/admin/booking/${bookingId}/status`, { status: newStatus }, authHeader);
        fetchAllBookings();
    };

    const assignProvider = async (bookingId, providerId) => {
        if (!providerId) return;
        await axiosInstance.put(`/api/admin/booking/${bookingId}/assign-provider`, { providerId: Number(providerId) }, authHeader);
        fetchAllBookings();
    };

    const approveProvider = async (providerId) => {
        await axiosInstance.put(`/api/admin/provider/${providerId}/approve`, {}, authHeader);
        fetchProviders();
    };

    const addService = async () => {
        if (!newService.name || !newService.price) return;
        setAddingService(true);
        try {
            await axiosInstance.post("/api/admin/add-service", newService, authHeader);
            setNewService({ name: "", description: "", price: "" });
            fetchServices();
        } finally {
            setAddingService(false);
        }
    };

    const pendingProviders = providers.filter(p => !p.approved);
    const approvedProviders = providers.filter(p => p.approved);

    const tabs = [
        { id: "bookings", label: "Bookings", count: bookings.length },
        { id: "providers", label: "Pending Approvals", count: pendingProviders.length },
        { id: "services", label: "Services", count: services.length },
    ];

    return (
        <div className="adm-layout">

            {/* SIDEBAR */}
            <aside className="adm-sidebar">
                <div className="adm-sidebar-header">
                    <div className="adm-avatar">A</div>
                    <div>
                        <p className="adm-role-label">Administrator</p>
                        <p className="adm-role-sub">Full Access</p>
                    </div>
                </div>

                <nav className="adm-nav">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`adm-nav-item ${activeTab === tab.id ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span>{tab.label}</span>
                            {tab.count > 0 && (
                                <span className={`adm-badge ${tab.id === "providers" && tab.count > 0 ? "adm-badge-warn" : ""}`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="adm-sidebar-stats">
                    <div className="adm-stat-row">
                        <span>Total Bookings</span>
                        <strong>{bookings.length}</strong>
                    </div>
                    <div className="adm-stat-row">
                        <span>Active Providers</span>
                        <strong>{approvedProviders.length}</strong>
                    </div>
                    <div className="adm-stat-row">
                        <span>Services</span>
                        <strong>{services.length}</strong>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <main className="adm-main">

                {/* BOOKINGS TAB */}
                {activeTab === "bookings" && (
                    <div className="adm-section">
                        <div className="adm-section-header">
                            <h2 className="adm-title">All Bookings</h2>
                            <span className="adm-count">{bookings.length} total</span>
                        </div>

                        {bookings.length === 0 && (
                            <div className="adm-empty">No bookings yet</div>
                        )}

                        <div className="adm-table-wrap">
                            {bookings.length > 0 && (
                                <table className="adm-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>User</th>
                                            <th>Service</th>
                                            <th>Provider</th>
                                            <th>Status</th>
                                            <th>Update Status</th>
                                            <th>Assign Provider</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((b, i) => (
                                            <tr key={b.id}>
                                                <td className="adm-td-muted">{i + 1}</td>
                                                <td>{b.user.email}</td>
                                                <td>{b.service.name}</td>
                                                <td>{b.provider ? b.provider.name : <span className="adm-td-muted">—</span>}</td>
                                                <td>
                                                    <span className={`status-badge status-${b.status.toLowerCase()}`}>
                                                        {b.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <select
                                                        className="adm-select"
                                                        value={b.status}
                                                        onChange={(e) => updateStatus(b.id, e.target.value)}
                                                    >
                                                        <option value="PENDING">PENDING</option>
                                                        <option value="CONFIRMED">CONFIRMED</option>
                                                        <option value="COMPLETED">COMPLETED</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        className="adm-select"
                                                        onChange={(e) => assignProvider(b.id, e.target.value)}
                                                    >
                                                        <option value="">Assign…</option>
                                                        {approvedProviders.map(p => (
                                                            <option key={p.id} value={p.id}>{p.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

                {/* PROVIDERS TAB */}
                {activeTab === "providers" && (
                    <div className="adm-section">
                        <div className="adm-section-header">
                            <h2 className="adm-title">Pending Approvals</h2>
                            <span className="adm-count">{pendingProviders.length} waiting</span>
                        </div>

                        {pendingProviders.length === 0 && (
                            <div className="adm-empty">✓ All providers have been reviewed</div>
                        )}

                        <div className="adm-cards-grid">
                            {pendingProviders.map(p => (
                                <div key={p.id} className="adm-provider-card">
                                    <div className="adm-provider-avatar">
                                        {p.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="adm-provider-info">
                                        <strong>{p.name}</strong>
                                        <span>{p.email}</span>
                                        <span className="adm-category-tag">{p.category}</span>
                                    </div>
                                    <button
                                        className="adm-approve-btn"
                                        onClick={() => approveProvider(p.id)}
                                    >
                                        Approve
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SERVICES TAB */}
                {activeTab === "services" && (
                    <div className="adm-section">
                        <div className="adm-section-header">
                            <h2 className="adm-title">Services</h2>
                            <span className="adm-count">{services.length} listed</span>
                        </div>

                        {/* ADD SERVICE FORM */}
                        <div className="adm-add-service-form">
                            <h3 className="adm-form-title">Add New Service</h3>
                            <div className="adm-form-row">
                                <input
                                    className="adm-input"
                                    name="name"
                                    placeholder="Service Name"
                                    value={newService.name}
                                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                />
                                <input
                                    className="adm-input"
                                    name="description"
                                    placeholder="Description"
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                />
                                <input
                                    className="adm-input adm-input-sm"
                                    name="price"
                                    placeholder="₹ Price"
                                    value={newService.price}
                                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                />
                                <button
                                    className="adm-add-btn"
                                    onClick={addService}
                                    disabled={addingService}
                                >
                                    {addingService ? "Adding…" : "+ Add"}
                                </button>
                            </div>
                        </div>

                        <div className="adm-services-grid">
                            {services.map(s => (
                                <div key={s.id} className="adm-service-tile">
                                    <div className="adm-service-icon">🛠</div>
                                    <div className="adm-service-body">
                                        <strong>{s.name}</strong>
                                        <span>{s.description}</span>
                                    </div>
                                    <div className="adm-service-price">₹{s.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default AdminDashboard;