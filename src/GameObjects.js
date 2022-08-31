//Gamescreen is the collection of gameobjects that will be run on interval 
export class GameScreen {
    constructor() {
        this.Objects = [];
    }

    Clear(){
        document.getElementById("gameCanvas").getContext('2d').clearRect(0, 0, document.getElementById("gameCanvas").width, document.getElementById("gameCanvas").height);
    }

    Update = () => {

        this.Clear();

        this.Objects.forEach(obj => {
            obj.Update();
        })
    }

    AddObject(object) {
        this.Objects.push(object);
    }
}

//Tile class for boxes that make up my name/enemies
export class Tile {
    constructor(x, y, active) {
        this.corner = [x, y];
        this.active = active;
    }

    Draw(tileWidth, tileHeight) {
        if (this.active) {
            document.getElementById("gameCanvas").getContext('2d').beginPath();
            document.getElementById("gameCanvas").getContext('2d').rect(this.corner[0], this.corner[1], tileWidth, tileHeight);
            document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#3a5122';
            document.getElementById("gameCanvas").getContext('2d').stroke();
            document.getElementById("gameCanvas").getContext('2d').fillStyle = '#5d782e';
            document.getElementById("gameCanvas").getContext('2d').fill();
        }
    }

    Update() {
        this.Draw();
    }

    toggle() {
        this.active = !this.active;
    }
}

//Board is made up of tiles
export class Board {
    constructor(xTiles, yTiles) {
        this.Tiles = [];
        this.xTiles = xTiles;
        this.yTiles = yTiles;
        this.tileWidth = Math.floor(window.innerWidth / xTiles);
        this.tileHeight = Math.floor(window.innerHeight / yTiles);
    }

    Init() {
        for (let i = 0; i < this.xTiles; i++) {
            for (let j = 0; j < this.yTiles; j++) {
                this.Tiles.push(new Tile(i * this.tileWidth, j * this.tileHeight, false));
            }
        }
    }

    LoadTileLayout(tiles) {
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
            }
        }

        xmlhttp.open("GET", filePath, true);
    
        xmlhttp.send();
    }

    Draw() {
        this.Tiles.forEach(tile => {
            tile.Draw(this.tileWidth, this.tileHeight);
        });

        document.getElementById("gameCanvas").getContext('2d').closePath();
    }

    GetTile(x, y) {
    var curTile;
    var closestTile = Number.MAX_VALUE;

    this.Tiles.forEach(tile => {
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

    Update = () => {
        this.Draw();
    }
}

//Gunner class is the main player
export class Gunner {
    constructor(x, y, bodyWidth, bodyHeight, gunWidth, gunHeight, tileWidth, tileHeight, xTiles) {
        this.pos = [x, y];
        this.bodyWidth = bodyWidth;
        this.bodyHeight = bodyHeight;
        this.gunWidth = gunWidth;
        this.gunHeight = gunHeight;
        this.dest = null;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.xTiles = xTiles;
    }

    Update() {
        if (this.dest == null) {
            this.dest = Math.floor(Math.random() * 1200) + this.bodyWidth;
        }
        else {
            this.GoToDest();
        }

        this.Draw();
    }

    Draw() {
        //draw gun
        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById('gameCanvas').getContext('2d').rect((this.pos[0] + (this.bodyWidth / 2) - (this.gunWidth / 2)), (this.pos[1] - (this.bodyHeight)), this.gunWidth, this.gunHeight);
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
        if ((this.pos[0] + this.bodyWidth) < (this.tileWidth * this.xTiles) - this.tileWidth && this.pos[0] > this.tileWidth) {
            this.pos[0] += dir;
        }
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