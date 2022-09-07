import React, { useState, useContext } from 'react';
import useCollapse from 'react-collapsed';
import ProfilePicture from './profile_picture.jpg';

function Project({ name, summary }) {

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (
        <div className="project-container">
            <div className="project-collapse-label" {...getToggleProps()}>
                <img src={ProfilePicture} className="project-label-image" />
                <span style={{ color: '#000000' }} className="project-label-text">{name}</span>
            </div>
            <div className="project-collapse-conatiner" {...getCollapseProps()}>
                <span style={{ color:'#000000' }}>{summary}</span>
            </div>
        </div>
        );
}

export default Project;