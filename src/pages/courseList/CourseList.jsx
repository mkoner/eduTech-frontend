import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseList.css';
import { fetchCourses } from '../../api';

import CourseCard from '../../components/courseCard/CourseCard';


const CourseList = () => {
	const navigate = useNavigate();
	const userType = localStorage.getItem("userType") ? localStorage.getItem("userType") : null;
    const [courses, setCourses] = useState([]);
	const [filters, setFilters] = useState({
		id: null,
		keyword: null,
        page:1,
	});
	const {id, keyword, page} = filters;

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFilters((prevState) => ({
		  ...prevState,
		  [name]: value,
		}))
	  }

    useEffect(() => {
	getCourses()
    }, [filters]); 

    const getCourses = async () => {
	let result =  Object.entries(filters).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {});
	try {
	    const response = await fetchCourses(result);
	    setCourses(response.data);
	} catch (error) {
	    console.error(`Error fetching courses: ${error}`);
	}
    };


    return (
	<>
	  {
        courses && 
        <div className="courses-container">
            <input className='search-input' type="text" name="keyword" value={keyword} onChange={handleChange}/>
            <div className='courses'>
            {
                courses.map(course => 
                    <CourseCard key={course.id} course={course}/>)
            }
            </div>
			{
				userType == "Admin" &&
				<div className="add-course-buttun">
					<button onClick={()=>navigate("/add-course")}>Add course</button>
				</div>
			}
        </div>
      } 
	</>
    );
};

export default CourseList;
