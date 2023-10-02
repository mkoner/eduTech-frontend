import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import './LearnerLogin.css'

import { learnerLogin } from "../../api";
const LearnerLogin = () => {
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
    const response = await learnerLogin({email, password});
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userType", "Learner");
      navigate(-1);
    }
    else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="learner-login-form" action={handleSubmit}>
      <h1>Login</h1>
      
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
    <div className="register-not-account">
      <p>Don't you have an account yet?</p>
      <button onClick={()=>navigate("/learners/signup")}>REGISTER</button>
    </div>
    <div className="admin-account-login">
      <p>Are you an admin? <a href="/admins/login">login as admin</a></p>
      
    </div>
    </div>
  );
};

export default LearnerLogin;