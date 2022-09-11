import React, { useEffect, useState } from 'react';
import { GameScreen, Board, Gunner, Hints, Link } from './GameObjects.js';

var xTiles = 64;
var yTiles = 32;

let screen = new GameScreen();

let board = new Board(xTiles, yTiles);
board.Init();
board.skipIntro = sessionStorage.getItem("skipIntro") == "true" ? true : false;

if (sessionStorage.getItem("skipIntro") == null) {
    sessionStorage.setItem("skipIntro", true);
}

board.LoadTileLayout(board.Tiles);
screen.AddObject(board)

let gunner = new Gunner(board.tileWidth * (xTiles / 2), board.tileHeight * (yTiles - 2), board);
screen.AddObject(gunner);

let hints = new Hints(board.tileWidth * 2, (yTiles * board.tileHeight) - (board.tileHeight / 4), board);
hints.displayText = "Shoot or click page names to navigate";
screen.AddObject(hints);

let introState = new Hints((board.tileWidth * board.xTiles) - (board.tileWidth * 14), (yTiles * board.tileHeight) - (board.tileHeight / 4), board);

introState.displayText = sessionStorage.getItem("skipIntro") == "true" ? "Down: enable intro" : "Down: disable intro";

screen.AddObject(introState);

let aboutLink = new Link(10, 15, "About Me", board, 1, "./about");
screen.AddObject(aboutLink);

let projectsLink = new Link(25, 15, "My Projects", board, 1, "./projects");
screen.AddObject(projectsLink);

let resumeLink = new Link(44, 15, "My Resume", board, 1, "./resume");
screen.AddObject(resumeLink);

function GameCanvas() {

    const [cursorState, setCursor] = useState('');
    const [mouseOverLink, setMouseOverLink] = useState(null);

    function setIntro() {

        if (board.introPlaying)
            return;

        board.skipIntro = sessionStorage.getItem("skipIntro") == 'true' ? false : true;
        sessionStorage.setItem("skipIntro", board.skipIntro);

        if (board.skipIntro)
            introState.displayText = "Down: enable intro";
        else
            introState.displayText = "Down: disable intro";

    }

    useEffect(() => {
        const interval = setInterval(() => {
            screen.Update();
        }, 10);
    }, []);

    function GetTile(e) {
        var cRect = document.getElementById("gameCanvas").getBoundingClientRect();
        var yOffSet = parseInt(window.getComputedStyle(document.getElementById("intro-container"), null).getPropertyValue('padding-bottom'));
        var canvasX = Math.floor(e.clientX - cRect.left) * 2;
        var canvasY = Math.floor(e.clientY - (cRect.top + yOffSet)) * 2;
        var tile = board.GetTile(canvasX, canvasY);
        return tile;
    }

    function GetMouseOnCanvas(e) {
        var tile = GetTile(e);

        if (tile.link != '')
            window.location.href = tile.link;
    }

    const Movement = (dir) => {
        gunner.dir = dir;
    }

    const Shoot = () => {
        gunner.Shoot();
    }

    const CheckForClickable = (e) => {
        var tile = GetTile(e);

        if (tile && tile.link != '') {
            setCursor('pointer');

            var linkPath = tile.link;

            switch (linkPath) {
                case './about':
                    aboutLink.mouseOver = true;
                    setMouseOverLink(aboutLink);
                    break;
                case './projects':
                    projectsLink.mouseOver = true;
                    setMouseOverLink(projectsLink);
                    break;
                case './resume':
                    resumeLink.mouseOver = true;
                    setMouseOverLink(resumeLink)
                    break;
            }

        }
        else {
            setCursor('');

            if (mouseOverLink) {
                mouseOverLink.mouseOver = false;
                setMouseOverLink(null);
            }
        }
    }

    return (
        <div className="game-container">
            <div className="game-screen-container">
                <div className="intro-container" id="intro-container">
                    <div className="hr-left">

                    </div>
                    <div>
                        <span className="intro-text">Jacob Gonos - Software Engineer </span>
                    </div>
                    <div className="hr-right">

                    </div>
                </div>
                <div className="canvas-container">
                    <canvas onClick={(e) => GetMouseOnCanvas(e)} style={{ cursor: cursorState }} onMouseMove={(e) => CheckForClickable(e)} id="gameCanvas" width={board.tileWidth * xTiles} height={board.tileHeight * yTiles} className="game-canvas"></canvas>
                </div>
            </div>
            <div className="under-text-container">
                <span className="under-text">Passionate and </span>
                <span className="under-text-large">Self-Taught</span>
            </div>
            <div className="controls-container">
                <div className="d-pad-container">
                    <div className="d-pad">
                        <div className="up" onMouseDown={() => Shoot()}>
                            <div className="up-arrow" />
                        </div>
                        <div className="down" onMouseDown={() => setIntro()}>
                            <div className="down-arrow" />
                        </div>
                        <div className="center" />
                        <div className="left" onMouseDown={() => Movement(-3)} onMouseUp={() => Movement(0)}>
                            <div className="left-arrow" />
                        </div>
                        <div className="right" onMouseDown={() => Movement(3)} onMouseUp={() => Movement(0)}>
                            <div className="right-arrow" />
                        </div>
                    </div>
                </div>
                <div className="action-buttons-container">
                    <div className="action-buttons">
                        <div className="b-button" onClick={() => Shoot()} />
                        <span className="b-label">b</span>
                        <div className="a-button" onClick={() => Shoot()} />
                        <span className="a-label">a</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default GameCanvas;