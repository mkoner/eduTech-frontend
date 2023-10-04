import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminList from './pages/adminList/AdminList';
import AdminLogin from './pages/adminLogin/AdminLogin';
import LearnerLogin from './pages/learnerLogin/LearnerLogin';
import LearnerList from './pages/learnerList/LearnerList';
import CourseList from './pages/courseList/CourseList';
import AdminDetailsPage from './pages/adminDetailsPage/AdminDetailsPage';
import LearnerDetailsPage from './pages/learnerDetailsPage/LearnerDetailsPage';
import CourseDetailsPage from './pages/courseDetailsPage/CourseDetailsPage';
import AddCourseMaterial from './pages/addCourseMaterial/AddCourseMaterial';
import AdminCourseCreation from './pages/adminCourseCreation/AdminCourseCreation';
import MyCourseList from './pages/myCourses/myCourses';
import MyCourseDetailsPage from './pages/myCourseDetailsPage/myCourseDetailsPage';
import Header from './components/header/header';
import LearnerSignUp from './pages/learnerSignUp/LearnerSignUp';
import AddAdmin from './pages/addAdmin/AddAdmin';
import Profile from './pages/profile/profile';

import './App.css'

/*
<nav className="navbar navbar-expand-lg navbar-light bg-light">
		    <div className="container-fluid">
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
			    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
			    <li className="nav-item"><Link className="nav-link" to="/admins">Admin</Link></li>
			    <li className="nav-item"><Link className="nav-link" to="/learners">Learners</Link></li>
			    <li className="nav-item"><Link className="nav-link" to="/course-materials">Course Materials</Link></li>
			    <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
				<li className="nav-item"><Link className="nav-link" to="learners/my-courses">My courses</Link></li>
			</ul>
		    </div>
		</nav>
*/

const App = () => {
    return (
	<Router>
	    <div>
		<Header/>
		<Routes>
		    <Route path="/" element={<HomePage />} />
		    <Route path="/admins" element={<AdminList />} />
			<Route path="/admins/login" element={<AdminLogin />} />
			<Route path="/admins/new" element={<AddAdmin />} />
			<Route path="/admins/:id" element={<AdminDetailsPage />} />
		    <Route path="/learners" element={<LearnerList />} />
			<Route path="/learners/login" element={<LearnerLogin />} />
			<Route path="/learners/signup" element={<LearnerSignUp />} />
			<Route path="/learners/my-courses" element={<MyCourseList />} />
			<Route path="/learners/:id" element={<LearnerDetailsPage />} />
		    <Route path="/courses" element={<CourseList />} />
			<Route path="/add-course" element={<AdminCourseCreation />} />
			<Route path="/courses/:id" element={<CourseDetailsPage />} />
			<Route path="/mycourses/:id" element={<MyCourseDetailsPage />} />
			<Route path="add-material/:id" element={<AddCourseMaterial />} />
			<Route path="/profile" element={<Profile />} />

		</Routes>
	    </div>
	</Router>
    );
};

export default App;
