import dotenv from 'dotenv';
dotenv.config();
export const API_LINK = process.env.API_LINK;
export const IMG_PATH = process.env.IMG_PATH;
export const SEARCH_LINK =process.env.SEARCH_LINK;


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