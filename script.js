// 1. Correct Configuration
const firebaseConfig = {
    databaseURL: "https://rocksmith-requests-default-rtdb.firebaseio.com"
};

// 2. Initialize Firebase (v8 compat style)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let songs = [];
let filteredSongs = [];
let currentPage = 1;
let songsPerPage = 25;

// 3. Load Songs from JSON
async function loadSongs() {
    try {
        const response = await fetch("songs.json");
        
        if (!response.ok) {
            throw new Error(`Failed to load songs.json (Status: ${response.status})`);
        }

        songs = await response.json();
        filteredSongs = songs;

        // Initialize UI components
        listenQueue();
        buildAlphabet();
        renderSongs();
        showArtistStats();
    } catch (error) {
        console.error("Error during initialization:", error);
        const statsDiv = document.getElementById("stats");
        if (statsDiv) statsDiv.innerText = "Error: " + error.message;
    }
}

// 4. Real-time Queue Listener
function listenQueue() {
    db.ref("queue").on("value", (snapshot) => {
        const data = snapshot.val();
        const div = document.getElementById("queue");
        if (!div) return;
        
        div.innerHTML = "";
        if (!data) return;

        Object.values(data).forEach((song, i) => {
            let item = document.createElement("div");
            item.className = "queueItem";
            item.innerText = `${i + 1}. ${song.artist} - ${song.song}`;
            div.appendChild(item);
        });
    });
}

// 5. Request Song Function
function requestSong(artist, song) {
    let text = artist + " - " + song;
    navigator.clipboard.writeText("!sr " + text);

    db.ref("queue").push({
        artist: artist,
        song: song
    });

    alert("Request added!\nPaste in chat:\n!sr " + text);
}

// 6. UI Rendering Functions
function renderSongs() {
    const list = document.getElementById("songList");
    if (!list) return;
    
    list.innerHTML = "";

    let start = (currentPage - 1) * songsPerPage;
    let end = start + songsPerPage;
    let pageSongs = filteredSongs.slice(start, end);

    pageSongs.forEach(song => {
        const div = document.createElement("div");
        div.className = "song";
        div.innerHTML = `
            <span><b>${song.artist}</b> - ${song.song}</span>
            <button onclick="requestSong('${song.artist.replace(/'/g, "\\'")}', '${song.song.replace(/'/g, "\\'")}')">Request</button>
        `;
        list.appendChild(div);
    });

    renderPagination();
}

function renderPagination() {
    const div = document.getElementById("pagination");
    if (!div) return;
    
    div.innerHTML = "";
    let totalPages = Math.ceil(filteredSongs.length / songsPerPage);

    if (currentPage > 1) {
        const prev = document.createElement("button");
        prev.innerText = "Prev";
        prev.onclick = () => { currentPage--; renderSongs(); };
        div.appendChild(prev);
    }

    let pageLabel = document.createElement("span");
    pageLabel.innerText = ` Page ${currentPage} / ${totalPages} `;
    div.appendChild(pageLabel);

    if (currentPage < totalPages) {
        const next = document.createElement("button");
        next.innerText = "Next";
        next.onclick = () => { currentPage++; renderSongs(); };
        div.appendChild(next);
    }
}

// 7. Search and Filtering
function searchSongs() {
    let q = document.getElementById("searchBox").value.toLowerCase();
    filteredSongs = songs.filter(song =>
        song.artist.toLowerCase().includes(q) ||
        song.song.toLowerCase().includes(q)
    );
    currentPage = 1;
    renderSongs();
}

function buildAlphabet() {
    const div = document.getElementById("alphabet");
    if (!div) return;
    div.innerHTML = ""; // Clear existing

    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
        let btn = document.createElement("button");
        btn.innerText = letter;
        btn.onclick = () => jumpToLetter(letter);
        div.appendChild(btn);
    });
}

function jumpToLetter(letter) {
    const index = filteredSongs.findIndex(song =>
        song.artist.toLowerCase().startsWith(letter.toLowerCase())
    );

    if (index === -1) return;
    currentPage = Math.floor(index / songsPerPage) + 1;
    renderSongs();
}

// 8. Stats and Helper Functions
function showArtistStats() {
    const stats = document.getElementById("stats");
    if (stats) stats.innerText = songs.length + " songs loaded";
}

function randomSong() {
    if (songs.length === 0) return;
    let song = songs[Math.floor(Math.random() * songs.length)];
    alert(song.artist + " - " + song.song);
}

function goHome() {
    const searchBox = document.getElementById("searchBox");
    if (searchBox) searchBox.value = "";
    filteredSongs = songs;
    currentPage = 1;
    renderSongs();
}

// Start the app
window.onload = loadSongs;
