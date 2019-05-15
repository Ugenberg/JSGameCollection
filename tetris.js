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

var board = [];

function create_board()
{
    for(x = 0; x < ROW; x++){
        board[x] = [];
        for(y = 0; y < COL; y++){
            board[x][y] = "white";
        }
    }
}

function draw_board()
{
    for(x = 0; x < ROW; x++){
        for(y = 0; y < COL; y++){
            draw_square(y, x, board[x][y]);
        }
    }
}

create_board();
draw_board();

class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.color = colors[shapes.findIndex(x => x == this.shape)]
        this.rotation = 0;
    }
    draw_shape() {
        for(var r = 0; r < this.shape[this.rotation].length; r++){
            for(var c = 0; c < this.shape[this.rotation].length; c++){
                if(this.shape[this.rotation][r][c] == 'X'){
                    draw_square(this.x + r, this.y + c, this.color);
                }
            }
        }
    }
}

var block = new Block(4, 0);
block.draw_shape();

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        block.x--;
    } else if (event.keyCode === 39) {
        block.x++;
    } 
});

function update(){
    draw_board();
    block.draw_shape();
    block.y++;
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

