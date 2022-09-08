import React from 'react';

function ProjectBody({ name, summary, collapseID, ID }) {

    return (
        <div className={`project-body-container ${collapseID == ID ? '' : 'hidden'}`} >
            <span className="project-label-text">{ name }</span>
            <span style={{ color: '#000000' }}>{summary}</span>
        </div>
        );
}

export default ProjectBody;