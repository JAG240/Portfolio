import React from 'react';
import Youtube from '../../assets/YouTube.png';
import GitHub from '../../assets/GitHub_Logo.png';
import Linkedin from '../../assets/linkedin.png';
import './Footer.css'

function Footer() {
    return (
        <div className="footer-container">
            <a href="https://github.com/JAG240" target="_blank"><img className="github-logo" src={GitHub} alt="Github logo" /></a>
            <a href="https://www.linkedin.com/in/jacob-gonos-9360a1198/" target="_blank"><img className="linkedin-logo" src={Linkedin} alt="Linkedin logo" /></a>
            <a href="https://www.youtube.com/channel/UCxUV6GVNlG9JVwY200elTwA" target="_blank"><img className="youtube-logo" src={Youtube} alt="Youtube logo" /></a>
        </div>
        );
}

export default Footer;