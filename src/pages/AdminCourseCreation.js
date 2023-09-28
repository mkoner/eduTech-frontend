import React, { useState } from 'react';
import axios from 'axios';
import './AdminCourseCreation.css';

const AdminCourseCreation = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
	event.preventDefault();
	axios.post('https://edutech-main.onrender.com/courses', { title, description })
	    .then(response => {
		// Handle successful course creation here
		console.log(response.data);
	    })
	    .catch(error => {
		console.error('There was an error!', error);
	    });
    };

    return (
	<form onSubmit={handleSubmit}>
	    <label>Course Title:
		<input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
	    </label>
	    <label>Course Description:
		<textarea value={description} onChange={e => setDescription(e.target.value)} required />
	    </label>
	    <input type="submit" value="Create Course" />
	</form>
    );
};

export default AdminCourseCreation;
