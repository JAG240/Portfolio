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
        this.link = "";
    }

    Draw(tileWidth, tileHeight) {
        if (this.active) {
            document.getElementById("gameCanvas").getContext('2d').beginPath();
            document.getElementById("gameCanvas").getContext('2d').rect(this.corner[0], this.corner[1], tileWidth, tileHeight);
            document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#3A6A40';
            document.getElementById("gameCanvas").getContext('2d').stroke();
            document.getElementById("gameCanvas").getContext('2d').fillStyle = '#76A07B';
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
        this.tileTemplate = [];
        this.introIndex = 0;
        this.introFlashes = 0;
        this.introTimer = 0;
        this.controlsEnabled = false;
        this.introPlaying = true;
        this.skipIntro = false;
        this.firstView = false;
    }

    Init() {
        for (let i = 0; i < this.xTiles; i++) {
            this.Tiles.push([]);
            this.tileTemplate.push([]);
            for (let j = 0; j < this.yTiles; j++) {
                this.Tiles[i].push(new Tile(i * this.tileWidth, j * this.tileHeight, false));
                this.tileTemplate[i].push(false);
            }
        }
    }

    LoadTileLayout(tiles) {

        if (this.skipIntro)
            return;

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

    GetConnectedTiles(x, y) {

        var queriedTiles = [];
        var connectTiles = [];

        queriedTiles.push(this.GetTile(x - this.tileWidth, y));
        queriedTiles.push(this.GetTile(x + this.tileWidth, y));
        queriedTiles.push(this.GetTile(x, y - this.tileHeight));
        queriedTiles.push(this.GetTile(x, y + this.tileHeight));

        queriedTiles.forEach(tile => {
            if (tile) {
                connectTiles.push(tile);
            }
        });

        return connectTiles;
    }

    CheckTileInColumn(x) {

        for (let i = 0; i < this.yTiles; i++) {

            if (this.Tiles[Math.floor(x / this.tileWidth)][i].active)
                return true;
        }

        return false;
    }

    LoadAnimationTemplate() {
        for (let x = 0; x < this.Tiles.length; x++) {
            for (let y = 0; y < this.Tiles[0].length; y++) {
                if (this.Tiles[x][y].active) {
                    this.tileTemplate[x][y] = true;
                    this.Tiles[x][y].toggle();
                }
            }
        }
    }

    IntroAnimation() {

        if (Date.now() - this.introTimer < 50) {
            return;
        }

        for (let y = 0; y < this.tileTemplate[0].length; y++) {
            if (this.tileTemplate[this.introIndex][y]) {
                this.Tiles[this.introIndex][y].toggle();
                this.introTimer = Date.now();
            }
        }

        this.introIndex++;

        if (this.introIndex == this.xTiles && this.introFlashes < 2) {
            this.introIndex = 0;
            this.introFlashes++;
        }
    }

    LoadMainTemplate() {

        for (let x = 4; x < this.xTiles - 4; x++) {
            for (let y = 5; y < this.yTiles - 23; y++) {
                if (x == 5)
                    continue;

                if (x == this.xTiles - 6)
                    continue;

                this.Tiles[x][y].toggle();
            }
        }

        for (let x = 4; x < this.xTiles - 4; x++) {
            for (let y = 20; y < this.yTiles - 8; y++) {
                if (x == 5)
                    continue;

                if (x == this.xTiles - 6)
                    continue;

                this.Tiles[x][y].toggle();
            }
        }

        for (let x = 4; x < 8; x++) {
            for (let y = 9; y < this.yTiles - 12; y++) {
                if (x == 5)
                    continue;

                this.Tiles[x][y].toggle();
            }
        }

        for (let x = 20; x < 24; x++) {
            for (let y = 9; y < this.yTiles - 12; y++) {

                this.Tiles[x][y].toggle();
            }
        }

        for (let x = 37; x < 41; x++) {
            for (let y = 9; y < this.yTiles - 12; y++) {
                this.Tiles[x][y].toggle();
            }
        }

        for (let x = this.xTiles - 8; x < this.xTiles - 4; x++) {
            if (x == this.xTiles - 6)
                continue;

            for (let y = 9; y < this.yTiles - 12; y++) {
                this.Tiles[x][y].toggle();
            }
        }

        this.introFlashes++;
        this.controlsEnabled = true;
    }

    Update() {

        if (this.skipIntro && this.introFlashes < 2) {
            this.introFlashes = 2;
        }

        if (this.introIndex < this.xTiles && this.introFlashes < 2) {
            if (this.introIndex == 0 && this.introFlashes == 0)
                this.LoadAnimationTemplate();

            this.IntroAnimation();
        }
        else if (this.introFlashes == 2) {
            this.LoadMainTemplate();
            this.introPlaying = false;

            if (this.firstView) {
                this.firstView = false;
                this.skipIntro = true;
            }
        }

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
        this.aiEnabled = false;
        this.dir = 0;
    }

    Update() {

        if (this.aiEnabled)
            this.AIControl();

        this.Move();

        if (!this.board.introPlaying)
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
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#3A6A40';
        document.getElementById('gameCanvas').getContext('2d').stroke();
        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#76A07B";
        document.getElementById('gameCanvas').getContext('2d').fill();
        document.getElementById('gameCanvas').getContext('2d').closePath();

        //draw body
        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById('gameCanvas').getContext('2d').rect(this.pos[0], this.pos[1], this.bodyWidth, this.bodyHeight);
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#3A6A40';
        document.getElementById('gameCanvas').getContext('2d').stroke();
        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#76A07B";
        document.getElementById('gameCanvas').getContext('2d').fill();
        document.getElementById('gameCanvas').getContext('2d').closePath();
    }

    Move() {

        if (!this.board.controlsEnabled)
            return;

        if (this.dir > 0 && (this.pos[0] + this.bodyWidth) < (this.board.tileWidth * this.board.xTiles) - this.board.tileWidth) 
            this.pos[0] += this.dir;
        else if (this.dir < 0 && this.pos[0] > this.board.tileWidth)
            this.pos[0] += this.dir;
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
            this.dir = Math.min(destPos - curPos, 4);
        else if (calcDir < 0)
            this.dir = Math.max(destPos - curPos, -4);
    }

    AIControl() {
        if (this.missiles.length > 0) {
            this.dir = 0;
            return;
        }

        if (this.dest == null || this.targets.length <= 0) {
            this.targets = this.FindTargets();

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

    TileDecayEffect() {
        if (Date.now() - this.lastDecayTime < 10)
            return;

        this.lastDecayTime = Date.now();

        var newTargets = [];

        this.decayTargets.forEach(target => {

            this.board.GetConnectedTiles(target.corner[0], target.corner[1]).forEach(newTarget => {
                if (newTarget.active)
                    newTargets.push(newTarget);
            });

            if (target.active)
                target.toggle();
        });

        this.decayTargets = newTargets;
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
        if (Date.now() - this.lastMissileTime < 250 || !this.board.controlsEnabled)
            return false;

        this.missiles.push(new Missile(this.pos[0] + (this.board.tileWidth / 2), this.pos[1], -3, this.board, this.lastMissileTime, this));
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
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#3A6A40';
        document.getElementById('gameCanvas').getContext('2d').stroke();
        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#76A07B";
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

        if (tile.link.length > 0) {
            this.gunner.RemoveMissile(this.id);
            window.location.href = tile.link;
        }
    }

    Update() {
        this.Move();
        this.CheckCollision();
        this.Draw();
    }
}

//Hints will be displayed on the screen
export class Hints {
    constructor(x, y, board) {
        this.pos = [x, y];
        this.displayText = "";
        this.board = board;
    }

    Draw() {
        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById('gameCanvas').getContext('2d').font = "18px gameboy";
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#3A6A40';
        document.getElementById('gameCanvas').getContext('2d').stroke();
        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#76A07B";
        document.getElementById('gameCanvas').getContext('2d').fillText(this.displayText, this.pos[0], this.pos[1]);
        document.getElementById('gameCanvas').getContext('2d').closePath();
    }

    Update() {
        if (!this.board.introPlaying)
            this.Draw();
    }
}

//Links are to shot 
export class Link {
    constructor(x, y, text, board, height, path) {
        this.pos = [x * board.tileWidth, y * board.tileHeight];
        this.text = text;
        this.board = board;
        this.textWidth = 0;
        this.textHeight = height * this.board.tileHeight;
        this.path = path;
    }

    Draw() {
        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById('gameCanvas').getContext('2d').font = `${this.textHeight}px gameboy`;

        document.getElementById('gameCanvas').getContext('2d').fillStyle = "#76A07B";
        document.getElementById('gameCanvas').getContext('2d').fillText(this.text, this.pos[0], this.pos[1]);

        this.MeasureTextWidth();

        document.getElementById('gameCanvas').getContext('2d').closePath();

        document.getElementById("gameCanvas").getContext('2d').beginPath();
        document.getElementById("gameCanvas").getContext('2d').strokeStyle = '#3A6A40';
        document.getElementById('gameCanvas').getContext('2d').rect(this.pos[0], this.pos[1] - (this.textHeight - 3), this.textWidth, this.textHeight);
        document.getElementById('gameCanvas').getContext('2d').stroke();

        document.getElementById('gameCanvas').getContext('2d').closePath();

        this.RegisterTiles();
    }

    MeasureTextWidth() {
        var letters = this.text.split("");
        var width = 0;
        letters.forEach(letter => {
            width += document.getElementById('gameCanvas').getContext('2d').measureText(letter).width;
        });

        this.textWidth = width;
    }

    RegisterTiles() {
        var yTiles = Math.floor(this.textHeight / this.board.tileHeight);
        var xTiles = Math.floor(this.textWidth / this.board.tileWidth);

        var convertedPos = [(this.pos[0] / this.board.tileWidth), (this.pos[1] / this.board.tileHeight) - 1];

        for (let x = convertedPos[0]; x <= convertedPos[0] + xTiles; x++) {
            for (let y = convertedPos[1]; y > convertedPos[1] - yTiles; y--) {
                /*if (!this.board.Tiles[x][y].active)
                    this.board.Tiles[x][y].toggle();*/

                if (this.board.Tiles[x][y])
                    this.board.Tiles[x][y].link = this.path;
            }
        }
    }

    Update() {
        if (this.board.controlsEnabled)
            this.Draw();
    }
}