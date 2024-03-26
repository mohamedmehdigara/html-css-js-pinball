// Levels.js

// Define levels object to hold level data
const levels = [
    {
        name: "Level 1",
        bumpers: [
            { id: "bumper1", x: 50, y: 200 },
            { id: "bumper2", x: 150, y: 100 },
            { id: "bumper3", x: 250, y: 200 },
            { id: "bumper4", x: 150, y: 500 },
            { id: "bumper5", x: 270, y: 450 }
        ],
        flippers: [
            { id: "leftFlipper", x: 50 },
            { id: "rightFlipper", x: 350 }
        ]
    },
    // Define additional levels here
];

// Export levels object for use in other files
export default levels;
