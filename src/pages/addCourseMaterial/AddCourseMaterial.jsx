import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { createCourseMaterial } from '../../api';


const AddCourseMaterial = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [courseMaterial, setCourseMaterial] = useState({
        title: "",
        source: "",
        author: "",
        link: "",
    });
    const {title, source, author, link} = courseMaterial;

    const handleChange = (evt) => {
        const { name, value, } = evt.target;
        setCourseMaterial((prevState) => ({
          ...prevState,
          [name]: value,
        }))
      }

    const addCourseMaterial = async ()=>{
        try {
            const response = await createCourseMaterial(id, courseMaterial);
            //navigate(`/courses/${id}`);
        } catch (error) {
            console.error(`Error fetching courses: ${error.message}`);
        }
    }

    return (
        <>
        <form action="">
        <input type="text" name='title' value={title} onChange={handleChange} placeholder="Material Title" />
	    <input type="text" name='source' value={source} onChange={handleChange} placeholder="Material Source" />
	    <input type="text" name='author' value={author} onChange={handleChange} placeholder="Material Author" />
	    <input type="text" name='link' value={link} onChange={handleChange} placeholder="Material Link" />
	    <button onClick={addCourseMaterial}>Add Course Material</button>
        </form>
        </>
    )

}

export default AddCourseMaterial;