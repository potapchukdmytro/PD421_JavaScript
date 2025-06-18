async function fetchMovieDetails(imdbID) {
    const apiKey = "886ebf7e";
    const movieUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

    try {
        const reponse = await fetch(movieUrl);
        if (!reponse.ok) {
            return null;
        }
        const data = await reponse.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getMovie() {
    const imdbID = localStorage.getItem("imdbID");

    if (imdbID) {
        const movie = await fetchMovieDetails(imdbID);
        if (movie) {
            return movie;
        }
    }

    return null;
}

async function showMovie() {
    const movie = await getMovie();
    const container = document.getElementById("movieContainer");

    if (!movie) {
        // container.innerHTML = "<h1>Movie not found</h1>";
        window.location = "/";
    } else {
        const { Poster, Title, Year, Released, Runtime, Director, Plot } = movie;

        container.innerHTML = `<div>
                <img src="${Poster}" alt="${Title}"/>
            </div>
            <div style="text-align: center;">
                <h1 class="mt-4">${Title}</h1>
                <h3>Year: ${Year}</h3>
                <h3>Released: ${Released}</h3>
                <h3>Runtime: ${Runtime}</h3>
                <h3>Director: ${Director}</h3>
            </div>
            <div style="text-align: center; width: 40%;">
                <p>${Plot}</p>
            </div>`;
    }
}

showMovie();
