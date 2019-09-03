const cvs = document.getElementById("snake_canv");
const ctx = cvs.getContext("2d");

let block_size = 20;

function draw_square(x, y, color, ctx){
    
    ctx.fillStyle = color;
    ctx.fillRect(x*block_size, y*block_size, block_size, block_size);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x*block_size, y*block_size, block_size, block_size);
}


class Board {
    constructor() {
        this.draw_board();
    }
    draw_board() {
        for(var x = 0; x < 15; x++){
            for(var y = 0; y < 25; y++){
                if(y%2==0 && x%2==1)
                    draw_square(y, x, "darkgreen", ctx);
                else
                    draw_square(y, x, "green", ctx);
            }
        } 
    }
}

class Snake {
    constructor(board) {
        this.body = [];
        this.board = board;
        this.create_head();
        
    }
    
    create_head() {
        
        this.body[0] = {x: 10 * block_size,
                        y: 10 * block_size};
    }
    
    update_position() {
        for( let i = 0; i < this.body.length ; i++){
            ctx.fillStyle = ( i == 0 )? "blue" : "white";
            ctx.fillRect(this.body[i].x,this.body[i].y,block_size,block_size);
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.body[i].x,this.body[i].y,block_size,block_size);
        }    
    
    }
}



var board = new Board();
var snake = new Snake(board);


document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37){
        snake.body[0].x-=block_size;
    }else if(key == 38){
        snake.body[0].y-=block_size;
    }else if(key == 39){
        snake.body[0].x+=block_size;
    }else if(key == 40){
        snake.body[0].y+=block_size;
    }
}

setInterval(snake.update_position,100);



function quitGame() {
    window.location.href='menu.html';
}