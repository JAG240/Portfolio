import { React, useState } from 'react';
import './App.css';
import Footer from '../includes/Footer';
import PageTitle from '../includes/PageTitle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Resume from '../resume/Resume';

function App() {

    const [isDark, setDark] = useState(false);

    const changeState = () => {
        setDark(!isDark);
        document.documentElement.style.setProperty('--theme', isDark ? "#191919" : "#b5b5b5");
        document.documentElement.style.setProperty('--box-theme', isDark ? "#00000010" : "#FFFFFF10");
        document.documentElement.style.setProperty('--default-text-color', isDark ? "#000000" : "#FFFFFF");
        document.documentElement.style.setProperty('--passive-text-color', isDark ? "#696969" : "#B2B2B2");
    }

    document.documentElement.style.setProperty('--theme', isDark ? "#191919" : "#FFFFFF");

    return (
        <Router>
            <div className="App">
            <button type="button" className="themeToggle" onClick={changeState}>{isDark ? "Lights on" : "Lights out"}</button> 
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