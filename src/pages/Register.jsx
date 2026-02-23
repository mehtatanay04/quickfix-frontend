import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleRegister = async(e) => {
    e.preventDefault();

    try {
      await axios.post ("http://localhost:8081/api/auth/register", {name, email,password});
      alert("Registration Succesful !");
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName (e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e.target.value} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
