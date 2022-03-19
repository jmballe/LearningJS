// book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// ui constructor
function UI() { }

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    // insert HTML cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `;

    list.appendChild(row);
}
//Clear all fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
// Show error message
UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //append text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    //Insert alert message
    container.insertBefore(div, form);
    //timeOut after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000)
}

UI.prototype.deleteBook = function (target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
        //Return true after element removed
        return true;
    }
}

// event listener
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get values from form
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    //Instance book
    const book = new Book(title, author, isbn);

    //Instantiate ui
    const ui = new UI();

    //validate
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //Add book to list
        ui.addBookToList(book);

        //Clear form fields
        ui.clearFields();
    }

    e.preventDefault();
})

// Delete event listener
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    if(ui.deleteBook(e.target)){
        ui.showAlert('Book removed','success')
    };
    
    e.preventDefault();
})