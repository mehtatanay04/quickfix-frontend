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

            onBooked();

        } catch (error) {
            alert("Booking failed");
        }
    };

    return (
        <div className="services-section">

            <h2 className="section-title">Available Services</h2>

            <div className="services-grid">

                {services.map(service => (
                    <div key={service.id} className="service-card">

                        <h3 className="service-title">
                            {service.name}
                        </h3>

                        <p className="service-description">
                            {service.description}
                        </p>

                        <p className="service-price">
                            ₹ {service.price}
                        </p>

                        <button
                            className="primary-btn"
                            onClick={() => bookService(service.id)}
                        >
                            Book Service
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default ServiceList;