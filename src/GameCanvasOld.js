const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var xTiles = 48;
var yTiles = 48;

var tileHeight = Math.floor(canvas.height / yTiles);
var tileWidth = Math.floor(canvas.width / xTiles);

canvas.height = tileHeight * yTiles;
canvas.width = tileWidth * xTiles;

let tiles = [];

class Tile {
    constructor(x, y, active) {
        this.corner = [x, y];
        this.active = active;
    }

    drawTile() {
        if (this.active) {
            ctx.beginPath();
            ctx.rect(this.corner[0], this.corner[1], tileWidth, tileHeight);
            ctx.stroke();
            ctx.fillStyle = "grey";
            ctx.fill();
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

function GetTile(x, y) {
    var curTile;
    var closestTile = Number.MAX_VALUE;

    tiles.forEach(tile => {
        if (tile.corner[0] < x && tile.corner[1] < y) {
            var distanceToTile = Math.abs(x - tile.corner[0]) + Math.abs(y - tile.corner[1]);
            if (distanceToTile < closestTile) {
                closetTile = distanceToTile;
                curTile = tile;
            }
        }
    });

    return curTile;
}

function drawboard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tiles.forEach(
        tile => {
            tile.drawTile();
        });

    ctx.closePath();
}



canvas.addEventListener('click', e => {
    var mousePos = GetMouseOnCanvas(e.clientX, e.clientY);
    var tile = GetTile(mousePos[0], mousePos[1]);
    tile.toggle();
    drawboard();
});

drawboard();

function SaveBoard() {
    var csvData = "data:text/csv;charset=utf-8,";

    tiles.forEach(tile => {
        if (tile.active)
            csvData += "1,";
        else
            csvData += "0,";
    });

    var encodedUri = encodeURI(csvData);
    window.open(encodedUri);
}

document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
        SaveBoard();
    }
}
