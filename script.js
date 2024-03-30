// script.js

import Game from './Game.js';
import { loadData, saveData } from './LocalStorage.js';

document.addEventListener('DOMContentLoaded', function() {
    // Check if there is existing saved game data
    const savedGameData = loadData('pinball_game_data');
    let game;

    if (savedGameData) {
        if (confirm('Continue previous game?')) {
            // If user chooses to continue previous game, initialize game with saved data
            game = new Game(savedGameData);
        } else {
            // If user chooses not to continue, start a new game
            game = new Game();
        }
    } else {
        // If there is no saved data, start a new game
        game = new Game();
    }

    // Event listener for window unload to save game data before leaving the page
    window.addEventListener('beforeunload', function() {
        saveData('pinball_game_data', game.saveGameState());
    });
});
