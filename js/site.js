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

    console.log(movieDetails);

    let genresArray = [];

    movieDetails.genres.forEach(genre => {
        genresArray.push(genre.name);
    });

    genresArray = genresArray.join(', ');

    document.getElementById('modal-title').textContent = movieDetails.title;

    document.getElementById('modal-img').src = `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`;

    document.getElementById('movie-modal-tagline').innerHTML = `<p><strong>Tagline:</strong> ${movieDetails.tagline}</p>`;

    document.getElementById('movie-modal-genres').innerHTML = `<p><strong>Genres:</strong> ${genresArray}</p>`;

    document.getElementById('movie-modal-tagline').innerHTML = `<p><strong>Tagline:</strong> ${movieDetails.tagline}</p>`;

    document.getElementById('movie-modal-release-date').innerHTML = `<p><strong>Release Date:</strong> ${movieDetails.release_date}</p>`;

    let productionCompanies = document.getElementById('movie-modal-production-companies');
    // movieCompanies.setAttribute('src',`https://api.themoviedb.org/3/movie/${movieId}/images`);
    let images = '';
    productionCompanies.innerHTML = '';
    for (const item of movieDetails.production_companies) {
        if (item.logo_path) {
            let img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500` + item.logo_path;
            img.style = 'width:100px;padding:10px;'
            productionCompanies.appendChild(img);
        }
    }
}