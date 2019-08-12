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
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.color = colors[shapes.findIndex(x => x == this.shape)]
        this.rotation = 0;
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
});

function update(){
    board.draw_board();
    block.draw_shape();
        

}


let dropStart = Date.now();
let gameOver = false;
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 600){
        block.move_vertical()
        dropStart = Date.now();
        update();
    }
    if(block.check_full()){
        board.create_board();
        block.piece_reset();
        update();
    }
    
    if( !gameOver){
        window.requestAnimationFrame(drop);
    }
}

drop();
