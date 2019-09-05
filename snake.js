const cvs = document.getElementById("snake_canv");
const ctx = cvs.getContext("2d");

let block_size = 20;
const foodImg = new Image();
foodImg.src = "img/apple.png";
const bodyImg = new Image();
bodyImg.src = "img/body.png";
const headImg = new Image();
headImg.src = "img/head.png";
const backImg = new Image();
backImg.src = "img/back.png";

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
        ctx.drawImage(backImg, 0, 0);
    }
}

class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.reset_food();
    }
    
    draw_food() {
        ctx.drawImage(foodImg, this.x * block_size, this.y * block_size);
    }
    
    reset_food() {
        this.x = Math.floor(Math.random() * (25));
        this.y = Math.floor(Math.random() * (15));
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
        
        ctx.drawImage(headImg, this.body[0][0] * block_size, this.body[0][1] * block_size);    
        
        for( let i = 1; i < this.body.length ; i++){
            ctx.drawImage(bodyImg, this.body[i][0] * block_size, this.body[i][1] * block_size);
        }
    }
    
    reset_snake() {
        this.body = [];
        this.direction = "";
        this.create_head();
    }
    
    update_position() {
        
        this.board.draw_board();
        if(gameRun) {
            this.draw_snake();
            food.draw_food();
            let bol = this.eat_food();

            if(!bol)
                this.move_body();
            this.move_head();
            this.check_collision();
        }
        
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
        
        console.log(food.x, food.y);
        
        if(this.body[0][0] == food.x && this.body[0][1] == food.y) {
            this.body.splice(1,0,[food.x, food.y]);
            food.reset_food();
            return true;
        }
        return false;
    }
    
    check_collision() {
        if(this.body[0][0] >= 25 || this.body[0][0] < 0 || this.body[0][1] >= 15 || this.body[0][1] < 0){
            clearInterval(interval);
            gameOver();
        }
        for(var i = 1; i < this.body.length; i++){
            if(this.body[0][0] == this.body[i][0] && this.body[0][1] == this.body[i][1]){
                clearInterval(interval);
                gameOver();
            }
        }
    }
}



var board = new Board();
var snake = new Snake(board);
var food = new Food();



document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if(gameRun){    
        if(key == 37 && snake.direction != "RIGHT"){
            snake.direction = "LEFT";
        }else if(key == 38 && snake.direction != "DOWN"){
            snake.direction = "UP";
        }else if(key == 39 && snake.direction != "LEFT"){
            snake.direction = "RIGHT";
        }else if(key == 40 && snake.direction != "UP"){
            snake.direction = "DOWN";
        }
    }
}


gameRun = false;
gameStart = false;
var interval = setInterval(() => snake.update_position(),100);

function newGame() {
    if(!gameStart){
        gameRun=true;
        gameStart=true;
    }
    
    if(gameRun) {
        snake.reset_snake();
    }
    else {
        gameRun = true;
        snake.reset_snake();
        interval = setInterval(() => snake.update_position(), 100);
    }
    
}

function pauseGame() {
    if(gameStart){
        if(gameRun){
            clearInterval(interval);
            gameRun = false;
        }
        else{
            gameRun = true;
            interval = setInterval(() => snake.update_position(), 100);
        }
    }
}


function helpGame() {
    if(gameStart){
        clearInterval(interval);
        gameRun = false;
    }
    var modal = document.getElementById("help");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
        if(gameStart) {
            gameRun = true;
            interval = setInterval(() => snake.update_position(), 100);
        }
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            if(gameStart) {
                gameRun = true;
                interval = setInterval(() => snake.update_position(), 100);
            }
        }
    }
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


function quitGame() {
    window.location.href='menu.html';
}