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

	shoot(bullets);
	draw(area, { x: 0, y: 0 }, 'enemies');
	draw(player.player, player.offset);

	let isCollided = collide(area, bullets);
	if (isCollided.cond) {
		let location = isCollided.location;
		area[location.y][location.x] = 0;
	}

	requestAnimationFrame(update);
}

function enemyDraw() {
	for (let i = 0; i < 85; i++) {
		ctx.fillStyle = 'goldenrod';
		ctx.fillRect(i, j, 1, 1);
	}	
}

function collide(area, bullets) {
	for (let i = 0; i < bullets.length; i++) {
		if (bullets[i].y < 0) return false;
		if (area[bullets[i].y][bullets[i].x] !== 0) return { cond: true, location: { x: bullets[i].x, y: bullets[i].y } };
	}
	return false;
}

function createWorld(w, h) {
	const matrix = [];
	while (h--) {
		if (h > 30) {
			matrix.push(new Array(w).fill(Math.floor(Math.random() * 2)));
		}
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

function clear() {
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
}


function draw(player, offset, flag) {
	player.forEach((row, y) => {
		row.forEach((col, x) => {
			if (col !== 0) {
				ctx.fillStyle = flag === 'enemies' ? 'green' : 'red';
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

let area = createWorld(85, 48);

update();