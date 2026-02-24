function Dashboard() {

    const role = localStorage.getItem("role");

    return (
        <div>
            <h1>Dashboard</h1>

            {role === "ADMIN" && (
                <h2>Welcome Admin Panel</h2>
            )}

            {role === "USER" && (
                <h2>Welcome User Dashboard</h2>
            )}
        </div>
    );
}

export default Dashboard;