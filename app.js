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
  console.log(row);
  // insert cols
  row.innerHTML = `
 <td>${book.title}</td>
 <td>${book.author}</td>
 <td>${book.isbn}</td>
 <td><a href='#'>X</a></td>
 `;
  list.appendChild(row);
};

// event listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  // instantiate the book object
  const book = new Book(title, author, isbn);
  // instantiate UI
  const ui = new UI();
  ui.addBook(book);
  // console.log(book);
  e.preventDefault();
});
