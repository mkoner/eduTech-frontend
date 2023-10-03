import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import './myCourses.css';
import { fetchLearnersCourses } from '../../api';

import CourseCard from '../../components/courseCard/CourseCard';



const MyCourseList = () => {
	const navigate = useNavigate();
	const userType = localStorage.getItem("userType") ? localStorage.getItem("userType") : null;
    const [courses, setCourses] = useState([]);
	const [count, setCount] = useState(0);
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
	    const response = await fetchLearnersCourses(result);
	    setCourses(response.data);
	} catch (error) {
	    console.error(`Error fetching courses: ${error}`);
        if(error.message.includes("Request failed with status code 401")){
			navigate("/learners/login")
		}
	}
    };

	const handlePageClick = (event)=>{
		setFilters((prevState) => ({
			...prevState,
			page: event.selected + 1,
		  }))
	}


    return (
	<>
	  {
        courses && 
        <div className="courses-container">
            <input className='search-input' type="text" name="keyword" value={keyword} onChange={handleChange}/>
            <div className='courses'>
            {
                courses.map(course => 
                    <CourseCard key={course.id} course={course} mycourse={true} />)
            }
            </div>
			{Math.ceil(count / 10) > 1 && <div className="pagination-div">
			  <ReactPaginate
			  breakLabel="..."
              nextLabel="next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={0}
              pageCount={Math.ceil(count / 10)}
              previousLabel="previous"
              renderOnZeroPageCount={null}
			  />
			  </div>}
        </div>
      } 
	</>
    );
};

export default MyCourseList;
