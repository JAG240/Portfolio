import React from 'react';
import ProfilePicture from './profile_picture.jpg';
import PageTitle from './PageTitle';

function About() {
    return (
        <div className="about-container">
            <PageTitle title={ "About Me" } />
            <div className="about-content-container">
                <img src={ProfilePicture} alt="Picture of me" className="profile-picture" />
                <span className="about-me-text">This is a test with really really long text so that I can see how this will wrap. If you couldn't tell I have been trying to make up stuff to say as a test for this container styling.</span>
            </div>
        </div>
    );
}

export default About;