import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { GameScreen, Board, Gunner, Hints } from './GameObjects.js';

var xTiles = 64;
var yTiles = 32;

const screen = new GameScreen();

const board = new Board(xTiles, yTiles);
board.Init();
board.LoadTileLayout(board.Tiles);
screen.AddObject(board)

const gunner = new Gunner(board.tileWidth * (xTiles / 2), board.tileHeight * (yTiles - 2), board);
screen.AddObject(gunner);

const hints = new Hints(board.tileWidth * 2 , (yTiles * board.tileHeight) - (board.tileHeight/4));
screen.AddObject(hints);

function GameCanvas() {

    const [showExport, setExport] = useState(false);
    const [allowEdit, setEdit] = useState(false);
    const [aiEnabled, setAIEnabled] = useState(gunner.aiEnabled);

    const toggleEdit = () => {
        setEdit(!allowEdit);
        gunner.ToggleAI();

        if (!allowEdit)
            hints.displayText = hints.editHints;
        else
            hints.displayText = "";
    }

    const toggleAI = () => {
        setAIEnabled(!aiEnabled);
        gunner.ToggleAI();

        if (aiEnabled)
            hints.displayText = hints.selectWindow;
        else
            hints.displayText = "";
    }

    function handleEditToggle(e) {
        if (allowEdit) {
            GetMouseOnCanvas(e);
        }
        else if (!aiEnabled) {
            hints.displayText = hints.commandHints;
        }
    }

    function handleKeyPress(e) {
        if (!aiEnabled) {
            CommandShip(e);
        }
    }

    function handleKeyRelease(e) {
        if (!aiEnabled) {
            StopShip(e);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            screen.Update();
        }, 10);
    }, []);

    class BoardExport extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                currentTiles: [],
                loading: false
            }
        }

        getTiles = () => {
            this.setState({ loading: true });
            this.state.currentTiles = board.Tiles;
            this.setState({ loading: false });
        }

        render() {
            return (<CSVLink data={this.state.currentTiles} onClick={this.getTiles} asyncOnClick={true}>Export Board</CSVLink>);
        }
    }

    function GetMouseOnCanvas(e) {
        var cRect = document.getElementById("gameCanvas").getBoundingClientRect();
        var canvasX = Math.round(e.clientX - cRect.left);
        var canvasY = Math.round(e.clientY - cRect.top);
        var tile = board.GetTile(canvasX * 2, canvasY * 2);
        tile.toggle();
    }

    function CommandShip(e) {
        if (e.key === "d" || e.key === "ArrowRight") {
            gunner.dir = 3
        }
        else if (e.key === "a" || e.key === "ArrowLeft") {
            gunner.dir = -3
        }

        if (e.key === " ") {
            gunner.Shoot();
        }
    }

    function StopShip(e) {
        if (e.key === "d" || e.key === "ArrowRight" || e.key === "a" || e.key === "ArrowLeft") {
            gunner.dir = 0;
        }
    }

    function EditButton() {
        return (
            <button onClick={toggleEdit}>{allowEdit ? "Stop Edit" : "Edit Board"}</button>
            );
    }

    function CommandButton() {
        return (
                <button onClick={toggleAI}>{aiEnabled ? "Take Command" : "Retire Command"}</button>
            );
    }

    return (
        <div className="game-container">
            <div className="game-screen-container">
                <div className="intro-container">
                    <div className="hr-left">

                    </div>
                    <div>
                        <span className="intro-text">Jacob Gonos - Software Engineer </span>
                    </div>
                    <div className="hr-right">

                    </div>
                </div>
                <div className="canvas-container">
                    <canvas onClick={(e) => handleEditToggle(e)} tabIndex={0} onKeyDown={(e) => handleKeyPress(e)} onKeyUp={(e) => handleKeyRelease(e)} id="gameCanvas" width={board.tileWidth * xTiles} height={board.tileHeight * yTiles} className="GameCanvas"></canvas>
                </div>
            </div>
            <div className="button-container">
                {showExport ? <BoardExport /> : null}
                {aiEnabled ? null /*<EditButton />*/ : null}
                {allowEdit ? null : <CommandButton />}
            </div>
        </div>
    );
}

export default GameCanvas;