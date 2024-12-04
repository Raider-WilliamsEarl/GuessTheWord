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
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await res.text();
    const wordArray = words.split("\n");
    randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word)
};

// Start your engines (and the game)
getWord();

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
        guessCount(guess);
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

// update the guess count
const guessCount = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `${guess} is not included in the word, sorry.  Try again.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `${guess} is in the word!  Good job!`
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `You have no more guesses left.  That's game over.  The word was <span class="highlight">${word}</span>.`;
        startOver();
    } if (remainingGuesses === 1) {
        guessesLeftSpan.innerText = `${remainingGuesses} guess`;
    } else {
        guessesLeftSpan.innerText = `${remainingGuesses} guesses`;
    }
}

const checkWin = function () {
    if (word.toUpperCase() === progress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        remainingGuesses - 1;

        startOver();
    }
}

const startOver = function () {
    guessButton.classList.add("hide");
    guessesLeft.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
}

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    message.innerText = "";
    guessesLeftSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = ``;
    message.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    guessesLeft.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});