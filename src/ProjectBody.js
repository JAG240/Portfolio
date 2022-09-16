import React, { useState, useContext, useEffect } from 'react';
import PageTitle from './PageTitle';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ProjectsContext } from './ProjectsContext';

function ProjectBody() {

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [projects, setProjects] = useContext(ProjectsContext);
    const [project, setProject] = useState(projects.find(element => element.id == params.id));
    const [prevProject, setPrevProject] = useState(projects.find(element => element.id == (parseInt(params.id) - 1)));
    const [nextProject, setNextProject] = useState(projects.find(element => element.id == (parseInt(params.id) + 1)));

    useEffect(() => {
        setProject(projects.find(element => element.id == params.id));
        setPrevProject(projects.find(element => element.id == (parseInt(params.id) - 1)));
        setNextProject(projects.find(element => element.id == (parseInt(params.id) + 1)));
    }, [location]);

    const routeChange = (id) => {
        navigate(`/projects/${id}`);
    }

    const NavProjectButton = ({curProject}) => {
        return (
            <div className="nav-project-container">
                <img src={`/thumbnails/${curProject.thumbnail}`} className='project-nav-image' onClick={() => routeChange(curProject.id)} />
                <span className="project-label-text">{curProject.name}</span>
            </div>
        );
    }

    return (
        <div className="projects-container">
            <PageTitle title={project.name} />
            <div className="project-body-container">
                <img src={`/gifs/${project.gif}`} className="project-image" />
                <span className="project-sub-header">About this project</span>
                <span className="project-text">{project.summary}</span>
                <span className="project-sub-header">Tech Stack</span>
                <ul>
                {project.usedTech.map(tech => (
                    <React.Fragment key={tech}>
                        <li className="project-list-item">{tech}</li>
                    </React.Fragment>
                ))}
                </ul>
                <span className="project-sub-header">Sources</span>
                <ul>
                {project.links.map(link => (
                    <React.Fragment key={link.name}>
                        <li><a className="nav-back-text" target="_blank" href={link.src}>{link.name}</a></li>
                    </React.Fragment>
                ))}
                </ul>
            </div>
            <div className="navigation">
                <div className="navigation-panel-container">
                    {prevProject != null ? <NavProjectButton curProject={prevProject} /> : null}
                    <div className="nav-project-container">
                        <a href="/projects" className="nav-back-text">Back to Project List</a>
                    </div>
                    {nextProject != null ? <NavProjectButton curProject={nextProject} /> : null}
                </div>
            </div>
        </div>
        );
}

export default ProjectBody;