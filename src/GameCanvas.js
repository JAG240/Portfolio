import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { GameScreen, Tile, Board, Gunner } from './GameObjects.js';

function GameCanvas() {

    var xTiles = 64;
    var yTiles = 32;

    const screen = new GameScreen();

    useEffect(() => {
        const interval = setInterval(() => {
            screen.Update();
        }, 10);
    }, []);

    const board = new Board(xTiles, yTiles);
    board.Init();
    board.LoadTileLayout(board.Tiles);
    screen.AddObject(board);

    const gunner = new Gunner(board.tileWidth * (xTiles / 2), board.tileHeight * (yTiles - 2), board.tileWidth * 1.3, (board.tileHeight / 2), (board.tileWidth / 3), board.tileHeight, board.tileWidth, board.tileHeight, xTiles);
    screen.AddObject(gunner);

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

    return (
        <React.Fragment>
            <canvas onClick={(e) => GetMouseOnCanvas(e)} id="gameCanvas" width={board.tileWidth * xTiles} height={board.tileHeight * yTiles} className="GameCanvas"></canvas>
            <BoardExport />
        </React.Fragment>
    );

    function GetMouseOnCanvas(e) {
        var cRect = document.getElementById("gameCanvas").getBoundingClientRect();
        var canvasX = Math.round(e.clientX - cRect.left);
        var canvasY = Math.round(e.clientY - cRect.top);
        var tile = board.GetTile(canvasX * 2, canvasY * 2);
        tile.toggle();
    }
}


export default GameCanvas;