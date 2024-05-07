import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import './PageTitle.css';

function PageTitle() {
    const navigate = useNavigate();

    const RedirectHome = () => {
        navigate('/');
    }

    return (
        <div className="page-title-container">
            <div onClick={RedirectHome} className="name">Jacob Gonos</div>
        </div>
    );
}

export default PageTitle;