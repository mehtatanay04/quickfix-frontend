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

const cancelBooking = async (bookingId) => {
try {
await axios.put(
`http://localhost:8081/api/user/cancel/${bookingId}`,
{},
{
headers: {
Authorization: "Bearer " + localStorage.getItem("token")
}
}
);

alert("Booking cancelled");
fetchMyBookings();

} catch (error) {
alert(error.response?.data?.message || "Cancel failed");
}
};

return (
<div className="dashboard-container">

{/* SERVICES */}
<ServiceList onBooked={fetchMyBookings} />

{/* BOOKINGS */}
<h2 className="section-title">My Bookings</h2>

{bookings.length === 0 && (
<p className="empty-message">No bookings yet</p>
)}

{bookings.map(booking => (
<div key={booking.id} className="card">

<div className="card-content">

<h3 className="card-title">
{booking.service.name}
</h3>

<p><strong>Date:</strong> {booking.bookingDate}</p>
<p><strong>Slot:</strong> {booking.timeSlot}</p>
<p><strong>Address:</strong> {booking.address}</p>

<span className={`status-badge status-${booking.status.toLowerCase()}`}>
{booking.status}
</span>

</div>

<div className="card-actions">

{booking.status === "PENDING" && (
<button
className="logout-btn"
onClick={() => cancelBooking(booking.id)}
>
Cancel
</button>
)}

</div>

</div>
))}

</div>
);
}

export default UserDashboard;