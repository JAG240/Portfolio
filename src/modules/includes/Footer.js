import React from 'react';
import Youtube from '../../assets/YouTube.png';
import GitHubWhite from '../../assets/GitHub_Logo_White.png';
import GitHubBlack from '../../assets/GitHub_Logo_Black.png';
import Linkedin from '../../assets/linkedin.png';
import './Footer.css'

function Footer({isDark}) {
    return (
        <div className="footer-container">
            <a href="https://github.com/JAG240" target="_blank"><img className="github-logo" src={isDark ? GitHubWhite : GitHubBlack} alt="Github logo" /></a>
            <a href="https://www.linkedin.com/in/jacob-gonos-9360a1198/" target="_blank"><img className="linkedin-logo" src={Linkedin} alt="Linkedin logo" /></a>
            <a href="https://www.youtube.com/channel/UCxUV6GVNlG9JVwY200elTwA" target="_blank"><img className="youtube-logo" src={Youtube} alt="Youtube logo" /></a>
        </div>
        );
}

export default Footer;