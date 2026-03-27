import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

const [bookings, setBookings] = useState([]);
const [providers, setProviders] = useState([]);
const [services, setServices] = useState([]);

const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: ""
});

useEffect(() => {
    fetchAllBookings();
    fetchProviders();
    fetchServices();
}, []);

const authHeader = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
};

//////////////////// FETCH ////////////////////

const fetchAllBookings = async () => {
    const res = await axios.get(
        "http://localhost:8081/api/admin/bookings",
        authHeader
    );
    setBookings(res.data);
};

const fetchProviders = async () => {
    const res = await axios.get(
        "http://localhost:8081/api/admin/providers",
        authHeader
    );
    setProviders(res.data);
};

const fetchServices = async () => {
    const res = await axios.get(
        "http://localhost:8081/api/user/services",
        authHeader
    );
    setServices(res.data);
};

//////////////////// STATUS ////////////////////

const updateStatus = async (bookingId, newStatus) => {
    await axios.put(
        `http://localhost:8081/api/admin/booking/${bookingId}/status`,
        { status: newStatus },
        authHeader
    );
    fetchAllBookings();
};

//////////////////// ASSIGN ////////////////////

const assignProvider = async (bookingId, providerId) => {
    if (!providerId) return;

    await axios.put(
        `http://localhost:8081/api/admin/booking/${bookingId}/assign-provider`,
        { providerId: Number(providerId) },
        authHeader
    );

    fetchAllBookings();
};

//////////////////// APPROVE ////////////////////

const approveProvider = async (providerId) => {
    await axios.put(
        `http://localhost:8081/api/admin/provider/${providerId}/approve`,
        {},
        authHeader
    );
    fetchProviders();
};

//////////////////// ADD SERVICE ////////////////////

const handleServiceChange = (e) => {
    setNewService({
        ...newService,
        [e.target.name]: e.target.value
    });
};

const addService = async () => {
    if (!newService.name || !newService.price) {
        alert("Name and price required");
        return;
    }

    await axios.post(
        "http://localhost:8081/api/admin/add-service",
        newService,
        authHeader
    );

    alert("Service added");

    setNewService({
        name: "",
        description: "",
        price: ""
    });

    fetchServices();
};

//////////////////// UI ////////////////////

return (
<div className="dashboard-container">

{/* SERVICES SECTION */}
<h2 className="section-title">Services</h2>

<div className="services-grid">
    {services.map(service => (
        <div key={service.id} className="service-card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>₹ {service.price}</p>
        </div>
    ))}
</div>

{/* ADD SERVICE */}
<div className="card">
    <div className="card-content">
        <input
            className="auth-input"
            name="name"
            placeholder="Service Name"
            value={newService.name}
            onChange={handleServiceChange}
        />

        <input
            className="auth-input"
            name="description"
            placeholder="Description"
            value={newService.description}
            onChange={handleServiceChange}
        />

        <input
            className="auth-input"
            name="price"
            placeholder="Price"
            value={newService.price}
            onChange={handleServiceChange}
        />
    </div>

    <div className="card-actions">
        <button className="primary-btn" onClick={addService}>
            Add Service
        </button>
    </div>
</div>

{/* BOOKINGS */}
<h2 className="section-title">All Bookings</h2>

{bookings.map(booking => (
<div key={booking.id} className="card">

<div className="card-content">
<p><strong>User:</strong> {booking.user.email}</p>
<p><strong>Service:</strong> {booking.service.name}</p>

{booking.provider && (
<p><strong>Provider:</strong> {booking.provider.name}</p>
)}

<span className={`status-badge status-${booking.status.toLowerCase()}`}>
{booking.status}
</span>
</div>

<div className="card-actions">

<select
className="status-select"
value={booking.status}
onChange={(e) =>
updateStatus(booking.id, e.target.value)
}
>
<option value="PENDING">PENDING</option>
<option value="CONFIRMED">CONFIRMED</option>
<option value="COMPLETED">COMPLETED</option>
</select>

<select
className="status-select"
onChange={(e) =>
assignProvider(booking.id, e.target.value)
}
>
<option value="">Assign Provider</option>

{providers
.filter(p => p.approved)
.map(p => (
<option key={p.id} value={p.id}>
{p.name}
</option>
))}
</select>

</div>

</div>
))}

{/* PROVIDERS */}
<h2 className="section-title">Pending Providers</h2>

{providers
.filter(p => !p.approved)
.map(provider => (
<div key={provider.id} className="card">

<div className="card-content">
<p><strong>{provider.name}</strong></p>
<p>{provider.email}</p>
<p>Category: {provider.category}</p>
</div>

<div className="card-actions">
<button
className="primary-btn"
onClick={() => approveProvider(provider.id)}
>
Approve
</button>
</div>

</div>
))}

</div>
);
}

export default AdminDashboard;