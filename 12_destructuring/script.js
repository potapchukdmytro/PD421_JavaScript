async function fetchMovies(searchParams) {
    const apiKey = "886ebf7e";
    const searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchParams}`;

    try {
        const response = await fetch(searchUrl);
        if(!response.ok) {
            return [];
        }

        const data = await response.json();
        const { Response, Search } = data;
        if(Response === "True") {
            return Search;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function showMovies(searchParams = "Lord of the rings") {
    const movies = await fetchMovies(searchParams);
    const container = document.getElementById("moviesContainer");
    container.innerHTML = "";
    
    for(let movie of movies) {
        container.innerHTML += getMovieCard(movie);
    }
}

function getMovieCard(movie) {
    const {Title, Poster, imdbID, Year} = movie; 

    const imgUrl = Poster
        ? Poster
        : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";

    return `<div class="col-3 mt-2">
                    <div class="card h-100" style="width: 18rem">
                        <img src="${imgUrl}" class="card-img-top" alt="${Title}" />
                        <div class="card-body">
                            <h5 class="card-title">${Title}</h5>
                            <p class="card-text">
                                Рік: ${Year}
                            </p>
                            <button onclick="goToMovieDetails('${imdbID}')" class="btn btn-success">Details</button>
                        </div>
                    </div>
                </div>`;
}

function goToMovieDetails(imdbID) {
    localStorage.setItem("imdbID", imdbID);
    window.location = "/details";
}

function searchHandler(e) {
    if(e.key === "Enter") {
        const search = document.getElementById("movieSearch").value;
        showMovies(search);
    }
}

showMovies();