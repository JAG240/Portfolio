import React from 'react';
import './App.css';
import GameCanvas from './GameCanvas';
import About from './About';
import Projects from './Projects';
import ProjectBody from './ProjectBody';
import Resume from './Resume';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectsProvider } from './ProjectsContext';
import { AboutProvider } from './AboutContext';

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