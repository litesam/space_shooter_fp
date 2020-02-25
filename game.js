let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.scale(10, 10);
const WIDTH = ctx.canvas.width;
const HEIGHT = ctx.canvas.height;

const box = [
	[0, 1, 0],
	[1, 1, 1],
	[0 , 1, 0],
	[1, 0, 1],
];

let player = {
	player: box,
	offset: {
		x: 2,
		y: 41
	}
}

let bullets = [];

let lastCounter = 0;
let lastInterval = 10;

let downCounter = 0;
let downInterval = 1000;

let lastTime = 0;
let j = 0;
function update(time = 0) {
	let delta = time - lastTime;
	lastTime = time;
	clear();

	lastCounter += delta;
	if (lastCounter > lastInterval) {
		bullets.forEach(bullet => bullet.y -= 1);
		lastCounter = 0;
	}

	downCounter += delta;
	if (downCounter > downInterval) {
		j++;
		downCounter = 0;
	}

	shoot(bullets);
	enemyDraw();
	draw(player.player, player.offset);
	requestAnimationFrame(update);
}

function enemyDraw() {
	for (let i = 0; i < 85; i++) {
		ctx.fillStyle = 'goldenrod';
		ctx.fillRect(i, j, 1, 1);
	}	
}

function collide(area, player) {
	const m = player.matrix;
	const off = player.pos;
	for (let y = 0; y < m.length; y++) {
		for (let x = 0; x < m[y].length; x++) {
			if (m[y][x] !== 0 &&
               (area[y + o.y] &&
                area[y + o.y][x + o.x]) !== 0) {
                return true;
            }
		}
	}
	return false;	
}

function clear() {
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
}


function draw(player, offset) {
	player.forEach((row, y) => {
		row.forEach((col, x) => {
			if (col !== 0) {
				ctx.fillStyle = 'red';
				ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
			}
		});
	});
}

function shoot(bullets) {
	bullets.forEach(bullet => {
		ctx.fillStyle = '#fff';
		ctx.fillRect(bullet.x, bullet.y, 1, 2);
	});
	for (let i = 0; i < bullets.length; i++) {
		if (bullets[i].y < -10) {
			bullets.splice(i, 1);
		}
	}
}

let keyUpLeft = {37: false, 38: false};
let keyUpRight = {38: false, 39: false};
let keyDownLeft = {37: false, 40: false};
let keyDownRight = {39: false, 40: false};

window.addEventListener('keydown', e => {
	if (e.keyCode == 87) {
		player.offset.y--;
	} else if (e.keyCode == 83) {
		player.offset.y++;
	} else if (e.keyCode == 65) {
		player.offset.x--;
	} else if (e.keyCode == 68) {
		player.offset.x++;
	} else if (e.keyCode == 38) {
		player.offset.y--;
	} else if (e.keyCode == 40) {
		player.offset.y++;
	} else if (e.keyCode == 37) {
		player.offset.x--;
	} else if (e.keyCode == 39) {
		player.offset.x++;
	} else if (e.keyCode == 32) {
		bullets.push({ x: player.offset.x + 1, y: player.offset.y });
		shoot(bullets);
	}
	if (e.keyCode in keyUpLeft) {
		keyUpLeft[e.keyCode] = true;
		if (keyUpLeft[37] && keyUpLeft[38]) {
			player.offset.y--;
			player.offset.x--;
		}
	}
	if (e.keyCode in keyUpRight) {
		keyUpRight[e.keyCode] = true;
		if (keyUpRight[38] && keyUpRight[39]) {
			player.offset.y--;
			player.offset.x++;
		}
	}
	if (e.keyCode in keyDownLeft) {
		keyDownLeft[e.keyCode] = true;
		if (keyDownLeft[37] && keyDownLeft[40]) {
			player.offset.y++;
			player.offset.x--;
		}
	}
	if (e.keyCode in keyDownRight) {
		keyDownRight[e.keyCode] = true;
		if (keyDownRight[39] && keyDownRight[40]) {
			player.offset.y++;
			player.offset.x++;
		}
	}
});

window.addEventListener('keyup', e => {
	if (e.keyCode in keyUpLeft) {
		keyUpLeft[e.keyCode] = false;
	}
	if (e.keyCode in keyUpRight) {
		keyUpRight[e.keyCode] = false;
	}
	if (e.keyCode in keyDownLeft) {
		keyDownLeft[e.keyCode] = false;
	}
	if (e.keyCode in keyDownRight) {
		keyDownRight[e.keyCode] = false;
	}
});

update();