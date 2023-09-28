import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'

import { getCourseById, updateCourse } from "../../api";

const CourseDetailsPage = () => {
const userType = () => localStorage.getItem("userType") ? localStorage.getItem("userType") : null;
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [course, setCourse] = useState({
    course_name: "", 
    description: "", 
  });

  const {course_name, description} = course;

  useEffect(()=>{
    getCourse()
  }, 
  [id])

  const getCourse = async () => {
    try {
        const response = await getCourseById(id);  
        setCourse({
          course_name: response.data.course_name,
          description: response.data.description,
        });
    } catch (error) {
        console.error(`Error fetching courses: ${error.message}`);
    }
      };

  const handleChange = (evt) => {
    const { name, value, } = evt.target;
    setCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCourse(id, course)
  };

  if (userType == "Admin") {
    return (
        <>
        <div className="course-details-admin">
            <form onSubmit={handleSubmit}>
            <label>Course name</label>
            <input
            type="text"
            name="course_name"
            placeholder="Course name"
            value={course_name}
            onChange={handleChange}
           />
           <label>Description</label>
           <textarea name="description"  cols="50"
           rows="10" value={description} onChange={handleChange} />
    
           <button type="submit">Update</button>
           </form>
        </div>  
        <div className="course-laterailq-admin">
            
        </div>
        </>
      );
  }

  return (
    <div className="course-details">
        <h2>{course_name}</h2>
        <p>{description}</p>
        <button>Register</button>
    </div>
  )

};

export default CourseDetailsPage;