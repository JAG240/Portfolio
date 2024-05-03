import { React, useState } from 'react';
import './App.css';
import Footer from '../includes/Footer';
import PageTitle from '../includes/PageTitle';
import ChangeTheme from '../includes/ThemeChanger';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Resume from '../resume/Resume';
import Sun from '../../assets/sun.png';
import Moon from '../../assets/moon.png';

function App() {

    const [isDark, setDark] = useState(true);

    const changeState = () => {
        setDark(!isDark);
        ChangeTheme(isDark);
    }

    document.documentElement.style.setProperty('--theme', isDark ? "#191919" : "#FFFFFF");

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
                    </Routes>
                <Footer isDark={isDark}/>
            </div>
        </Router>
    );
}

export default App; 