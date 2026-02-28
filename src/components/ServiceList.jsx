import { useEffect, useState } from "react";
import axios from "axios";

function ServiceList({ onBooked }) {

    const [services, setServices] = useState([]);

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

    const bookService = async (serviceId) => {
        try {
            await axios.post(
                "http://localhost:8081/api/user/book",
                { serviceId },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            alert("Service booked successfully");

            onBooked(); // refresh bookings

        } catch (error) {
            alert("Booking failed");
        }
    };

    return (
        <div>
            <h2>Available Services</h2>

            {services.map(service => (
                <div
                    key={service.id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <p>₹ {service.price}</p>

                    <button onClick={() => bookService(service.id)}>
                        Book
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ServiceList;