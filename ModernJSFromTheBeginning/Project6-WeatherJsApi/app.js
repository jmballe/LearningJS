//Instantiate storage
const storage = new Storage();

//Get stored location in local storage.
const storedWeatherLoc = storage.getLocationData();

//Instantiate weather
const weather = new Weather(storedWeatherLoc);

//Instantiate UI
const ui = new UI();

//Get weather on Dom load
document.addEventListener('DOMContentLoaded', getWeather)

//Change location event handler
document.getElementById('w-change-btn').addEventListener('click',(e) =>{
    const city = document.getElementById('city').value;
    //Change location
    weather.changeLocation(city);
    //Set location in local storage
    storage.setLocationData(city);
    //Get and display weather
    getWeather();

    //Close modal when click
    $('#locModal').modal('hide');
}
)
//Gets weather and display it
function getWeather(){
    weather.getWeather()
        .then(results => {
            ui.paint(results);
        })
        .catch(err => console.log(err));
}