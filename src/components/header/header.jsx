import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './header.css';

const Header = () => {
    const navigate = useNavigate();
    const userType = localStorage.getItem("userType") ? localStorage.getItem("userType") : null;
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
    const handleLogOut = (evt) => {
        evt.preventDefault();
        localStorage.removeItem("userType");
        localStorage.removeItem("token");
        navigate("/")
    }
    return (
	<header className="header">
	    <h1>EduTech</h1>
	    <nav>
		<Link to="/">Home</Link>
		<Link to="/courses">Courses</Link>
        {
            userType == "Admin" &&
            <div>
                <Link to="/admins">Admins</Link>
                <Link to="/learners">Learners</Link>
            </div>
        }
        {
            userType == "Learner" &&
            <div>
                <Link to="/learners/my-courses">My courses</Link>
            </div>
        }
        {
            userType && 
            <div>
                <Link to="/profile">profile</Link>
                <Link to="/logout" onClick={handleLogOut}>log out</Link>
            </div>
        }
        {
            !userType && 
            <div>
                <Link to="/learners/login">Login</Link>
            </div>
        }
	    </nav>
	</header>
    );
}

export default Header;
