//unordered list for guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
//button for "Guess!"
const guessButton = document.querySelector(".guess");
//text input for guessed letters
const letterInput = document.querySelector(".letter");
//empty paragraph where words in progess will appear
const progress = document.querySelector(".word-in-progress");
//empty paragraph where remaining guesses will display
const guessesLeft = document.querySelector(".remaining");
//span inside empty paragraph where remaining guesses will display
const guessesLeftSpan = document.querySelector (".remaining span");
//empty paragraph where messages after letter is guessed will display
const message = document.querySelector(".message");
//hidden play again button
const playAgainButton = document.querySelector(".play-again");

//test word -- comment out later --
const word = "magnolia";

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    progress.innerText = placeholderLetters.join("");
}

placeholder(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = letterInput.value;
  console.log(guess);
  letterInput.value = "";
});
