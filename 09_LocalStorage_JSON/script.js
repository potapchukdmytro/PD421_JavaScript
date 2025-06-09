function registerHandler(e) {
    e.preventDefault()
    const form = e.target;

    const data = {
        firstName: form["firstName"].value,
        lastName: form["lastName"].value,
        userName: form["userName"].value,
        email: form["email"].value,
        password: form["password"].value
    }

    // local storage
    // localStorage.setItem("key", "value") - записати у local storage
    // const value = localStorage.getItem("key") - отримати значення по ключу
    // localStorage.removeItem("key") - видалити значення по ключу

    
    // JSON
    // const json = JSON.stringify(obj); - перетворює об'єкт у JSON
    // const obj = JSON.parse(json); - перетворює JSON у об'єкт

    const jsonData = JSON.stringify(data);
    localStorage.setItem("user", jsonData);
}