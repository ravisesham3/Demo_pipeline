const api = "api_key=ed959615c2bf621066b2be8edc4d8036";

const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const image_url = "https://image.tmdb.org/t/p/w300";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Fetch Netflix Originals for Banner
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
        const banner = document.getElementById("banner");
        const bannerTitle = document.getElementById("banner__title");
        const bannerDesc = document.getElementById("banner__description");

        banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
        bannerDesc.innerText = truncate(setMovie.overview, 150);
        bannerTitle.innerText = setMovie.name || setMovie.title;
    })
    .catch((error) => console.error('Error fetching Netflix Originals for banner:', error));

// Function to fetch and display movies
function fetchAndDisplayMovies(fetchUrl, categoryTitle) {
    fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
            const headrow = document.getElementById("headrow");
            const row = document.createElement("div");
            row.className = "row";
            headrow.appendChild(row);

            const title = document.createElement("h2");
            title.className = "row__title";
            title.innerText = categoryTitle;
            row.appendChild(title);

            const rowPosters = document.createElement("div");
            rowPosters.className = "row__posters";
            row.appendChild(rowPosters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = "row__posterLarge";
                poster.id = movie.id;
                poster.src = image_url + movie.poster_path; // Use poster_path instead of backdrop_path
                rowPosters.appendChild(poster);
            });
        })
        .catch((error) => console.error(`Error fetching ${categoryTitle}:`, error));
}

// Fetch and display categories
fetchAndDisplayMovies(requests.fetchNetflixOriginals, "NETFLIX ORIGINALS");
fetchAndDisplayMovies(requests.fetchTrending, "Top Rated");
fetchAndDisplayMovies(requests.fetchActionMovies, "Action");
fetchAndDisplayMovies(requests.fetchComedyMovies, "Comedy Movies");
fetchAndDisplayMovies(requests.fetchHorrorMovies, "Horror Movies");
fetchAndDisplayMovies(requests.fetchRomanceMovies, "Romance Movies");
fetchAndDisplayMovies(requests.fetchDocumentaries, "Documentaries");
