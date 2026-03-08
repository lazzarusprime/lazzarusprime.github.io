// 1. Configuration
const firebaseConfig = {
    databaseURL: "https://rocksmith-requests-default-rtdb.firebaseio.com"
};

// 2. Global Variables
let db;
let songs = [];
let filteredSongs = [];
let currentPage = 1;
let songsPerPage = 25;

// 3. Main Loader
async function loadSongs() {
    try {
        // Initialize Firebase only when this function runs (on window load)
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();

        const response = await fetch("songs.json");
        if (!response.ok) throw new Error("songs.json not found");

        songs = await response.json();
        filteredSongs = songs;

        // Run UI functions
        listenQueue();
        buildAlphabet();
        renderSongs();
        showArtistStats();
    } catch (error) {
        console.error("Startup Error:", error);
        const stats = document.getElementById("stats");
        if (stats) stats.innerText = "Error: " + error.message;
    }
}

// 4. Firebase Queue Listener
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

// 5. Request Song
function requestSong(artist, song) {
    let text = artist + " - " + song;
    navigator.clipboard.writeText("!sr " + text);
    db.ref("queue").push({ artist, song });
    alert("Request added!\nPaste in chat:\n!sr " + text);
}

// 6. UI Rendering
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
        const sA = song.artist.replace(/'/g, "\\'");
        const sS = song.song.replace(/'/g, "\\'");
        div.innerHTML = `
            <span><b>${song.artist}</b> - ${song.song}</span>
            <button onclick="requestSong('${sA}', '${sS}')">Request</button>
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
    let span = document.createElement("span");
    span.innerText = ` Page ${currentPage} / ${totalPages} `;
    div.appendChild(span);

    if (currentPage < totalPages) {
        const next = document.createElement("button");
        next.innerText = "Next";
        next.onclick = () => { currentPage++; renderSongs(); };
        div.appendChild(next);
    }
}

// 7. Search & Alphabet
function searchSongs() {
    let q = document.getElementById("searchBox").value.toLowerCase();
    filteredSongs = songs.filter(s => 
        s.artist.toLowerCase().includes(q) || s.song.toLowerCase().includes(q)
    );
    currentPage = 1;
    renderSongs();
}

function buildAlphabet() {
    const div = document.getElementById("alphabet");
    if (!div) return;
    div.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(l => {
        let btn = document.createElement("button");
        btn.innerText = l;
        btn.onclick = () => jumpToLetter(l);
        div.appendChild(btn);
    });
}

function jumpToLetter(l) {
    const idx = filteredSongs.findIndex(s => s.artist.toLowerCase().startsWith(l.toLowerCase()));
    if (idx === -1) return;
    currentPage = Math.floor(idx / songsPerPage) + 1;
    renderSongs();
}

// 8. Helpers
function showArtistStats() {
    const stats = document.getElementById("stats");
    if (stats) stats.innerText = songs.length + " songs loaded";
}

function randomSong() {
    if (songs.length === 0) return;
    let s = songs[Math.floor(Math.random() * songs.length)];
    alert(s.artist + " - " + s.song);
}

function goHome() {
    const box = document.getElementById("searchBox");
    if (box) box.value = "";
    filteredSongs = songs;
    currentPage = 1;
    renderSongs();
}

// Wait for EVERYTHING to load before starting
window.onload = loadSongs;
