let searchContainer = document.querySelector(".search-container");
let searchBar = document.getElementById('search-bar');
let results = document.querySelector(".results");
const detailsTitle = document.getElementById("details-title")

function search(text){
  fetch(`http://www.omdbapi.com/?apikey=ef1d1c7c&s=${text}`)
    .then(promise => promise.json())
    .then(data => {
      showSearchResults(data)
    })
    .catch(err => console.log(err))
}

function showSearchResults(response){
  results.innerHTML = ""

  if(response.Response){
    for (let i=0; i<6; i++){
      let resultContainer = document.createElement("div")
      resultContainer.classList.add("result-container");
      resultContainer.setAttribute("id", `${response.Search[i].imdbID}`)
      resultContainer.innerHTML = `
      <img src="${response.Search[i].Poster}" alt="">
      <div class="text">
        <p>${response.Search[i].Title}</p>
        <p>(${response.Search[i].Year})</p>
      </div>
      `
      results.appendChild(resultContainer)
    }
    let resultContainers = document.getElementsByClassName("result-container");
    selectMovie(resultContainers);
  } else {
    results.innerHTML = ""
  }
}

function selectMovie(resultContainers){
  for (let i=0; i<resultContainers.length; i++){
    resultContainers[i].addEventListener("click", ()=> {
      const resultTitle = resultContainers[i].lastElementChild.firstElementChild.innerText;
      const resultID = resultContainers[i].getAttribute("id")

      console.log(`You clicked ${resultTitle} with id ${resultID}`)

      showMovieDetails(resultID)

      detailsTitle.innerText = resultTitle;
    })
  }
}

function showMovieDetails(idIMDB){
  fetch(`http://www.omdbapi.com/?apikey=ef1d1c7c&i=${idIMDB}`)
    .then(promise => promise.json())
    .then(selectedMovie => {
      console.log(selectedMovie)
    })
}

showMovieDetails('tt8784956');

searchBar.addEventListener("keyup", () => {
  search(searchBar.value)
})
