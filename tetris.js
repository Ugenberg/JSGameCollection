const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const ROW = 20;
const COL = 10;
const block_size = 20;

function draw_square(x, y, color){
    
    ctx.fillStyle = color;
    ctx.fillRect(x*block_size, y*block_size, block_size, block_size);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*block_size, y*block_size, block_size, block_size);
}

let board = [];

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