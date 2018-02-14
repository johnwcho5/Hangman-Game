$(document).ready(function() {
		var word = "";
		var wordArray = [];
		var wordDisplay = [];
		var failedGuesses = 0;

		newGame();
});

function chooseWord() {
		var randomNum = Math.floor((Math.random() * 14));

		var wordList = [
				"GOBLIN",
				"ASPHYXIATE",
				"LEMMING",
				"SNICKERDOODLE",
				"SOMETHING",
				"STATES",
				"ROLEPLAYING",
				"HEALTH",
				"MASTERY",
				"NEBULA", 
				"ONOMATOPEIA",
				"MUPPET", 
				"TARDIS",
				"KITTEN"
		];
		word = wordList[randomNum];
}

function newGame() {
		$(".game-input").hide();
		$(".start-section").show();
		$(".start-button").click(function() {
				wordArray = [];
				wordDisplay = [];
				$(".status").empty();
				$(".word-guessed").empty();
				$(".letters-guessed").empty();
				failedGuesses = 0;
				drawDeadGuy();
				startGame();
		});
}

function startGame() {
		$(".game-input").show();
		$(".start-section").hide();
		getWord();
}

function getWord() {
		chooseWord();
		var parsedWord = word.split("");
		$.each(parsedWord, function(index, value) {
				wordArray[index] = value;
				wordDisplay[index] = "*";
		});
		//var length = wordArray.length;
		for (i = 0; i < wordArray.length; i++) {
				$(".word-guessed").append("*");
		};
		getGuess();
}

function checkGuess(guess) {
		var successfulGuess = false;
		for (i = 0; i < wordArray.length; i++) {
				if (wordArray[i] === guess) {
						wordDisplay[i] = guess;
						successfulGuess = true;
				}
		}
		if (guess != "" && !successfulGuess) {
				failedGuesses++;
				drawDeadGuy();
				if (failedGuesses > 5) {
						$(".status").html("Six incorrect guesses, you LOST! <br> The word was ").append(word);
						newGame();
				}
		} else {
				// returs -1 if not in array
				if ($.inArray("*", wordDisplay) < 0) {
						$(".status").html("You Win!!");
						newGame();
				}
		}
		$(".word-guessed").empty();
		$(".word-guessed").html(wordDisplay)
}

function getGuess() {
		$(".guess").keydown(function(e) {
				if (e.keyCode === 13) {
						console.log("in getguess2");
						getLetter();
				}
		});
		$(".input-button").click(function() {
				console.log("in getguess3");
				getLetter();
		});
}

function getLetter() {
		var guess = $(".guess").val().toUpperCase();
		$(".guess").val("");
		$(".letters-guessed").append(guess + " ");
		checkGuess(guess);
}

function drawDeadGuy() {
		switch (failedGuesses) {
				case 0:
						$(".deadguy.head").hide();
						$(".deadguy.right-arm").hide();
						$(".deadguy.left-arm").hide();
						$(".deadguy.body").hide();
						$(".deadguy.left-leg").hide();
						$(".deadguy.right-leg").hide();
						break;
				case 1:
						$(".deadguy.head").show();
						break;
				case 2:
						$(".deadguy.body").show();
						break;
				case 3:
						$(".deadguy.right-arm").show();
						break;
				case 4:
						$(".deadguy.left-arm").show();
						break;
				case 5:
						$(".deadguy.left-leg").show();
						break;
				case 6:
						$(".deadguy.right-leg").show();
						break;
				default:
						break;
		}
}