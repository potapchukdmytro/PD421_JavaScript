function registerHandler(e) {
    e.preventDefault();
    const form = e.target;

    const data = {
        email: form["email"].value,
        username: form["username"].value,
        password: form["password"].value
    }

    const isSuccess = validation(data);

    if (isSuccess) {
        console.log("Успішна реєстрація");
    } else {
        console.log("Помилка під час введеня даних");
    }
}

function validation(data) {
    let isSuccess = true;

    if(data.email !== undefined) {
        isSuccess = !validateEmail(data.email) ? false : isSuccess;
    }
    if(data.username !== undefined) {
        isSuccess = !validateUsername(data.username) ? false : isSuccess;
    }
    if(data.password !== undefined) {
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
    } else if(!regex.test(email)) {
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
    }else if(username.length < 4) {
        usernameError.innerText = "Мінімальна к-сть символів 4";
        return false;
    }else if (!regex.test(username)) {
        usernameError.innerText = "Ім'я повинне містити літери та цифри";
        return false;
    }
    return true;
}

function validatePassword(password) {
    const passwordError = document.getElementById("errorPassword");
    passwordError.innerText = "";

    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/;
    if(password.length < 8) {
        passwordError.innerText = "Пароль повинен містити мінімум 8 символів"
        return false
    }
    else if (!regex.test(password)) {
        passwordError.innerText = "Пароль повинен мати 1 маленьку літеру, 1 велику літеру, 1 цифру та 1 символ"
        return false;
    }

    return true;
}
