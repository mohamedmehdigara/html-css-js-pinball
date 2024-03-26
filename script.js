document.addEventListener('DOMContentLoaded', function() {
    // Constants for game elements
    const ball = document.getElementById('ball');
    const leftFlipper = document.getElementById('leftFlipper');
    const rightFlipper = document.getElementById('rightFlipper');
    const bumpers = document.querySelectorAll('.bumper');
    const scoreDisplay = document.getElementById('score');

    // Game variables
    let x = 190; // Initial position of the ball
    let y = 200;
    let dx = 2; // Increment for horizontal movement
    let dy = 2; // Increment for vertical movement
    let score = 0; // Player score

    // Flipper angles
    let leftFlipperAngle = 0;
    let rightFlipperAngle = 0;

    // Function to update the game state
    function update() {
        // Move the ball
        x += dx;
        y += dy;

        // Collision detection with walls
        if (x + dx > 380 || x + dx < 0) {
            dx = -dx; // Reverse direction
        }
        if (y + dy < 0) {
            dy = -dy; // Reverse direction
        } else if (y + dy > 580) {
            // Game over condition
            gameOver();
        }

        // Collision detection with flippers
        if (y + dy > 540 && y + dy < 560) {
            if (x + dx > leftFlipper.offsetLeft && x + dx < leftFlipper.offsetLeft + leftFlipper.offsetWidth) {
                dx = -dx; // Reverse direction
                increaseScore(10); // Increase score for hitting the flipper
            }
            if (x + dx > rightFlipper.offsetLeft && x + dx < rightFlipper.offsetLeft + rightFlipper.offsetWidth) {
                dx = -dx; // Reverse direction
                increaseScore(10); // Increase score for hitting the flipper
            }
        }

        // Collision detection with bumpers
        bumpers.forEach(bumper => {
            if (y + dy > bumper.offsetTop && y + dy < bumper.offsetTop + 30 &&
                x + dx > bumper.offsetLeft && x + dx < bumper.offsetLeft + 30) {
                dx = -dx; // Reverse direction
                dy = -dy;
                increaseScore(20); // Increase score for hitting a bumper
            }
        });

        draw(); // Redraw the ball
    }

    // Function to draw game elements
    function draw() {
        ball.style.left = x + 'px';
        ball.style.top = y + 'px';
        leftFlipper.style.transform = `rotate(${leftFlipperAngle}deg)`;
        rightFlipper.style.transform = `rotate(${rightFlipperAngle}deg)`;
    }

    // Function to handle game over
    function gameOver() {
        clearInterval(gameInterval); // Stop the game loop
        alert('Game Over! Your Score: ' + score);
        // Optionally, you can reset the game here
    }

    // Function to increase player score
    function increaseScore(points) {
        score += points;
        scoreDisplay.textContent = score;
    }

    // Event listeners for flipper controls
    document.addEventListener('keydown', function(event) {
        if (event.key === 'a') {
            leftFlipperAngle = -30;
        } else if (event.key === 'p') {
            rightFlipperAngle = 30;
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key === 'a') {
            leftFlipperAngle = 0;
        } else if (event.key === 'p') {
            rightFlipperAngle = 0;
        }
    });

    // Start the game loop
    const gameInterval = setInterval(update, 10); // Call update function every 10 milliseconds
});
