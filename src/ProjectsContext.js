import React, { useState, createContext } from 'react';

export const ProjectsContext = createContext();

export const ProjectsProvider = props => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Mock ERP",
            summary: "During my time in college I participated in an internship for a company called eLoopLLC. \
                      During this internship I was responsible for researching and recommending new technology \
                      that would increase the efficiency of the business. I had noticed immediately that the \
                      business was in need of better tracking of workflow. My solution for this was to suggest \
                      the adoption of an ERP system. Though the benefits of this system were not immediately \
                      apparent to all. To demonstrate how the ERP could impact business planning, I created \
                      a small mock ERP system. ",
            thumbnail: "erp_mock.PNG",
            gif: "erp_mock.PNG",
            subheaders: [
                {
                    header: "ITAD ERP",
                    text: "Information Technology Asset Disposition (ITAD) is an industry standard for reusing, recycling, and disposing of old and \
                           unwanted technology. An Enterprise Resource Planning (ERP) system for an ITAD company must be specialized as ITAD companies \
                           often need to track many non-standard metrics like device and memory serial number along with refurbished Operating Software licenses \
                           and even pounds of harvested metals. The challenge of this project was creating a single point of entry for all required data but, \
                           allowing that single entry to take on multiple dispositions. In example, if a laptop was harvested for parts to sell and then \
                           recycled for metals, the ERP should track how much value was generated from that single entry. This would allow the business to \
                           track which methods of recycling would generate the most value. "
                }
            ],
            links: [
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
            summary: "My first game created without a set tutorial.",
            thumbnail: "bird_game_thumb.PNG",
            gif: "bird_game.gif",
            subheaders: [
                {
                    header: "",
                    text: ""
                }
            ],
            links: [
                {
                    name: "",
                    src: ""
                }
            ]
        },
        {
            id: 3,
            name: "Pokemon Map",
            summary: "School project used to introduce me to basics of web development.",
            thumbnail: "pokemon_map_thumb.PNG",
            gif: "pokemon_map.gif",
            subheaders: [
                {
                    header: "",
                    text: ""
                }
            ],
            links: [
                {
                    name: "",
                    src: ""
                }
            ]
        },
        {
            id: 4,
            name: "Hotdog Game",
            summary: "2D physics driven game designed as mobile app.",
            thumbnail: "hotdog_game_thumb.PNG",
            gif: "hotdog_game.gif",
            subheaders: [
                {
                    header: "",
                    text: ""
                }
            ],
            links: [
                {
                    name: "",
                    src: ""
                }
            ]
        },
        {
            id: 5,
            name: "Machine Learning",
            summary: "Integrated library with unity to run re-enforcement learning algorithims.",
            thumbnail: "machine_learning_thumb.PNG",
            gif: "machine_learning.gif",
            subheaders: [
                {
                    header: "",
                    text: ""
                }
            ],
            links: [
                {
                    name: "",
                    src: ""
                }
            ]
        },
        {
            id: 6,
            name: "Colony Game",
            summary: "Inspired by Rimworld attempted to create a faithful clone and learned difficult topics.",
            thumbnail: "colony_game_thumb.PNG",
            gif: "colony_game.gif",
            subheaders: [
                {
                    header: "",
                    text: ""
                }
            ],
            links: [
                {
                    name: "",
                    src: ""
                }
            ]
        },
        {
            id: 7,
            name: "Design Patterns",
            summary: "After reading design pattern book, I wanted to implement into project to apply the knowledge.",
            thumbnail: "design_patterns_thumbnail.PNG",
            gif: "design_patterns.gif",
            subheaders: [
                {
                    header: "",
                    text: ""
                }
            ],
            links: [
                {
                    name: "",
                    src: ""
                }
            ]
        },
        {
            id: 8,
            name: "Fishing Game",
            summary: "First project using unity netcode. Applied shader knowledge.",
            thumbnail: "fishing_game_thumb.png",
            gif: "fishing_game.gif",
            subheaders: [
                {
                    header: "",
                    text: ""
                }
            ],
            links: [
                {
                    name: "",
                    src: ""
                }
            ]
        },
        {
            id: 9,
            name: "Horror Game",
            summary: "Getting comfortable with using unity assets. First dive into sound design and level design.",
            thumbnail: "horror_game_thumb.png",
            gif: "horror_game.gif",
            subheaders: [
                {
                    header: "",
                    text: ""
                }
            ],
            links: [
                {
                    name: "",
                    src: ""
                }
            ]
        },
        {
            id: 10,
            name: "Portfolio Website",
            summary: "First time using react. Revisiting web development.",
            thumbnail: "portfolio_thumb.png",
            gif: "portfolio.gif",
            subheaders: [
                {
                    header: "",
                    text: ""
                }
            ],
            links: [
                {
                    name: "",
                    src: ""
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