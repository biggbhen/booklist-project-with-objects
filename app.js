// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructor
function UI() {}

// add Book to List
UI.prototype.addBook = function (book) {
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
};

// show alert
UI.prototype.showAlert = function (message, className) {
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
};

// clear input fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// event listeners for addbook
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
    ui.showAlert('Book Added!', 'success');
    ui.clearFields();
  }

  e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
