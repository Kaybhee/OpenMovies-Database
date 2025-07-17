import { API_LINK, IMG_PATH, SEARCH_LINK } from '../const.js';
// import dotenv from 'dotenv'
// export const API_LINK = process.env.API_LINK;
// export const IMG_PATH = process.env.IMG_PATH;
// export const SEARCH_LINK =process.env.SEARCH_LINK;

dotenv.config();
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