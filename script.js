// 1. Move initialization to the TOP so buttons can see 'db' and 'firebase'
const firebaseConfig = {
    databaseURL: "https://rocksmith-requests-default-rtdb.firebaseio.com"
};

// Global variables initialized immediately
let db;
let songs = [];
let filteredSongs = [];
let currentPage = 1;
let songsPerPage = 25;

// Initialize Firebase immediately (must be after libraries load in HTML)
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
} catch (e) {
    console.error("Firebase setup failed:", e);
}

// 2. Main Loader
async function loadSongs() {
    const stats = document.getElementById("stats");
    try {
        const response = await fetch("songs.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}: songs.json missing`);

        songs = await response.json();
        filteredSongs = songs;

        // UI Setup
        listenQueue();
        buildAlphabet();
        renderSongs();
        showArtistStats();
    } catch (error) {
        console.error("Load failed:", error);
        if (stats) stats.innerText = "Error: " + error.message;
    }
}

// 3. UI and Firebase Functions
function listenQueue() {
    if (!db) return;
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

function requestSong(artist, song) {
    if (!db) return alert("Database not ready.");
    let text = artist + " - " + song;
    navigator.clipboard.writeText("!sr " + text);
    db.ref("queue").push({ artist, song });
    alert("Request added!\nPaste in chat:\n!sr " + text);
}

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
        div.innerHTML = `<span><b>${song.artist}</b> - ${song.song}</span>
                        <button onclick="requestSong('${sA}', '${sS}')">Request</button>`;
        list.appendChild(div);
    });
    renderPagination();
}

function renderPagination() {
    const div = document.getElementById("pagination");
    if (!div) return;
    div.innerHTML = "";
    let totalPages = Math.ceil(filteredSongs.length / songsPerPage) || 1;
    if (currentPage > 1) {
        let btn = document.createElement("button");
        btn.innerText = "Prev";
        btn.onclick = () => { currentPage--; renderSongs(); };
        div.appendChild(btn);
    }
    let s = document.createElement("span");
    s.innerText = ` Page ${currentPage} / ${totalPages} `;
    div.appendChild(s);
    if (currentPage < totalPages) {
        let btn = document.createElement("button");
        btn.innerText = "Next";
        btn.onclick = () => { currentPage++; renderSongs(); };
        div.appendChild(btn);
    }
}

function searchSongs() {
    let q = document.getElementById("searchBox").value.toLowerCase();
    filteredSongs = songs.filter(s => s.artist.toLowerCase().includes(q) || s.song.toLowerCase().includes(q));
    currentPage = 1;
    renderSongs();
}

function buildAlphabet() {
    const div = document.getElementById("alphabet");
    if (!div) return;
    div.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(l => {
        let b = document.createElement("button");
        b.innerText = l;
        b.onclick = () => jumpToLetter(l);
        div.appendChild(b);
    });
}

function jumpToLetter(l) {
    const idx = filteredSongs.findIndex(s => s.artist.toLowerCase().startsWith(l.toLowerCase()));
    if (idx === -1) return;
    currentPage = Math.floor(idx / songsPerPage) + 1;
    renderSongs();
}

function showArtistStats() {
    const stats = document.getElementById("stats");
    if (stats) stats.innerText = songs.length + " songs loaded";
}

function randomSong() {
    if (!songs || songs.length === 0) return alert("Songs not loaded yet.");
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

window.onload = loadSongs;
