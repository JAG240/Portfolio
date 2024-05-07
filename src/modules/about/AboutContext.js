import React, { createContext, useState } from 'react';

export const AboutContext = createContext();

export const AboutProvider = props => {
    const projectLink= () => {
        return(
            <a href="">My Project</a>
        );
    }
    const [about, setAbout] = useState({
        aboutText: `Hi, my name is Jacob Gonos. Professionally I am a seasoned technical support engineer with \
                    over 6 years supporting my clients to achieve the best experience they can when using technology. While pursuing \
                    my higher education at University of Pittsburgh at Greensburg (UPG) I discovered my passion for software engineering. \
                    Though UPG did not offer a computer science program, I achieved my Bachelors of Science in Information Technology \
                    and took my passion for software engineering into my own hands. I curated an environment that would encourage my \
                    passion to learn software engineering skills.`,

        environmentText: `, you will discover that I use the Unity game engine to teach myself a broad \
                          variety of topics. While I love software engineering any project, I have found I am most passionate about game \
                          development. I have found that game development provides some of the most challenging issues and forced me to not \
                          just learn how to write code but to engineer performant, elegant solutions. \
                          Having connections with friends that were studying computer science at the time, now \
                          professional software engineers, provide invaluable guidance and experience. I was fortunate enough that \
                          these friends shared my passion in software engineering. Oftentimes this would lead to, and still often does \
                          lead to, long peer programming sessions. Each of us present our own approach to problem solving and manage \
                          to find, not which of our solutions is best but, how we can build the best solution using parts of each of our \
                          solutions. This experience along with my passion for software engineering drives me to pursue a professional \
                          environment that is the same. I cannot see myself being happy doing anything else for the rest of my life.`
    });
    return (
        <AboutContext.Provider value={[about, setAbout]}>
            {props.children}
        </AboutContext.Provider>
        );
}