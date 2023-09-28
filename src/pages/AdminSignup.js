import React, { useState } from 'react';
import axios from 'axios';
import './AdminSignup.css';

const AdminSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (event) => {
	event.preventDefault();
	axios.post('https://edutech-main.onrender.com/admins', { email, password, firstName, lastName, phoneNumber })
	    .then(response => {
		// Handle successful signup here
		console.log(response.data);
	    })
	    .catch(error => {
		console.error('There was an error!', error);
	    });
    };

    return (
	<form onSubmit={handleSubmit}>
	    <label>First Name:
		<input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
	    </label>
	    <label>Last Name:
		<input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
	    </label>
	    <label>Email:
		<input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
	    </label>
	    <label>Password:
		<input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
	    </label>
	    <label>Phone Number:
		<input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
	    </label>
	    <input type="submit" value="Sign Up" />
	</form>
    );
};

export default AdminSignup;
