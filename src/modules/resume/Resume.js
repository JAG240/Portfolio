import React from 'react';
import './Resume.css';

function Resume() {
    return (
        <object data="Jacob_Gonos_Resume.pdf" type="application/pdf" className="resume-container" width="100%" height="100%">
            <embed src="https://drive.google.com/file/d/11puuvS-Tf0xBZ8My8EhYm0ISpS9MPDGf/preview?usp=sharing" width="100%" height="100%"/>
        </object>
    );
}

export default Resume;