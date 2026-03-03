import { useEffect, useState } from "react";
import axios from "axios";
import ServiceList from "../components/ServiceList";

function UserDashboard() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const fetchMyBookings = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/api/user/my-bookings",
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

    return (
        <div className="dashboard-container">

            <div className="services-section">
                <ServiceList onBooked={fetchMyBookings} />
            </div>

            <div className="bookings-section">
                <h2 className="section-title">My Bookings</h2>

                {bookings.length === 0 && (
                    <p className="empty-message">No bookings yet</p>
                )}

                {bookings.map(booking => (
                    <div key={booking.id} className="card">

                        <h3 className="card-title">
                            {booking.service.name}
                        </h3>

                        <p className={`status-badge status-${booking.status.toLowerCase()}`}>
                            {booking.status}
                        </p>

                    </div>
                ))}
            </div>

        </div>
    );
}

export default UserDashboard;