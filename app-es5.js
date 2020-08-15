//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor

function UI() {}

//Add book to the list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  //Create a tr
  const row = document.createElement('tr');
  //Add HTML
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>X</a></td>
  `;
  list.appendChild(row);
};
//Delte the Book

UI.prototype.deleteBook = (target) => {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

//Clearing the data
UI.prototype.clearValues = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

//Checking the validation
UI.prototype.checkValidation = function (book) {
  if (book.title === '' || book.author === '' || book.isbn === '') return false;
  else return true;
};

//Custome Alert

UI.prototype.alert = function (mgs, color) {
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  //creating an div element
  const alertMy = document.createElement('div');
  //Add HTML
  alertMy.innerHTML = `
    <div style="color: ${color}" class='alert'>${mgs}</div>
    `;
  //Append to the container
  container.insertBefore(alertMy, form);
  //Remove the alert after 3 sec

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
};

//Event Listeners for adding the book

const form = document.getElementById('book-form');
form.addEventListener('submit', function (e) {
  // get the form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
  // Intansiate the Book
  const book = new Book(title, author, isbn);
  //Instansiate UI
  const ui = new UI();

  //Validation
  if (ui.checkValidation(book)) {
    //Insert the book in UI
    ui.addBookToList(book);
    //Clear the input values
    ui.clearValues();
    //Giving success Alert
    ui.alert('Book Added successfully', 'green');
  } else {
    //Giving Error Alert
    ui.alert('Please check the values', 'red');
  }

  e.preventDefault();
});

//Event Listeners for adding the book

document.getElementById('book-list').addEventListener('click', (e) => {
  //Instansiate the UI
  const selectedTitle = e.target.parentElement.parentElement.querySelector('td')
    .textContent;

  const ui = new UI();
  if (e.target.className === 'delete') {
    if (confirm(`Are you sure you want to delete the book=${selectedTitle}`))
      ui.deleteBook(e.target);
    ui.alert('Book Deleted', 'red');
  }
  e.preventDefault();
});
