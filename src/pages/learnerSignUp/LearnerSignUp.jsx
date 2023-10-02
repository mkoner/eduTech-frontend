import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './LearnerSignUp.css';

import { addLearner, learnerLogin } from '../../api';

const LearnerSignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState(''); 
    const [phone_number, setPhoneNumber] = useState('');   

    const learnerSignUp = async (evt) => {
        evt.preventDefault();
        try {
            const response = await addLearner({ email, password, first_name, last_name, phone_number });
            if (response.data) {
                const loginResponse = await learnerLogin({email, password});
                if(loginResponse.token)
                {
                    localStorage.setItem("token", loginResponse.token);
                    localStorage.setItem("userType", "Learner");
                    navigate('/');
                }
              }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
	<form onSubmit={learnerSignUp}>
	    <label>First Name:</label>
		<input type="text" value={first_name} onChange={e => setFirstName(e.target.value)} required />
	    
	    <label>Last Name:</label>
		<input type="text" value={last_name} onChange={e => setLastName(e.target.value)} required />
	    
	    <label>Email:</label>
		<input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
	    
	    <label>Password:</label>
		<input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
	    
	    <label>Phone Number:</label>
		<input type="tel" value={phone_number} onChange={e => setPhoneNumber(e.target.value)} required />
	    
	    <input type="submit" value="Sign Up" />
	</form>
    );
};

export default LearnerSignUp;
