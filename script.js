let songs = []
let tableBody
let searchBox
let songCount

const INITIAL_RENDER = 200

window.onload = function(){

tableBody = document.querySelector("#songTable tbody")
searchBox = document.getElementById("search")
songCount = document.getElementById("songCount")

fetch("StreamSongList.csv")
.then(res => res.text())
.then(csv => {

let rows = csv.trim().split("\n").slice(1)

rows.forEach(r => {

let cols = r.split(",")

if(cols.length >= 2){

songs.push({
artist: cols[0].replace(/"/g,"").trim(),
song: cols[1].replace(/"/g,"").trim()
})

}

})

songCount.innerText = songs.length + " songs available"

renderSongs(songs.slice(0, INITIAL_RENDER))

})

searchBox.addEventListener("input", () => {

let term = searchBox.value.toLowerCase()

let filtered = songs.filter(s =>
s.artist.toLowerCase().includes(term) ||
s.song.toLowerCase().includes(term)
)

renderSongs(filtered)

})

}

function renderSongs(list){

tableBody.innerHTML = ""

let fragment = document.createDocumentFragment()

list.forEach(s => {

let tr = document.createElement("tr")

tr.innerHTML = `
<td>${s.artist}</td>
<td>${s.song}</td>
<td><button onclick="copyRequest('!request ${s.artist} - ${s.song}')">Copy</button></td>
`

fragment.appendChild(tr)

})

tableBody.appendChild(fragment)

}

function copyRequest(text){

navigator.clipboard.writeText(text)

alert("Copied: " + text)

}

function randomSong(){

let r = songs[Math.floor(Math.random()*songs.length)]

copyRequest(`!request ${r.artist} - ${r.song}`)

}
