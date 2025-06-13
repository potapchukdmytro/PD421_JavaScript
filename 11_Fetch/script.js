function fetchCharacters() {
    const url = "https://www.swapi.tech/api/people";

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
}

async function fetchCharactersAsync() {
    const url = "https://www.swapi.tech/api/people";

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const people = data.results;
            addCharacters(people);
        }
    } catch (error) {
        console.error(error);
    }
}

function fetchCharacterInfo(url) {
    console.log(url);
}

function addCharacters(data) {
    const table = document.getElementById("characters");

    for (const item of data) {
        table.innerHTML += `<tr class="text-center" onclick="fetchCharacterInfo('${item.url}')">
                        <th scope="row">${item.uid}</th>
                        <td>${item.name}</td>
                        <td>${item.url}</td>
                    </tr>`;
    }
}

async function fetchRandomCat() {
    const url = "https://api.thecatapi.com/v1/images/search";

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const cat = data[0];
            const imgUrl = cat.url;
            const img = document.getElementById("catImage");
            img.src = imgUrl;
        }
    } catch (error) {
        console.error(error);
    }
}




// headers and method
function tmp() {
    fetch("google.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "key"
        }
    });
}