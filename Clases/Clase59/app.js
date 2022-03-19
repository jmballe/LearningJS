document.getElementById('button1').addEventListener('click', loadData);

function loadData() {
    //Create an xhr Object
    const xhr = new XMLHttpRequest();

    //Open the
    xhr.open('GET','data.txt', true);

    xhr.onload = function () {
        if (this.status === 200) {
            console.log(this.responseText);
            document.getElementById('output').innerHTML = `<h3>${this.responseText}</h3>`
        }
    }

    xhr.send();

    //HTTP STATUSES
    //200: ok
    //403 Forbiden
    //404 not found
}