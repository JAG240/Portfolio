import React from 'react';
import ProfilePicture from '../../assets/profile_picture.jpg';
import './About.css';
import Box from '../box/Box';
import WaveWhite from '../../assets/WaveWhite.jpg';
import WaveBlack from '../../assets/WaveBlack.jpg';
import GameWhite from '../../assets/GameWhite.jpg';
import GameBlack from '../../assets/GameBlack.jpg';
import CaseWhite from '../../assets/CaseWhite.jpg';
import CaseBlack from '../../assets/CaseBlack.jpg';
import ChipWhite from '../../assets/ChipWhite.jpg';
import ChipBlack from '../../assets/ChipBlack.jpg';

function About({isDark}) {
    return (
        <div className="about-container">
            <div className="about-sections">

                {/*Section 1*/}

                <div className="section-left">
                    <div className="section-image">
                        <img src={ProfilePicture} className="about-profile-pic" alt="Picture of Jacob Gonos"/>
                    </div>
                    <div className="section-text">
                        Hello there! I'm Jacob Gonos, a software engineer with a passion for crafting innovative solutions and pushing myself to continue learning. I graduated from the University of Pittsburgh with a Bachelor of Science in Information Technology, where I laid the foundation for my journey into the world of software engineering. It was during my time at Pitt that I discovered my deep-seated passion for coding and problem-solving.
                    </div>
                </div>

                {/*Section 2*/}

                <div className="section-right">
                    <div className="section-text">
                        My fascination with software engineering led me to delve into the realm of open-source development, where I honed my skills using the Unity Engine. Through self-directed learning and practice, I immersed myself in coding topics and design patterns, laying the groundwork for my future endeavors.
                    </div>
                    <div className="section-image">
                        <img src={isDark ? GameWhite : GameBlack} className="about-profile-pic" alt="Picture of Jacob Gonos"/>
                    </div>
                </div>

                {/*Section 3*/}

                <div className="section-left">
                    <div className="section-image">
                        <img src={isDark ? CaseWhite : CaseBlack} className="about-profile-pic" alt="Picture of Jacob Gonos"/>
                    </div>
                    <div className="section-text">
                        My journey into the professional sphere began with shadowing experienced software engineers at Coupa Software, where I had the invaluable opportunity to immerse myself in managing large codebases and working with technologies like Ruby on Rails. The knowledge and skills I gained from my university projects proved to be invaluable assets during this formative period of my career.
                    </div>
                </div>

                {/*Section 4*/}

                <div className="section-right">
                    <div className="section-text">
                        One of the highlights of my journey has been the projects I've created using the Unity Engine. These projects not only allowed me to explore my creativity but also served as a springboard for developing new features and refining my coding abilities. Even in my current role, the skills I acquired from working with Unity continue to be instrumental.
                    </div>
                    <div className="section-image">
                        <img src={isDark ? ChipWhite : ChipBlack} className="about-profile-pic" alt="Picture of Jacob Gonos"/>
                    </div>
                </div>

                {/*Section 5*/}

                <div className="section-left">
                    <div className="section-image">
                        <img src={isDark? WaveWhite : WaveBlack} className="about-profile-pic" alt="Picture of Jacob Gonos"/>
                    </div>
                    <div className="section-text">
                        As I continue to evolve in my career, I am driven by a relentless pursuit of excellence and a commitment to leveraging technology to make a positive impact. I'm always eager to tackle new challenges and collaborate with like-minded individuals who share my passion for innovation. Feel free to reach out. I'd love to connect and explore how we can work together.
                    </div>
                </div>

                <div className="link-boxes">
                    <Box text={"Projects"} link={"projects"}/>
                    <Box text={"Resume"} link={"resume"}/>
                </div>

            </div>
        </div>
    );
}

export default About;