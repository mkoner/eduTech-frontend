import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'

import { getCourseById, updateCourse, fetchCourseMaterialsForCourse, registerForCourse } from "../../api";

const MyCourseDetailsPage = () => {
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
        page_size: 20,
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


  if (userType == "Learner") {
    return (
        <>
        <div className="course-details-learner">
            <div className="course-details">
                <h2>{course_name}</h2>
            </div>
            <div className="course-materails-admin">
          
          {courseMaterials.length > 0 && 
            <div>
              {
                courseMaterials.map(courseMaterial => <div key={courseMaterial.id}>
                  <h4><a href={courseMaterial.link} target="_blank">{courseMaterial.title}</a></h4>
                  {courseMaterial.source && <span>Source: {courseMaterial.source}</span>}
                  {courseMaterial.author && <span> Author: {courseMaterial.author}</span>}
                </div>)
              }
            </div>
           } 
        </div>
        </div>  
        </>
      );
  }


  return (
    <></>
  )

};

export default MyCourseDetailsPage;