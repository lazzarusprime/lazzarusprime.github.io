let songs = []

const tableBody = document.querySelector("#songTable tbody")
const searchBox = document.getElementById("search")

// Load CSV from repo
fetch("StreamSongList.csv", { cache: "no-store" })
.then(res => res.text())
.then(csv => {

  let rows = csv.trim().split("\n").slice(1)

  rows.forEach(r => {
    let cols = r.split(",")

    if (cols.length >= 2) {
      songs.push({
        artist: cols[0].trim(),
        song: cols[1].trim()
      })
    }
  })

  renderSongs(songs)
})

// Render table
function renderSongs(list){

  tableBody.innerHTML = ""

  let fragment = document.createDocumentFragment()

  list.forEach(s => {

    let tr = document.createElement("tr")

    tr.innerHTML = `
      <td>${s.artist}</td>
      <td>${s.song}</td>
      <td>
        <button onclick="copyRequest('!request ${s.artist} - ${s.song}')">
        Copy Request
        </button>
      </td>
    `

    fragment.appendChild(tr)

  })

  tableBody.appendChild(fragment)
}

// Copy to clipboard
function copyRequest(text){
  navigator.clipboard.writeText(text)
  alert("Copied: " + text)
}

// Fast search
searchBox.addEventListener("input", () => {

  let term = searchBox.value.toLowerCase()

  let filtered = songs.filter(s =>
    s.artist.toLowerCase().includes(term) ||
    s.song.toLowerCase().includes(term)
  )

  renderSongs(filtered)

})
