class UI {
    constructor(){
        this.location = document.getElementById("w-location");
        this.desc = document.getElementById("w-desc");
        this.temp = document.getElementById("w-string");
        this.icon = document.getElementById("w-icon");
        this.humidity = document.getElementById("w-humidity");
        this.dewpoint = document.getElementById("w-dewpoint");
        this.feelsLike = document.getElementById("w-feels-like");
        this.wind = document.getElementById("w-wind");
    }

    paint(weather){
        this.location.textContent = weather.name + ', ' + weather.sys.country;
        this.desc.textContent = weather.weather[0].description;
        this.temp.textContent = weather.main.temp + ' °C';
        this.icon.setAttribute('src',`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
        this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
        this.dewpoint.textContent = `Pressure: ${weather.main.pressure}Hpa`;
        this.feelsLike.textContent = `Feels like: ${weather.main.feels_like} °C`;
        this.wind.textContent = `Wind speed: ${weather.wind.speed} km/h`;
    }
}