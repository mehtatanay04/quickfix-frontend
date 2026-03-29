import { useEffect, useState } from "react";
import axios from "axios";

function ProviderDashboard() {
    const [jobs, setJobs] = useState([]);
    const [earnings, setEarnings] = useState(0);
    const [available, setAvailable] = useState(true);
    const [activeTab, setActiveTab] = useState("jobs");

    const authHeader = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    };

    useEffect(() => {
        fetchJobs();
        fetchEarnings();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/provider/my-jobs", authHeader);
            setJobs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchEarnings = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/provider/earnings", authHeader);
            setEarnings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const acceptJob = async (id) => {
        try {
            await axios.put(`http://localhost:8081/api/provider/accept-job/${id}`, {}, authHeader);
            fetchJobs();
        } catch (err) {
            console.error(err);
        }
    };

    const completeJob = async (id) => {
        try {
            await axios.put(`http://localhost:8081/api/provider/complete-job/${id}`, {}, authHeader);
            fetchJobs();
            fetchEarnings();
        } catch (err) {
            console.error(err);
        }
    };

    const toggleAvailability = async () => {
        try {
            await axios.put("http://localhost:8081/api/provider/toggle-availability", {}, authHeader);
            setAvailable(!available);
        } catch (err) {
            console.error(err);
        }
    };

    const pendingJobs = jobs.filter(j => j.status === "PENDING");
    const confirmedJobs = jobs.filter(j => j.status === "CONFIRMED");
    const completedJobs = jobs.filter(j => j.status === "COMPLETED");

    return (
        <div className="pvd-layout">

            {/* TOP STATS BAR */}
            <div className="pvd-stats-bar">
                <div className="pvd-stat-card pvd-earnings">
                    <span className="pvd-stat-label">Total Earnings</span>
                    <strong className="pvd-stat-value">₹{earnings}</strong>
                </div>

                <div className="pvd-stat-card">
                    <span className="pvd-stat-label">Pending Jobs</span>
                    <strong className="pvd-stat-value">{pendingJobs.length}</strong>
                </div>

                <div className="pvd-stat-card">
                    <span className="pvd-stat-label">In Progress</span>
                    <strong className="pvd-stat-value">{confirmedJobs.length}</strong>
                </div>

                <div className="pvd-stat-card">
                    <span className="pvd-stat-label">Completed</span>
                    <strong className="pvd-stat-value">{completedJobs.length}</strong>
                </div>

                <div className="pvd-availability-card">
                    <div className="pvd-avail-info">
                        <span className="pvd-stat-label">Availability</span>
                        <span className={`pvd-avail-status ${available ? "pvd-online" : "pvd-offline"}`}>
                            {available ? "● Online" : "○ Offline"}
                        </span>
                    </div>
                    <button className="pvd-toggle-btn" onClick={toggleAvailability}>
                        {available ? "Go Offline" : "Go Online"}
                    </button>
                </div>
            </div>

            {/* TABS */}
            <div className="pvd-tabs">
                {[
                    { id: "jobs", label: "Active Jobs", count: pendingJobs.length + confirmedJobs.length },
                    { id: "completed", label: "Completed", count: completedJobs.length },
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={`pvd-tab ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                        {tab.count > 0 && <span className="pvd-tab-count">{tab.count}</span>}
                    </button>
                ))}
            </div>

            {/* JOB CARDS */}
            <div className="pvd-jobs-grid">
                {activeTab === "jobs" && (
                    <>
                        {pendingJobs.length === 0 && confirmedJobs.length === 0 && (
                            <div className="pvd-empty">No active jobs right now</div>
                        )}

                        {[...pendingJobs, ...confirmedJobs].map(job => (
                            <div key={job.id} className={`pvd-job-card pvd-job-${job.status.toLowerCase()}`}>
                                <div className="pvd-job-top">
                                    <div className="pvd-job-icon">🛠</div>
                                    <span className={`status-badge status-${job.status.toLowerCase()}`}>
                                        {job.status}
                                    </span>
                                </div>
                                <h3 className="pvd-job-name">{job.service.name}</h3>
                                {job.user && <p className="pvd-job-meta">👤 {job.user.email}</p>}
                                {job.bookingDate && <p className="pvd-job-meta">📅 {job.bookingDate}</p>}
                                {job.address && <p className="pvd-job-meta">📍 {job.address}</p>}

                                <div className="pvd-job-actions">
                                    {job.status === "PENDING" && (
                                        <button className="pvd-action-btn pvd-accept" onClick={() => acceptJob(job.id)}>
                                            Accept Job
                                        </button>
                                    )}
                                    {job.status === "CONFIRMED" && (
                                        <button className="pvd-action-btn pvd-complete" onClick={() => completeJob(job.id)}>
                                            Mark Complete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === "completed" && (
                    <>
                        {completedJobs.length === 0 && (
                            <div className="pvd-empty">No completed jobs yet</div>
                        )}
                        {completedJobs.map(job => (
                            <div key={job.id} className="pvd-job-card pvd-job-completed">
                                <div className="pvd-job-top">
                                    <div className="pvd-job-icon">✓</div>
                                    <span className="status-badge status-completed">COMPLETED</span>
                                </div>
                                <h3 className="pvd-job-name">{job.service.name}</h3>
                                {job.bookingDate && <p className="pvd-job-meta">📅 {job.bookingDate}</p>}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default ProviderDashboard;