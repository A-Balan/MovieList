const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjdmYzY4ZjQyMTkzZjQ3MzY5YzQ4MmE4ZWUyOTRhYiIsInN1YiI6IjY0YzE2ODgwMDk3YzQ5MDBjNjQzMmZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tpfGC08xJulq-UYFETixY1zP_Q07lrXjaPUxinVCoYk'

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

        movieListDiv.appendChild(movieCard);
    });

}

