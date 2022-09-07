import React, { useState, useContext } from 'react';
import ProfilePicture from './profile_picture.jpg';
import PageTitle from './PageTitle';
import aboutText from './AboutContext';

function About() {
    return (
        <div className="about-container">
            <PageTitle title={ "About Me" } />
            <div className="about-content-container">
                <img src={ProfilePicture} alt="Picture of me" className="profile-picture" />
                <span className="about-me-text">{aboutText}</span>
            </div>
        </div>
    );
}

export default About;