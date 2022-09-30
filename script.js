let searchContainer = document.querySelector(".search-container");
let searchBar = document.getElementById("search-bar");
const searchError = document.querySelector(".search-error")
const errorMsg = document.getElementById("error-msg")
let results = document.querySelector(".results");
const instructionsContainer = document.querySelector(".instructions-container");
const infoContainer = document.querySelector(".info-container");
const title = document.getElementById("title");
const release = document.getElementById("release");
const director = document.getElementById("director");
const actors = document.getElementById("actors");
const genre = document.getElementById("genre");
const plot = document.getElementById("plot");
const poster = document.getElementById("poster");

function search(text) {
  fetch(`https://www.omdbapi.com/?apikey=ef1d1c7c&s=${text}`)
    .then((promise) => promise.json())
    .then((data) => {
      showSearchResults(data);
    })
    .catch((err) => console.log(err));
}

function showSearchResults(response) {
  console.log(response);
  results.innerHTML = "";

  if (response.Error == "Too many results.") {
    results.innerHTML = "";
    searchError.style.display = "flex"
    errorMsg.innerText = "Seems like there are too many results. Try to be more specific."
  } else if (response.Error == "Movie not found!"){
    results.innerHTML = "";
    searchError.style.display = "flex"
    errorMsg.innerText = "We couldn't find what you're looking for. Try checking the spelling."
  } else if (response.Response) {
    for (let i = 0; i < response.Search.length; i++) {
      searchError.style.display = "none"
      let resultContainer = document.createElement("div");
      resultContainer.classList.add("result-container");
      resultContainer.setAttribute("id", `${response.Search[i].imdbID}`);
      resultContainer.innerHTML = `
      <img src="${response.Search[i].Poster}" alt="">
      <div class="text">
        <p>${response.Search[i].Title}</p>
        <p>(${response.Search[i].Year})</p>
      </div>
      `;
      results.appendChild(resultContainer);
    }
    let resultContainers = document.getElementsByClassName("result-container");
    selectMovie(resultContainers);
  }
}

function selectMovie(resultContainers) {
  for (let i = 0; i < resultContainers.length; i++) {
    resultContainers[i].addEventListener("click", () => {
      const resultTitle =
        resultContainers[i].lastElementChild.firstElementChild.innerText;
      const resultID = resultContainers[i].getAttribute("id");

      console.log(`You clicked ${resultTitle} with id ${resultID}`);

      showMovieDetails(resultID);
      searchBar.value = ""
      results.innerHTML = "";
      results.style.display = "none";
    });
  }
}

function showMovieDetails(idIMDB) {
  instructionsContainer.style.display = "none";
  infoContainer.style.display = "flex";

  fetch(`https://www.omdbapi.com/?apikey=ef1d1c7c&i=${idIMDB}`)
    .then((promise) => promise.json())
    .then((selectedMovie) => {
      console.log(selectedMovie);
      title.innerText = selectedMovie.Title;
      release.innerText = selectedMovie.Released;
      director.innerText = selectedMovie.Director;
      actors.innerText = selectedMovie.Actors;
      genre.innerText = selectedMovie.Genre;
      plot.innerText = selectedMovie.Plot;
      if (selectedMovie.Poster == "N/A") {
        poster.setAttribute("src", "img/poster-default.png");
      } else {
        poster.setAttribute("src", selectedMovie.Poster);
      }
    });
}

function clearMovieInfo() {
  title.innerText = "";
  release.innerText = "";
  director.innerText = "";
  actors.innerText = "";
  genre.innerText = "";
  plot.innerText = "";
  poster.setAttribute("src", "img/poster-default.png");
  instructionsContainer.style.display = "flex";
  infoContainer.style.display = "none";
}

searchBar.addEventListener("keyup", () => {
  search(searchBar.value);
});

searchBar.addEventListener("focus", () => {
  searchContainer.classList.remove("blur");
  results.style.display = "block";
});

searchBar.addEventListener("blur", () => {
  if (searchBar.value != ""){
    return
  } else {
    results.style.display = "none";
    searchError.style.display = "none";
  }
});
