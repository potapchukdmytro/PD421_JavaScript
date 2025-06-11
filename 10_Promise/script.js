function setRandomColor(alpha) {
    const box = document.getElementById("box");
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    box.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function onClickTimeoutHandler() {
    // setTimeout(callback, delay, args); викликає callback функцію із затримкою delay
    // delay - в мілісекундах
    // callback - функція яка буде викликана
    setTimeout(setRandomColor, 2000, 0.5);
}

function onClickIntervalHandler() {
    // setInterval(callback, interval, args); викликає callback функцію з вказаним інтервалом
    // interval - в мілісекундах
    // callback - функція яка буде викликана
    const id = setInterval(setRandomColor, 500, 1);
    const btnStop = document.getElementById("btnStopInterval");
    btnStop.addEventListener("click", () => clearInterval(id));
}

// Promise

// resolve - успішна відповідь
// reject - не успішна відповідь

function checkRole(role) {
    return new Promise((resolve, reject) => {
        if (role === "admin") {
            resolve("Доступ дозволено");
        } else {
            reject("У доступі відмовлено");
        }
    });
}

function checkRoleHandler() {
    const role = document.getElementById("role").value;
    checkRole(role)
        .then((result) => console.log(result)) // обробник успішної відповіді
        .catch((error) => console.error(error)) // обробник не успішної відповіді
        .finally(() => console.log("Визначення ролі"));
}

const users = [
    { id: 1, name: "Mike" },
    { id: 2, name: "Olga" },
    { id: 3, name: "Sasha" },
];

function findUserById(id) {
    return new Promise((resolve, reject) => {
        const user = users.find((u) => u.id === id);
        if (user) {
            resolve(user);
        } else {
            reject(`User with id '${id}' not found`);
        }
    });
}

// findUserById(2)
//     .then((user) => console.log(user))
//     .catch((error) => console.error(error));

// findUserById(4)
//     .then((user) => console.log(user))
//     .catch((error) => console.error(error));

function addUser(user) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((u) => u.id === user.id);
        if (index === -1) {
            users.push(user);
            return resolve("Користувач успішно доданий");
        } else {
            return reject(`Користувач з id ${user.id} вже існує`);
        }
    });
}

// async await
async function addNewUser() {
    try {
        const newUser = { id: 4, name: "Maksym" };
        const result = await addUser(newUser);
        console.log(result);
        console.log(users);
    } catch (error) {
        console.error(error);
    }

    try {
        const newUser2 = { id: 4, name: "Andriy" };
        const result2 = await addUser(newUser2);
        console.log(result2);
        console.log(users);
    } catch (error) {
        console.error(error);
    }
}

addNewUser();

function resizeImage(image) {
    let increase = false;
    setInterval(() => {
        if (image.width >= 1200) {
            increase = false;
        }
        if (image.width <= 600) {
            increase = true;
        }

        if (increase) {
            image.width = image.width + 1;
        } else {
            image.width = image.width - 1;
        }
    }, 1);
}

// лямбда як альтернатива function
function changeImageSizeHandler(e) {
    e.target.disabled = true;
    const image = document.getElementById("image");
    resizeImage(image);
}




const changeImageLambda = () => {
    const image = document.getElementById("image");
    resizeImage(image);
}