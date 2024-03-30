// LocalStorage.js

// Function to save data to local storage
function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true; // Return true if data is successfully saved
    } catch (error) {
        console.error("Error saving data to local storage:", error);
        return false; // Return false if an error occurs
    }
}

// Function to retrieve data from local storage
function loadData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error loading data from local storage:", error);
        return null;
    }
}

// Function to clear all data from local storage
function clearLocalStorage() {
    try {
        localStorage.clear();
        console.log("Local storage cleared successfully.");
        return true; // Return true if local storage is cleared successfully
    } catch (error) {
        console.error("Error clearing local storage:", error);
        return false; // Return false if an error occurs
    }
}

// Export functions for use in other files
export { saveData, loadData, clearLocalStorage };
