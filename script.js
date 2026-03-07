let songs = []
let filteredSongs = []
let currentPage = 1
let songsPerPage = 25

async function loadSongs() {

    const response = await fetch("songs.json")
    songs = await response.json()

    console.log("Loaded songs:", songs.length)

    filteredSongs = songs

    showArtistStats()
    detectDuplicates()

    renderSongs()
    buildAlphabet()

}

function renderSongs() {

    const list = document.getElementById("songList")
    list.innerHTML = ""

    let start = (currentPage - 1) * songsPerPage
    let end = start + songsPerPage

    let pageSongs = filteredSongs.slice(start, end)

    pageSongs.forEach(song => {

        const div = document.createElement("div")
        div.className = "song"

        div.innerHTML = `
        <b>${song.artist}</b> - ${song.song}
        <button onclick="requestSong('${song.artist}','${song.song}')">Request</button>
        `

        list.appendChild(div)

    })

    renderPagination()

}

function renderPagination() {

    const pageDiv = document.getElementById("pagination")
    pageDiv.innerHTML = ""

    let totalPages = Math.ceil(filteredSongs.length / songsPerPage)

    if (currentPage > 1) {

        const prev = document.createElement("button")
        prev.innerText = "Previous"
        prev.onclick = () => {
            currentPage--
            renderSongs()
        }

        pageDiv.appendChild(prev)
    }

    const pageInfo = document.createElement("span")
    pageInfo.innerText = ` Page ${currentPage} / ${totalPages} `
    pageDiv.appendChild(pageInfo)

    if (currentPage < totalPages) {

        const next = document.createElement("button")
        next.innerText = "Next"
        next.onclick = () => {
            currentPage++
            renderSongs()
        }

        pageDiv.appendChild(next)
    }

}

function searchSongs() {

    const search = document.getElementById("searchBox").value.toLowerCase()

    filteredSongs = songs.filter(song =>
        song.artist.toLowerCase().includes(search) ||
        song.song.toLowerCase().includes(search)
    )

    currentPage = 1
    renderSongs()

}

function jumpToLetter(letter) {

    const index = filteredSongs.findIndex(song =>
        song.artist.toLowerCase().startsWith(letter.toLowerCase())
    )

    if (index === -1) return

    currentPage = Math.floor(index / songsPerPage) + 1

    renderSongs()

}

function buildAlphabet() {

    const bar = document.getElementById("alphabet")

    if (!bar) return

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

    letters.forEach(letter => {

        const btn = document.createElement("button")
        btn.innerText = letter

        btn.onclick = () => jumpToLetter(letter)

        bar.appendChild(btn)

    })

}

function randomSong() {

    const random = songs[Math.floor(Math.random() * songs.length)]

    alert(`Random Song:\n${random.artist} - ${random.song}`)

}

function requestSong(artist, song) {

    const requestText = `${artist} - ${song}`

    navigator.clipboard.writeText(
        `@Lazzarus_Prime ${requestText}`
    )

    alert(`Copied to clipboard!\nPaste in Twitch chat:\n${requestText}`)

}

function showArtistStats() {

    const stats = {}

    songs.forEach(song => {

        if (!stats[song.artist]) stats[song.artist] = 0

        stats[song.artist]++

    })

    console.log("Artist Stats:")

    const sorted = Object.entries(stats)
        .sort((a, b) => b[1] - a[1])

    sorted.slice(0, 20).forEach(a => {

        console.log(`${a[0]} : ${a[1]} songs`)

    })

}

function detectDuplicates() {

    const seen = {}
    const duplicates = []

    songs.forEach(song => {

        const key = (song.artist + song.song).toLowerCase()

        if (seen[key]) {

            duplicates.push(song)

        } else {

            seen[key] = true

        }

    })

    if (duplicates.length > 0) {

        console.warn("Duplicate songs detected:", duplicates.length)

    }

}

window.onload = loadSongs
