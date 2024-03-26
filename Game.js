// Game.js

// Import levels data from Levels.js file
import levels from './Levels.js';
import settings from './Settings.js';
import { isCollision, isBallBumperCollision } from './Utils.js';

class Game {
    constructor() {
        // Constants for game elements
        this.ball = document.getElementById('ball');
        this.scoreDisplay = document.getElementById('score');

        // Game variables
        this.x = 190; // Initial position of the ball
        this.y = 200;
        this.dx = settings.ballSpeed; // Initial speed of the ball
        this.dy = settings.ballSpeed; // Initial speed of the ball
        this.score = 0; // Player score

        // Flipper angles
        this.leftFlipperAngle = settings.leftFlipperAngle;
        this.rightFlipperAngle = settings.rightFlipperAngle;

        // Initialize game with level 1
        this.currentLevelIndex = 0;
        this.currentLevel = levels[this.currentLevelIndex];

        // Initialize game elements
        this.initializeGame();

        // Start the game loop
        this.gameInterval = setInterval(this.update.bind(this), 10); // Call update function every 10 milliseconds
    }

    // Function to initialize game elements based on current level
    initializeGame() {
        // Initialize bumpers
        this.currentLevel.bumpers.forEach(bumper => {
            const bumperElement = document.getElementById(bumper.id);
            bumperElement.style.left = bumper.x + 'px';
            bumperElement.style.top = bumper.y + 'px';
        });

        // Initialize flippers
        this.currentLevel.flippers.forEach(flipper => {
            const flipperElement = document.getElementById(flipper.id);
            flipperElement.style.left = flipper.x + 'px';
        });
    }

    // Function to update the game state
    update() {
        // Move the ball
        this.x += this.dx;
        this.y += this.dy;

        // Collision detection with walls
        if (this.x + this.dx > 380 || this.x + this.dx < 0) {
            this.dx = -this.dx; // Reverse direction
        }
        if (this.y + this.dy < 0) {
            this.dy = -this.dy; // Reverse direction
        } else if (this.y + this.dy > 580) {
            // Game over condition
            this.gameOver();
        }

        // Collision detection with flippers
        if (this.y + this.dy > 540 && this.y + this.dy < 560) {
            this.currentLevel.flippers.forEach(flipper => {
                const flipperElement = document.getElementById(flipper.id);
                if (this.x + this.dx > flipperElement.offsetLeft && this.x + this.dx < flipperElement.offsetLeft + flipperElement.offsetWidth) {
                    this.dx = -this.dx; // Reverse direction
                    this.increaseScore(10); // Increase score for hitting the flipper
                }
            });
        }

        // Collision detection with bumpers
        this.currentLevel.bumpers.forEach(bumper => {
            const bumperElement = document.getElementById(bumper.id);
            if (this.y + this.dy > bumperElement.offsetTop && this.y + this.dy < bumperElement.offsetTop + 30 &&
                this.x + this.dx > bumperElement.offsetLeft && this.x + this.dx < bumperElement.offsetLeft + 30) {
                this.dx = -this.dx; // Reverse direction
                this.dy = -this.dy;
                this.increaseScore(20); // Increase score for hitting a bumper
            }
        });

        this.draw(); // Redraw the ball
    }

    // Function to draw game elements
    draw() {
        this.ball.style.left = this.x + 'px';
        this.ball.style.top = this.y + 'px';
    }

    // Function to handle game over
    gameOver() {
        clearInterval(this.gameInterval); // Stop the game loop
        alert('Game Over! Your Score: ' + this.score);
        // Optionally, you can reset the game here
    }

    // Function to increase player score
    increaseScore(points) {
        this.score += points;
        this.scoreDisplay.textContent = this.score;
    }
}

// Export Game class for use in other files
export default Game;
