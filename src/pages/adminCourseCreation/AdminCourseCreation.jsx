import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminCourseCreation.css';

import { createCourse } from '../../api';

const AdminCourseCreation = () => {
	const navigate = useNavigate();
    const [course_name, setCourseName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
	event.preventDefault();
	try {
		const response = await createCourse({course_name, description});
		navigate("/courses")
	} catch (error) {
		console.error("Error creating course: " + error.message)
	}
    };

    return (
	<form onSubmit={handleSubmit}>
	    <label>Course course_name:
		<input type="text" value={course_name} onChange={e => setCourseName(e.target.value)} required />
	    </label>
	    <label>Course Description:
		<textarea value={description} onChange={e => setDescription(e.target.value)} required />
	    </label>
	    <input type="submit" value="Create Course" />
	</form>
    );
};

export default AdminCourseCreation;
