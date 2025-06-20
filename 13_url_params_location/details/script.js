async function ferchCharacter(id) {
    const url = `https://thronesapi.com/api/v2/Characters/${id}`;

    try {
        const response = await fetch(url);
        if(!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getCharacter() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("id");    
    
    if(id === null) {
        window.location = "/";
    }

    const character = await ferchCharacter(id);

    if(character === null) {
        window.location = "/";
    }

    const characterDetail = document.getElementById("characterDetail");
    characterDetail.innerHTML = `<h5>${character.fullName}</h5>
            <div>
                <img src="${character.imageUrl}" alt="${character.fullName}"/>
            </div>
            <div style="width: 800px;" class="mt-4">
                <div class="row">
                    <div class="col-3">ID:</div>
                    <div class="col-9">${character.id}</div>
                </div>
                <div class="row">
                    <div class="col-3">First Name:</div>
                    <div class="col-9">${character.firstName}</div>
                </div>
                <div class="row">
                    <div class="col-3">Last Name:</div>
                    <div class="col-9">${character.lastName}</div>
                </div>
                <div class="row">
                    <div class="col-3">Full Name:</div>
                    <div class="col-9">${character.fullName}</div>
                </div>
                <div class="row">
                    <div class="col-3">Title:</div>
                    <div class="col-9">${character.title}</div>
                </div>
                <div class="row">
                    <div class="col-3">Family:</div>
                    <div class="col-9">${character.family}</div>
                </div>
                <div class="row">
                    <div class="col-3">Image:</div>
                    <div class="col-9">${character.image}</div>
                </div>
                <div class="row">
                    <div class="col-3">Image URL:</div>
                    <div class="col-9">${character.imageUrl}</div>
                </div>
            </div>`;
}

getCharacter();