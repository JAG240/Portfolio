import React from 'react';
import PageTitle from '../includes/PageTitle';

function Resume() {
    return (
        <div className="resume-container">
            <PageTitle title={"My Resume"} />
            <embed className="resume-embed" src="Jacob_Gonos_Resume.pdf" />
        </div>
    );
}

export default Resume;