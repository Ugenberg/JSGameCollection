const cvs = document.getElementById("snake_canv");
const ctx = cvs.getContext("2d");

let block_size = 20;
const foodImg = new Image();
foodImg.src = "img/apple.png";
const food2Img = new Image();
food2Img.src = "img/super.png";
const bodyImg = new Image();
bodyImg.src = "img/body.png";
const headImg = new Image();
headImg.src = "img/head.png";
const backImg = new Image();
backImg.src = "img/back.png";
var scr = document.getElementById("score_s");
var lvl = document.getElementById("level_s");
var ets = document.getElementById("lines_s");

function draw_square(x, y, color, ctx){
    
    ctx.fillStyle = color;
    ctx.fillRect(x*block_size, y*block_size, block_size, block_size);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x*block_size, y*block_size, block_size, block_size);
}


class Board {
    constructor() {
        this.draw_board();
        this.level = 1;
        this.obstacles = [[[11, 6],[12,6],[13,6],[11, 7],[12,7],[13,7],[11, 8],[12,8],[13,8]],
                          [[4, 6],[5,6],[6,6],[4, 7],[5,7],[6,7],[4, 8],[5,8],[6,8],[18, 6],[19,6],[20,6],[18, 7],[19,7],[20,7],[18, 8],[19,8],[20,8]],
                          [[4, 6],[5,6],[6,6],[4, 7],[5,7],[6,7],[4, 8],[5,8],[6,8],[18, 6],[19,6],[20,6],[18, 7],[19,7],[20,7],[18, 8],[19,8],[20,8],[11, 6],[12,6],[13,6],[11,7],[12,7],[13,7],[11, 8],[12,8],[13,8],[10,6],[10,7],[10,8],[14,6],[14,7],[14,8]],
                          [[4, 6],[5,6],[6,6],[4, 7],[5,7],[6,7],[4, 8],[5,8],[6,8],[18, 6],[19,6],[20,6],[18, 7],[19,7],[20,7],[18, 8],[19,8],[20,8],[11, 6],[12,6],[13,6],[11,7],[12,7],[13,7],[11, 8],[12,8],[13,8],[10,6],[10,7],[10,8],[14,6],[14,7],[14,8],[10,5],[11,5],[12,5],[13,5],[14,5],[10,9],[11,9],[12,9],[13,9],[14,9]]];
    }
    draw_board() {
        ctx.drawImage(backImg, 0, 0);
        if(this.level > 1){
            this.create_obstacles();
        }
    }
    
    create_obstacles() {
        
        var idx = this.level < 5 ? this.level - 2 : 3;
        
        for(var i = 0; i < this.obstacles[idx].length; i++) {
            draw_square(this.obstacles[idx][i][0], this.obstacles[idx][i][1], "brown", ctx);    
        }
        
    }
}

class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.reset_food();
        this.flag = 1;
    }
    
    draw_food() {
        
        if(this.flag){
            ctx.drawImage(foodImg, this.x * block_size, this.y * block_size);
        } else {
            ctx.drawImage(food2Img, this.x * block_size, this.y * block_size);
        }
    }
    
    reset_food() {
        
        var idx = snake.level < 5 ? snake.level - 2 : 3;
        
        this.x = Math.floor(Math.random() * (25));
        this.y = Math.floor(Math.random() * (15));
        
        
        for(var i = 0; i < snake.body.length; i++){
                if(this.x == snake.body[i][0] && this.y == snake.body[i][1]){
                    this.reset_food();
                }
            }   
        
        if(snake.board.level > 1){
            for(var i = 0; i < snake.board.obstacles[idx].length; i++){
                if(this.x == snake.board.obstacles[idx][i][0] && this.y == snake.board.obstacles[idx][i][1]){
                    this.reset_food();
                }
            }   
        }
        
        this.flag = this.flag == 0 ? 1 : 0;
        
    }
}

class Snake {
    constructor(board) {
        this.board = board;
        this.reset_snake();
        
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
        this.level = 1;
        board.level = this.level;
        this.eats = 0;
        this.score = 0;
        this.limit = this.level * 50;
        scr.innerHTML = this.score;
        ets.innerHTML = this.eats;
        lvl.innerHTML = this.level;
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
            this.score += 10;
            this.eats += 1;
            scr.innerHTML = this.score;
            ets.innerHTML = this.eats;
            
            if(this.score >= this.limit) {
                this.level += 1;
                this.limit = this.level * 50;
                lvl.innerHTML = this.level;
                board.level = this.level;
            }
            
            return true;
        }
        return false;
    }
    
    check_collision() {
        
        var idx = this.level < 5 ? this.level - 2 : 3;
        
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
        
        if(this.level > 1){
            for(var i = 0; i < board.obstacles[idx].length; i++){
                if(this.body[0][0] == board.obstacles[idx][i][0] && this.body[0][1] == board.obstacles[idx][i][1]){
                    clearInterval(interval);
                    gameOver();
                }
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