//modal
const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-modal');

openModal.addEventListener('click', () => {
    modal.showModal();
})

//main logic
const bookCard = document.querySelector('.book-card');
const mainDiv = document.querySelector('.container');
let myLibrary = [];

if(bookCard === null) {
    const emptyLibrary = document.createElement('div')
    emptyLibrary.className = 'empty-library';
    emptyLibrary.textContent = 'No books in library';
    mainDiv.append(emptyLibrary);
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

Book.prototype.isRead = function(a) {
    if(this.read === true){
        this.read = false;
    } else {
        this.read = true;
    }
}

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.group(myLibrary);

    const emptyLibrary = document.querySelector('.empty-library');
    const getBookCard = document.querySelector('.book-card');

    if(getBookCard === null) {
        emptyLibrary.remove();
    }
    
    const newBookCard = document.createElement('div');
    const readBookSection = document.createElement('div');
    const readBookPara = document.createElement('p');
    const readBook = document.createElement('input');
    const deleteBook = document.createElement('span');
    const bookCardTitle = document.createElement('h3');
    const bookCardAuthor = document.createElement('p');
    const bookCardPages = document.createElement('p');

    readBookSection.className = 'read-book-section';

    readBookPara.className = 'read-book-para';
    readBookPara.textContent = 'Have you read the book?';
    readBookSection.append(readBookPara);

    readBook.className = 'read-book-btn btn';
    readBook.type = 'checkbox';
    if(read === true){
        readBook.checked = true;
    }
    readBook.dataset.id = `${myLibrary.length - 1}`;
    readBook.addEventListener('click', (e) => {
        newBook.isRead();
        if(newBook.read === true) {
            newBookCard.classList.add('read');
        } else {
            newBookCard.classList.remove('read');
        }
    })

    readBookSection.append(readBook);

    deleteBook.className = 'close';
    deleteBook.innerHTML = '&times;';
    deleteBook.addEventListener('click', (e) =>{
        let bookID = parseInt(newBookCard.id);
        myLibrary.splice(bookID, 1);
        deleteBook.parentNode.remove();
        if(getBookCard === null) {
            mainDiv.append(emptyLibrary);
        }
    })
    if(read === true){
        newBookCard.className = 'book-card read';
    } else {
        newBookCard.className = 'book-card';
    }
    newBookCard.id = `${myLibrary.length - 1}`;
    bookCardTitle.textContent = title;
    bookCardAuthor.textContent = author;
    bookCardPages.textContent = pages;
    newBookCard.append(bookCardTitle);
    newBookCard.append(bookCardAuthor);
    newBookCard.append(bookCardPages);
    newBookCard.append(readBookSection);
    newBookCard.append(deleteBook);
    mainDiv.append(newBookCard);
    } 


const newBook = document.querySelector('#book-form');

newBook.addEventListener('submit', (e) => {
    //e.preventDefault();

    addBookToLibrary(e.target.title.value, e.target.author.value, e.target.pages.value, e.target.read.checked);
    newBook.reset();
})

