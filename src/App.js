import React from 'react';
import './App.css';
import GameCanvas from './GameCanvas';
import About from './About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" exact element={<GameCanvas />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 