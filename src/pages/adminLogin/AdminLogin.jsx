import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css';

import { adminLogin } from "../../api";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
  
  useEffect(() => {
    if(token){
      navigate(-1);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await adminLogin({email, password});
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userType", "Admin");
      navigate(-1);
    }
    else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <form className="login-form" action={handleSubmit}>
      <h1>Admin Login</h1>
      <input
        type="text"
        placeholder="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default AdminLogin;