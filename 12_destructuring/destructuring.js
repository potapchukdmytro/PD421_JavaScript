const main = {
    temp: 296.87,
    feels_like: 296.97,
    temp_min: 296.85,
    temp_max: 297.18,
    pressure: 1021,
    humidity: 64,
    sea_level: 1021,
    grnd_level: 955,
};

const weather = {
    coord: {
        lon: 10.99,
        lat: 44.34,
    },
    weather: [
        {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d",
        },
    ],
    base: "stations",
    main: {
        temp: 296.87,
        feels_like: 296.97,
        temp_min: 296.85,
        temp_max: 297.18,
        pressure: 1021,
        humidity: 64,
        sea_level: 1021,
        grnd_level: 955,
    },
    visibility: 10000,
    wind: {
        speed: 2.53,
        deg: 12,
        gust: 2.69,
    },
    clouds: {
        all: 3,
    },
    dt: 1750247999,
    sys: {
        type: 2,
        id: 2004688,
        country: "IT",
        sunrise: 1750217488,
        sunset: 1750273375,
    },
    timezone: 7200,
    id: 3163858,
    name: "Zocca",
    cod: 200,
};

function getTemp(data) {
    // const temp_max = data.temp_max;
    // const temp_min = data.temp_min;

    // деструктуризація
    const { temp_max, temp_min, temp } = data;

    const avg = (temp_max + temp_min) / 2;
    return {
        temp: temp,
        temp_max: temp_max,
        temp_min: temp_min,
        temp_avg: avg,
    };
}

function getWeather(data) {
    // деструктуризація вкладених об'єктів
    const {
        main: { temp, pressure },
        wind: { speed },
    } = data;

    return {
        temp: temp,
        pressure: pressure,
        windSpeed: speed,
    };
}

// console.log(getTemp(main));
//console.log(getWeather(weather));

// деструктуризація масивів
function arrayDestructuring() {
    const arr = [3, 65, 87, 23, 2, 5, 7, 9, 56, 34, 7, 904, 6];
    const data = [1, "Sunday"];

    const [key, value] = data;

    const [fist, second] = arr;
    const [a, b, c, d, e, f, g] = arr;

    console.log(fist);
    console.log(second);
}

// arrayDestructuring();

// оператор ...

// arrays

function arraySpread() {
    const arr1 = [1, 2, 3, 4];
    // const arr2 = [ arr1[0], arr1[1], arr1[2], arr1[3] ];
    const arr2 = [...arr1];

    arr2[2] = 100;
    arr1[0] = 999;

    const arr3 = [...arr2, ...arr1];

    console.log("arr1", arr1);
    console.log("arr2", arr2);
    console.log("arr3", arr3);

    console.log(...arr1);

    const workDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const weekDays = [...workDays, "Saturday", "Sunday"];
    console.log(weekDays);

    let colors = ["reg", "green", "blue"];
    colors = [...colors, "white", "black"];

    console.log(colors);
}

// arraySpread();

function objectSpread() {
    const obj1 = {
        id: 1,
        data: 2,
        type: "number",
    };

    const obj2 = { ...obj1 };

    const engine = {
        volume: 1.8,
        format: "V8",
    };

    const gearbox = {
        type: "manual",
        gears: "5",
    };

    const car = { ...engine, ...gearbox };
    console.log(car);

    let user = {
        userName: "user",
        email: "user@gmail.com",
        firstName: "John",
        lastName: "Smith",
    };

    user = { ...user, phone: "1234567890" };

    const newPhone = "3593904683";
    console.log(user);
    const requestData = { ...user, phone: newPhone };
    console.log(requestData);
}

// objectSpread();
