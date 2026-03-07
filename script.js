let songs = []
let filteredSongs = []

let queue = []

const PAGE_SIZE = 100

let currentPage = 1

let tableBody
let queueBody
let searchBox
let songCount
let nowPlayingBox
let pageInfo

window.onload = function(){

tableBody = document.querySelector("#songTable tbody")
queueBody = document.querySelector("#queueTable tbody")

searchBox = document.getElementById("search")
songCount = document.getElementById("songCount")
nowPlayingBox = document.getElementById("nowPlaying")
pageInfo = document.getElementById("pageInfo")

loadSongs()
loadQueue()

setInterval(loadQueue,10000)

searchBox.addEventListener("input", searchSongs)

buildAlphabet()

}

function loadSongs(){

fetch("songs.json")

.then(res=>res.json())

.then(data=>{

songs = data

filteredSongs = songs

songCount.innerText = songs.length + " songs available"

renderPage()

})

}

function renderPage(){

tableBody.innerHTML=""

let start = (currentPage-1)*PAGE_SIZE
let end = start + PAGE_SIZE

let pageSongs = filteredSongs.slice(start,end)

let fragment = document.createDocumentFragment()

pageSongs.forEach(song=>{

let tr=document.createElement("tr")

tr.innerHTML=`
<td>${song.artist}</td>
<td>${song.song}</td>
<td><button onclick="copyRequest('${song.artist} - ${song.song}')">Copy</button></td>
`

fragment.appendChild(tr)

})

tableBody.appendChild(fragment)

let totalPages = Math.ceil(filteredSongs.length / PAGE_SIZE)

pageInfo.innerText = "Page " + currentPage + " / " + totalPages

}

function nextPage(){

let totalPages = Math.ceil(filteredSongs.length / PAGE_SIZE)

if(currentPage < totalPages){

currentPage++

renderPage()

}

}

function prevPage(){

if(currentPage > 1){

currentPage--

renderPage()

}

}

function searchSongs(){

let term = searchBox.value.toLowerCase()

filteredSongs = songs.filter(song=>

song.artist.toLowerCase().includes(term) ||
song.song.toLowerCase().includes(term)

)

currentPage=1

renderPage()

}

function randomSong(){

let r = songs[Math.floor(Math.random()*songs.length)]

copyRequest(`${r.artist} - ${r.song}`)

}

function copyRequest(text){

navigator.clipboard.writeText("!request " + text)

alert("Copied: !request " + text)

}

function buildAlphabet(){

let container = document.getElementById("alphabet")

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

for(let letter of letters){

let btn=document.createElement("button")

btn.innerText=letter

btn.onclick=function(){

jumpLetter(letter)

}

container.appendChild(btn)

}

}

function jumpLetter(letter){

filteredSongs = songs.filter(song=>song.artist.toUpperCase().startsWith(letter))

currentPage=1

renderPage()

}

function loadQueue(){

fetch("queue.json")

.then(res=>res.json())

.then(data=>{

queue=data

renderQueue()

})

}

function renderQueue(){

queueBody.innerHTML=""

let fragment=document.createDocumentFragment()

queue.forEach((song,i)=>{

let tr=document.createElement("tr")

tr.innerHTML=`
<td>${i+1}</td>
<td>${song.artist}</td>
<td>${song.song}</td>
`

fragment.appendChild(tr)

})

queueBody.appendChild(fragment)

if(queue.length>0){

nowPlayingBox.innerText=queue[0].artist + " - " + queue[0].song

}

}
