import React, { useContext } from 'react';
import PageTitle from './PageTitle';
import { ProjectsContext } from './ProjectsContext';
import ProjectLabel from './ProjectLabel';



function Projects() {

    const [projects, setProjects] = useContext(ProjectsContext);

    return (
        <div className="projects-container">
            <PageTitle title={"My Projects"} />
            <div className="projects-select-container">
                {projects.map(project => (
                    <ProjectLabel key={project.id} name={project.name} ID={project.id} thumbnail={project.thumbnail} />
                ))}
            </div>
        </div>
    );
}

export default Projects;