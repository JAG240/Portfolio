import React from 'react';
import './App.css';
import GameCanvas from './GameCanvas';
import About from './About';
import Projects from './Projects';
import Resume from './Resume';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectsProvider } from './ProjectsContext';

function App() {
    return (
        <Router>
            <div className="App">
                <ProjectsProvider>
                <Routes>
                    <Route path="/" exact element={<GameCanvas />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/resume" element={<Resume /> } />
                </Routes>
                </ProjectsProvider>
            </div>
        </Router>
    );
}

export default App; 