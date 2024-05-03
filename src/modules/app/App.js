import { React, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from '../includes/Footer';
import PageTitle from '../includes/PageTitle';
import Resume from '../resume/Resume';
import Sun from '../../assets/sun.png';
import Moon from '../../assets/moon.png';

import Home from '../home/Home';
import About from '../about/About';

function App() {

    const [isDark, setDark] = useState(true);

    const changeState = () => {
        setDark(!isDark);
    }

    document.documentElement.style.setProperty('--theme', isDark ? "#191919" : "#FFFFFF");
    document.documentElement.style.setProperty('--box-theme', isDark ? "#FFFFFF10" : "#00000020");
    document.documentElement.style.setProperty('--default-text-color', isDark ? "#FFFFFF" : "#000000");
    document.documentElement.style.setProperty('--passive-text-color', isDark ? "#B2B2B2" : "#696969");

    return (
        <Router>
            <div className="App">
            <div className="theme">
                <button type="button" className="themeToggle" onClick={changeState}><img className="toggleImg" src={isDark ? Sun : Moon} /></button> 
            </div>
            <PageTitle />
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/resume" exact element={<Resume />} />
                        <Route path="/about" exact element={<About isDark={isDark}/>} />
                    </Routes>
                <Footer isDark={isDark}/>
            </div>
        </Router>
    );
}

export default App; 