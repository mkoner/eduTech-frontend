import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

import { getAdminById, updateAdmin, getLearnerById, updateLearner } from "../../api";

const Profile = () => {
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
  const userType = localStorage.getItem("userType") ? localStorage.getItem("userType") : null;
  const decoded = jwt_decode(token);
  const navigate = useNavigate();
  const id = decoded.user_id

  const [admin, setAdmin] = useState({
    first_name: "", 
    last_name: "", 
    email: "",
    phone_number: "",
    password:'',
    is_active: "",
  });

  const {first_name, last_name, email, phone_number, password, is_active} = admin;

  useEffect(()=>{
    getAdmin()
  }, 
  [id])

  useEffect(()=>{
    if(!token){
        navigate("/learners/login");
    }
  }, 
  [token])

  const getAdmin = async () => {
    try {
        const response = userType == "Admin" ? await getAdminById(id): await getLearnerById(id);        
        setAdmin({
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          phone_number: response.phone_number,
          password:'',
          is_active: response.is_active,
        });
    } catch (error) {
        console.error(`Error fetching admins: ${error.message}`);
      if(error.message.includes("Request failed with status code 401")){
        navigate("/learners/login")
      }
    }
      };

  const handleChange = (evt) => {
    const { name, value, } = evt.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const checkHandler = () => {
    setAdmin((prevState) => ({
      ...prevState,
      is_active: !is_active,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {password, ...dataWithNopassword} = admin
    const data = (admin.password != "") ? admin : dataWithNopassword;
    userType == "Admin" ? await updateAdmin(id, data) : await updateLearner(id, data);
  };

  return (
    <form onSubmit={handleSubmit}>
       <label>First name</label>
      <input
        type="text"
        name="first_name"
        placeholder="Name"
        value={first_name}
        onChange={handleChange}
      />
      <label>Last name</label>
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={last_name}
        onChange={handleChange}
      />
      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
      />
      <label>Phone number</label>
        <input
        type="text"
        name="phone_number"
        placeholder="Email"
        value={phone_number}
        onChange={handleChange}
      />
      <label>Password</label>
        <input
        type="password"
        name="password"
        placeholder="New password"
        value={password}
        onChange={handleChange}
      />
      <div className="is-active">
        <label for="vehicle1"> Is active?</label>
        <input type="checkbox" name="is_active" checked={is_active} onChange={checkHandler}/>
        <br/>
      </div>
      <input type="submit" value="Update" />
    </form>
  );
};

export default Profile;