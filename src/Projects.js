import React, { useState, useContext } from 'react';
import PageTitle from './PageTitle';
import { ProjectsContext } from './ProjectsContext';
import ProjectLabel from './ProjectLabel';
import ProjectBody from './ProjectBody';



function Projects() {

    const [projects, setProjects] = useContext(ProjectsContext);
    const [collapseID, setCollapseID] = useState(null);

    function updateCollapseID(id) {
            setCollapseID(id == collapseID ? null : id);
    }

    function GetProjects() {

        let content = [];

        for (let i = 0; i < projects.length; i += 3) {
            content.push(
                <React.Fragment key={i}>
                    <div className="project-batch-container">
                        {projects.slice(i, i + 3).map(project => (
                            <ProjectLabel key={project.id} name={project.name} ID={project.id} collapseID={collapseID} setCollapseID={updateCollapseID} thumbnail={project.thumbnail} />
                        ))}
                    </div>
                    <div className="project-collapse-container">
                        {projects.slice(i, i + 3).map(project => (
                            <ProjectBody key={project.id} name={project.name} summary={project.summary} collapseID={collapseID} ID={project.id} />
                        ))}
                    </div>
                </React.Fragment>
            );
        }

        return content;
    }

    return (
        <div className="projects-container">
            <PageTitle title={"My Projects"} />
            <div className="projects-select-container">
                {GetProjects()}
            </div>
        </div>
    );
}

export default Projects;