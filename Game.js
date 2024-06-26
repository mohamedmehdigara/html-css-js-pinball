// Game.js// Game.js

import levels from './Levels.js';
import settings from './Settings.js';
import { isCollision } from './Utils.js';

class Game {
    constructor() {
        // Constants for game elements
        this.ball = document.getElementById('ball');
        this.scoreDisplay = document.getElementById('score');
        this.leftFlipper = document.getElementById('leftFlipper');
        this.rightFlipper = document.getElementById('rightFlipper');

        // Game variables
        this.x = 190; // Initial position of the ball
        this.y = 200;
        this.dx = settings.ballSpeed; // Initial speed of the ball
        this.dy = settings.ballSpeed; // Initial speed of the ball
        this.score = 0; // Player score
        this.currentLevelIndex = 0; // Current level index
        this.currentLevel = levels[this.currentLevelIndex]; // Current level data
        this.levelComplete = false; // Flag to track level completion

        // Keyboard controls
        this.controls = {
            leftFlipper: { key: 'a', pressed: false },
            rightFlipper: { key: 'p', pressed: false }
        };

        // Initialize game elements
        this.initializeGame();

        // Event listeners for keyboard controls
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        // Start the game loop
        this.gameInterval = setInterval(this.update.bind(this), 10); // Call update function every 10 milliseconds
    }

    // Function to initialize game elements based on current level
    initializeGame() {
        const currentLevelData = levels[this.currentLevelIndex];
        
        // Initialize bumpers
        currentLevelData.bumpers.forEach(bumper => {
            const bumperElement = document.getElementById(bumper.id);
            bumperElement.style.left = bumper.x + 'px';
            bumperElement.style.top = bumper.y + 'px';
        });

        // Initialize flippers
        currentLevelData.flippers.forEach(flipper => {
            const flipperElement = document.getElementById(flipper.id);
            flipperElement.style.left = flipper.x + 'px';
        });

        // Update target score display
        this.scoreDisplay.textContent = `Score: ${this.score} / Target: ${currentLevelData.targetScore}`;
    }

    // Function to update the game state
    update() {
        if (!this.levelComplete) {
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
                if (this.controls.leftFlipper.pressed && this.x + this.dx > this.leftFlipper.offsetLeft && this.x + this.dx < this.leftFlipper.offsetLeft + 100) {
                    this.dx = -this.dx; // Reverse direction
                    this.increaseScore(10); // Increase score for hitting the flipper
                }
                if (this.controls.rightFlipper.pressed && this.x + this.dx > this.rightFlipper.offsetLeft && this.x + this.dx < this.rightFlipper.offsetLeft + 100) {
                    this.dx = -this.dx; // Reverse direction
                    this.increaseScore(10); // Increase score for hitting the flipper
                }
            }

            // Collision detection with bumpers
            this.currentLevel.bumpers.forEach(bumper => {
                if (isCollision({ x: this.x, y: this.y, width: 20, height: 20 }, bumper)) {
                    this.dx = -this.dx; // Reverse direction
                    this.dy = -this.dy;
                    this.increaseScore(20); // Increase score for hitting a bumper
                }
            });

            // Check for level completion
            if (this.score >= this.currentLevel.targetScore) {
                this.levelComplete = true;
                setTimeout(() => {
                    this.advanceLevel();
                }, 1000); // Delay before advancing to next level
            }

            this.draw(); // Redraw the ball
        }
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
        this.scoreDisplay.textContent = `Score: ${this.score} / Target: ${this.currentLevel.targetScore}`;
    }

    // Function to advance to the next level
    advanceLevel() {
        if (this.currentLevelIndex < levels.length - 1) {
            // Reset game variables
            this.x = 190;
            this.y = 200;
            this.dx = settings.ballSpeed;
            this.dy = settings.ballSpeed;
            this.score = 0;
            this.levelComplete = false;
            
            // Move to the next level
            this.currentLevelIndex++;
            this.currentLevel = levels[this.currentLevelIndex];
            
            // Reinitialize game elements for the new level
            this.initializeGame();
        } else {
            // All levels completed, game over
            this.gameOver();
        }
    }

    // Event handler for keydown event
    // Event handler for keydown event
handleKeyDown(event) {
    console.log('Key down event:', event.key);
    const key = event.key.toLowerCase();
    if (key === this.controls.leftFlipper.key) {
        this.controls.leftFlipper.pressed = true;
    } else if (key === this.controls.rightFlipper.key) {
        this.controls.rightFlipper.pressed = true;
    }
}

// Event handler for keyup event
handleKeyUp(event) {
    console.log('Key up event:', event.key);
    const key = event.key.toLowerCase();
    if (key === this.controls.leftFlipper.key) {
        this.controls.leftFlipper.pressed = false;
    } else if (key === this.controls.rightFlipper.key) {
        this.controls.rightFlipper.pressed = false;
    }
}
}

// Export Game class for use in other files
export default Game;
