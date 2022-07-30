let searchBar = document.getElementById('search-bar')

function search(text){
  fetch(`http://www.omdbapi.com/?apikey=ef1d1c7c&s=${text}`)
    .then(promise => promise.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

searchBar.addEventListener("keyup", () => {
  console.log(searchBar.value);
  search(searchBar.value)
})