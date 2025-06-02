function formEventHandler(e) {
    e.preventDefault(); // зупиняємо виконання форми
    const form = e.target;

    // варіант через id
    const userName = document.getElementById("userName").value;

    // варіант через name
    const userData = {
        userName: userName,
        email: form["email"].value,
        password: form["password"].value,
        search: form["search"].value,
        phone: form["phone"].value,
        number: form["number"].value,
    };

    const textColor = form["textColor"].value;
    console.log(textColor);

    const container = document.getElementById("userInfo");

    // const nameInfo = document.createElement("h2");
    // nameInfo.innerText = userData.userName;

    // const emailInfo  = document.createElement("h3");
    // emailInfo.innerText = userData.email;

    // const phoneInfo  = document.createElement("h3");
    // phoneInfo.innerText = userData.phone;

    // container.innerHTML = "";
    // container.appendChild(nameInfo);
    // container.appendChild(emailInfo);
    // container.appendChild(phoneInfo);

    // showPassword
    const showPassword = form["showPassword"].checked; // checked повертає true або false чи поставлена галочка у chekbox

    // radio buttons
    const radio = form["radioBtns"].value;
    container.style.fontWeight = "";
    container.style.fontStyle = "";
    container.style.fontSize = "1em";

    if (radio === "bold") {
        container.style.fontWeight = "bold";
    } else if (radio === "italic") {
        container.style.fontStyle = "italic";
    } else if (radio === "big") {
        container.style.fontSize = "1.5em";
    }

    container.innerHTML = `<span>Ім'я: ${userData.userName}</span><br>
    <span>Пошта: ${userData.email}</span><br>
    <span>Телефон: ${userData.phone}</span><br>`;

    if (showPassword) {
        container.innerHTML += `<span>Пароль: ${userData.password}</span>`;
    }

    container.style.color = textColor;
}


function uploadImageHandler(e) {
    const image = e.target.files[0];
    const previewImage = document.getElementById("previewImage");
    const url = URL.createObjectURL(image);
    previewImage.src = url;
    previewImage.hidden = false;
}