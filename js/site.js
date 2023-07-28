const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjdmYzY4ZjQyMTkzZjQ3MzY5YzQ4MmE4ZWUyOTRhYiIsInN1YiI6IjY0YzE2ODgwMDk3YzQ5MDBjNjQzMmZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tpfGC08xJulq-UYFETixY1zP_Q07lrXjaPUxinVCoYk';

// https://api.themoviedb.org/3/movie/popular

async function getMovies() {

    try {
        let response = await fetch('https://api.themoviedb.org/3/movie/popular',
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );

        let data = await response.json();

        return data;

    } catch (error) {
        console.error(error);
    }
}


async function getDetails(movieId) {
    try {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`,
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );

        let details = await response.json();

        return details;

    } catch (error) {
        console.error(error);
    }
}



async function displayMovies() {

    const movieListDiv = document.getElementById('movie-list');
    const moviePosterTemplate = document.getElementById('movie-card-template');

    let data = await getMovies();

    let movies = data.results;
    // movies is an array of objects
    movies.forEach(movie => {
        let movieCard = moviePosterTemplate.content.cloneNode(true);

        let titleElement = movieCard.querySelector('.card-body > h5');
        titleElement.textContent = movie.title;

        let movieParagraphElement = movieCard.querySelector('.card-text');
        movieParagraphElement.textContent = movie.overview;

        let movieImgElement = movieCard.querySelector('.card img');
        movieImgElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);


        let infoButton = movieCard.querySelector('button.btn');

        infoButton.setAttribute('data-movieId', movie.id);

        movieListDiv.appendChild(movieCard);


    });

}

async function showMovieDetails(btn) {

    let movieId = btn.getAttribute('data-movieId');

    let movieDetails = await getDetails(movieId);


    document.getElementById('modal-title').textContent = movieDetails.title;

    document.getElementById('movie-modal-paragraph').innerHTML = `<p>Tagline: ${movieDetails.tagline}`;

}