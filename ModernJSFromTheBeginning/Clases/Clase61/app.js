document.querySelector('.get-jokes').addEventListener('click', getJokes);

//Get jokes from api
function getJokes(e) {
    //Get number of jokes
    const number = document.querySelector('input[type=number]').value;

    const xhr = new XMLHttpRequest();
    //Open request to api
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            // console.log(response);
            // Variable to store html with fetched jokes
            let output = '';

            if (response.type === 'success') {
                response.value.forEach(function (elem) {
                    output += `
                    <li> ${elem.joke}</li>
                `
                });
            } else {
                output += '<li>Something went wrong</li>'
            }

            document.querySelector('.jokes').innerHTML = output;
        }
    }

    xhr.send();

    console.log(number);

    e.preventDefault();
}