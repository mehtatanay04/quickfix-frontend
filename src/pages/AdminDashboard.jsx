import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchAllBookings();
    }, []);

    const fetchAllBookings = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/api/admin/bookings",
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            setBookings(response.data);

        } catch (error) {
            alert("Failed to load bookings");
        }
    };

    const updateStatus = async (bookingId, newStatus) => {
        try {
            await axios.put(
                `http://localhost:8081/api/admin/booking/${bookingId}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            fetchAllBookings();

        } catch (error) {
            alert("Failed to update status");
        }
    };

    return (
        <div className="dashboard-container">

            <h2 className="section-title">All Bookings (Admin)</h2>

            {bookings.length === 0 && (
                <p className="empty-message">No bookings found</p>
            )}

            {bookings.map(booking => (
                <div key={booking.id} className="card">

                    <div className="card-content">
                        <p><strong>User:</strong> {booking.user.email}</p>
                        <p><strong>Service:</strong> {booking.service.name}</p>

                        <p className={`status-badge status-${booking.status.toLowerCase()}`}>
                            {booking.status}
                        </p>
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
                    </div>

                </div>
            ))}

        </div>
    );
}

export default AdminDashboard;