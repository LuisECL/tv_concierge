let searchContainer = document.querySelector(".search-container")
let searchBar = document.getElementById('search-bar')
let results = document.querySelector(".results")

function search(text){
  fetch(`http://www.omdbapi.com/?apikey=ef1d1c7c&s=${text}`)
    .then(promise => promise.json())
    .then(data => {
      showSearchResults(data)
    })
    .catch(err => console.log(err))
}

function showSearchResults(response){
  console.log(results)
  results.innerHTML = ""

  if(response.Response){
    console.log(response)

    for (let i=0; i<6; i++){
      let resultContainer = document.createElement("div")
      resultContainer.classList.add("result-container")
      resultContainer.innerHTML = `
      <img src="${response.Search[i].Poster}" alt="">
      <p>${response.Search[i].Title}</p>
      `
      results.appendChild(resultContainer)
    }

  } else {
    results.innerHTML = ""
  }
}

searchBar.addEventListener("keyup", () => {
  console.log(searchBar.value);
  search(searchBar.value)
})