let songs=[]
let filteredSongs=[]

let queue=[]

let currentPage=1
let songsPerPage=25

async function loadSongs(){

const r=await fetch("songs.json")
songs=await r.json()

filteredSongs=songs

loadQueue()

buildAlphabet()

showArtistStats()

renderSongs()

}

async function loadQueue(){

const r=await fetch("queue.json")
queue=await r.json()

renderQueue()

}

function renderQueue(){

const div=document.getElementById("queue")

div.innerHTML=""

queue.forEach((song,i)=>{

const item=document.createElement("div")

item.className="queueItem"

item.innerText=(i+1)+". "+song.artist+" - "+song.song

div.appendChild(item)

})

}

function renderSongs(){

const list=document.getElementById("songList")

list.innerHTML=""

let start=(currentPage-1)*songsPerPage
let end=start+songsPerPage

let pageSongs=filteredSongs.slice(start,end)

pageSongs.forEach(song=>{

const div=document.createElement("div")

div.className="song"

div.innerHTML=`
<span><b>${song.artist}</b> - ${song.song}</span>
<button onclick="requestSong('${song.artist}','${song.song}')">Request</button>
`

list.appendChild(div)

})

renderPagination()

}

function renderPagination(){

const div=document.getElementById("pagination")

div.innerHTML=""

let totalPages=Math.ceil(filteredSongs.length/songsPerPage)

if(currentPage>1){

const prev=document.createElement("button")

prev.innerText="Previous"

prev.onclick=()=>{

currentPage--
renderSongs()

}

div.appendChild(prev)

}

const page=document.createElement("span")

page.innerText=" Page "+currentPage+" / "+totalPages+" "

div.appendChild(page)

if(currentPage<totalPages){

const next=document.createElement("button")

next.innerText="Next"

next.onclick=()=>{

currentPage++
renderSongs()

}

div.appendChild(next)

}

}

function searchSongs(){

let q=document.getElementById("searchBox").value.toLowerCase()

filteredSongs=songs.filter(song=>

song.artist.toLowerCase().includes(q)||
song.song.toLowerCase().includes(q)

)

currentPage=1

renderSongs()

}

function buildAlphabet(){

const div=document.getElementById("alphabet")

let letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

letters.forEach(letter=>{

let btn=document.createElement("button")

btn.innerText=letter

btn.onclick=()=>jumpToLetter(letter)

div.appendChild(btn)

})

}

function jumpToLetter(letter){

const index=filteredSongs.findIndex(song=>

song.artist.toLowerCase().startsWith(letter.toLowerCase())

)

if(index==-1)return

currentPage=Math.floor(index/songsPerPage)+1

renderSongs()

}

function randomSong(){

let song=songs[Math.floor(Math.random()*songs.length)]

alert("Random Song:\n"+song.artist+" - "+song.song)

}

function requestSong(artist,song){

let text=artist+" - "+song

navigator.clipboard.writeText("!sr "+text)

alert("Copied to clipboard!\nPaste in Twitch chat:\n!sr "+text)

}

function goHome(){

document.getElementById("searchBox").value=""

filteredSongs=songs

currentPage=1

renderSongs()

}

function showArtistStats(){

let stats={}

songs.forEach(song=>{

if(!stats[song.artist])stats[song.artist]=0

stats[song.artist]++

})

console.log("Top Artists:")

Object.entries(stats)
.sort((a,b)=>b[1]-a[1])
.slice(0,20)
.forEach(a=>console.log(a[0]+" : "+a[1]))

document.getElementById("stats").innerText=songs.length+" songs loaded"

}

window.onload=loadSongs
