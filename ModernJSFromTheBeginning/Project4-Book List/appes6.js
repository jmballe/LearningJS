// book constructor
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// ui constructor
class UI {
    //Add book to list
    addBookToList(book) {
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
    //Clear all form fields
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    // Show error message
    showAlert(message, className) {
        const div = document.createElement('div');
        //add classes
        div.className = `alert ${className}`;
        //append text
        div.appendChild(document.createTextNode(message));
        //Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.getElementById('book-form');
        //Insert alert message
        container.insertBefore(div, form);
        //timeOut after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    //Delete book from list
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
            //Return true after element removed
            return true;
        }
    }
}

//Store class
class Store {
    static fetchBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks() {
        const books = Store.fetchBooks();
    
        books.forEach(function(book){
          const ui  = new UI;
    
          // Add book to UI
          ui.addBookToList(book);
        });
      }

    static addBook(book) {
        const books = Store.fetchBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.fetchBooks();
        
        books.forEach((book, index) => {
                if (book.isbn === isbn) {
                    books.splice(index, 1);
                }
            });
        
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
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

        //Add to localStorage
        Store.addBook(book);

        //Show added
        ui.showAlert('Book added', 'success');

        //Clear form fields
        ui.clearFields();
    }

    e.preventDefault();
})

// Delete event listener
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    if (ui.deleteBook(e.target)) {
        ui.showAlert('Book removed', 'success')
        // remove from localStorage
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    };

    e.preventDefault();
})