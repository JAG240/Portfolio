import React, { useState } from 'react';
import './Projects.css';
import Box from '../box/Box';
import ProjectBox from './box/ProjectBox';

import HorrorGif from '../../assets/gifs/horror_game.gif';
import HorrorImg from '../../assets/thumbnails/horror_game_thumb.png';

import PokeGif from '../../assets/gifs/pokemon_map.gif';
import PokeImg from '../../assets/thumbnails/pokemon_map_thumb.png';

import DesignGif from '../../assets/gifs/design_patterns.gif';
import DesignImg from '../../assets/thumbnails/design_patterns_thumbnail.png';

import ColonyGif from '../../assets/gifs/colony_game.gif';
import ColonyImg from '../../assets/thumbnails/colony_game_thumb.png';

import MLGif from '../../assets/gifs/machine_learning.gif';
import MLImg from '../../assets/thumbnails/machine_learning_thumb.png';

import FishGif from '../../assets/gifs/fishing_game.gif';
import FishImg from '../../assets/thumbnails/fishing_game_thumb.png';

function Projects() {
    return (
        <div className="projects-container">
        Click on project box to see github repository
            <div className="project-boxes">
                <div className="grid">
                    <ProjectBox imagesrc={PokeImg} gifsrc={PokeGif} title={"Pokemon Map"} repo={"https://github.com/JAG240/Pokemon-Map"} tags={["HTML", "CSS", "XSLT", "XML", "JQuery"]} text={"In this college project, I delved into the world of web development by utilizing XSLT and XML data to create dynamic templates. The objective was to generate HTML pages for all 151 original Pokemon and 50 locations within the iconic Kanto Region. This endeavor not only honed my skills in XSLT and XML but also introduced me to the fundamentals of HTML and CSS. Through meticulous template design and data manipulation, I successfully brought the rich universe of Pokemon to life on the web, marking a pivotal milestone in my journey as a developer."} />
                    <ProjectBox imagesrc={DesignImg} gifsrc={DesignGif} title={"Design Patterns"} repo={"https://github.com/JAG240/Design_Patterns"} tags={["C#", "Unity"]} text={"Inspired by a deep dive into game design patterns, I embarked on a personal project aimed at implementing various patterns into my codebase. Armed with knowledge of essential design patterns such as Command, Flyweight, Observer, Singleton, and State, as well as decoupling patterns like Event Queue and Service Locator, I set out to enrich my coding repertoire. Each pattern brought its unique perspective and utility, shaping the architecture of my project while enhancing its modularity and maintainability. Through meticulous implementation and thoughtful integration, I not only fortified my understanding of software design principles but also crafted a flexible and robust codebase primed for future expansion and innovation"} />
                    <ProjectBox imagesrc={ColonyImg} gifsrc={ColonyGif} title={"Colony Game"} repo={"https://github.com/JAG240/Colony_Game"} tags={["C#", "Unity"]} text={"Motivated by the intricate mechanics of the game 'Rimworld,' I embarked on a challenging journey to recreate its core elements. Central to this endeavor was the mastery of binary trees, which served as the foundation for implementing essential algorithms such as A* pathfinding and K-D tree for task optimization. The pursuit of these algorithms was driven by a desire to replicate Rimworld's dynamic and strategic gameplay, where efficient pathfinding and task prioritization are paramount for survival and success. Through rigorous study and hands-on experimentation, I not only grasped the intricacies of binary trees but also gained valuable insights into the nuances of game design and optimization. This project stands as a testament to my dedication to mastering complex concepts and translating them into practical solutions."} />
                    <ProjectBox imagesrc={MLImg} gifsrc={MLGif} title={"Machine Learning"} repo={"https://github.com/JAG240/Machine_Learning"} tags={["C#", "Unity", "ML Agents"]} text={"In an exploration of the fascinating realm of reinforcement learning, I delved into the powerful combination of Python-based machine learning library 'ML Agents' and Unity's versatile platform. This immersive project tasked me with training virtual agents, a cunning predator and a nimble prey, within a dynamic, simulated environment. The prey's mission is to outmaneuver the predator and reach safety, while the predator's goal was to intercept and halt its escape. Through meticulous experimentation and iterative training cycles, I honed my understanding of reinforcement learning principles, fine-tuning agent behaviors and strategies to achieve optimal performance. This project not only provided hands-on experience with cutting-edge technologies but also deepened my appreciation for the intricacies of artificial intelligence and its potential applications in diverse fields."} />
                    <ProjectBox imagesrc={FishImg} gifsrc={FishGif} title={"Fishing Game"} repo={"https://github.com/JAG240/FishingGrounds"} tags={["C#", "Unity", "Netcode for GameObjects", "HLSL"]} text={"In my quest to broaden my skill set in game development, I embarked on a captivating project centered around the theme of fishing. This endeavor served as a dual exploration: firstly, delving into the realm of multiplayer game mechanics by mastering netcode for GameObjects in Unity, and secondly, diving into the intricacies of shader writing through an immersive online course in HLSL (High-Level Shading Language). Through meticulous implementation of netcode, I learned the art of synchronizing game states across multiple clients, ensuring a seamless and immersive multiplayer experience. Meanwhile, my foray into HLSL shader writing equipped me with the tools to create stunning visual effects, from cartoon-styled water ripples to dynamic lighting and shading."} />
                    <ProjectBox imagesrc={HorrorImg} gifsrc={HorrorGif} title={"Horror Game"} repo={"https://github.com/JAG240/Trapped"} tags={["C#", "Unity"]} text={"In the culmination of my journey with Unity, I embarked on my most ambitious endeavor yet: the creation of a full-sized indie horror game. This project served as a comprehensive test of my skills, pushing the boundaries of code architecture and clean coding principles as I orchestrated a myriad of interconnected systems within the game world. From intricate AI behaviors to immersive environmental interactions, every aspect of the game was meticulously crafted to deliver a chilling and unforgettable experience for players. Drawing upon the diverse range of skills acquired throughout my software engineering journey, I implemented robust code architecture to ensure scalability, modularity, and maintainability, paving the way for future expansion and iteration. This project not only marked a milestone in my software engineering career but also exemplified my commitment to excellence in technical craftsmanship. Though this project is not publicly ready, if you would like a copy of the first alpha build feel free to reach out to me for a download link."} />
                </div>
            </div>
            <div className="link-boxes">
                <Box text={"About Me"} link={"about"} />
                <Box text={"Resume"} link={"resume"} />
            </div>
        </div>
    );
}

export default Projects;