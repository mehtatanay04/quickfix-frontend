import { useEffect, useState } from "react";
import axios from "axios";

function ServiceList({ onBooked }) {

const [services, setServices] = useState([]);
const [selectedService, setSelectedService] = useState(null);

const [bookingData, setBookingData] = useState({
bookingDate: "",
timeSlot: "",
address: "",
notes: ""
});

useEffect(() => {
fetchServices();
}, []);

const fetchServices = async () => {
try {
const response = await axios.get(
"http://localhost:8081/api/user/services",
{
headers: {
Authorization: "Bearer " + localStorage.getItem("token")
}
}
);

setServices(response.data);

} catch (error) {
alert("Failed to load services");
}
};

const openBooking = (service) => {
setSelectedService(service);
};

const closeBooking = () => {
setSelectedService(null);
};

const handleChange = (e) => {
setBookingData({
...bookingData,
[e.target.name]: e.target.value
});
};

const bookService = async () => {
try {
await axios.post(
"http://localhost:8081/api/user/book",
{
serviceId: selectedService.id,
...bookingData
},
{
headers: {
Authorization: "Bearer " + localStorage.getItem("token")
}
}
);

alert("Booking successful");

setSelectedService(null);
setBookingData({
bookingDate: "",
timeSlot: "",
address: "",
notes: ""
});

onBooked();

} catch (error) {
alert(error.response?.data?.message || "Booking failed");
}
};

return (
<div className="services-section">

<h2 className="section-title">Available Services</h2>

<div className="services-grid">

{services.map(service => (
<div key={service.id} className="service-card">

<h3 className="service-title">{service.name}</h3>

<p className="service-description">{service.description}</p>

<p className="service-price">₹ {service.price}</p>

<button
className="primary-btn"
onClick={() => openBooking(service)}
>
Book Service
</button>

</div>
))}

</div>

{/* BOOKING MODAL */}
{selectedService && (
<div className="modal-overlay">

<div className="modal">

<h3>Book {selectedService.name}</h3>

<input
type="date"
name="bookingDate"
value={bookingData.bookingDate}
onChange={handleChange}
className="auth-input"
/>

<select
name="timeSlot"
value={bookingData.timeSlot}
onChange={handleChange}
className="auth-input"
>
<option value="">Select Time Slot</option>
<option value="MORNING">Morning</option>
<option value="AFTERNOON">Afternoon</option>
<option value="EVENING">Evening</option>
</select>

<input
type="text"
placeholder="Address"
name="address"
value={bookingData.address}
onChange={handleChange}
className="auth-input"
/>

<textarea
placeholder="Notes"
name="notes"
value={bookingData.notes}
onChange={handleChange}
className="auth-input"
/>

<div className="modal-actions">

<button className="primary-btn" onClick={bookService}>
Confirm Booking
</button>

<button className="logout-btn" onClick={closeBooking}>
Cancel
</button>

</div>

</div>

</div>
)}

</div>
);
}

export default ServiceList;