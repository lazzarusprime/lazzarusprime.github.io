let songs = []
let tableBody
let searchBox
let songCount

const INITIAL_RENDER = 200

window.onload = function(){

tableBody = document.querySelector("#songTable tbody")
searchBox = document.getElementById("search")
songCount = document.getElementById("songCount")

fetch("songs.json")

.then(response => response.json())

.then(data => {

songs = data

songCount.innerText = songs.length + " songs available"

renderSongs(songs.slice(0, INITIAL_RENDER))

})

searchBox.addEventListener("input", function(){

let term = searchBox.value.toLowerCase()

let filtered = songs.filter(song =>

song.artist.toLowerCase().includes(term) ||
song.song.toLowerCase().includes(term)

)

renderSongs(filtered)

})

}

function renderSongs(list){

tableBody.innerHTML = ""

let fragment = document.createDocumentFragment()

list.forEach(song => {

let tr = document.createElement("tr")

tr.innerHTML = `
<td>${song.artist}</td>
<td>${song.song}</td>
<td>
<button onclick="copyRequest('!request ${song.artist} - ${song.song}')">
Copy
</button>
</td>
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

let r = songs[Math.floor(Math.random() * songs.length)]

copyRequest(`!request ${r.artist} - ${r.song}`)

}
