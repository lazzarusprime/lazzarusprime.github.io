const firebaseConfig = {
    databaseURL: "https://rocksmith-requests-default-rtdb.firebaseio.com"
};

let db;
let songs = [];
let filteredSongs = [];
let currentPage = 1;
const songsPerPage = 25;

// 1. SAFETY LOOP: Wait for Firebase to be defined
function checkFirebase() {
    if (typeof firebase !== 'undefined' && typeof firebase.database === 'function') {
        console.log("Firebase is ready!");
        init();
    } else {
        console.log("Firebase not loaded yet, retrying in 100ms...");
        setTimeout(checkFirebase, 100);
    }
}

// 2. Initialize App
function init() {
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.database();
        loadSongs();
        listenQueue();
    } catch (error) {
        console.error("Init failed:", error);
        document.getElementById("stats").innerText = "Init Error: " + error.message;
    }
}

// 3. Load Songs
async function loadSongs() {
    try {
        const r = await fetch("songs.json");
        if (!r.ok) throw new Error("songs.json missing from server");
        songs = await r.json();
        filteredSongs = songs;
        
        buildAlphabet();
        renderSongs();
        showArtistStats();
    } catch (error) {
        document.getElementById("stats").innerText = "Load Error: " + error.message;
    }
}

// 4. Firebase Queue
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

// 5. Request Logic
function requestSong(artist, song) {
    if (!db) {
        alert("Database still connecting. Try again in 2 seconds.");
        return;
    }
    let text = artist + " - " + song;
    navigator.clipboard.writeText("!sr " + text);
    db.ref("queue").push({ artist, song })
        .then(() => alert("Request added!\n!sr " + text))
        .catch(e => alert("Firebase Error: " + e.message));
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
    if (!songs.length) return;
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

// Start the check loop
checkFirebase();
