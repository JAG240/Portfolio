import React, { useRef } from 'react';
import './ProjectBox.css'

function ProjectBox({imagesrc, gifsrc, title, text, repo, tags}) {

    const imageRef = useRef(null);

    const StaticImage = () => {
        imageRef.current.src = imagesrc;
    }

    const GifImage = () => {
        imageRef.current.src = gifsrc;
    }

    return (
        <div className="box-content">
            <a href={repo} className="no-style" target="_blank"> 
                <div className="project-box" onMouseOver={GifImage} onMouseOut={StaticImage}>
                    <div className="box-image">
                        <img className="image" ref={imageRef} src={imagesrc} />
                    </div>
                    <div className="box-summary">
                        <div className="box-title">
                            {title}
                        </div>
                        <div className="box-text">
                            {text}
                        </div>
                        <div className="tags">
                            { tags.map(tag => <div className="tag">{tag}</div>) }
                        </div>
                    </div>
                </div>
            </a>
        </div>
        );
}

export default ProjectBox;