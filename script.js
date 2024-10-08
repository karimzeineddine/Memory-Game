//for entering his name from the alert
let text = prompt("Enter your name please.")
let userName = document.getElementById("user-name")
//adding the username on the screen
userName.innerHTML=text

let startClick= document.querySelector(".start")//start text
let message = document.querySelector(".message")//message text
let boxes = document.querySelectorAll(".box") // 4 colors divs
let levelText = document.querySelector(".level")// level text

let level = 0;  // Level tracker
let sequence = [];  // Random sequence to remember
let playerSequence = [];  // Player input sequence

// Audio sounds
let greenSound = new Audio('sounds/green.mp3');
let redSound = new Audio('sounds/red.mp3');
let yellowSound = new Audio('sounds/yellow.mp3');
let blueSound = new Audio('sounds/blue.mp3');
let winSound = new Audio('sounds/win.wav');
let loseSound = new Audio('sounds/wrong.mp3');

// border removing around each div
function removeHighlight() {
    boxes.forEach(box => box.classList.remove('highlight'));
  }

// adding border to the div
function highlightBox(boxId) {
    // each box given a data-id 
    const selectedBox = document.querySelector(`[data-id='${boxId}']`);
    selectedBox.classList.add('highlight');
    // Play the corresponding sound
    switch (boxId.toString()) {
        case '0':
            greenSound.play();
            break;
        case '1':
            redSound.play();
            break;
        case '2':
            yellowSound.play();
            break;
        case '3':
            blueSound.play();
            break;
    }
    // Highlight for 0.5 seconds
    setTimeout(() => {
        selectedBox.classList.remove('highlight');
    }, 500);  
}

// Function to highlight the sequence
function showSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
            return;
        }
        highlightBox(sequence[i]);
        i++;
    }, 1000);  // 1-second delay between highlights
}

// Function to generate a new random sequence
function nextLevel() {
    message.innerHTML = " ";
    const randomNum = Math.floor(Math.random() * 4);
    sequence.push(randomNum);
    levelText.innerHTML = `Level ${level + 1}`;
    playerSequence = [];  // Clear the player's input for the new level
    showSequence();  // Show the sequence to the player
}

// Function to check player input
function checkPlayerInput(boxId) {
    playerSequence.push(parseInt(boxId));
    const currentIndex = playerSequence.length - 1;

    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        message.innerHTML = " You lost! ";
        loseSound.play();  // Play lose sound
        resetGame();
        return;
    }
    
    if (playerSequence.length === sequence.length) {
        level++;
        message.innerHTML="You won";
        winSound.play();  // Play win sound
        setTimeout(() => {
            nextLevel();  // Proceed to the next level
        }, 1000);  // 1-second delay before starting next level
    }
}

// Function to reset the game
function resetGame() {
    startClick.innerHTML = "Start";
    level = 0;
    sequence = [];
    playerSequence = [];
    message.innerHTML += " Game restarted. Press start to play.";
}

// Function to start the game
function start() {
    if (userName.innerHTML == "") {
        message.innerHTML = "Please enter your name";
    } else {
        startClick.innerHTML = ". . . ";
        level = 0;
        sequence = [];
        nextLevel();  // Start from level 1
    }
}
// Function to play sound based on the color clicked
function playSound(color) {
    let sound;
    switch (color) {
        case 'green':
            sound = document.getElementById('greenSound');
            break;
        case 'red':
            sound = document.getElementById('redSound');
            break;
        case 'yellow':
            sound = document.getElementById('yellowSound');
            break;
        case 'blue':
            sound = document.getElementById('blueSound');
            break;
    }

    // Play the sound if it exists
    if (sound) {
        sound.currentTime = 0; // Reset sound to start
        sound.play();
    }
}

// Add event listeners to the boxes for player input
boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        const boxId = e.target.getAttribute('data-id');
        checkPlayerInput(boxId);
    });
});
