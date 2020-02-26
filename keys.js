
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