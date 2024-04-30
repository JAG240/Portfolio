import React from 'react';
import './App.css';
import GameCanvas from '../game/GameCanvas';
import About from '../about/About';
import Projects from '../projects/Projects';
import ProjectBody from '../projects/ProjectBody';
import Resume from '../resume/Resume';
import Footer from '../includes/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectsProvider } from '../projects/ProjectsContext';
import { AboutProvider } from '../about/AboutContext';

function App() {
    return (
        <Router>
            <div className="App">
                <ProjectsProvider>
                    <AboutProvider>
                    <Routes>
                        <Route path="/about" element={<About />} />
                        <Route path="/projects" exact element={<Projects />} />
                        <Route path="/projects/:id" element={ <ProjectBody />} />
                        <Route path="/resume" element={<Resume /> } />
                        <Route path="/" exact element={<GameCanvas />} />
                        </Routes>
                    </AboutProvider>
                </ProjectsProvider>
                <Footer />
            </div>
        </Router>
    );
}

export default App; 