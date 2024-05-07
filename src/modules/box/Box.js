import { React, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import './Box.css';

function Box({ text, link, isDark }) {

    const navigate = useNavigate();

    const Redirect = () => {
        navigate('/' + link);
    }

    const springs = useSpring({
        from: { 
            height: "0vh",
            width: "0vh",
        },
        to:{
            height: "20vh",
            width: "20vh",
        },
    });

    return (
        <div className="box-container" onClick={Redirect}>
            <animated.div
            style={{
                ...springs,
            }}
            className="box">
                <div className="text">{text}</div>
            </animated.div>
        </div>
    );
}

export default Box;