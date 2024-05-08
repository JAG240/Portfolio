import React from 'react';
import './Resume.css';
import Box from '../box/Box';

function Resume() {
    return (
        <div className="resume">
            <object data="Jacob_Gonos_Resume.pdf" type="application/pdf" className="resume-container" width="100%" height="100%">
                <embed src="https://drive.google.com/file/d/11puuvS-Tf0xBZ8My8EhYm0ISpS9MPDGf/preview?usp=sharing" width="100%" height="100%"/>
            </object>

            <div className="link-boxes">
                    <Box text={"About Me"} link={"about"} />
                    <Box text={"Projects"} link={"projects"} />
            </div>
        </div>
    );
}

export default Resume;