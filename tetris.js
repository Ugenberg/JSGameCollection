const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

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



function draw_square(x, y, color){
    
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
                draw_square(y, x, this.gameboard[x][y]);
            }
        }    
    }
}

class Block {
    constructor(board) {
        this.x = 3;
        this.y = -2;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.color = colors[shapes.findIndex(x => x == this.shape)]
        this.rotation = 0;
        this.board = board;
    }
    draw_shape() {
        for(var r = 0; r < this.shape[this.rotation].length; r++){
            for(var c = 0; c < this.shape[this.rotation].length; c++){
                if(this.shape[this.rotation][r][c] == 'X'){
                    draw_square(this.x + c, this.y + r, this.color);
                }
            }
        }
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
        }
    }
    rotate(){
        this.rotation += 1;
        if(this.rotation == this.shape.length){
            this.rotation = 0;
        }
    }
    check_collision() {
        for(var r = 0; r < this.shape[this.rotation].length; r++){
            for(var c = 0; c < this.shape[this.rotation].length; c++){
                if(this.shape[this.rotation][r][c] == 'X'){
                    if(this.x + c < 0 || this.x + c >= COL){
                        return true;
                    }
                    if(this.y + r >= ROW) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    lock_piece() {
        for(var r = 0; r < this.shape[this.rotation].length; r++){
            for(var c = 0; c < this.shape[this.rotation].length; c++){
                if(this.shape[this.rotation][r][c] == 'X'){
                    this.board[this.y+r][this.x+c] = this.color;
                }
            }
        }
    }
}

var board = new Board();
var block = new Block(board);
        
board.draw_board();
block.draw_shape();

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        block.move_horizontal(-1);
        dropStart = Date.now();
        
    } else if (event.keyCode === 38) {
        block.rotate();    
    } else if (event.keyCode === 39) {
        block.move_horizontal(1);
        dropStart = Date.now();
        
    } 
});

function update(){
    board.draw_board();
    block.draw_shape(); 
    block.move_vertical();
}


let dropStart = Date.now();
let gameOver = false;
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000){
        update();
        dropStart = Date.now();
    }
    if( !gameOver){
        window.requestAnimationFrame(drop);
    }
}

drop();
