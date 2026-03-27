import { useEffect, useState } from "react";
import axios from "axios";

function ProviderDashboard() {

const [jobs, setJobs] = useState([]);
const [earnings, setEarnings] = useState(0);
const [available, setAvailable] = useState(true);

useEffect(() => {
fetchJobs();
fetchEarnings();
}, []);

const fetchJobs = async () => {
try {
const res = await axios.get(
"http://localhost:8081/api/provider/my-jobs",
{
headers: {
Authorization: "Bearer " + localStorage.getItem("token")
}
}
);

setJobs(res.data);

} catch (err) {
alert("Failed to load jobs");
}
};

const fetchEarnings = async () => {
try {
const res = await axios.get(
"http://localhost:8081/api/provider/earnings",
{
headers: {
Authorization: "Bearer " + localStorage.getItem("token")
}
}
);

setEarnings(res.data);

} catch (err) {
console.log(err);
}
};

const acceptJob = async (id) => {
try {
await axios.put(
`http://localhost:8081/api/provider/accept-job/${id}`,
{},
{
headers: {
Authorization: "Bearer " + localStorage.getItem("token")
}
}
);

fetchJobs();

} catch (err) {
alert("Accept failed");
}
};

const completeJob = async (id) => {
try {
await axios.put(
`http://localhost:8081/api/provider/complete-job/${id}`,
{},
{
headers: {
Authorization: "Bearer " + localStorage.getItem("token")
}
}
);

fetchJobs();
fetchEarnings();

} catch (err) {
alert("Complete failed");
}
};

const toggleAvailability = async () => {
try {
await axios.put(
"http://localhost:8081/api/provider/toggle-availability",
{},
{
headers: {
Authorization: "Bearer " + localStorage.getItem("token")
}
}
);

setAvailable(!available);

} catch (err) {
alert("Failed to update availability");
}
};

return (
<div>

{/* HEADER */}
<h2 className="section-title">Provider Dashboard</h2>

{/* EARNINGS */}
<div className="card">
<div className="card-content">
<span className="card-title">Total Earnings</span>
<strong>₹ {earnings}</strong>
</div>
</div>

{/* AVAILABILITY */}
<div className="card">
<div className="card-content">
<span className="card-title">Availability</span>
<strong>{available ? "Available" : "Not Available"}</strong>
</div>

<div className="card-actions">
<button className="primary-btn" onClick={toggleAvailability}>
Toggle
</button>
</div>
</div>

{/* JOBS */}
<h3 className="section-title">My Jobs</h3>

{jobs.length === 0 && (
<p className="empty-message">No jobs assigned</p>
)}

{jobs.map(job => (
<div key={job.id} className="card">

<div className="card-content">
<span className="card-title">{job.service.name}</span>
<span>Status: {job.status}</span>
</div>

<div className="card-actions">

{job.status === "PENDING" && (
<button
className="primary-btn"
onClick={() => acceptJob(job.id)}
>
Accept
</button>
)}

{job.status === "CONFIRMED" && (
<button
className="primary-btn"
onClick={() => completeJob(job.id)}
>
Complete
</button>
)}

</div>

</div>
))}

</div>
);
}

export default ProviderDashboard;