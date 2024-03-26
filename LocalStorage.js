// LocalStorage.js

// Function to save data to local storage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Function to retrieve data from local storage
function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Export functions for use in other files
export { saveData, loadData };
