import React, { useContext } from 'react';
import ProfilePicture from '../../assets/profile_picture.jpg';
import PageTitle from '../includes/PageTitle';
import { AboutContext } from '../about/AboutContext';

function About() {

    const [about, setAbout] = useContext(AboutContext)

    return (
        <div className="about-container">
            <PageTitle title={ "About Me" } />
            <div className="about-content-container">
                <img src={ProfilePicture} alt="Picture of me" className="profile-picture" />
                <div className="about-text-container">
                    <span className="about-me-text">{about.aboutText}</span>
                    <span className="sub-header"> My Self-taught Environment</span>
                    <span className="about-me-text">If you view <a href="/projects" className="nav-back-text">My Projects</a> page{about.environmentText}</span>
                </div>
            </div>
        </div>
    );
}

export default About;