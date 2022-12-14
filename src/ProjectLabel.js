import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectLabel({ name, ID, thumbnail }) {

    let navigate = useNavigate();

    const routeChange = () => {
        navigate(`/projects/${ID}`);
    }

    return (
        <div className="project-container">
            <img src={`/thumbnails/${thumbnail}`} className='project-label-image' onClick={routeChange}/>
            <span style={{ color: '#000000' }} className="project-label-text">{name}</span>
        </div>
        );
}

export default ProjectLabel;