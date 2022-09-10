import React  from 'react';
import { useNavigate } from 'react-router-dom';


function PageTitle({ title }) {

    const navigate = useNavigate();

    const RedirectHome = () => {
        navigate('/');
    }

    return (
        <div className="page-title-container" onClick={RedirectHome}>
            <div className="title-container">
                <div className="name-container">
                    <div className="hr-left-title" />
                    <span className="name-text">Jacob Gonos</span>
                    <div className="hr-right-title" />
                </div>
                <span className="title-text">{title}</span>
            </div>
            <div className="title-buttons-container">
                <div className="back-button-container">
                    <button className="back-button"></button>
                    <span className="back-label">Home</span>
                </div>
                <div className="back-button-container">
                    <button className="back-button"></button>
                    <span className="back-label">Start</span>
                </div>
             </div>
        </div>
    );
}

export default PageTitle;