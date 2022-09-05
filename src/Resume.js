import React from 'react';
import PageTitle from './PageTitle';

function Resume() {
    return (
        <div className="resume-container">
            <PageTitle title={"My Resume"} />
            <embed src="Jacob_Gonos_Resume.pdf" width="747px" height="885" />
        </div>
    );
}

export default Resume;