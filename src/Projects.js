import React, { useState, useContext} from 'react';
import PageTitle from './PageTitle';
import { ProjectsContext } from './ProjectsContext';
import Project from './Project';

function Projects() {

    const [projects, setProjects] = useContext(ProjectsContext);

    return (
        <div className="projects-container">
            <PageTitle title={"My Projects"} />
            <div className="projects-grid-container">
                {projects.map(project => (
                    <Project name={project.name} summary={project.summary} key={project.id} />
                ))}
            </div>
        </div>
    );
}

export default Projects;