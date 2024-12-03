//unordered list for guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");
//button for "Guess!"
const guessButton = document.querySelector(".guess");
//text input for guessed letters
const letterInput = document.querySelector(".letter");
//empty paragraph where words in progess will appear
const progress = document.querySelector(".word-in-progress");
//empty paragraph where remaining guesses will display
const guessesLeft = document.querySelector(".remaining");
//span inside empty paragraph where remaining guesses will display
const guessesLeftSpan = document.querySelector(".remaining span");
//empty paragraph where messages after letter is guessed will display
const message = document.querySelector(".message");
//hidden play again button
const playAgainButton = document.querySelector(".play-again");

//test word -- comment out later --
const word = "magnolia";
const guessedLetters = [];

// Display symbols as placeholders for chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    progress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    //placeholder for message
    message.innerText = "";
    // grab entered input
    const guess = letterInput.value;
    // validate the guess
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        // It's a letter!  Make your guess!
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //no letter entered
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        //more than one letter entered
        message.innerText = "You can only guess 1 letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        //number or special character or non-letter entered?
        message.innerText = "Please enter a letter from A-Z.";
    } else {
        //single letter entered
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, try one you haven't gussed.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        playerGuesses();
        wordInProgressUpdate(guessedLetters);
    }
}

const playerGuesses = function () {
    //clear list first
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
}

const wordInProgressUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
        revealWord.push("●");
        }
    }
    progress.innerText = revealWord.join("");
    checkWin();
}

const checkWin = function() {
    if (word.toUpperCase() === progress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
}