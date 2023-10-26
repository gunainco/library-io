
import './App.css';

function App() {

  let myLibrary = [];
  
 
  function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  
  function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
  
    if (!isBookInLibrary(book)) {
      myLibrary.push(book);
    }
  
    displayBooksOnPage();
  }
  
  function isBookInLibrary(book) {
    return myLibrary.some((b) => (
      b.title === book.title &&
      b.author === book.author &&
      b.pages === book.pages &&
      b.read === book.read
    ));
  }
  
  function displayBooksOnPage() {
    const books = document.querySelector(".books");
  
    books.innerHTML = ""; 
  
    myLibrary.forEach((book, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      books.appendChild(card);
  
      let delbtn = document.createElement("button");
      delbtn.textContent = `Remove book`;
      card.appendChild(delbtn);
  
      delbtn.setAttribute("data-index", index);
  
      delbtn.addEventListener("click", removeCard);
  
      for (let key in book) {
        const para = document.createElement("p");
        para.textContent = `${key} : ${book[key]}`;
        card.appendChild(para);
      }
    });
  }
  
  function removeCard(event) {
    const index = event.target.getAttribute("data-index");
    myLibrary.splice(index, 1);
    displayBooksOnPage();
  }
  
  const addBookButton = document.querySelector(".add-book-button");
  addBookButton.addEventListener("click", displayForm);
  
  function displayForm() {
    document.getElementById("add-book-form").style.display = "block";
    addBookButton.style.display = "none";
  }
  
  const submitButton = document.querySelector(".submit-button");
  submitButton.addEventListener("click", userData);
  
  function userData() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;
  
    if (title === "" || author === "" || pages === "" || read === "") return;
  
    addBookToLibrary(title, author, pages, read);
  
    clearForm();
  }
  
  const clearButton = document.querySelector(".reset-button");
  clearButton.addEventListener("click", clearForm);
  
  function clearForm() {
    document.getElementById("add-book").reset();
  }
  displayBooksOnPage();
  
  return (
    <div className="main">
    <div className="container">
      <div className="form-heading">
        <h1>Library</h1>
      </div>
      <div className="books-heading"></div>
      <div className="form">
        <button className="add-book-button">Add New Book</button>
        <div id="add-book-form">
          <form id="add-book">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" />
            <label for="author">Author:</label>
            <input type="text" id="author" name="author" />
            <label for="pages">Pages:</label>
            <input type="text" id="pages" name="pages" />
            <label for="read">Read: </label>
            <input type="text" id="read" name="read" />
          </form>
          <button type="submit" className="submit-button">Add Book</button>
          <button type="reset" className="reset-button">Clear</button>
        </div>
      </div>
      <div className="books"></div>
    </div>
    
  </div>
  );
}

export default App;
