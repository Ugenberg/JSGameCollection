class Point {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	normalize() {
		let pos = Math.sqrt(this.x * this.x + this.y * this.y);
		if (pos > 0) {
			this.x /= pos;
			this.y /= pos;
		}
	}
}

function getCollisionPosition(obj1, obj2) {
	let diffX = obj2.position.x - obj1.position.x;
	let diffY = obj2.position.y - obj1.position.y;
	if (Math.abs(diffX) <= obj2.width / 2 && Math.abs(diffY) <= obj1.size + obj2.height / 2) {
		if (diffY >= 0) {
			return "top";
		} else {
			return "bottom";
		}
	} else if (Math.abs(diffY) <= obj2.height / 2 && Math.abs(diffX) < obj1.size + obj2.width / 2) {
		if (diffX >= 0) {
			return "left";
		} else {
			return "right";
		}
	}
	return "";
}