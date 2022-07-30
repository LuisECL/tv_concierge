let searchContainer = document.querySelector(".search-container")
let searchBar = document.getElementById('search-bar')

function search(text){
  fetch(`http://www.omdbapi.com/?apikey=ef1d1c7c&s=${text}`)
    .then(promise => promise.json())
    .then(data => {
      addResult(data)
    })
    .catch(err => console.log(err))
}

function addResult(result){
  let searchResult = document.createElement("div");
  searchResult.classList.add("result-container");
  searchResult.innerHTML = `
  <img src="${result.Search[1].Poster}" alt="">
  <p>${result.Search[1].Title}</p>
  `
  searchContainer.appendChild(searchResult)
}

searchBar.addEventListener("keyup", () => {
  console.log(searchBar.value);
  search(searchBar.value)
})