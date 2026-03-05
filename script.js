// --- Ultra fast search for Lazzarus Prime ---
let songs = []
let tableBody = document.querySelector("#songTable tbody")
const searchBox = document.getElementById("search")
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1dVMeWWmpf8nRU4uKQ1NtTSL_neUJ2y0Qx6wmDhbVnjANhL9rgxGEMc-X8brss1X_UdafNUIMlqmg/pubhtml"

// Load songs from published Google Sheet
fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    let rows = csv.split("\n").slice(1)
    rows.forEach(r => {
      let cols = r.split(",")
      if(cols.length >= 2){
        songs.push({
          artist: cols[0].trim(),
          song: cols[1].trim(),
          tuning: cols[2] ? cols[2].trim() : "E Standard"
        })
      }
    })
    renderSongs(songs)
  })

// Render only the filtered songs
function renderSongs(list){
  tableBody.innerHTML = ""
  let fragment = document.createDocumentFragment()
  list.forEach(s => {
    let tr = document.createElement("tr")
    tr.innerHTML = `<td>${s.artist}</td><td>${s.song}</td><td>${s.tuning}</td>
      <td><button onclick="copyRequest('!request ${s.artist} - ${s.song}')">Copy Request</button></td>`
    fragment.appendChild(tr)
  })
  tableBody.appendChild(fragment)
}

// Copy request to clipboard
function copyRequest(text){
  navigator.clipboard.writeText(text)
  alert("Copied: " + text)
}

// Efficient search: filter array, then render
searchBox.addEventListener("input", () => {
  let term = searchBox.value.toLowerCase()
  let filtered = songs.filter(s => 
    s.artist.toLowerCase().includes(term) || s.song.toLowerCase().includes(term)
  )
  renderSongs(filtered)
})
