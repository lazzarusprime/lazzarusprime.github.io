window.onload = function(){

const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1dVMeWWmpf8nRU4uKQ1NtTSL_neUJ2y0Qx6wmDhbVnjANhL9rgxGEMc-X8brss1X_UdafNUIMlqmg/pubhtml"

fetch(sheetURL)
.then(response => response.text())
.then(data => {

let rows = data.split("\n").slice(1)

let table = document.querySelector("#songTable tbody")

rows.forEach(row => {
  let cols = row.split(",")
  if(cols.length >= 2){
    let tr = document.createElement("tr")
    tr.innerHTML = `<td>${cols[0]}</td><td>${cols[1]}</td>`
    table.appendChild(tr)
  }
})

})

}

function searchSongs(){
  let input = document.getElementById("search").value.toLowerCase()
  let rows = document.querySelectorAll("#songTable tbody tr")
  rows.forEach(row => {
    let text = row.innerText.toLowerCase()
    row.style.display = text.includes(input) ? "" : "none"
  })
}
