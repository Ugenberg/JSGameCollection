const canvas_tetris = document.getElementById("tetris");
const canvas_next = document.getElementById("next");
const ctx_tetris = canvas_tetris.getContext("2d");
const ctx_next = canvas_next.getContext("2d");
var scr = document.getElementById("score");
var lvl = document.getElementById("level");
var lns = document.getElementById("lines");




const ROW = 20;
const COL = 10;
const block_size = 20;

var I = [['..X..',
      '..X..',
      '..X..',
      '..X..',
      '.....'],
     ['.....',
      'XXXX.',
      '.....',
      '.....',
      '.....']];

var O = [['.....',
      '.....',
      '.XX..',
      '.XX..',
      '.....']];

var S = [['.....',
      '.....',
      '..XX.',
      '.XX..',
      '.....'],
     ['.....',
      '..X..',
      '..XX.',
      '...X.',
      '.....']];

var Z = [['.....',
      '.....',
      '.XX..',
      '..XX.',
      '.....'],
     ['.....',
      '..X..',
      '.XX..',
      '.X...',
      '.....']];

var T = [['.....',
      '..X..',
      '.XXX.',
      '.....',
      '.....'],
     ['.....',
      '..X..',
      '..XX.',
      '..X..',
      '.....'],
     ['.....',
      '.....',
      '.XXX.',
      '..X..',
      '.....'],
     ['.....',
      '..X..',
      '.XX..',
      '..X..',
      '.....']];

var J = [['.....',
      '..X..',
      '..X..',
      '.XX..',
      '.....'],
     ['.....',
      '.X...',
      '.XXX.',
      '.....',
      '.....'],
     ['.....',
      '..XX.',
      '..X..',
      '..X..',
      '.....'],
     ['.....',
      '.....',
      '.XXX.',
      '...X.',
      '.....']];

var L = [['.....',
      '..X..',
      '..X..',
      '..XX.',
      '.....'],
     ['.....',
      '.....',
      '.XXX.',
      '.X...',
      '.....'],
     ['.....',
      '.XX..',
      '..X..',
      '..X..',
      '.....'],
     ['.....',
      '...X.',
      '.XXX.',
      '.....',
      '.....']];


var shapes = [I, O, S, Z, T, J, L];
var colors = ["red", "green", "blue", "gold", "orange", "gray", "brown"];



function draw_square(x, y, color, ctx){
    
    ctx.fillStyle = color;
    ctx.fillRect(x*block_size, y*block_size, block_size, block_size);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x*block_size, y*block_size, block_size, block_size);
}


class Board {
    constructor() {
        this.gameboard = [];
        this.create_board();
        
    }
    create_board() {
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.limit = 50;
        for(var x = 0; x < ROW; x++){
            this.gameboard[x] = [];
            for(var y = 0; y < COL; y++){
                this.gameboard[x][y] = "white";
            }
        }
    }
    draw_board() {
        for(var x = 0; x < ROW; x++){
            for(var y = 0; y < COL; y++){
                draw_square(y, x, this.gameboard[x][y], ctx_tetris);
            }
        }
    }
    clear_lines() {
        var flag = 1;
        var counter = 0;
        var start = 0;
        for(var x = ROW-1; x > 0; x--){
            for(var y = 0; y < COL; y++){
                if(this.gameboard[x][y] == "white"){
                    flag = 0;
                }
            }
            if(flag){
                start = start == 0 ? x : start;
                counter++;
            }
            else{
                if(counter){
                    break;
                }
            }
            flag = 1;
        }
            
        
        for(var r = start; r > 0; r--){
            this.gameboard[r] = r-counter > 0 ? this.gameboard[r-counter] : this.gameboard[0];    
        }
        
        this.score += counter * 10;
        this.lines += counter;
        scr.innerHTML = this.score;
        lns.innerHTML = this.lines;
        
        if(this.score >= this.limit & counter != 0) {
            this.level++;
            lvl.innerHTML = this.level;
            this.limit = 50 * this.level;
        }
    }
    
}

class Block {
    constructor(board) {
        this.x = 3;
        this.y = -3;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.color = colors[shapes.findIndex(x => x == this.shape)]
        this.rotation = 0;
        this.board = board;
        this.next = shapes[Math.floor(Math.random() * shapes.length)];
        this.draw_next();
    }
    draw_shape() {
        for(var r = 0; r < this.shape[this.rotation].length; r++){
            for(var c = 0; c < this.shape[this.rotation].length; c++){
                if(this.shape[this.rotation][r][c] == 'X'){
                    draw_square(this.x + c, this.y + r, this.color, ctx_tetris);
                }
            }
        }
    }
    
