import React from "react";
import { useNavigate } from 'react-router-dom'

import './CourseCard.css'

const CourseCard = ({ course, mycourse = false }) => {
  const navigate = useNavigate();
  if (mycourse) {
    return(
      <div className="course-card" onClick={()=>navigate(`/mycourses/${course.id}`)}>
      <div className="card-header">
        <h2>{course.course_name}</h2>
      </div>
      <div className="card-body">
        <p>{course.description}</p>
      </div>
    </div>
    );
  }
  return (
    <div className="course-card" onClick={()=>navigate(`/courses/${course.id}`)}>
      <div className="card-header">
        <h2>{course.course_name}</h2>
      </div>
      <div className="card-body">
        <p>{course.description}</p>
      </div>
    </div>
  );
};

export default CourseCard;