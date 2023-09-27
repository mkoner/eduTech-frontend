import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'

import { getLearnerById, updateLearner } from "../../api";

const LearnerDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [learner, setLearner] = useState({ 
    first_name: "", 
    last_name: "", 
    email: "",
    phone_number: "",
    password:'',
    is_active: "",
  });

  const {first_name, last_name, email, phone_number, password, is_active} = learner;

  useEffect(()=>{
    getLearner()
  }, 
  [id])

  const getLearner = async () => {
    try {
        const response = await getLearnerById(id);        
        setLearner({
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          phone_number: response.phone_number,
          password:'',
          is_active: response.is_active,
        });
    } catch (error) {
        console.error(`Error fetching learners: ${error.message}`);
      if(error.message.includes("Request failed with status code 401")){
        navigate("/learners/login")
      }
    }
      };

  const handleChange = (evt) => {
    const { name, value, } = evt.target;
    setLearner((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const checkHandler = () => {
    setLearner((prevState) => ({
      ...prevState,
      is_active: !is_active,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {password, ...dataWithNopassword} = learner
    const data = (learner.password != "") ? learner : dataWithNopassword;
    await updateLearner(id, data)
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
      <button type="submit">Update</button>
    </form>
  );
};

export default LearnerDetailsPage;