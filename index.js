let mode = 0; // 0 - standby, 1 - focus, 2 - pause, 3 - relax
let mode_running = 1;
let timerInterval;
let int_min = 25, int_sec = 0;
let nr = 1;

function playSound() {
	let audio = new Audio('sounds/BeepShort.mp3');
	audio.play();
}

function start_pause() {
	if (mode === 1 || mode === 3) {
		mode = 2;
		document.getElementById("start-pause").innerHTML = "START";
		pause();
	} else if (mode === 0 || (mode === 2 && mode_running === 1)) {
		mode = 1;
		document.getElementById("mode").innerHTML = "FOCUS";
		document.getElementById("start-pause").innerHTML = "PAUSE";
		focus();
	} else if (mode === 2) { // mode === 2 && mode_running === 3
		mode = 3;
		document.getElementById("mode").innerHTML = "RELAX";
		document.getElementById("start-pause").innerHTML = "PAUSE";
		relax();
	}
}

function timer() {
	if (int_min === 0 && int_sec === 0) {
		clearInterval(timerInterval);
		if (mode === 1) {
			int_min = 5; int_sec = 0; mode = 3;
			document.getElementById("mode").innerHTML = "RELAX";
			document.getElementById("start-pause").innerHTML = "PAUSE";
			nr++;
			if (nr === 5) {
				int_min = 30; int_sec = 0;
			}
			relax();
		} else if (mode === 3) {
			int_min = 25; int_sec = 0; mode = 1;
			document.getElementById("mode").innerHTML = "FOCUS";
			document.getElementById("start-pause").innerHTML = "PAUSE";
			document.getElementById("nr").innerHTML = `${nr}/4`;
			focus();
		}
		return;
	}
	int_sec--;
	if (int_sec < 0) {
		int_sec = 59;
		int_min--;
	}
	const s_min = int_min < 10 ? `0${int_min}` : int_min;
	const s_sec = int_sec < 10 ? `0${int_sec}` : int_sec;
	document.getElementById("timer").innerHTML = `${s_min}:${s_sec}`;
}

function focus() {

	playSound();

	if (nr === 5) {
		clearInterval(timerInterval);
		document.getElementById("nr").innerHTML = "4/4";
		document.getElementById("timer").style.fontSize = "80px";
		document.getElementById("timer").style.marginTop = "60px";
		document.getElementById("timer").style.marginBottom = "70px";
		document.getElementById("mode").innerHTML = "RELAX";
		document.getElementById("timer").innerHTML = "WELL DONE!";
		return;
	}

	mode_running = 1;
	timerInterval = setInterval(timer, 1000);
}

function relax() {
	playSound();
	mode_running = 0;
	timerInterval = setInterval(timer, 1000);
}

function pause() {
	playSound();
	clearInterval(timerInterval);
}