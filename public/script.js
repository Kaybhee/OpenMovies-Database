

const API_LINK="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ee28a28f616411fbd3b3fbc0bd47fdbe&page=1";

const SEARCH_LINK="https://api.themoviedb.org/3/search/movie?api_key=ee28a28f616411fbd3b3fbc0bd47fdbe&query=";

const IMG_PATH='https://image.tmdb.org/t/p/w185/'

const main = document.getElementById('section')
const search = document.getElementById('mSearch');
const form = document.getElementById('form');

//  function returning the movies
// function to handle the movies functionality
const returnMovies = (url) => {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        data.results.forEach(elements => {
            const cardDiv = document.createElement('div');
            cardDiv.setAttribute('class', 'card');

            const rowDiv = document.createElement('div');
            rowDiv.setAttribute('class', 'row');
            const columnDiv = document.createElement('div');
            columnDiv.setAttribute('class', 'column')
            const img = document.createElement('img')
            img.setAttribute('class', 'img');
            // img.setAttribute('id', 'image');

            const title = document.createElement('h6')
            title.setAttribute('class', 'name');
// ;
            const center = document.createElement('center');
            title.innerHTML = `${elements.title}<br><br><a href="movie.html?id=${elements.id}&title=${elements.title}">Reviews</a>`;
            
            img.src = IMG_PATH + elements.poster_path;
            // appending
            center.appendChild(img);
            cardDiv.appendChild(center);
            cardDiv.appendChild(title);
            columnDiv.appendChild(cardDiv);
            rowDiv.appendChild(columnDiv);

            main.appendChild(rowDiv);

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                main.innerHTML = '';
                const searchVal = search.value;
                console.log(searchVal)
                if (searchVal) {
                    const searchMovies = SEARCH_LINK + searchVal;
                    returnMovies(searchMovies);
                    search.value = '';
                }
            })
            
        })
    })
}
returnMovies(API_LINK);
