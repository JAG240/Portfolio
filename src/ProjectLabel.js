import React, { useState } from 'react';
import ProfilePicture from './profile_picture.jpg';

function ProjectLabel({ setCollapseID, name, ID, collapseID, thumbnail }) {
    return (
        <div className="project-container" onClick={() => setCollapseID(ID.toString())}>
            <div className="project-collapse-label">
                <img src={`/thumbnails/${thumbnail}`} className={`project-label-image ${collapseID == ID ? 'selected' : ''}`} />
                <span style={{ color: '#000000' }} className="project-label-text">{name}</span>
            </div>
        </div>
        );
}

export default ProjectLabel;