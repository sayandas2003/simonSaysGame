let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("#game-status");
let startBtn = document.querySelector("#start-btn"); // Start Button

// Function to start the game
function startGame() {
    if (!started) {
        console.log("Game is started");
        started = true;
        startBtn.innerText = "Game in Progress..."; // Button text update
        startBtn.disabled = true; // Disable button during gameplay
        levelUp();
    }
}

// Start game when any key is pressed
document.addEventListener("keypress", startGame);

// Start game when the Start Button is clicked (for mobile users)
startBtn.addEventListener("click", startGame);

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Randomly choose a button
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press any key or tap the button to restart.`;

        // Remove dark-theme before flashing red
        document.body.classList.remove("dark-theme");
        document.body.classList.add("game-over");

        setTimeout(() => {
            document.body.classList.remove("game-over");
            document.body.classList.add("dark-theme"); // ✅ Return to dark mode every time
        }, 150);

        // Change button text to "Restart Game"
        startBtn.innerText = "Restart Game";
        startBtn.disabled = false; // Enable button again

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Add click event to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}






// Tracking Sequences:
// gameSeq[] stores the correct game-generated sequence.
// userSeq[] stores the sequence of buttons clicked by the user.

// Starting the Game:
// The game starts on a keypress (document.addEventListener("keypress")).
// levelUp() is called to generate the first random color.

// Game Progression:
// levelUp() selects a random color from btns[] and adds it to gameSeq[].
// That button flashes (gameFlash()) to show the user what to click.

// User Interaction:
// When a user clicks a button, btnPress() runs:
// The clicked button flashes (userFlash()).
// The button’s color (from id) is added to userSeq[].
// checkAns() verifies if the input matches gameSeq[].

// Checking the Answer (checkAns())
// If mismatched, the game ends ("Game Over" message).
// If matched but incomplete, the game waits for the next user click.
// If fully matched, levelUp() is called after 1 sec, generating a new color.

// Game Loop:
// Each new level increases level and empties userSeq[] for fresh input.
// The process repeats until an incorrect move ends the game.
