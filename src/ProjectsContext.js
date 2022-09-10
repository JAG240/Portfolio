import React, { useState, createContext } from 'react';

export const ProjectsContext = createContext();

export const ProjectsProvider = props => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Mock ERP",
            summary: "This project was created during my internship with eLoop.",
            thumbnail: "erp_mock.png",
            gif: "erp_mock.png"
        },
        {
            id: 2,
            name: "Bird Game",
            summary: "My first game created without a set tutorial.",
            thumbnail: "bird_game_thumb.png",
            gif: "bird_game.gif"
        },
        {
            id: 3,
            name: "Pokemon Map",
            summary: "School project used to introduce me to basics of web development.",
            thumbnail: "pokemon_map_thumb.png",
            gif: "pokemon_map.gif"
        },
        {
            id: 4,
            name: "Hotdog Game",
            summary: "2D physics driven game designed as mobile app.",
            thumbnail: "hotdog_game_thumb.png",
            gif: "hotdog_game.gif"
        },
        {
            id: 5,
            name: "Machine Learning",
            summary: "Integrated library with unity to run re-enforcement learning algorithims.",
            thumbnail: "machine_learning_thumb.png",
            gif: "machine_learning.gif"
        },
        {
            id: 6,
            name: "Colony Game",
            summary: "Inspired by Rimworld attempted to create a faithful clone and learned difficult topics.",
            thumbnail: "colony_game_thumb.png",
            gif: "colony_game.gif"
        },
        {
            id: 7,
            name: "Design Patterns",
            summary: "After reading design pattern book, I wanted to implement into project to apply the knowledge.",
            thumbnail: "design_patterns_thumbnail.png",
            gif: "design_patterns.gif"
        },
        {
            id: 8,
            name: "Fishing Game",
            summary: "First project using unity netcode. Applied shader knowledge.",
            thumbnail: "fishing_game_thumb.png",
            gif: "fishing_game.gif"
        },
        {
            id: 9,
            name: "Horror Game",
            summary: "Getting comfortable with using unity assets. First dive into sound design and level design.",
            thumbnail: "horror_game_thumb.png",
            gif: "horror_game.gif"
        },
        {
            id: 10,
            name: "Portfolio Website",
            summary: "First time using react. Revisiting web development.",
            thumbnail: "portfolio_thumb.png",
            gif: "portfolio.gif"
        },
    ]);
    return (
        <ProjectsContext.Provider value={[projects, setProjects]}>
            {props.children}
        </ProjectsContext.Provider>
            );
}