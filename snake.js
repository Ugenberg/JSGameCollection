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

class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.reset_food();
    }
    
    draw_food() {
        draw_square(this.x, this.y, "red", ctx);
    }
    
    reset_food() {
        this.x = Math.floor(Math.random() * (25 - 0 + 1));
        this.y = Math.floor(Math.random() * (15 - 0 + 1));
        this.draw_food();
    }
}

class Snake {
    constructor(board) {
        this.body = [];
        this.board = board;
        this.create_head();
        this.direction = "";
        
    }
    
    create_head() {
        
        this.body[0] = [10, 10];
    }
    
    draw_snake() {
        for( let i = 0; i < this.body.length ; i++){
            draw_square(this.body[i][0], this.body[i][1], "blue", ctx);
        }
    }
    
    update_position() {
        
        this.board.draw_board();
        this.draw_snake();
        food.draw_food();
        let bol = this.eat_food();
        
        if(!bol)
            this.move_body();
        this.move_head();
        
        
    }
    
    move_head() {
        if(this.direction == "LEFT"){
            this.body[0][0]--;
        }
        else if(this.direction == "RIGHT"){
            this.body[0][0] += 1;
        }
        else if(this.direction == "UP"){
            this.body[0][1]--;
        }
        else if(this.direction == "DOWN"){
            this.body[0][1]++;
        }
        
    }
    
    move_body() {
        
        for(let i = this.body.length - 1; i >= 1; i--){
            this.body[i][0] = this.body[i-1][0];
            this.body[i][1] = this.body[i-1][1];
        }
        
    }
    
    eat_food() {
        
        console.log(this.body[0], food.x, food.y);
        
        if(this.body[0][0] == food.x && this.body[0][1] == food.y) {
            this.body.push([food.x, food.y]);
            food.reset_food();
            return true;
        }
        return false;
    }
}



var board = new Board();
var snake = new Snake(board);
var food = new Food();



document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37){
        snake.direction = "LEFT";
    }else if(key == 38){
        snake.direction = "UP";
    }else if(key == 39){
        snake.direction = "RIGHT";
    }else if(key == 40){
        snake.direction = "DOWN";
    }
}

setInterval(() => snake.update_position(),100);



function quitGame() {
    window.location.href='menu.html';
}