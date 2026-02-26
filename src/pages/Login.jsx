import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Login(){

    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        navigate("/dashboard");
    }
}, []);

    const handleLogin = async (e) => {
        e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8081/api/auth/login",{email,password});
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/dashboard");
        alert("Login successful");
        
    } catch (error){
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert("Login Failed");
    }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;