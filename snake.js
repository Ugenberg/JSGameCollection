const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

let block_size = 20;

function draw_square(x, y, color, ctx){
    
    ctx.fillStyle = color;
    ctx.fillRect(x*block_size, y*block_size, block_size, block_size);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x*block_size, y*block_size, block_size, block_size);
}



        
function draw_board() {
    for(var x = 0; x < 15; x++){
        for(var y = 0; y < 25; y++){
            
            if(y%2==0 && x%2==1)
                draw_square(y, x, "darkgreen", ctx);
            else
                draw_square(y, x, "green", ctx);
        }
    }
}

draw_board();

let snake = [];

snake[0] = {
    x : 9 * block_size,
    y : 10 * block_size
};

function draw_snake(){

    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "blue" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,block_size,block_size);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,block_size,block_size);
    }    
}


document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37){
        snake[0].x-=block_size;
    }else if(key == 38){
        snake[0].y-=block_size;
    }else if(key == 39){
        snake[0].x+=block_size;
    }else if(key == 40){
        snake[0].y+=block_size;
    }
}

let game = setInterval(draw_snake,100);