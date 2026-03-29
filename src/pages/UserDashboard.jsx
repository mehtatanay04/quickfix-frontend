import { useEffect, useState } from "react";
import axios from "axios";
import ServiceList from "../components/ServiceList";

function UserDashboard() {
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("book");

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const fetchMyBookings = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/api/user/my-bookings",
                { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
            );
            setBookings(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const cancelBooking = async (bookingId) => {
        try {
            await axios.put(
                `http://localhost:8081/api/user/cancel/${bookingId}`,
                {},
                { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
            );
            fetchMyBookings();
        } catch (error) {
            console.error(error);
        }
    };

    const activeBookings = bookings.filter(b => b.status !== "COMPLETED" && b.status !== "CANCELLED");
    const pastBookings = bookings.filter(b => b.status === "COMPLETED" || b.status === "CANCELLED");

    return (
        <div className="usr-layout">

            {/* SUMMARY BAR */}
            <div className="usr-summary-bar">
                <div className="usr-summary-card">
                    <span className="usr-summary-label">Total Bookings</span>
                    <strong className="usr-summary-value">{bookings.length}</strong>
                </div>
                <div className="usr-summary-card">
                    <span className="usr-summary-label">Active</span>
                    <strong className="usr-summary-value">{activeBookings.length}</strong>
                </div>
                <div className="usr-summary-card">
                    <span className="usr-summary-label">Completed</span>
                    <strong className="usr-summary-value">{pastBookings.length}</strong>
                </div>
            </div>

            {/* TABS */}
            <div className="pvd-tabs">
                <button
                    className={`pvd-tab ${activeTab === "book" ? "active" : ""}`}
                    onClick={() => setActiveTab("book")}
                >
                    Book a Service
                </button>
                <button
                    className={`pvd-tab ${activeTab === "bookings" ? "active" : ""}`}
                    onClick={() => setActiveTab("bookings")}
                >
                    My Bookings
                    {activeBookings.length > 0 && (
                        <span className="pvd-tab-count">{activeBookings.length}</span>
                    )}
                </button>
            </div>

            {/* BOOK TAB */}
            {activeTab === "book" && (
                <div className="usr-service-section">
                    <ServiceList onBooked={() => { fetchMyBookings(); setActiveTab("bookings"); }} />
                </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
                <div className="usr-bookings-section">
                    {bookings.length === 0 && (
                        <div className="pvd-empty">
                            No bookings yet —{" "}
                            <span className="auth-link" onClick={() => setActiveTab("book")}>
                                book your first service
                            </span>
                        </div>
                    )}

                    {activeBookings.length > 0 && (
                        <>
                            <h3 className="usr-group-title">Active</h3>
                            <div className="usr-bookings-grid">
                                {activeBookings.map(b => (
                                    <div key={b.id} className={`usr-booking-card usr-booking-${b.status.toLowerCase()}`}>
                                        <div className="usr-booking-top">
                                            <h3 className="usr-booking-name">{b.service.name}</h3>
                                            <span className={`status-badge status-${b.status.toLowerCase()}`}>
                                                {b.status}
                                            </span>
                                        </div>

                                        <div className="usr-booking-meta">
                                            {b.bookingDate && <span>📅 {b.bookingDate}</span>}
                                            {b.timeSlot && <span>🕐 {b.timeSlot}</span>}
                                            {b.address && <span>📍 {b.address}</span>}
                                            {b.provider && <span>👤 {b.provider.name}</span>}
                                        </div>

                                        {b.status === "PENDING" && (
                                            <button
                                                className="usr-cancel-btn"
                                                onClick={() => cancelBooking(b.id)}
                                            >
                                                Cancel Booking
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {pastBookings.length > 0 && (
                        <>
                            <h3 className="usr-group-title">History</h3>
                            <div className="usr-bookings-grid">
                                {pastBookings.map(b => (
                                    <div key={b.id} className={`usr-booking-card usr-booking-${b.status.toLowerCase()}`}>
                                        <div className="usr-booking-top">
                                            <h3 className="usr-booking-name">{b.service.name}</h3>
                                            <span className={`status-badge status-${b.status.toLowerCase()}`}>
                                                {b.status}
                                            </span>
                                        </div>
                                        <div className="usr-booking-meta">
                                            {b.bookingDate && <span>📅 {b.bookingDate}</span>}
                                            {b.timeSlot && <span>🕐 {b.timeSlot}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserDashboard;