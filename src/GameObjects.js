//Gamescreen is the collection of gameobjects that will be run on interval 
export class GameScreen {
    constructor() {
        this.Objects = [];
        this.canvas = null;
    }

    Clear() {
        this.canvas.getContext('2d').clearRect(0, 0, Math.floor(window.innerWidth / 64) * 4, Math.floor(window.innerHeight / 32) * 32);
        this.canvas.getContext('2d').clearRect(0, Math.floor(window.innerHeight / 32) * 28, Math.floor(window.innerWidth / 64) * 64, Math.floor(window.innerHeight / 32) * 4);
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

    GetElements() {
        this.canvas = document.getElementById("gameCanvas");
    }

    Init() {

        this.GetElements();

        this.Objects.forEach(obj => {
            obj.GetElements();
        })
    }
}

//Tile class for boxes that make up my name/enemies
export class Tile {
    constructor(x, y, active) {
        this.corner = [x, y];
        this.active = active;
        this.link = "";
        this.canvas = null;
        this.hasChanged = true;
    }

    Draw(tileWidth, tileHeight) {

        if (!this.hasChanged)
            return;

        this.canvas.clearRect(this.corner[0] - 1, this.corner[1] - 1, tileWidth, tileHeight);

        if (this.active) {
            this.canvas.beginPath();
            this.canvas.rect(this.corner[0], this.corner[1], tileWidth - 2, tileHeight - 2);
            this.canvas.strokeStyle = '#3A6A40';
            this.canvas.stroke();
            this.canvas.fillStyle = '#76A07B';
            this.canvas.fill();
        }

        this.hasChanged = false;
    }

    GetElements() {
        this.canvas = document.getElementById("gameCanvas").getContext('2d');
    }

    Update() {
        this.Draw();
    }

    toggle() {
        this.hasChanged = true;
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
        this.canvas = null;
        this.updated = true;
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

    GetElements() {

        this.Tiles.forEach(row => {
            row.forEach(tile => {
                tile.GetElements();
            })
        });

        this.canvas = document.getElementById("gameCanvas").getContext('2d');
    }

    LoadTileLayout(tiles) {

        if (this.skipIntro)
            return;

        const filePath = "/DefaultTileLayout.csv";
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

        xmlhttp.open("GET", filePath, false);
    
        xmlhttp.send();

        this.updated = true;
    }

    Draw() {
        this.Tiles.forEach(row => {
            row.forEach(tile => {
                tile.Draw(this.tileWidth, this.tileHeight);
            })
        });

        this.canvas.closePath();
        this.updated = false;
    }

    GetTile(x, y) {

        var x = Math.floor(x / this.tileWidth);
        var y = Math.floor(y / this.tileHeight);

        if (x >= this.xTiles || y >= this.yTiles)
            return null;

        return this.Tiles[x][y];
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

        this.updated = true;
    }

    IntroAnimation() {

        if (Date.now() - this.introTimer < 50) {
            return;
        }

        if (!this.introPlaying)
            this.introPlaying = true;

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

        this.updated = true;

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
        this.updated = true;
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
                sessionStorage.setItem("skipIntro", true);
            }
        }

        if (this.updated)
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
        this.board = board;
        this.missiles = [];
        this.lastMissileTime = 0;
        this.dir = 0;
        this.canvas = null;
    }

    Update() {

        if (this.board.introPlaying)
            return;

        this.Move();
        this.Draw();

        this.UpdateMissiles();
    }

    UpdateMissiles() {
        this.missiles.forEach(missile => missile.Update());
    }

    Draw() {
        //draw gun
        this.canvas.beginPath();
        this.canvas.rect((this.pos[0] + (this.bodyWidth / 2) - (this.gunWidth / 2)), (this.pos[1] - (this.bodyHeight)), this.gunWidth, this.gunHeight);
        this.canvas.strokeStyle = '#3A6A40';
        this.canvas.stroke();
        this.canvas.fillStyle = "#76A07B";
        this.canvas.fill();
        this.canvas.closePath();

        //draw body
        this.canvas.beginPath();
        this.canvas.rect(this.pos[0], this.pos[1], this.bodyWidth, this.bodyHeight);
        this.canvas.strokeStyle = '#3A6A40';
        this.canvas.stroke();
        this.canvas.fillStyle = "#76A07B";
        this.canvas.fill();
        this.canvas.closePath();
    }

    Move() {

        if (!this.board.controlsEnabled)
            return;

        if (this.dir > 0 && (this.pos[0] + this.bodyWidth) < (this.board.tileWidth * this.board.xTiles) - this.board.tileWidth) 
            this.pos[0] += this.dir;
        else if (this.dir < 0 && this.pos[0] > this.board.tileWidth)
            this.pos[0] += this.dir;
    }

    Shoot() {
        if (Date.now() - this.lastMissileTime < 250 || !this.board.controlsEnabled)
            return false;

        var misslePos = Math.round(this.pos[0] + (this.board.tileWidth / 8) + (this.board.tileWidth / 2));
        var missleOffset = misslePos % this.board.tileWidth;

        if (missleOffset < 5)
            misslePos += (5 - missleOffset);
        else if (missleOffset > this.board.tileWidth - (this.board.tileWidth / 4))
            misslePos -= (this.board.tileWidth - missleOffset) + (this.board.tileWidth / 4) + 5;

        var missle = new Missile(misslePos, this.pos[1], -3, this.board, this.lastMissileTime, this);
        missle.GetElements();
        this.missiles.push(missle);
        this.lastMissileTime = Date.now();
        return true;
    }

    GetElements() {
        this.canvas = document.getElementById("gameCanvas").getContext('2d');
    }

    RemoveMissile(missle) {
        var id = missle.id;
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
        this.active = true;
        this.canvas = null;
    }

    Clear() {
        this.canvas.clearRect(this.pos[0] - 2, this.pos[1] - 3, this.bodyWidth + 3, this.bodyHeight + 10);
    }

    Draw() {
        this.canvas.beginPath();
        this.canvas.rect(this.pos[0], this.pos[1], this.bodyWidth, this.bodyHeight);
        this.canvas.strokeStyle = '#3A6A40';
        this.canvas.stroke();
        this.canvas.fillStyle = "#76A07B";
        this.canvas.fill();
        this.canvas.closePath();
    }

    GetElements() {
        this.canvas = document.getElementById("gameCanvas").getContext('2d');
    }

    Move() {
        this.pos[1] += this.direction;
    }

    CheckCollision() {
        var tile = this.board.GetTile(this.pos[0], this.pos[1]);

        if (tile == null) {
            this.active = false;
            return;
        }

        if (tile.active) {
            this.active = false;
            this.board.updated = true;
            tile.toggle();
        }

        if (tile.link.length > 0) {
            this.active = false;
            window.location.href = tile.link;
        }
    }

    Update() {
        this.Clear();

        if (!this.active) {
            this.gunner.RemoveMissile(this);
            return;
        }

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
        this.canvas = null;
    }

    GetElements() {
        this.canvas = document.getElementById("gameCanvas").getContext('2d');
    }

    Draw() {
        this.canvas.beginPath();
        this.canvas.font = "18px gameboy";
        this.canvas.strokeStyle = '#3A6A40';
        this.canvas.stroke();
        this.canvas.fillStyle = "#76A07B";
        this.canvas.fillText(this.displayText, this.pos[0], this.pos[1]);
        this.canvas.closePath();
    }

    Update() {
        if (this.board.controlsEnabled)
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
        this.mouseOver = false;
        this.canvas = null;
    }

    Clear() {
        this.canvas.clearRect(this.pos[0], this.pos[1] + 6, this.textWidth, -this.textHeight - 6);
    }

    Draw() {
        this.canvas.beginPath();
        this.canvas.strokeStyle = '#3A6A40';
        this.canvas.rect(this.pos[0], this.pos[1] - (this.textHeight - 3), this.textWidth, this.textHeight);
        this.canvas.stroke();

        if (this.mouseOver) {
            this.canvas.fillStyle = '#B8CD93';
            this.canvas.fill();
        }

        this.canvas.closePath();

        this.canvas.beginPath();
        this.canvas.font = `${this.textHeight}px gameboy`;

        this.canvas.fillStyle = "#76A07B";
        this.canvas.fillText(this.text, this.pos[0], this.pos[1]);

        this.MeasureTextWidth();

        this.canvas.closePath();

        this.RegisterTiles();
    }

    GetElements() {
        this.canvas = document.getElementById("gameCanvas").getContext('2d');
    }

    MeasureTextWidth() {
        var letters = this.text.split("");
        var width = 0;
        letters.forEach(letter => {
            width += this.canvas.measureText(letter).width;
        });

        this.textWidth = width;
    }

    RegisterTiles() {
        var yTiles = Math.floor(this.textHeight / this.board.tileHeight) + 2;
        var xTiles = Math.floor(this.textWidth / this.board.tileWidth) + 2;

        var convertedPos = [(this.pos[0] / this.board.tileWidth), (this.pos[1] / this.board.tileHeight) - 1];

        for (let x = convertedPos[0]; x <= convertedPos[0] + xTiles; x++) {
            for (let y = convertedPos[1]; y > convertedPos[1] - yTiles; y--) {

                if (this.board.Tiles[x][y])
                    this.board.Tiles[x][y].link = this.path;
            }
        }
    }

    Update() {
        if (this.board.controlsEnabled) {
            this.Clear();
            this.Draw();
        }
    }
}