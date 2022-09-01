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

    Update= () => {
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
            this.Tiles.push([]);
            for (let j = 0; j < this.yTiles; j++) {
                this.Tiles[i].push(new Tile(i * this.tileWidth, j * this.tileHeight, false));
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
            var y = 0;
            var x = 0;

            rows.forEach((row) => {
                var cleanRow = row.replaceAll('\"', '');
                var data = cleanRow.split(',');

                if (data[2] == "true")
                    tiles[y][x].toggle();

                x++;
                if (x >= tiles[0].length) {
                    y++
                    x = 0;
                }
            });
            }
        }

        xmlhttp.open("GET", filePath, true);
    
        xmlhttp.send();
    }

    Draw() {
        this.Tiles.forEach(row => {
            row.forEach(tile => {
                tile.Draw(this.tileWidth, this.tileHeight);
            })
        });

        document.getElementById("gameCanvas").getContext('2d').closePath();
    }

    GetTile(x, y) {
        return this.Tiles[Math.floor(x / this.tileWidth)][Math.floor(y / this.tileHeight)];
    }

    Update = () => {
        this.Draw();
    }
}

//Gunner class is the main player
export class Gunner {
    constructor(x, y, bodyWidth, bodyHeight, gunWidth, gunHeight, tileWidth, tileHeight, xTiles, yTiles, Tiles) {
        this.pos = [x, y];
        this.bodyWidth = bodyWidth;
        this.bodyHeight = bodyHeight;
        this.gunWidth = gunWidth;
        this.gunHeight = gunHeight;
        this.dest = null;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.xTiles = xTiles;
        this.yTiles = yTiles;
        this.Tiles = Tiles;
        this.targets = [];
    }

    Update() {
        if (this.dest == null) {

            if (this.targets.length <= 0)
                this.targets = this.FindTargets();

            if (this.targets == null)
                return;

            this.dest = this.targets[Math.floor(Math.random() * this.targets.length)];

            console.log(this.targets);
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

        var destPos = this.dest.corner[0] + (this.tileWidth / 2);

        if (Math.floor(this.pos[0] + (this.bodyWidth / 2)) == destPos) {
            this.RemoveTarget(this.dest);
            this.dest.toggle();
            this.dest = null;
            return;
        }

        this.Move(this.pos[0] + (this.bodyWidth / 2) > destPos ? -1 : 1);
    }

    FindTargets() {

        var targets = [];

        var y = this.yTiles - 1;

        for (let j = this.yTiles - 1; j >= 0; j--) {
            for (let x = this.xTiles - 1; x >= 0; x--) {

                if (this.Tiles[x][y].active) {
                    targets.push(this.Tiles[x][y]);
                }
            }

            if (targets.length > 0)
                return targets;

            y--;
        }
    }

    RemoveTarget(remTarget) {

        var newTargets = [];

        this.targets.forEach(target => {

            if (remTarget.corner[0] != target.corner[0] && remTarget.corner[1] != target.corner[1]) {
                newTargets.push(target);
            }

        });

        this.targets = newTargets;
    }
}