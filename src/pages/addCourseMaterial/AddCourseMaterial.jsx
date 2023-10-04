import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './AddCourseMaterial.css';

import { createCourseMaterial } from '../../api';

const AddCourseMaterial = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [source, setSource] = useState('');
    const [author, setAuthor] = useState('');
    const [link, setLink] = useState(''); 
  

    const createNewCourseMaterial = async (evt) => {
        evt.preventDefault();
        try {
            const response = await createCourseMaterial(id, { title, source, author, link, });
            if (response.data) {
                    navigate(`/courses/${id}`);
              }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
	<form onSubmit={createNewCourseMaterial}>
        <h2>Add a new Course material</h2>
	    <label>Author:</label>
		<input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
	    
	    <label>Link:</label>
		<input type="text" value={link} onChange={e => setLink(e.target.value)} required />
	    
	    <label>title:</label>
		<input type="title" value={title} onChange={e => setTitle(e.target.value)} required />
	    
	    <label>source:</label>
		<input type="source" value={source} onChange={e => setSource(e.target.value)} required />
	    
	    <input type="submit" value="ADD" />
	</form>
    );
};

export default AddCourseMaterial;
