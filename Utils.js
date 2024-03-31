// Utils.js

// Function to check collision between two rectangular objects
function isCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Function to check collision between the ball and a circular bumper
function isBallBumperCollision(ball, bumper) {
    // Get the coordinates and radius of the ball
    const ballRadius = ball.offsetWidth / 2;
    const ballCenterX = ball.offsetLeft + ballRadius;
    const ballCenterY = ball.offsetTop + ballRadius;

    // Get the coordinates and radius of the bumper
    const bumperRadius = bumper.offsetWidth / 2;
    const bumperCenterX = bumper.offsetLeft + bumperRadius;
    const bumperCenterY = bumper.offsetTop + bumperRadius;

    // Calculate the distance between the centers of the ball and the bumper
    const distanceBetweenCenters = Math.sqrt((ballCenterX - bumperCenterX) ** 2 + (ballCenterY - bumperCenterY) ** 2);

    // Check if the distance is less than the sum of the radii
    return distanceBetweenCenters < ballRadius + bumperRadius;
}

// Function to generate a random integer between min and max (inclusive)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Export utility functions for use in other files
export { isCollision, isBallBumperCollision, randomInt };
