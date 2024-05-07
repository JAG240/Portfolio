import React from 'react';
import ProfilePicture from '../../assets/profile_picture.jpg';
import Box from '../box/Box';
import './Home.css';

function Home() {

    return (
        <div class="home-container">
            <div class="home-body">
                <img src={ProfilePicture} className="profile-pic" alt="Picture of Jacob Gonos"/>
                <div className="home-text">Hi, my name is Jacob Gonos. I'm a software engineer driven by a passion for perpetual learning. I enjoy exploring Unity Engine in my spare time, delving into creative, challenging projects. In my professional role, I apply this enthusiasm to tackle real-world challenges, continuously expanding my expertise while making meaningful contributions to large-scale business technologies. Feel free to explore more about me, my projects, and my resume to gain deeper insights into my journey and capabilities.</div>
                <div className="link-boxes">
                    <Box text={"About Me"} link={"about"}/>
                    <Box text={"Projects"} link={"projects"}/>
                    <Box text={"Resume"} link={"resume"}/>
                </div>
            </div>
        </div>
    );
}

export default Home;