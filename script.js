API_LINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ee28a28f616411fbd3b3fbc0bd47fdbe&page=1";

SEARCH_LINK = "https://api.themoviedb.org/3/search/movie?api_key=ee28a28f616411fbd3b3fbc0bd47fdbe&query=";

IMG_PATH = 'https://image.tmdb.org/t/p/w185/'

const main = document.getElementById('section')
const search = document.getElementById('mSearch');
const form = document.getElementById('form');

const returnMovies = (url) => {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        
    })
}