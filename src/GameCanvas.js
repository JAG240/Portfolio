import React, { useState } from 'react';
import { CSVLink} from 'react-csv';

var xTiles = 64;
var yTiles = 32;

var tileHeight = Math.floor(window.innerHeight / yTiles);
var tileWidth = Math.floor(window.innerWidth / xTiles);

var tiles = [];

var allowEdit = false;

class Tile {
    constructor(x, y, active) {
        this.corner = [x, y];
        this.active = active;
    }

    drawTile() {
        if (this.active) {
            document.getElementById("gameCanvas").getContext('2d').beginPath();
            document.getElementById("gameCanvas").getContext('2d').rect(this.corner[0], this.corner[1], tileWidth, tileHeight);
            document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#3a5122';
            document.getElementById("gameCanvas").getContext('2d').stroke();
            document.getElementById("gameCanvas").getContext('2d').fillStyle = '#5d782e';
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

LoadTileLayout();

function GameCanvas() {

    return (
        <React.Fragment>
            <canvas onClick={(e) => GetMouseOnCanvas(e)} id="gameCanvas" width={tileWidth * xTiles} height={tileHeight * yTiles} className="GameCanvas"></canvas>
            <button type="button" onClick={() => ToggleEditable}>Edit</button>
            <BoardExport />
        </React.Fragment>
    );
}

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
        this.state.currentTiles = tiles;
        this.setState({ loading: false });
    }

    render() {
        return (<CSVLink data={this.state.currentTiles} onClick={this.getTiles} asyncOnClick={true} hidden>Export Board</CSVLink>);
    }
}

function GetMouseOnCanvas(e) {

    if (!allowEdit)
        return;

    var cRect = document.getElementById("gameCanvas").getBoundingClientRect();
    var canvasX = Math.round(e.clientX - cRect.left);
    var canvasY = Math.round(e.clientY - cRect.top);
    var tile = GetTile(canvasX * 2, canvasY * 2);
    tile.toggle();
}

function ToggleEditable() {
    allowEdit = !allowEdit;
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

function ClearBoard() {
    document.getElementById("gameCanvas").getContext('2d').clearRect(0, 0, document.getElementById("gameCanvas").width, document.getElementById("gameCanvas").height);
}

function DrawBoard() {
    tiles.forEach(
        tile => {
            tile.drawTile();
        });

    document.getElementById("gameCanvas").getContext('2d').closePath();
}

function LoadTileLayout() {
    const filePath = "http://localhost:3000/DefaultTileLayout.csv";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var content = xmlhttp.responseText;
            var headers = content.replace("\"corner\",\"active\"\n", '');
            var rows = headers.split("\n");
            let i = 0;

            rows.forEach((row) => { 
                var cleanRow = row.replaceAll('\"', '');
                var data = cleanRow.split(',');
                if (data[2] == "true")
                    tiles[i].toggle();

                i++;
            });

            DrawBoard();
        }
    }

    xmlhttp.open("GET", filePath, true);

    xmlhttp.send();
}

setInterval(UpdateGunner, 10);

class Gunner{
    constructor(x, y, bodyWidth, bodyHeight, gunWidth, gunHeight) {
        this.pos = [x, y];
        this.bodyWidth = bodyWidth;
        this.bodyHeight = bodyHeight;
        this.gunWidth = gunWidth;
        this.gunHeight = gunHeight;
        this.dest = null;
    }

    DrawGunner() {
        //draw gun
        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById('gameCanvas').getContext('2d').rect((this.pos[0] + (this.bodyWidth / 2) - (this.gunWidth/2)), (this.pos[1] - (this.bodyHeight)), this.gunWidth, this.gunHeight);
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#3a5122';
        document.getElementById('gameCanvas').getContext('2d').stroke();
        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#5d782e";
        document.getElementById('gameCanvas').getContext('2d').fill();
        document.getElementById('gameCanvas').getContext('2d').closePath();

        //draw body
        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById('gameCanvas').getContext('2d').rect(this.pos[0], this.pos[1], this.bodyWidth, this.bodyHeight);
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#3a5122';
        document.getElementById('gameCanvas').getContext('2d').stroke();
        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#5d782e";
        document.getElementById('gameCanvas').getContext('2d').fill();
        document.getElementById('gameCanvas').getContext('2d').closePath();
    }

    Move(dir) {

        if (dir > 0 && (this.pos[0] + this.bodyWidth) < (tileWidth * xTiles) - tileWidth)
            this.pos[0] += dir;

        if (dir < 0 && this.pos[0] > tileWidth)
            this.pos[0] += dir;
    }

    GoToDest() {

        if (this.dest == null)
            return;

        if (Math.floor(this.pos[0] + (this.bodyWidth / 2)) == this.dest) {
            this.dest = null;
            return;
        }

        this.Move(this.pos[0] + (this.bodyWidth / 2) > this.dest ? -1 : 1);
    }
}

const gunner = new Gunner(tileWidth * (xTiles / 2), tileHeight * (yTiles - 2), tileWidth * 1.3, (tileHeight / 2), (tileWidth/3), tileHeight);

function UpdateGunner() {
    ClearBoard();
    DrawBoard();

    if (gunner.dest == null) {
        gunner.dest = Math.floor(Math.random() * 1200) + tileWidth;
    }
    else {
        gunner.GoToDest();
    }

    gunner.DrawGunner();
}

export default GameCanvas;