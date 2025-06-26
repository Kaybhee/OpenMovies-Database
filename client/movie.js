const API_LINK = 'http://localhost:5000/api/v1/reviews/';

// Create a new review
const url = new URL(location.href);
console.log(location.href)
const movieId=url.searchParams.get("id");
const movieTitle=url.searchParams.get("title")
console.log(movieId)

const main = document.getElementById('section')
const title = document.getElementById('title')

title.innerText = movieTitle;

const div = document.createElement('div');
            div.innerHTML = `
            <div class = "row">
            <div class ="column">
            <div class = "card">
            New Review
            <p><strong>Review:</strong>
            <input type="text" id="new-review" value=""</p>
            <p><strong>User: </strong>
            <input type="text" id="new-user" value=""</p>
            <div class = "actions">
                <a href = '#' onclick="savedRev('new-review', 'new-user')">🕹️</a>
            </div>
            
            </div>
            </div>
            </div>
            `

// const createRev = (userInputId, reviewInputId, id) => {
//     const userInput = document.getElementById(userInputId)
//     const reviewInput = document.getElementById(reviewInputId)
//     fetch(API_LINK + id, {
//         method: 'POST',
//         headers: {
//             "Accept": 'application/json, text/plain',
//             "Content-type" :'application/json',
//         },
//         body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
//     })
//     .then(res => res.json())
//     .then(res => {
//         console.log(res)
//         location.reload()
//     })
// }
//  function returning the movies
// function to handle the movies functionality
const returnReviews = (movieId) => {
    fetch(`${API_LINK}${movieId}`)
    .then(res => res.json())
    .then((data) => {
        if (Array.isArray(data.rev)) {
            console.log("our data:", data)
            data.rev.forEach(rev => {
            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
            <div class = "row">
            <div class ="column">
            <div class = "card" id=${rev._id} >
            <p><center><strong>Review:</strong> ${rev.review}</center> </p>
            <p><center><strong>User: </strong>${rev.user} </center></p>
            <div class = "actions">
                <a href = '#' onclick="updateReview('${rev._id}', '${rev.review}', '${rev.user}')">✏️</a> <a href='#' class="del-icon" onclick="delReview('${rev._id}')">🗑️</a>
            </div>
            
            </div>
            </div>
            </div>
            `

            main.appendChild(cardDiv); 
        })
        }
        else {
            main.innerHTML= "<h2>No reviews found for this movie</h2>";
        }
    })
}

const updateReview = (id, review, user) => {
    const ele = document.getElementById(id);
    const userInputId = "user" + id;
    const reviewInputId = "review" + id;

    ele.innerHTML = `<p> <strong>Review: </strong>
                            <input type=text id='${reviewInputId}' value='${review}' placeholder="Enter a review ID"> 
                    </p>
                    <p> <strong>User: </strong>
                            <input type=text id='${userInputId}' value='${user}'placeholder="Enter a valid username"> 
                    </p>
    <p><a href= "#" onclick="savedRev('${userInputId}', '${reviewInputId}', '${id}')">🕹️</a>`
};

const savedRev = (userInputId, reviewInputId, id="") => {
    const userInput = document.getElementById(userInputId).value
    const reviewInput = document.getElementById(reviewInputId).value
    if (id) {
        fetch(API_LINK + id, {
        method: 'PUT',
        headers: {
            "Accept": 'application/json, text/plain',
            "Content-type" :'application/json',
        },
        body: JSON.stringify({"user": userInput, "review": reviewInput})
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload()
    })
    } else {
       fetch(API_LINK + "new-review", {
        method: 'POST',
        headers: {
            "Accept": 'application/json, text/plain',
            "Content-type" :'application/json',
        },
        body: JSON.stringify({"user": userInput, "review": reviewInput, "movieId": movieId})
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload()
    })
    } 
}
    

const delReview = (id) => {
    fetch(API_LINK + id, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload()
    })
}
window.delReview = delReview
window.updateReview = updateReview
window.savedRev = savedRev

returnReviews(movieId);
