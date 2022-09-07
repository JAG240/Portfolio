import React, { useState, createContext } from 'react';

export const ProjectsContext = createContext();

export const ProjectsProvider = props => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Test Project 1",
            summary: "This is a test project"
        },
        {
            id: 2,
            name: "Test Project 2",
            summary: "This is a test project for the second time"
        },
        {
            id: 3,
            name: "Test Project 3",
            summary: "You guessed it, yet another"
        },
        {
            id: 4,
            name: "Test Project 4",
            summary: "Almost there, I promise"
        },
        {
            id: 5,
            name: "Test Project 5",
            summary: "Okay there we go, this should be good for testing"
        },
    ]);
    return (
        <ProjectsContext.Provider value={[projects, setProjects]}>
            {props.children}
        </ProjectsContext.Provider>
            );
}