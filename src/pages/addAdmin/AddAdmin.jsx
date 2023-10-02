import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './AddAdmin.css';

import { addAdmin, } from '../../api';

const AddAdmin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState(''); 
    const [phone_number, setPhoneNumber] = useState('');   

    const createAdmin = async (evt) => {
        evt.preventDefault();
        try {
            const response = await addAdmin({ email, password, first_name, last_name, phone_number });
            if (response.data) {
                    navigate('/admins');
              }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
	<form onSubmit={createAdmin}>
        <h2>Add a new Admin</h2>
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
	    
	    <input type="submit" value="ADD" />
	</form>
    );
};

export default AddAdmin;
