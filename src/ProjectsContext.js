import React, { useState, createContext } from 'react';

export const ProjectsContext = createContext();

export const ProjectsProvider = props => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Mock ERP",
            summary: "During my time in college I participated in an internship for a company called eLoopLLC. It was my responsibility to research and suggest new technologies. Noticing a need for better resource tracking, I suggest the adoption of an ERP system. To demonstrate the benefits of adopting this system, I created a mock ERP system. eLoopLLC being an ITAD company drove the challenge of this project as the typical ERP solution did not account for this unique business workflow. This effort resulted in the adoption of an ITAD specific ERP solution. ",
            thumbnail: "erp_mock.PNG",
            gif: "erp_mock.PNG",
            usedTech: ["PHP","MySQL","WampServer"],
            links: [
                {
                    name: "What is ITAD",
                    src:"https://www.techtarget.com/whatis/definition/IT-asset-disposition-ITAD#:~:text=IT%20asset%20disposition%20(ITAD)%20is,a%20specialized%20vendor%20handle%20it."
                },
                {
                    name: "eLoopLLC Website",
                    src:"https://www.eloopllc.com/"
                },
                {
                    name: "Github Repository",
                    src:"https://github.com/JAG240/inv_dev"
                }
            ]
        },
        {
            id: 2,
            name: "Bird Game",
            summary: "This project is the first game that I had created in Unity that did not follow a tutorial directly. Additionally, this is the first game I created driven by an idea rather than specifying topics to learn. This project represents a solid foundation for my approach to critical thinking. The third person controller pushed me to start thinking in 3D spaces while the rabbit AI reinforced my understanding of object oriented programming. Though these topics are rudimentary to me now, learning all the skills needed in the project expressed the importance of being able to teach myself. ",
            thumbnail: "bird_game_thumb.PNG",
            gif: "bird_game.gif",
            usedTech: ["Unity Game Engine","C#"],
            links: [
                {
                    name: "YouTube Game Preview Playlist",
                    src: "https://www.youtube.com/playlist?list=PLE2pxyiyfKqCppdZVPywPq9xa18BGmieP",
                },
                {
                    name: "First Game Preview",
                    src: "https://vimeo.com/365918884"
                }
            ]
        },
        {
            id: 3,
            name: "Pokemon Map",
            summary: "The pokemon map is a school project intended as a three person project but had a setback when one member dropped the class. As the project lead, I had made a decision to pursue a resourceful solution to try and make up for this loss. Using XSLT and XML, I scraped the internet for all needed information and stored it in XML files, then used XSLT to generate HTML files. This approach paid off by allowing our project not only to keep to deadlines, and achieve a great grading score, but has become one of my favorite school projects. ",
            thumbnail: "pokemon_map_thumb.PNG",
            gif: "pokemon_map.gif",
            usedTech: ["XSLT","JQuery","XML"],
            links: [
                {
                    name: "Live Website",
                    src: "http://pokemon.newtfire.org/"
                },
                {
                    name: "Github Repository",
                    src: "https://github.com/JAG240/Pokemon-Map"
                }
            ]
        },
        {
            id: 4,
            name: "Hotdog Game",
            summary: "A project designed to be intentionally silly, the hotdog game was my first project using Unity to create a mobile app. Also, it served as my first dive into asset creation as I attempted to create my own 2D sprites. During this project I overcame the challenge of using physics based game play and touch controls. Though quite simple, I even, unknowingly at the time, created my first physically animated rig. Yes, these hotdogs are not boneless and all the wiggles seen are due to real physics acting on these bones. ",
            thumbnail: "hotdog_game_thumb.PNG",
            gif: "hotdog_game.gif",
            usedTech: ["Unity Game Engine","C#"],
            links: [
                {
                    name: "Github Repository",
                    src: "https://github.com/JAG240/hotdog_game"
                }
            ]
        },
        {
            id: 5,
            name: "Machine Learning",
            summary: "After discovering that Unity offered a machine learning library, I decided to set out to see what it offered. Since it may be unclear what is shown above, allow me to explain. There are 2 acting pieces on each board, a predator (red cube) and a prey (blue cube). The prey wants to get to the safety of its home (green cylinder) but the predator is in the way. Through many iterations, I was able to train both of these characters to understand their purposes using reinforcement learning. As this video was taken during a prey training, the board turns green when the prey makes it home successfully and red if the predator stops them. ",
            thumbnail: "machine_learning_thumb.PNG",
            gif: "machine_learning.gif",
            usedTech: ["Unity Game Engine","C#","Unity ML-Agents"],
            links: [
                {
                    name: "Git Repository",
                    src: "https://github.com/JAG240/Machine_Learning"
                },
                {
                    name: "Unity ML-Agents Repository",
                    src: "https://github.com/Unity-Technologies/ml-agents"
                }
            ]
        },
        {
            id: 6,
            name: "Colony Game",
            summary: "After discovering a game titled \"Rimworld\" created by Tynan Sylvester, and a month-long gaming spree, I wanted to pursue the only thing that could be better than playing an amazing game, creating one. For me, this project was a turning point in my software engineering knowledge. It led me to learn some more difficult subjects like AStar pathfinding, KD Trees, and perlin noise map generation. This project taught me the importance of performant design. More importantly, the subjects in this project had proven to be very difficult for me and overcoming this difficulty reminded me why I am passionate about software engineering. This project will always be special to me, even though it will never reach the hands of other gamers. ",
            thumbnail: "colony_game_thumb.PNG",
            gif: "colony_game.gif",
            usedTech: ["Unity Game Engine","C#"],
            links: [
                {
                    name: "Rimworld Website",
                    src: "https://rimworldgame.com/"
                },
                {
                    name: "Github Repository",
                    src: "https://github.com/JAG240/Colony_Game"
                }
            ]
        },
        {
            id: 7,
            name: "Design Patterns",
            summary: "After reviewing all of the code in my previous work, it became clear to me that an opportunity of improvement was organization. Though I don\'t expect any codebase to read like a book, it was clear that my productivity was impacted by my poor design choices. After reading a book titled \"Game Design Patterns\" by Robert Nystrom, I wanted a chance to implement many of these design patterns. This project took a couple of these patterns and applied them in a project that was less focused on becoming a playable game. Ultimately, this information would kickstart my interest and focus on software architecture and improve my code greatly. ",
            thumbnail: "design_patterns_thumbnail.PNG",
            gif: "design_patterns.gif",
            usedTech: ["Unity Game Engine","C#"],
            links: [
                {
                    name: "Game Design Patterns",
                    src: "https://gameprogrammingpatterns.com/"
                },
                {
                    name: "Github Repository",
                    src: "https://github.com/JAG240/Design_Patterns"
                }
            ]
        },
        {
            id: 8,
            name: "Fishing Game",
            summary: "With the pre-release of netcode for gameobjects, I could not resist the urge to take part in testing this feature. Understanding that multiplayer netcode can become a large topic with many difficult subjects, I chose to implement this in a small non-competitive game. Though this project looks simple, it applied a lot of knowledge that I had been practicing. This was the first project using 3D models designed by me. I also used this project to practice coding shaders in HLSL from which I learned from an online course. Though scope creep may have prevented me from making a complete game, this project served as a good introduction to netcode and multiplayer. ",
            thumbnail: "fishing_game_thumb.png",
            gif: "fishing_game.gif",
            usedTech: ["Unity Game Engine","C#","Unity Netcode"],
            links: [
                {
                    name: "Netcode for GameObjects",
                    sir: "https://docs-multiplayer.unity3d.com/netcode/current/about"
                },
                {
                    name: "Github Repository",
                    src: "https://github.com/JAG240/FishingGrounds"
                },
            ]
        },
        {
            id: 9,
            name: "Horror Game",
            summary: "Up until this point, I had either made projects with the intent to learn or have moved onto new projects once I felt that it was time to learn something new. This project is designed to help me with project management and to finally release a fully completed game. I designed this project to have a much smaller scope, apply the knowledge I already have, and utilize third-party assets. Right now, this project is close to a demo release. Pushing myself to fully release this game has shifted my focus from a \"can I\" approach to a \"should I\" approach. I feel this shift best describes the growth I\'ve had in software engineering as I no longer feel overwhelmed when approaching problems I don\'t know how to solve. ",
            thumbnail: "horror_game_thumb.png",
            gif: "horror_game.gif",
            usedTech: ["Unity Game Engine","C#"],
            links: [
                {
                    name: "Unity Asset Store",
                    src: "https://assetstore.unity.com/"
                }
            ]
        },
        {
            id: 10,
            name: "Portfolio Website",
            summary: "I have been working in the IT support field for over 6 years. While this experience has been incredibly fun and rewarding in its own way, I am ready to take steps toward my next thing. Software engineering has been a passion I have fostered for many years and I want to lead my life with this passion. This project is meant to show off the skills I have acquired. Even though this project is my first time using React, the main focus is to instill confidence in my abilities as a software engineer and let my personality out in the process. This is why I designed my site around the original gameboy theme and included a mini game on my landing page. I hope you enjoy reading about my projects and playing my brick breaker/space invaders mini game! ",
            thumbnail: "portfolio_thumb.png",
            gif: "portfolio.gif",
            usedTech: ["Javascipt","React"],
            links: [
                {
                    name: "Github Repository",
                    src: "https://github.com/JAG240/Portfolio"
                }
            ]
        },
    ]);
    return (
        <ProjectsContext.Provider value={[projects, setProjects]}>
            {props.children}
        </ProjectsContext.Provider>
            );
}