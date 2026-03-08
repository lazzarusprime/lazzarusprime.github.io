// 1. Configuration
const firebaseConfig = {
    databaseURL: "https://rocksmith-requests-default-rtdb.firebaseio.com"
};

// Global variables
let db;
let songs = [];
let filteredSongs = [];
let currentPage = 1;
let songsPerPage = 25;

// 2. UPDATED STARTUP LOGIC
function startApp() {
    // Check if both the core Firebase AND the Database library are loaded
    if (typeof firebase !== 'undefined' && typeof firebase.database === 'function') {
        console.log("Firebase and Database ready!");
        
        // Initialize if not already done
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        
        db = firebase.database();
        
        // Start loading your data and queue
        loadSongs(); 
    } else {
        console.warn("Waiting for Firebase Database library...");
        setTimeout(startApp, 100); // Retry every 100ms
    }
}
