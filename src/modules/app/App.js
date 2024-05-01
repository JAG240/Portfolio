import React from 'react';
import './App.css';
import Footer from '../includes/Footer';
import PageTitle from '../includes/PageTitle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Resume from '../resume/Resume';

function App() {
    return (
        <Router>
            <div className="App">
            <PageTitle />
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/resume" exact element={<Resume />} />
                    </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App; 