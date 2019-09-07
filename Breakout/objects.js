class Bar {
	constructor() {
		this.position = new Point();
		this.width = 0;
		this.height = 0;
		this.color = "";
	}
	init() {
		this.position.y = this.constructor.BAR_POSITION_Y;
		this.width = this.constructor.BAR_WIDTH;
		this.height = this.constructor.BAR_HEIGHT;
		this.color = this.constructor.BAR_COLOR;
	}
}
Bar.BAR_POSITION_Y = 550;
Bar.BAR_WIDTH = 160;
Bar.BAR_HEIGHT = 15;
Bar.BAR_COLOR = "#808080";

class Ball {
    constructor() {
        this.position = new Point();
        this.velocity = new Point();
        this.size = 0;
        this.speed = 0;
        this.life = 3;
        this.penetration = false;
        this.color = "";
    }
    init() {
        this.size = this.constructor.BALL_SIZE;
        this.speed = this.constructor.BALL_SPEED;
        this.color = this.constructor.BALL_COLOR;
        this.penetration = false;
    }
    set(x, y, vx, vy) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = vx;
        this.velocity.y = vy;
        this.velocity.normalize();
    }
    move() {
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;
        if ((this.position.x - this.size <= 0 && this.velocity.x < 0) || (this.position.x + this.size >= board.width && this.velocity.x > 0)) {
            this.velocity.x *= -1;
        }
        if (this.position.y - this.size <= STATUS_HEIGHT && this.velocity.y < 0) {
            this.velocity.y *= -1;
        }
    }
}
Ball.BALL_SIZE = 10;
Ball.BALL_SPEED = 10;
Ball.BALL_COLOR = "#808080";

class Block {
    constructor() {
        this.position = new Point();
        this.width = 0;
        this.height = 0;
        this.score = 0;
        this.life = 5;
        this.color = "";
        this.alive = false;
    }
    init(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.width = this.constructor.BLOCK_WIDTH;
        this.height = this.constructor.BLOCK_HEIGHT;
    }
    set(level, row, col) {
        level -= 1;
        if (this.constructor.BLOCK_ARRANGEMENT[level][row][col] !== 0) {
            this.alive = true;
            this.life = this.constructor.BLOCK_ARRANGEMENT[level][row][col];
            this.score = this.constructor.BLOCK_ARRANGEMENT[level][row][col] * 10;
            switch (this.constructor.BLOCK_ARRANGEMENT[level][row][col]) {
            case 1:
                this.color = "#02CBFD";
                break;
            case 2:
                this.color = "#02FD0E"
                break;
            case 3:
                this.color = "#DEFF00";
                break;
            }
        } else {
            this.alive = false;
        }
    }
}
Block.BLOCK_WIDTH = 36;
Block.BLOCK_HEIGHT = 19;
Block.BLOCK_ARRANGEMENT = [
	[
		[0,0,0,0,0,0,3,0,0,0,0,0,0],
		[0,0,0,0,0,0,2,0,0,0,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,0],
		[1,0,1,0,1,0,1,0,1,0,1,0,1],
		[0,0,0,0,0,0,1,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[2,2,2,2,2,2,2,2,2,2,2,2,2],
		[1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[2,2,2,2,2,2,2,2,2,2,2,2,2],
		[3,3,3,3,3,3,3,3,3,3,3,3,3],
		[1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1],
		[3,3,3,3,3,3,3,3,3,3,3,3,3],
		[1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	[
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,3,0,0,0,0,0,0],
		[2,1,2,1,2,1,2,1,2,1,2,1,2],
		[2,3,2,3,2,3,2,3,2,3,2,3,2],
		[1,1,1,1,1,1,1,1,1,1,1,1,1],
		[2,2,2,2,2,2,0,2,2,2,2,2,2],
		[0,3,0,3,0,3,0,3,0,3,0,3,0],
		[1,1,1,1,1,1,0,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
]

class Item {
    constructor() {
        this.position = new Point();
        this.size = 0;
        this.speed = 0;
        this.kind = "";
        this.alive = false;
    }
    init(position) {
        this.position.x = position.x;
        this.position.y = position.y;
        this.size = this.constructor.ITEM_SIZE;
        this.speed = this.constructor.ITEM_SPEED;
        this.alive = true;
    }
    move() {
        this.position.y += this.speed;
        if(this.position.y - this.size > board.height) {
            this.alive = false;
        }
    }
}
Item.ITEM_SIZE = 9;
Item.ITEM_SPEED = 4;
Item.ITEM_FREQUENCY = 10;
Item.ITEM_TYPES = [
	{
		name: "bigBar",
		apply: function (bar, ball) {
			bar.width = Bar.BAR_WIDTH * 1.25;
			bar.color = "#808080";
		}
	},
	{
		name: "smallBar",
		apply: function (bar, ball) {
			bar.width = Bar.BAR_WIDTH / 2;
			bar.color = "#808080";
		}
	},
	{
		name: "fastBall",
		apply: function (bar, ball) {
			ball.speed = Ball.BALL_SPEED * 1.5;
			ball.color = "#FC0101";
		}
	},
	{
		name: "slowBall",
		apply: function (bar, ball) {
			ball.speed = Ball.BALL_SPEED / 2;
			ball.color = "#0802FE";
		}
	},
	{
		name: "bigBall",
		apply: function (bar, ball) {
			ball.size = Ball.BALL_SIZE * 1.5;
			ball.color = "#FF4545";
		}
	},
	{
		name: "smallBall",
		apply: function (bar, ball) {
			ball.size = Ball.BALL_SIZE / 2;
			ball.color = "#477BFF";
		}
	},
	{
		name: "penetration",
		apply: function (bar, ball) {
			ball.color = "#FF8400";
			ball.penetration = true;
		}
	}
];