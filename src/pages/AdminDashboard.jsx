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

            alert("Status updated");

            fetchAllBookings(); // refresh data

        } catch (error) {
            alert("Failed to update status");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>All Bookings (Admin)</h2>

            {bookings.map(booking => (
                <div
                    key={booking.id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <p><strong>User:</strong> {booking.user.email}</p>
                    <p><strong>Service:</strong> {booking.service.name}</p>
                    <p><strong>Current Status:</strong> {booking.status}</p>

                    <select
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
            ))}
        </div>
    );
}

export default AdminDashboard;