function registerHandler(e) {
    e.preventDefault();
    const form = e.target;

    const data = {
        email: form["email"].value,
        username: form["username"].value,
        password: form["password"].value,
    };

    const isSuccess = validation(data);

    if (isSuccess) {
        saveUserEmail(data.email);
        saveUserName(data.username);
        readUserData();
        form.reset();
        console.log("Успішна реєстрація");
    } else {
        console.log("Помилка під час введеня даних");
    }
}

function loginHandler(e) {
    e.preventDefault();
    const form = e.target;

    const data = {
        email: form["email"].value,
        password: form["password"].value,
    };

    const isSuccess = validation(data);

    if (isSuccess) {

        console.log("Успішний вхід");
    } else {
        console.log("Помилка під час входу");
    }
}

function logout() {
    removeCookie("userEmail");
    readUserData();
}

function validation(data) {
    let isSuccess = true;

    if (data.email !== undefined) {
        isSuccess = !validateEmail(data.email) ? false : isSuccess;
    }
    if (data.username !== undefined) {
        isSuccess = !validateUsername(data.username) ? false : isSuccess;
    }
    if (data.password !== undefined) {
        isSuccess = !validatePassword(data.password) ? false : isSuccess;
    }

    const btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.disabled = !isSuccess;

    return isSuccess;
}

function fieldChangeHanlder(e) {
    const data = {};
    data[e.target.name] = e.target.value;
    validation(data);
}

function validateEmail(email) {
    const emailError = document.getElementById("errorEmail");
    emailError.innerText = "";

    const regex = /^[\w.-]+@[\w.-]+\.\w+$/;

    if (email.length === 0) {
        emailError.innerText = "Введіть електронну пошту";
        return false;
    } else if (!regex.test(email)) {
        emailError.innerText = "Невірний формат пошти";
        return false;
    }

    return true;
}

function validateUsername(username) {
    const usernameError = document.getElementById("errorUsername");
    usernameError.innerText = "";

    const regex = /^\w{4,}$/;

    if (username.length === 0) {
        usernameError.innerText = "Введіть ім'я користувача";
        return false;
    } else if (username.length < 4) {
        usernameError.innerText = "Мінімальна к-сть символів 4";
        return false;
    } else if (!regex.test(username)) {
        usernameError.innerText = "Ім'я повинне містити літери та цифри";
        return false;
    }
    return true;
}

function validatePassword(password) {
    const passwordError = document.getElementById("errorPassword");
    passwordError.innerText = "";

    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/;
    if (password.length < 8) {
        passwordError.innerText = "Пароль повинен містити мінімум 8 символів";
        return false;
    } else if (!regex.test(password)) {
        passwordError.innerText =
            "Пароль повинен мати 1 маленьку літеру, 1 велику літеру, 1 цифру та 1 символ";
        return false;
    }

    return true;
}

function saveUserEmail(email) {
    // "name=value; path=/; expires=date";

    document.cookie = `userEmail=${email}; path=/; expires=Fri, 13 Jun 2025 12:32:00 UTC`;
}

function setCookie(name, value, expires = null) {
    document.cookie = `${name}=${value}; path=/; expires=${
        expires ? expires : session
    }`;
}

function removeCookie(name) {
    document.cookie = `${name}=; path=/; expires=Thu, Jan 01 1970 00:00:00 UTC`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");

    for (const c of cookies) {
        const item = c.split("=");
        if (item[0] === name) {
            return item[1];
        }
    }

    return null;
}

function saveUserName(username) {
    // "name=value; path=/; expires=date";

    const expiresDate = new Date();
    expiresDate.setFullYear(expiresDate.getFullYear() + 1);

    setCookie("userName", username, expiresDate);
}

function printUserName() {
    const value = getCookie("userEmail");

    if (value) {
        console.log(value);
    } else {
        console.log("User not found");
    }
}

function removeUserEmail() {
    removeCookie("userEmail")
}

function readUserData() {
    const user = getCookie("userEmail");
    const auth = document.getElementById("auth");

    if(user) {
        auth.innerHTML = `<span>${user}</span>
        <button onclick="logout()" class="mx-2" style="background-color: lightcoral;">Logout</button>`
    } else {
        auth.innerHTML = 
        `<a href="/login/" class="m-2 btn btn-success">Увійти</a>
        <a href="/" class="m-2 btn btn-success">Зареєструватися</a>`;
    }
}

function redirectUser() {
    const user = getCookie("userName");
    if(user && window.location.pathname !== "/login/") {
        window.location = "/login/";
    }
}

printUserName();
readUserData();
redirectUser();
