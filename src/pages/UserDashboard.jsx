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
        <div style={{ padding: "20px" }}>
            <ServiceList onBooked={fetchMyBookings} />

            <hr />

            <h2>My Bookings</h2>

            {bookings.length === 0 && <p>No bookings yet</p>}

            {bookings.map(booking => (
                <div
                    key={booking.id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <h3>{booking.service.name}</h3>
                    <p>Status: {booking.status}</p>
                </div>
            ))}
        </div>
    );
}

export default UserDashboard;