class Weather {
    constructor(city) {
        this.apiKey = '2bf8516310d226d1b34e336463efd896';
        this.city = city;
        // this.state = state;
        this.limit = 1;
    }
    
    //Get longitude and layitude from city name
    async getLocation() {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=${this.limit}&appid=${this.apiKey}`);

        const responseData = await response.json();

        return responseData;
    }

    async getWeather() {
        //Get location latitude and longitude
        const location = await this.getLocation()
            .then(results => {
                return results[0];
            })
            .catch(err => console.log(err));
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${this.apiKey}&units=metric`);

        const responseData = await response.json();

        return responseData;
    }

    changeLocation(city) {
        this.city = city;
    }
}