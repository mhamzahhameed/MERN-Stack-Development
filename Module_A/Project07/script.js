// Get DOM Elements
const wordElement = document.getElementById('word');
const incorrectLettersElement = document.getElementById('incorrect-letters');
const notificationElement = document.getElementById('notification-container');
const gameoverElement = document.getElementById('gameover-container');
const gameoverMessage = document.getElementById('gameover-message');
const playButton = document.getElementById('play-btn');
// Get DOM Elements for Hangman Parts
const hangmanParts = document.querySelectorAll('.hangman-part');

// List of words for game
const words = ["scientist","song","built","word","spell","value","support","heavy","men","dead","bad","here","street","dream","eventually","original","broad","floating","daily","tool","swimming","mostly","escape","fourth","within","government","somewhere","means","fight","section","longer","clear","creature","situation","who","were","turn","table","sure","sugar","sister","wool"];

// Select a word from the list at random
let randomWord = words[Math.floor(Math.random() * words.length)];

// Array to hold the letters from correct guesses
const correctLetters =[];

// Array to hold the letters from incorrect guesses
const incorrectLetters =[];

// Function to render the random words in the UI
function renderWord() {
    // split the random word into individual letters as an array, map over the array,
    // for each letter, create a span element and only display the letter if it's present 
    // in the correctLetters array

    wordElement.innerHTML = `
        ${randomWord.split('').map (letter => ` 
            <span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>
            `).join('')}
    `;
    // Remove the new line characters for the word
    const word = wordElement.innerText.replace(/\n/g, '');
    // Check to see if  the word (only the correct letters) matches the randomWord
    if ( word === randomWord ) {
        // Set the gameover message
        gameoverMessage.innerText = 'You won!';
        // Display the gmaeover container
        gameoverElement.style.display = 'flex';
    }
};

// Function to display the notification container
function displayNotification(){
    // Display the notification in the window
    notificationElement.classList.add('show');
    // Remove the notification after 1 second
    setTimeout( () => {
        notificationElement.classList.remove('show');
    }, 1000);
};

// Function to update UI based on incorrect letter guess
function renderIncorrectLetters() {
    // Display the incorrect letters section and show each letter from the incorrectLetters array
    incorrectLettersElement.innerHTML = `
    <p>Incorrect Letters</p>
    ${incorrectLetters.map(letter => `<span>${letter}</span>` )}
    `;
    // Display the hangman part for everytime user inputs an incorrect letters
    hangmanParts.forEach((part, index) => {
        // Determine the number of incorrect guesses by counting number of incorrect letters
        const numIncorrect = incorrectLetters.length;
        // Check if the number of incorrect guesses by counting number of incorrect letters
        if (index < numIncorrect) {
            // if true, then display this part
            part.style.display = 'block';
        } else {
            // if false, then don't display
            part.style.display = 'none';
        }
    });
    // Check if the game is over
    if (incorrectLetters.length === hangmanParts.length) {
        // If true, set the gameover message
        gameoverMessage.innerText = 'You lost!';
        // Display the gmaeover container
        gameoverElement.style.display = 'flex';
    }
};

// Event Listeners
// 1. Listen for keyboard keydown event

window.addEventListener('keydown', e => {
    // Check if the keyboard key pressed is a letter
    if  (e.keyCode >= 65 && e.keyCode <= 90) {
        // if the keycode is between 65 and 90 save the letter
        const letter = e.key;
        // Check to see if the letter is in the randomWord
        if (randomWord.includes(letter)) {
        // If the randomWord has the letter, check to see if there is already in correctLetters array
            if ( !correctLetters.includes(letter)) {
                // if the letter not already in the correctLetters array, add it there
                correctLetters.push(letter);
                // Rendor the word in UI again
                renderWord();
            } else {
            // If the letter is already in the correctLetters array, show the notification
            displayNotification();
            }
        } else {
            // If the randomWord does not have the letter, check to see if letter is already in the incorrectLetters array
            if ( !incorrectLetters.includes(letter)) {
                // if the letter not already in the incorrectLetters array, add it there
                incorrectLetters.push(letter);
                // Render the incorrect letters section
                renderIncorrectLetters();
            } else {
                // If the letter is already in the incorrectLetters array, show the notification
            }    displayNotification();
        }
    }
});

// 2. listen for a click on the playbutton
playButton.addEventListener('click', () => {
    // Empty the incorrect and correct letter arrays
    correctLetters.splice(0);
    incorrectLetters.splice(0);
    // Generate a new randomWord
    randomWord = words[Math.floor(Math.random() * words.length)];
    // Update the incorect Letters section
    renderIncorrectLetters();
    // Hide the gameover container
    gameoverElement.style.display = 'none';
    // Render the new randomWord
    renderWord();
});
// 
renderWord();