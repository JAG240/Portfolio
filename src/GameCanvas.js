import React, { useEffect } from 'react';
import { GameScreen, Board, Gunner, Hints, Link } from './GameObjects.js';

function GameCanvas() {

    var xTiles = 64;
    var yTiles = 32;

    const screen = new GameScreen();

    const board = new Board(xTiles, yTiles);
    board.Init();
    board.skipIntro = sessionStorage.getItem("skipIntro") == "true" ? true : false;

    if (sessionStorage.getItem("skipIntro") == null) {
        sessionStorage.setItem("skipIntro", true);
    }

    board.LoadTileLayout(board.Tiles);
    screen.AddObject(board)

    const gunner = new Gunner(board.tileWidth * (xTiles / 2), board.tileHeight * (yTiles - 2), board);
    screen.AddObject(gunner);

    const hints = new Hints(board.tileWidth * 2, (yTiles * board.tileHeight) - (board.tileHeight / 4), board);
    hints.displayText = "Shoot or click page names to navigate";
    screen.AddObject(hints);

    const introState = new Hints((board.tileWidth * board.xTiles) - (board.tileWidth * 14), (yTiles * board.tileHeight) - (board.tileHeight / 4), board);

    introState.displayText = sessionStorage.getItem("skipIntro") == "true" ? "Down: enable intro" : "Down: disable intro";

    screen.AddObject(introState);

    const aboutLink = new Link(10, 15, "About Me", board, 1, "./about");
    screen.AddObject(aboutLink);

    const projectsLink = new Link(25, 15, "My Projects", board, 1, "./projects");
    screen.AddObject(projectsLink);

    const resumeLink = new Link(44, 15, "My Resume", board, 1, "./resume");
    screen.AddObject(resumeLink);

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

    function GetMouseOnCanvas(e) {
        var cRect = document.getElementById("gameCanvas").getBoundingClientRect();
        var yOffSet = parseInt(window.getComputedStyle(document.getElementById("intro-container"), null).getPropertyValue('padding-bottom'));
        var canvasX = Math.round(e.clientX - cRect.left) * 2;
        var canvasY = Math.round(e.clientY - (cRect.top + yOffSet)) * 2;
        var tile = board.GetTile(canvasX, canvasY);

        if (tile.link != '')
            window.location.href = tile.link;
    }

    const Movement = (dir) => {
        gunner.dir = dir;
    }

    const Shoot = () => {
        gunner.Shoot();
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
                    <canvas onClick={(e) => GetMouseOnCanvas(e)} id="gameCanvas" width={board.tileWidth * xTiles} height={board.tileHeight * yTiles} className="GameCanvas"></canvas>
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