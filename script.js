const inputbox = document.getElementById("inputbox");
const search_btn = document.getElementById("searchbtn");
const main_img = document.getElementById("mainimg");
const cityN = document.getElementById("city");
const temprature = document.getElementById("temprature");
const description = document.getElementById("cloud-det");
const humidity = document.getElementById("humidity-percentage");
const wind = document.getElementById("wind-km");

const error_loc = document.querySelector(".location-not-found");
const detail = document.querySelector(".details");

async function getWeather(city) {
    const api_key = "a8f34bed41593bb56a7e32ab5ee0b8d1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === `404`) {
        error_loc.style.display = "flex";
        detail.style.display = "none";
        console.log("error occurs");
        return;
    }

    error_loc.style.display = "none";
    detail.style.display = "flex";
    cityN.innerHTML = `${weather_data.name}`;
    temprature.innerHTML = `${weather_data.main.temp}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed} Km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            main_img.src = "images/clouds.png";
            break;

        case 'Clear':
            main_img.src = "images/clear.png";
            break;

        case 'Rain':
            main_img.src = "images/rain.png";
            break;

        case 'Mist':
            main_img.src = "images/mist.png";
            break;

        case 'Snow':
            main_img.src = "images/snow.png";
            break;

        default:
            break;
    }
    console.log(weather_data);
}

search_btn.addEventListener("click", () => {
    getWeather(inputbox.value);
});