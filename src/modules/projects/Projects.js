import React, { useContext } from 'react';
import PageTitle from '../includes/PageTitle';
import { ProjectsContext } from './ProjectsContext';
import ProjectLabel from './ProjectLabel';



function Projects() {

    const [projects, setProjects] = useContext(ProjectsContext);

    return (
        <div className="projects-container">
            <PageTitle title={"My Projects"} />
            <div className="projects-body-container">
                <div className="projects-intro-text-container">
                    <span className="projects-intro-text">This is an archive of all my previous and current projects.Most of these projects are learning projects that were not intended for public release.You will see that many of them lack polish or finish as they were designed to encourage me to learn specific topics or, more commonly, used to discover new topics as I attempted to build my own ideas. Most importantly, very few of these projects were school projects, meaning they lacked any grading incentives and were entirely driven by my passion.</span>
                </div>
                <div className="projects-select-container">
                    {projects.map(project => (
                        <ProjectLabel key={project.id} name={project.name} ID={project.id} thumbnail={project.thumbnail} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;