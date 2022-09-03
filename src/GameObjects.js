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
            document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#5533002';
            document.getElementById("gameCanvas").getContext('2d').stroke();
            document.getElementById("gameCanvas").getContext('2d').fillStyle = '#AA7D39';
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

    Update() {
        this.Draw();
    }
}

//Gunner class is the main player
export class Gunner {
    constructor(x, y, board) {
        this.pos = [Math.floor(x), y];
        this.bodyWidth = board.tileWidth * 1.3;
        this.bodyHeight = (board.tileHeight / 2);
        this.gunWidth = board.tileWidth / 3;
        this.gunHeight = board.tileHeight;
        this.dest = null;
        this.board = board;
        this.targets = [];
        this.missiles = [];
        this.lastMissileTime = 0;
        this.lastTarget = null;
        this.aiEnabled = true;
        this.dir = 0;
    }

    Update() {

        if (this.aiEnabled)
            this.AIControl();

        this.Move();
        this.Draw();
        this.UpdateMissiles();
    }

    UpdateMissiles() {
        this.missiles.forEach(missile => missile.Update());
    }

    Draw() {
        //draw gun
        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById('gameCanvas').getContext('2d').rect((this.pos[0] + (this.bodyWidth / 2) - (this.gunWidth / 2)), (this.pos[1] - (this.bodyHeight)), this.gunWidth, this.gunHeight);
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#553300';
        document.getElementById('gameCanvas').getContext('2d').stroke();
        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#AA7D39";
        document.getElementById('gameCanvas').getContext('2d').fill();
        document.getElementById('gameCanvas').getContext('2d').closePath();

        //draw body
        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById('gameCanvas').getContext('2d').rect(this.pos[0], this.pos[1], this.bodyWidth, this.bodyHeight);
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#553300';
        document.getElementById('gameCanvas').getContext('2d').stroke();
        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#AA7D39";
        document.getElementById('gameCanvas').getContext('2d').fill();
        document.getElementById('gameCanvas').getContext('2d').closePath();
    }

    Move() {
        if (this.dir > 0 && (this.pos[0] + this.bodyWidth) < (this.board.tileWidth * this.board.xTiles) - this.board.tileWidth) {
            this.pos[0] += this.dir;
        }
        else if (this.dir < 0 && this.pos[0] > this.board.tileWidth) {
            this.pos[0] += this.dir;
        }
    }

    GoToDest() {

        if (this.dest == null)
            return;

        var destPos = this.dest.corner[0] + (this.board.tileWidth / 2);
        var curPos = this.pos[0] + (this.bodyWidth / 2);

        if (curPos == destPos) {

            if (!this.Shoot())
                return;

            this.RemoveTarget(this.dest);
            this.lastTarget = this.dest;
            this.dest = null;
            return;
        }

        var calcDir = curPos > destPos ? -1 : 1;

        if (calcDir > 0) 
            this.dir = Math.min(destPos - curPos, 1);
        else if (calcDir < 0)
            this.dir = Math.max(destPos - curPos, -1);
    }

    AIControl() {
        if (this.dest == null || this.targets.length <= 0) {

            if (this.targets == null || this.targets.length <= 0) {
                this.targets = this.FindTargets();
                return;
            }

            this.dest = this.targets[Math.floor(Math.random() * this.targets.length)];
        }
        else {
            this.GoToDest();
        }
    }

    ToggleAI() {
        this.aiEnabled = !this.aiEnabled;
        this.dir = 0;
        this.targets = [];
        this.dest = null;
    }

    FindTargets() {

        var targets = [];

        var y = this.board.yTiles - 1;

        for (let j = this.board.yTiles - 1; j >= 0; j--) {
            for (let x = this.board.xTiles - 1; x >= 0; x--) {

                if (this.board.Tiles[x][y].active && !(this.board.Tiles[x][y] === this.lastTarget)) {
                    targets.push(this.board.Tiles[x][y]);
                }
            }

            if (targets.length > 0)
                return targets;

            y--;
        }
    }

    Shoot() {
        if (Date.now() - this.lastMissileTime < 1000)
            return false;

        this.missiles.push(new Missile(this.pos[0] + (this.board.tileWidth / 2), this.pos[1], -1, this.board, this.lastMissileTime, this));
        this.lastMissileTime = Date.now();
        return true;
    }

    RemoveTarget(remTarget) {

        var newTargets = [];

        this.targets.forEach(target => {

            if (!(target === remTarget)) {
                newTargets.push(target);
            }

        });

        this.targets = newTargets;
    }

    RemoveMissile(id) {

        var newMissiles = [];

        this.missiles.forEach(missile => {

            if (missile.id != id) {
                newMissiles.push(missile);
            }

        });

        this.missiles = newMissiles;
    }
}

//Missiles are the main interaction object
class Missile {
    constructor(x, y, direction, board, id, gunner) {
        this.pos = [x, y];
        this.direction = direction;
        this.board = board;
        this.bodyWidth = this.board.tileWidth / 4;
        this.bodyHeight = this.board.tileHeight / 2;
        this.gunner = gunner;
        this.id = id;
    }

    Draw() {
        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById('gameCanvas').getContext('2d').rect(this.pos[0], this.pos[1], this.bodyWidth, this.bodyHeight);
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#553300';
        document.getElementById('gameCanvas').getContext('2d').stroke();
        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#553300";
        document.getElementById('gameCanvas').getContext('2d').fill();
        document.getElementById('gameCanvas').getContext('2d').closePath();
    }

    Move() {
        this.pos[1] += this.direction;
    }

    CheckCollision() {
        var tile = this.board.GetTile(this.pos[0], this.pos[1]);

        if (tile == null) {
            this.gunner.RemoveMissile(this.id);
            return;
        }

        if (tile.active) {
            this.gunner.RemoveMissile(this.id);
            tile.toggle();
        }
    }

    Update() {
        this.Move();
        this.CheckCollision();
        this.Draw();
    }
}

export class Hints {
    constructor(x, y) {
        this.pos = [x, y];
        this.displayText = "";
        this.commandHints = "Move: Arrow Keys    Fire: Space";
        this.editHints = "Click on tiles to toggle them";
        this.selectWindow = "Click game screen to get started"
    }

    Draw() {
        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById('gameCanvas').getContext('2d').font = "30px Arial";
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#553300';
        document.getElementById('gameCanvas').getContext('2d').stroke();
        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#AA7D39";
        document.getElementById('gameCanvas').getContext('2d').fillText(this.displayText, this.pos[0], this.pos[1]);
        document.getElementById('gameCanvas').getContext('2d').closePath();
    }

    Update() {
        this.Draw();
    }
}