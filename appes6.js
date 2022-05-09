class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // add Book to List
  addBook(book) {
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    // console.log(row);
    // insert cols
    row.innerHTML = `
 <td>${book.title}</td>
 <td>${book.author}</td>
 <td>${book.isbn}</td>
 <td><a href='#' class = 'delete' >X</a></td>
 `;
    list.appendChild(row);
  }

  // show alert
  showAlert(message, className) {
    // create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container'),
      form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // timeout for 3sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  // clear input fields
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

class store {
  static getbooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBooks(book) {
    const books = store.getbooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static displayBooks() {
    const books = store.getbooks();
    books.forEach((book) => {
      const ui = new UI();
      ui.addBook(book);
    });
  }

  static removeBooks(isbn) {
    const books = store.getbooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', store.displayBooks());

document.getElementById('book-form').addEventListener('submit', function (e) {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  // instantiate the book object
  const book = new Book(title, author, isbn);
  // instantiate UI
  const ui = new UI();

  // validate UI
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('please fill in all fields', 'error');
  } else {
    ui.addBook(book);
    store.addBooks(book);
    ui.showAlert('Book Added!', 'success');
    ui.clearFields();
  }

  e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
