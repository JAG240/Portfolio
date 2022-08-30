import React from 'react';

var xTiles = 64;
var yTiles = 32;

var tileHeight = Math.floor(window.innerHeight / yTiles);
var tileWidth = Math.floor(window.innerWidth / xTiles);

let tiles = [];

class Tile {
    constructor(x, y, active) {
        this.corner = [x, y];
        this.active = active;
    }

    drawTile() {
        if (this.active) {
            document.getElementById("gameCanvas").getContext('2d').beginPath();
            document.getElementById("gameCanvas").getContext('2d').rect(this.corner[0], this.corner[1], tileWidth, tileHeight);
            document.getElementById("gameCanvas").getContext('2d').stroke();
            document.getElementById("gameCanvas").getContext('2d').fillStyle = "grey";
            document.getElementById("gameCanvas").getContext('2d').fill();
        }
    }

    toggle() {
        this.active = !this.active;
    }
}

for (let i = 0; i < xTiles; i++) {
    for (let j = 0; j < yTiles; j++) {
        tiles.push(new Tile(i * tileWidth, j * tileHeight, false));
    }
}

function GameCanvas() {
    return (
        <div className="App">
            <canvas onClick={(e) => GetMouseOnCanvas(e)} id="gameCanvas" width={tileWidth * xTiles} height={tileHeight * yTiles} style={{ background: "#eee", width: "50%", height: "50%", padding: 0, margin: "auto", display: "block" }}></canvas>
        </div>
    );
}

function GetMouseOnCanvas(e) {
    var cRect = document.getElementById("gameCanvas").getBoundingClientRect();
    var canvasX = Math.round(e.clientX - cRect.left);
    var canvasY = Math.round(e.clientY - cRect.top);
    var tile = GetTile(canvasX * 2, canvasY * 2);
    tile.toggle();
    drawboard();
}

function GetTile(x, y) {
    var curTile;
    var closestTile = Number.MAX_VALUE;

    tiles.forEach(tile => {
        if (tile.corner[0] < x && tile.corner[1] < y) {
            var distanceToTile = Math.abs(x - tile.corner[0]) + Math.abs(y - tile.corner[1]);
            if (distanceToTile < closestTile) {
                closestTile = distanceToTile;
                curTile = tile;
            }
        }
    });

    return curTile;
}

function drawboard() {
    document.getElementById("gameCanvas").getContext('2d').clearRect(0, 0, document.getElementById("gameCanvas").width, document.getElementById("gameCanvas").height);

    tiles.forEach(
        tile => {
            tile.drawTile();
        });

    document.getElementById("gameCanvas").getContext('2d').closePath();
}

export default GameCanvas;