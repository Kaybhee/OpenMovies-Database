API_LINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ee28a28f616411fbd3b3fbc0bd47fdbe&page=1";

SEARCH_LINK = "https://api.themoviedb.org/3/search/movie?api_key=ee28a28f616411fbd3b3fbc0bd47fdbe&query=";

IMG_PATH = 'https://image.tmdb.org/t/p/w185/'

const main = document.getElementById('section')
const search = document.getElementById('mSearch');
const form = document.getElementById('form');

//  function returning the movies
returnMovies(API_LINK);

// function to handle the movies functionality
const returnMovies = (url) => {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        data.results.forEach(elements => {
            const cardDiv = document.createElement('div');
            const rowDiv = document.createElement('div');
            const columnDiv = document.createElement('div');
            const img = document.createElement('img')
            const title = document.createElement('h3');
            const center = document.createElement('center')

            title.innerHTML = `${elements.title}`;
            img.src = `${IMG_PATH} + ${elements.poster_path}`;
            // appending
            center.appendChild(img);
            cardDiv.appendChild(center);
            cardDiv.appendChild(title);
            columnDiv.appendChild('cardDiv');
            rowDiv.appendChild('columnDiv');


        })
    })
}