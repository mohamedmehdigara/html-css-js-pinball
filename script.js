document.addEventListener('DOMContentLoaded', function() {
    const ball = document.getElementById('ball');
    const paddle = document.getElementById('paddle');
    const container = document.querySelector('.container');

    let x = 200; // Initial position of the ball
    let y = 300;
    let dx = 2; // Increment for horizontal movement
    let dy = -2; // Increment for vertical movement

    function draw() {
        ball.style.left = x + 'px';
        ball.style.top = y + 'px';
    }

    function update() {
        // Move the ball
        x += dx;
        y += dy;

        // Collision detection with walls
        if (x + dx > container.offsetWidth - ball.offsetWidth || x + dx < 0) {
            dx = -dx; // Reverse direction
        }
        if (y + dy < 0) {
            dy = -dy; // Reverse direction
        } else if (y + dy > container.offsetHeight - ball.offsetHeight) {
            // Check if ball hits the paddle
            if (x > paddle.offsetLeft && x < paddle.offsetLeft + paddle.offsetWidth) {
                dy = -dy; // Reverse direction
            } else {
                alert('Game Over!');
                document.location.reload();
            }
        }

        draw(); // Redraw the ball
    }

    setInterval(update, 10); // Call update function every 10 milliseconds
});