    draw_next() {
        var my_gradient = ctx_next.createLinearGradient(0, 100, 100, 10);
        my_gradient.addColorStop(0, "#34044d");
        my_gradient.addColorStop(0.5, "#00d4ff");
        my_gradient.addColorStop(1, "#34044d");
        ctx_next.fillStyle = my_gradient;
        ctx_next.fillRect(0, 0, 100, 100);
        for(var r = 0; r < this.next[0].length; r++){
            for(var c = 0; c < this.next[0].length; c++){
                if(this.next[0][r][c] == 'X'){
                    draw_square(c, r, colors[shapes.findIndex(x => x == this.next)], ctx_next);
                }
            }
        }
    }
    
    check_full() {
        for(var i = 0; i < 10; i++){
            if(this.board.gameboard[0][i] != "white")
                return true;
        }
        return false;
    }
    
    piece_reset() {
        this.board.clear_lines();
        this.x = 3;
        this.y = -3;
        this.shape = this.next;
        this.color = colors[shapes.findIndex(x => x == this.shape)]
        this.next = shapes[Math.floor(Math.random() * shapes.length)];
        this.rotation = 0;
        this.draw_next();
    }
    
    move_horizontal(direction) {
        this.x += direction;
        if(this.check_collision()) {
            this.x -= direction;
        }
    }
    move_vertical() {
        this.y++;
        if(this.check_collision()) {
            this.y--;
            this.lock_piece();
            this.piece_reset();
        }
    }
    rotate(){
        this.rotation = this.rotation + 1 == this.shape.length ? 0 : this.rotation + 1;
        if(this.check_collision()) {
            this.rotation = this.rotation == 0 ? this.shape.length - 1 : this.rotation - 1;
        }
    }
    check_collision() {
        for(var r = 0; r < this.shape[this.rotation].length; r++){
            for(var c = 0; c < this.shape[this.rotation].length; c++){
                if(this.shape[this.rotation][r][c] == 'X'){
                    if(this.x + c < 0 || this.x + c >= COL){
                        return true;
                    }
                    if(this.y + r >= ROW || (this.y+r >= 0 && this.board.gameboard[this.y+r][this.x+c] != "white")) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    instant_drop() {        
        while(true){
            this.y++;
            if(this.check_collision()) {
                this.y--;
                this.lock_piece();
                this.piece_reset();
                break;
            }
        }
        update();
    }
    
    lock_piece() {
        for(var r = 0; r < this.shape[this.rotation].length; r++){
            for(var c = 0; c < this.shape[this.rotation].length; c++){
                if(this.shape[this.rotation][r][c] == 'X'){
                    if(this.y + r < 0){
                        continue;
                    }
                    this.board.gameboard[this.y+r][this.x+c] = this.color;
                }
            }
        }
        this.board.clear_lines();
    }
}

var board = new Board();
var block = new Block(board);

document.addEventListener('keydown', event => {
    if(gameRun) {
        if (event.keyCode === 37) {
            block.move_horizontal(-1);
            update();
        } else if (event.keyCode === 38) {
            block.rotate();
            update();
        } else if (event.keyCode === 39) {
            block.move_horizontal(1);
            update();
        } else if (event.keyCode === 40) {
            block.move_vertical();
            update();
        } else if (event.keyCode === 32) {
            block.instant_drop();
            update;
        }
    }
});

function update(){
    board.draw_board();
    block.draw_shape();
        

}


let dropStart = Date.now();
let gameStart = false;
let gameRun = false;
let gamePause = false;
let gameTemp = 700;

function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > (gameTemp - board.level * 150) && gameRun == true){
        block.move_vertical()
        dropStart = Date.now();
        update();
    }
    if(block.check_full()){
        gameOver();
    }
    
    if(gameRun){
        window.requestAnimationFrame(drop);
    }
}

function newGame() {
    gameStart = true;
    gameRun = true;
    board.create_board();
    block.piece_reset();
    update();
    drop();
}

function pauseGame() {
    if(gameRun){
        gameRun = false;
    }
    else if(gameStart){
        gameRun = true;
        drop();
    }
}

function helpGame() {
    gameRun = false;
    var modal = document.getElementById("help");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
        if(gameStart) {
            gameRun = true;
            drop();
        }
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            if(gameStart) {
                gameRun = true;
                drop();
            }
        }
    }
}

function quitGame() {
    window.location.href='menu.html';
}

function gameOver() {
    gameRun = false;
    var modal = document.getElementById("gameOver");
    var span = document.getElementsByClassName("close")[1];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }    
}

board.draw_board();