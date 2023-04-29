// Variables
var player1 = {
	name: "Jugador 1",
	hand: [],
	score: 0
};

var player2 = {
	name: "Jugador 2",
	hand: [],
	score: 0
};

var board = {
	cards: [],
	currentPlayer: player1,
	opponent: player2
};

var playing = false;

// Funciones
function startGame() {
	// Crear y barajar el mazo
	var deck = createDeck();
	shuffleDeck(deck);

	// Dar 3 cartas a cada jugador
	player1.hand = deck.slice(0, 3);
	player2.hand = deck.slice(3, 6);

	// Actualizar la interfaz de usuario
	updateUI();

	// Comenzar el juego
	playing = true;
}

function createDeck() {
	var deck = [];

	// Agregar cartas al mazo
	for (var i = 1; i <= 12; i++) {
		deck.push(i);
	}

	return deck;
}

function shuffleDeck(deck) {
	// Barajar el mazo
	for (var i = deck.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
}

function playCard(card) {
	// Agregar la carta al tablero
	board.cards.push(card);

	// Actualizar la interfaz de usuario
	updateUI();

	// Verificar si hay ganador
	var winner = checkWinner();
	if (winner !== null) {
		endGame(winner);
		return;
	}

	// Cambiar de jugador
	if (board.currentPlayer === player1) {
		board.currentPlayer = player2;
		board.opponent = player1;
	} else {
		board.currentPlayer = player1;
		board.opponent = player2;
	}

	// Deshabilitar botón de jugar del jugador actual y habilitar del oponente
	document.getElementById("play" + board.currentPlayer.name.slice(-1)).disabled = false;
	document.getElementById("play" + board.opponent.name.slice(-1)).disabled = true;

	// Mostrar mensaje de turno del nuevo jugador
	document.getElementById("message").innerHTML = "Es el turno de " + board.currentPlayer.name;
}

function checkWinner() {
	// Verificar si hay ganador
	var winner = null;

	if (board.cards.length === 6) {
		// Calcular puntaje de cada jugador
		var currentPlayerScore = calculateScore(board.currentPlayer.hand, board.cards.slice(0, 3));
		var opponentScore = calculateScore(board.opponent.hand, board.cards.slice(3, 6));

		// Asignar puntos al ganador
		if (currentPlayerScore > opponentScore) {
			board.currentPlayer.score++;
			winner = board.currentPlayer;
		} else if (currentPlayerScore < opponentScore) {
			board.opponent.score++;
			winner = board.opponent;
		}

		// Limpiar el tablero
		board.cards = [];

		// Actualizar la interfaz de usuario
		updateUI();
	}

	return winner;
}

function calculateScore(hand, cards) {
	// Calcular el puntaje de la mano y las cartas en la mesa
	var score = 0;

	for (var i =0; i < hand.length; i++) {
var card = hand[i];
if (cards.indexOf(card) !== -1) {
if (card === 1 || card === 2 || card === 3) {
score += 1;
} else if (card === 4 || card === 5 || card === 6) {
score += 2;
} else if (card === 7 || card === 10) {
score += 3;
} else if (card === 11) {
score += 4;
} else if (card === 12) {
score += 5;
}
}
}

kotlin
Copy code
return score;
}

function endGame(winner) {
// Mostrar mensaje de ganador
document.getElementById("message").innerHTML = winner.name + " gana la ronda!";

javascript
Copy code
// Actualizar la interfaz de usuario
updateUI();

// Verificar si hay ganador del juego
if (player1.score >= 30 || player2.score >= 30) {
	var gameWinner = (player1.score >= 30) ? player1 : player2;
	document.getElementById("message").innerHTML = gameWinner.name + " gana el juego!";
	playing = false;
} else {
	// Comenzar una nueva ronda
	setTimeout(function() {
		startGame();
	}, 3000);
}
}

function updateUI() {
// Actualizar la interfaz de usuario con la información del juego
document.getElementById("player1-name").innerHTML = player1.name;
document.getElementById("player1-score").innerHTML = player1.score;
document.getElementById("player1-hand").innerHTML = "";
player1.hand.forEach(function(card) {
document.getElementById("player1-hand").innerHTML += "<div class='card'>" + card + "</div>";
});

javascript
Copy code
document.getElementById("player2-name").innerHTML = player2.name;
document.getElementById("player2-score").innerHTML = player2.score;
document.getElementById("player2-hand").innerHTML = "";
player2.hand.forEach(function(card) {
	document.getElementById("player2-hand").innerHTML += "<div class='card'>" + card + "</div>";
});

document.getElementById("board").innerHTML = "";
board.cards.forEach(function(card) {
	if (board.currentPlayer.hand.indexOf(card) !== -1 || !playing) {
		document.getElementById("board").innerHTML += "<div class='card'>" + card + "</div>";
	} else {
		document.getElementById("board").innerHTML += "<div class='card back'></div>";
	}
});
}

// Eventos
document.getElementById("play1").addEventListener("click", function() {
var card = player1.hand[0];
player1.hand.splice(0, 1);
playCard(card);
});

document.getElementById("play2").addEventListener("click", function() {
var card = player2.hand[0];
player2.hand.splice(0, 1);
playCard(card);
});

// Iniciar el juego
startGame();
