let board;
let mouseX;
let count = 0;
let level = 0;
let fired = false;

const STATUS_HEIGHT = 30;

function mouseMove() {
	mouseX = event.clientX - board.offsetLeft;
	mouseY = event.clientY - board.offsetTop;
}

function mouseDown() {
	if (level === 0) {
		level = 1;
		count = 0;
	} else {
		fired = true;
	} 
}

window.onload = function () {
    const FPS = 20;
    const MSG_COLOR = "#FFAD80";
	
	board = document.getElementById("board");
	board.width = 500;
	board.height = 560;
	let ctx = board.getContext("2d");
	board.addEventListener("mousemove", mouseMove, true);
	board.addEventListener("mousedown", mouseDown, true);

	let bar = new Bar();
	bar.init();
	let ball = new Ball();
	ball.init();

	let numCol = Block.BLOCK_ARRANGEMENT[0][0].length;
	let interval = (board.width - numCol * Block.BLOCK_WIDTH) / (numCol + 1);
	let blocks = new Array(Block.BLOCK_ARRANGEMENT[0].length);

	for (let row = 0; row < blocks.length; row++) {
		blocks[row] = new Array(numCol);
		for (let col = 0; col < numCol; col++) {
            let block = new Block();
			let x = Block.BLOCK_WIDTH * (col + 0.5) + interval * (col + 1);
			let y = Block.BLOCK_HEIGHT * (row + 0.5) + interval * (row + 1) + STATUS_HEIGHT;
			block.init(x, y);
            blocks[row][col] = block;
		}
	}
	let items = [];
    let score = 0;
    let itemCount = 0;

	(function () {
        let place, breakAll;

		count++;
		itemCount++;

		ctx.clearRect(0, 0, board.width, board.height);
		ctx.beginPath();
		ctx.fillStyle = "#909090";
		ctx.fillRect(0, STATUS_HEIGHT, board.width, 3);

		let half = bar.width / 2
		if (mouseX < half) {
			bar.position.x = half;
		} else if (mouseX > board.width - half) {
			bar.position.x = board.width - half;
		} else {
			bar.position.x = mouseX;
		}
		ctx.beginPath();
		ctx.fillStyle = bar.color;
		ctx.fillRect(bar.position.x - half, bar.position.y - (bar.height / 2), bar.width, bar.height);
		
		if (level === 0) {
			ctx.beginPath();
			ctx.font = "50px Consolas";
			ctx.fillStyle = MSG_COLOR;
			ctx.textAlign = "center";
			ctx.fillText("BREAKOUT", board.width / 2, board.height / 2 - 100);
			ctx.font = "20px Consolas";
			ctx.fillText("Click the board to start the game", board.width / 2, board.height / 2);
			for (let i = 0; i < blocks.length; i++) {
				for (let j = 0; j < blocks[i].length; j++) {
					blocks[i][j].set(1, i, j);
				}
			}
		} else {
			if (!fired) {
				ball.set(bar.position.x, bar.position.y - bar.height / 2 - ball.size, 0, -1);
			} else {
				ball.move();
                if (ball.position.y - ball.size > board.height) {
                    fired = false;
                    ball.life--;
                    bar.init();
                    ball.init();
                    for (let i = 0; i < items.length; i++) {
                        items[i].alive = false;
                    }
                }
				place = getCollisionPosition(ball,bar);
                if (place !== "") {
					ball.set(ball.position.x, ball.position.y, ball.position.x - bar.position.x, -bar.width / 2);
                }
				breakAll = true;
				for (let i = 0; i < blocks.length; i++) {
					for (let j = 0; j < blocks[i].length; j++) {
						if (blocks[i][j].alive) {
							let pos = getCollisionPosition(ball, blocks[i][j]);
							switch (pos) {
							case "top":
							case "bottom":
								blocks[i][j].life--;
								if (!ball.penetration || blocks[i][j].life !== 0) {
									ball.velocity.y *= -1;
								}
								break;
							case "left":
							case "right":
								blocks[i][j].life--;
								if (!ball.penetration || blocks[i][j].life !== 0) {
									ball.velocity.x *= -1;
								}
								break;
							}
							if (blocks[i][j].life === 0) {
								blocks[i][j].alive = false;
								score += blocks[i][j].score;
								// create an item
								let makeItem = Math.floor(Math.random() * Item.ITEM_FREQUENCY);
								if (makeItem === 0) {
                                    let item = new Item();
                                    item.init(blocks[i][j].position);
                                    items.push(item);
								}
							}
							breakAll=false;
						}
					}
				}
			}
			// blocks
			ctx.beginPath();
			for (let i = 0; i < blocks.length; i++) {
				for (let j = 0; j < blocks[i].length; j++) {
					if (blocks[i][j].alive) {
						ctx.fillStyle = blocks[i][j].color;
						ctx.fillRect(
							blocks[i][j].position.x - blocks[i][j].width / 2,
							blocks[i][j].position.y - blocks[i][j].height / 2,
							blocks[i][j].width,
							blocks[i][j].height
							);
						ctx.closePath();
					}
				}
			}
			// items
			for (let i = 0; i < items.length; i++) {
				if (items[i].alive) {
					items[i].move();
					let pos = getCollisionPosition(items[i],bar);
					let itemNum = Math.floor(Math.random() * Item.ITEM_TYPES.length);
                    if (pos !== "") {
                        items[i].alive = false;
						bar.init();
						ball.init();
						Item.ITEM_TYPES[itemNum].apply(bar, ball);
						itemCount = 0;
                    }
					ctx.beginPath();
					let gradation = ctx.createLinearGradient(
						items[i].position.x - items[i].size,
						items[i].position.y - items[i].size,
						items[i].position.x - items[i].size,
						items[i].position.y + items[i].size
                    );
					gradation.addColorStop(0, "#00FF60"); 
 					gradation.addColorStop(1, "#00A8FF");
					ctx.fillStyle = gradation;
					ctx.arc(items[i].position.x, items[i].position.y, items[i].size, 0, Math.PI * 2, false);
					ctx.fill();
					ctx.font="20px Consolas";
					ctx.fillStyle="#404040";
					ctx.textAlign="center";
					ctx.textBaseline="middle";
					ctx.fillText("?", items[i].position.x, items[i].position.y);
				}
			}
			// ball
			ctx.beginPath();
			ctx.arc(ball.position.x, ball.position.y, ball.size, 0, Math.PI * 2, false);
			ctx.fillStyle = ball.color;
			ctx.fill();
			if (count < (50) * 1) {
				ctx.beginPath();
				ctx.font = "50px Consolas";
				ctx.fillStyle = MSG_COLOR;
				ctx.textAlign = "center";
				ctx.fillText("level " + level, board.width / 2, board.height / 2);
			}
			if (itemCount === (50) * 10) {
				bar.init();
				ball.init();
			}
			// lives
			for (let i = 1; i < ball.life; i++) {
				ctx.beginPath();
				ctx.arc(25 * i, STATUS_HEIGHT / 2, 8, 0, Math.PI * 2, false);
				ctx.fillStyle = ball.color;
				ctx.fill();
			}
			// level, score
			ctx.beginPath();
			ctx.font = "20px Consolas";
			ctx.fillStyle = MSG_COLOR;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			let msg = "level " + level + "     " + "score " + score;
			ctx.fillText(msg, board.width / 2, STATUS_HEIGHT / 2);
			// finish
			if (breakAll) {
				level++;
				count = 0;
				breakAll = false;
				bar.init();
				ball.init();
				for (let i = 0; i < items.length; i++) {
					items[i].alive = false;
				}
				if (level - 1 === Block.BLOCK_ARRANGEMENT.length) {
					ctx.beginPath();
					ctx.font = "100px Consolas";
					ctx.fillStyle = MSG_COLOR;
					ctx.textAlign = "center";
					ctx.fillText("CLEAR!", board.width / 2, board.height / 2);
					ctx.font = "50px Consolas";
					ctx.fillText("score: " + score, board.width / 2, board.height / 2 + 100);
					return;
				} else {
					fired = false;
					for (let i = 0; i < blocks.length; i++) {
						for (let j = 0; j < blocks[i].length; j++) {
							blocks[i][j].set(level, i, j);
						}
					}
				}
			}
			// quit button
			ctx.beginPath();
			ctx.font = "20px Consolas";
			ctx.fillStyle = MSG_COLOR;
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			let btn = "Quit";
			ctx.fillText(btn, board.width / 1.11, STATUS_HEIGHT / 2);
			var bbox = {x:board.width / 1.11, y:STATUS_HEIGHT / 5, w:43, h:20};
			//ctx.fillRect(board.width / 1.11, STATUS_HEIGHT / 5, 43,20);
			if(mouseX >= bbox.x && mouseY >= bbox.y && mouseX <= bbox.x + bbox.w && mouseY <= bbox.y + bbox.h){
				window.location.href="../menu.html";
			}
			// game over
			if (ball.life === 0) {
				ctx.beginPath();
				ctx.font = "100px Consolas";
				ctx.fillStyle = MSG_COLOR;
				ctx.textAlign = "center";
				ctx.fillText("GAME", board.width / 2, board.height / 2 - 50);
				ctx.fillText("OVER", board.width / 2, board.height / 2 + 50);
				ctx.font = "50px Consolas";
				ctx.fillText("score: " + score, board.width / 2, board.height / 2 + 150);
				return;
			}
		}
		setTimeout(arguments.callee, FPS);
	}) ();
}