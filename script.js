const firebaseConfig = {
databaseURL: "https://rocksmith-requests-default-rtdb.firebaseio.com/"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.database()

let songs=[]
let filteredSongs=[]

let currentPage=1
let songsPerPage=25

async function loadSongs(){

const r=await fetch("songs.json")

songs=await r.json()

filteredSongs=songs

listenQueue()

buildAlphabet()

renderSongs()

showArtistStats()

}

function listenQueue(){

db.ref("queue").on("value",(snapshot)=>{

const data=snapshot.val()

const div=document.getElementById("queue")

div.innerHTML=""

if(!data)return

Object.values(data).forEach((song,i)=>{

let item=document.createElement("div")

item.className="queueItem"

item.innerText=(i+1)+". "+song.artist+" - "+song.song

div.appendChild(item)

})

})

}

function requestSong(artist,song){

let text=artist+" - "+song

navigator.clipboard.writeText("!sr "+text)

db.ref("queue").push({

artist:artist,
song:song

})

alert("Request added!\nPaste in chat:\n!sr "+text)

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

prev.innerText="Prev"

prev.onclick=()=>{

currentPage--
renderSongs()

}

div.appendChild(prev)

}

let page=document.createElement("span")

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

alert(song.artist+" - "+song.song)

}

function goHome(){

document.getElementById("searchBox").value=""

filteredSongs=songs

currentPage=1

renderSongs()

}

function showArtistStats(){

document.getElementById("stats").innerText=songs.length+" songs loaded"

}

window.onload=loadSongs
