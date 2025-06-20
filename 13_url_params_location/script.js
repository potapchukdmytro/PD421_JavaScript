async function fetchCharacters() {
    const url = "https://thronesapi.com/api/v2/Characters";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function showCharacters() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    const characters = await fetchCharacters();

    for (let character of characters) {
        const { id, fullName, imageUrl } = character;

        tableBody.innerHTML += `<tr class="character-row" onclick="characterClickHandler(${id})">
                    <th class="text-center" scope="row">${id}</th>
                    <td class="text-center">${fullName}</td>
                    <td class="text-center"><img height="75" src="${imageUrl}" alt="${fullName}"></td>
                </tr>`;
    }
}

function characterClickHandler(id) {
    if (id >= 0 && id <= 52) {
        window.location.href = `/details/?id=${id}`;
    }
}

function userLocation(lat, lon) {
    const apiKey = "685568cdc9119942270732jfyef583d";
    const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${apiKey}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const location = document.getElementById("location");
            const {town, city} = data.address;
            location.innerText = `Ваше розташування: ${town ? town : city}`;
        })
        .catch((error) => console.error(error));
}

function localtionSuccessCallback(position) {
    const {
        coords: { latitude, longitude },
    } = position;

    userLocation(latitude, longitude);
}

function localtionErrorCallback() {
    const url = "https://ipapi.co/json/";

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const { latitude, longitude } = data;
            userLocation(latitude, longitude);
        })
        .catch((error) => console.error(error));
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            localtionSuccessCallback,
            localtionErrorCallback
        );
    } else {
        console.log("Геолокація не підтримується");
    }
}

showCharacters();
getUserLocation();
