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
      '.....']]

var O = [['.....',
      '.....',
      '.XX..',
      '.XX..',
      '.....']]

var S = [['.....',
      '.....',
      '..XX.',
      '.XX..',
      '.....'],
     ['.....',
      '..X..',
      '..XX.',
      '...X.',
      '.....']]

var Z = [['.....',
      '.....',
      '.XX..',
      '..XX.',
      '.....'],
     ['.....',
      '..X..',
      '.XX..',
      '.X...',
      '.....']]

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
      '.....']]

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
      '.....']]

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
      '.....']]


var shapes = [I, O, S, Z, T, J, L]
var colors = ["red", "green", "blue", "gold", "orange", "gray", "brown"]

class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.color = colors[shapes.findIndex(x => x == this.shape)]
        this.rotation = 0;
    }
}

const block = new Block(2, 2);
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