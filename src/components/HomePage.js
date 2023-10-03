import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const theme = {
    primary: '#007bff', // a shade of blue
    secondary: '#6c757d', // a shade of gray
    light: '#f8f9fa',
    dark: '#343a40',
    font: 'Roboto, sans-serif',
    cardBackground: '#F5F5DC', // a beige color
    footerBackground: '#8B4513',
    
    };

const GlobalStyle = createGlobalStyle`
    body {
        font-family: ${theme.font};
        margin: 0;
    }
`;

const HomepageContainer = styled.div`
    text-align: center;
`;

const Header = styled.header`
    background: linear-gradient(to right, ${theme.primary}, ${theme.secondary});
    color: white;
    padding: 20px 0;
    position: relative;
    transition: background 0.3s ease; /* Add transition for background color on hover */

    &:hover {
         transform: scale(1.03); /* Scale on hover */                                                                                                                                                         box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Enhanced box shadow on hover */    
    }
`;

const SearchContainer = styled.div`
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
      @media (max-width: 767px) {
        /* Styles specifically for mobile phones (screens with a maximum width of 767px) */
        position: static; /* Remove absolute positioning for mobile phones */
        margin-top: 10px; /* Add margin from the top for mobile phones */
        text-align: center; /* Center the content for mobile phones */
`;

const SearchForm = styled.form`
    display: flex;
    flex-direction: column; /* Stack input and button */
    align-items: center; /* Center elements horizontally */
    @media (max-width: 767px) {
        /* Styles specifically for mobile phones (screens with a maximum width of 767px) */
        flex-direction: row; /* Reset flex-direction for mobile phones */
        justify-content: center; 
`;

const SearchBar = styled.input.attrs({ type: 'search' })`
    padding: 10px;
    border-radius: 5px;
    border: none;
    width: 100%; /* Make the input full width */
    margin-bottom: 10px; /* Add some spacing between input and button */

    @media (max-width: 767px) {
        /* Styles specifically for mobile phones (screens with a maximum width of 767px) */
        width: 100%; /* Keep the input full width for mobile phones */
        margin-top: 30px; /* Add margin from the top for mobile phones */
        margin-bottom: 10px; /* Adjust margin-bottom for mobile phones */
    }
    
    @media (min-width: 768px) {
        /* Adjust styles for larger screens (e.g., tablets and desktops) */
        width: auto; /* Reset width for larger screens */
        margin-top: 0px; /* Remove margin for larger screens */
    }
`;

const SearchButton = styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: ${theme.primary};
    color: white;
    width: 100%; /* Make the button full width */
    margin-top: 20px; /* Add margin from the top */

    @media (min-width: 768px) {
        /* Adjust styles for larger screens (e.g., tablets and desktops) */
        width: auto; /* Reset width for larger screens */
        margin-top: 0px; /* Remove margin for larger screens */
    }
`;


const Hero = styled.section`
    background-image: url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/hands-of-african-children-need-help-uygargeographic.jpg');
    height: 300px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    @media (min-width: 768px) {
        height: 500px;
    }

    @media (min-width: 1024px) {
        height: 600px;
    }

`;



const CardContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Center cards horizontally */
`;

const Card = styled.div`
    padding: 20px;
    margin: 20px;
    width: calc(90% - 40px);
    border-radius: 15px;
    background: linear-gradient(to bottom right, #f5f5dc, #ffe4b5); /* Gradient Background */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: scale(1.03); /* Scale on hover */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Enhanced box shadow on hover */
    }

    h2 {
        font-size: 24px;
        margin-bottom: 10px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Text shadow for better readability */
    }

    p {
        font-size: 16px;
    }
`;

const Button = styled.button`
    padding: 0.5em 1em;
    margin-right: 0.5em;
`;

const Footer = styled.footer`
    // ... (footer styles)
  background-color: ${theme.footerBackground};
   color: ${theme.light}; // assuming you want a light text color that contrasts with the dark background
   padding: 20px 0;
   transition: background-color 0.3s ease; /* Add transition for background color on hover */

    &:hover {
         transform: scale(1.03); /* Scale on hover */                                                                                                                                                         box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Enhanced box shadow on hover */    
    }
`;

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
	setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
	event.preventDefault();
	// Handle search submit...
    };

    return (
	<>
	    <GlobalStyle />
	    <HomepageContainer>
		<Header>
		    <h1>Welcome to EduTech</h1>
		    <p>Empowering African Students Through Technology</p>
		    <SearchContainer>
			<SearchForm onSubmit={handleSearchSubmit}>
			    <SearchBar
			    value={searchTerm}
			    onChange={handleSearchChange}
			    placeholder="Search..."
			    />
			    <SearchButton type="submit">Go</SearchButton>
			</SearchForm>
		    </SearchContainer>
		</Header>
		<Hero />
		<CardContainer>
		    <Card id="about">
			<h2>About Us</h2>
			<p>
			    EduTech is an e-learning platform dedicated to helping African students learn tech. We offer
			    a wide range of courses in various tech fields.
			</p>
			</Card>
		    <Card id="goals">
			<h2>Goals</h2>
			<p>Our goals revolve around diverse, accessible learning opportunities. We strive for excellence, innovation, and accessibility, aiming to empower African students to excel in the tech industry.</p>
			
		    </Card>
		    <Card id="vision">
			<h2>Vision</h2>
			<p>Our vision is to provide accessible and high-quality tech education to every African student.</p>
		    </Card>
		    <Card id="mission">
			<h2>Mission</h2>
			<p>Our mission is to empower African students with the skills and knowledge they need to thrive in the tech industry.</p>
		    </Card>
		</CardContainer>
		<Footer>
		    <p>© 2023 EduTech. All rights reserved.</p>
		</Footer>
	    </HomepageContainer>
	</>
	    );
};

export default Homepage;
