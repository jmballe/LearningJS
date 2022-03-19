const weather = new Weather('chivilcoy');


// weather.getLocation()
//     .then(results => {
//         console.log(results[0].lat);
//     })
//     .catch(err => console.log(err));

weather.getWeather()
    .then(results => {
        console.table(results.weather[0]);
    })
    .catch(err => console.log(err));