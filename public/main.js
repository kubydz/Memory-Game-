/// Tableau Img ///
var cardsArray = [
    { id: 1, img: 'public/img/béhélit.jpeg' },
    { id: 2, img: 'public/img/casca .jpeg' },
    { id: 3, img: 'public/img/grffith.jpg' },
    { id: 4, img: 'public/img/guts.jpg' },
    { id: 5, img: 'public/img/skull knight.jpeg' },
    { id: 6, img: 'public/img/pippin.webp' },
    { id: 7, img: 'public/img/Judeau.webp' },
    { id: 8, img: 'public/img/Bo.jpg' },
    // double //
    { id: 1, img: 'public/img/béhélit.jpeg' },
    { id: 2, img: 'public/img/casca .jpeg' },
    { id: 3, img: 'public/img/grffith.jpg' },
    { id: 4, img: 'public/img/guts.jpg' },
    { id: 5, img: 'public/img/skull knight.jpeg' },
    { id: 6, img: 'public/img/pippin.webp' },
    { id: 7, img: 'public/img/Judeau.webp' },
    { id: 8, img: 'public/img/Bo.jpg' }
];
    



	 flippedCard = [],
	 flippedId = [],
	 found = [],
	 clickCount = 0,
	 bestScore = 99,    
	 bestChrono = "10:00:000",
	 innerCards = document.querySelectorAll(".inner"),
	 backs = document.querySelectorAll(".back"),
	 clickDisplay = document.getElementById("clickcount"),
	 close = document.getElementsByClassName("close")[0],
	 resultDisplay = document.getElementById("resultats"),
	 resultText = document.querySelector(".modal-content p"),
	 bestChronoDisplay = document.getElementById("bestchrono"),
	 bestScoreDisplay = document.getElementById("best");

window.onload = start();
document.getElementById("rejouer").addEventListener("click", newGame);
document.getElementById("playagain").addEventListener("click", newGame);

// Start a game 
function start() {
	shuffle(cardsArray);
	assignCards();
	innerCards.forEach(card => card.addEventListener("click", flippedCards));
}

// Assign cards
function assignCards() {
    for (var i = 0; i < cardsArray.length; i++) {
        var img = document.createElement('img');
        img.src = cardsArray[i].img;
        img.alt = 'Card ' + cardsArray[i].id;
        img.className = 'card-image';
        backs[i].innerHTML = ''; 
        backs[i].appendChild(img);
    }
    backs.forEach(back => back.classList.remove("foundCard"))
}

// Flipped cards on click
function flippedCards() {
	// Start chrono
	if (isStarted === false) {
		chronoStart();
		isStarted = true;
	}
	this.classList.add("flipped");
	flippedCard.push(cardsArray[this.getAttribute("value")]);
    flippedId.push(this.getAttribute("value"));
	// Avoid flipping same card
	if (flippedId[0] === flippedId[1]) {
		flippedId.splice(1);
		flippedCard.splice(1);
	}
	if (flippedId.length === 2) {
		clickCount++;
		innerCards.forEach(card => card.removeEventListener("click", flippedCards));
		setTimeout(checkCards, 400);
	} 
	clickDisplay.innerHTML = clickCount;
}

// Check flipped cards
function checkCards() {
    innerCards.forEach(card => card.addEventListener("click", flippedCards));
    if (flippedCard[0].id === flippedCard[1].id) {
        found.push(flippedCard);
        backs[flippedId[0]].classList.add("foundCard");
        backs[flippedId[1]].classList.add("foundCard");
    } else {
        innerCards[flippedId[0]].classList.remove("flipped");
        innerCards[flippedId[1]].classList.remove("flipped");
    }
    flippedCard = [];
    flippedId = [];
    if (found.length === cardsArray.length/2) {
        results();
    }
}

// Results 
function results() {
	chronoStop();
	innerCards.forEach(card => card.removeEventListener("click", flippedCards));
	resultDisplay.style.display = "block";
	resultText.innerHTML = 	"<h1>Bravo</h1> " + "Vous avez trouvé toutes les paires en " + clickCount + " coups <br>"  + "Le tout en " + chronotime.value + " secondes";
	if (clickCount < bestScore) {
		bestScore = clickCount;
		bestScoreDisplay.innerHTML = bestScore;
	}
	if (chronotime.value < bestChrono) {
		bestChrono = chronotime.value;
		bestChronoDisplay.innerHTML = bestChrono;
	}
	close.onclick = function() {
		resultDisplay.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target == resultDisplay) {
			resultDisplay.style.display = "none";
		}
	}
}

// Reinitialize and start a new game
function newGame() {
	resultDisplay.style.display = "none";
	clickDisplay.innerHTML = 0;
	isStarted = false;
	clickCount = 0;
	// flipped = [];
	flippedId = [];
	found = [];
	innerCards.forEach(card => card.classList.remove("flipped"));
	chronoReset();
	chronoStop();
	start();
}


function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// C
var startTime = 0,
	 isStarted = false,
	 startTemps = 0,
	 end = 0,
	 diff = 0,
	 timerID = 0;
function chrono(){
	end = new Date();
	diff = end - startTemps;
	diff = new Date(diff);
	var msec = diff.getMilliseconds();
	var sec = diff.getSeconds();
	var min = diff.getMinutes();
	if (min < 10){	
		min = "0" + min;
	}
	if (sec < 10){	
		sec = "0" + sec;
	}
	if (msec < 10){
		msec = "00" +msec;
	}
	else if (msec < 100) { msec = "0" + msec }
	document.getElementById("chronotime").value = min + ":" + sec + ":" + msec;
	timerID = setTimeout("chrono()", 10);
}
function chronoStart() {
	startTemps = new Date();
	chrono();
}
function chronoReset() {
	document.getElementById("chronotime").value = "00:00:000";
	startTemps = new Date();
}
function chronoStop() {
	clearTimeout(timerID);
}
