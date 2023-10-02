import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'

import { getCourseById, updateCourse, fetchCourseMaterialsForCourse, registerForCourse } from "../../api";

const CourseDetailsPage = () => {
  const userType = localStorage.getItem("userType") ? localStorage.getItem("userType") : null;
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [course, setCourse] = useState({
    course_name: "", 
    description: "", 
  });

  const {course_name, description} = course;
  const [courseMaterials, setCourseMaterials] = useState([]);

  const [filters, setFilters] = useState({
		id: null,
		title: null,
		author: null,
		source: null,
		page: 1,
	});
	const {title, author, source, page} = filters;
  const cid = filters.id

  useEffect(()=>{
    getCourse()
    getCourseMaterials()
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

  const getCourseMaterials = async () => {
    let result =  Object.entries(filters).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {});
    try {
        const response = await fetchCourseMaterialsForCourse(id, result);
        setCourseMaterials(response.data);
    } catch (error) {
        console.error(`Error fetching course materials: ${error.message}`);
    }
      };

  const handleChange = (evt) => {
    const { name, value, } = evt.target;
    setCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFiltersChange = (evt) => {
		const { name, value } = evt.target;
		setFilters((prevState) => ({
		  ...prevState,
		  [name]: value,
		}))
	  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCourse(id, course)
  };

 const addMaterial = async () => {
  navigate(`/add-material/${id}`)
 }

 const register = async (evt) => {
  evt.preventDefault();
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
  if(!token){
    navigate("/learners/login")
  }
  try {
    const response = await registerForCourse(id);
    navigate("/learners/my-courses")
  } catch (error) {
    if(error.message.includes("Request failed with status code 401")){
			navigate("/learners/login")
		}
  }
 }

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
           rows="7" value={description} onChange={handleChange} />
    
           <button type="submit">Update</button>
           </form>
        </div>  
        <div className="course-materails-admin">
          <h2>Course materials</h2>
          <button onClick={addMaterial}>Add Material</button>
          {courseMaterials.length > 0 && <table className="course-materails-table">
            <thead>
              <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Source</th>
              <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {
                courseMaterials.map(courseMaterial => <tr key={courseMaterial.id}>
                  <td>{courseMaterial.id}</td>
                  <td>{courseMaterial.title}</td>
                  <td>{courseMaterial.source}</td>
                  <td>{courseMaterial.author}</td>
                </tr>)
              }
            </tbody>
          </table> } 
        </div>
        </>
      );
  }


  return (
    <div className="course-details">
        <h2>{course_name}</h2>
        <p>{description}</p>
        <button onClick={register}>Register</button>
    </div>
  )

};

export default CourseDetailsPage;