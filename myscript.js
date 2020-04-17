const bookshelf = document.querySelector("#bookshelf");
let changeReads = document.querySelectorAll(".changeRead");
let deleteBooks = document.querySelectorAll(".deleteBook");
const form = document.querySelector(".form")
const newBook = document.querySelector("#newBook");
const addBook = document.querySelector("#addBook");
const newTitle   = document.querySelector("#ftitle")
const newAuthor = document.querySelector("#fauthor")
const newPages = document.querySelector("#fpages")
const newRead = document.querySelector("#fread")


let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    let info = this.title + " by " + this.author + ", " +
        this.pages + " pages, ";

        if(this.read == true){
            info += "already read.";
        } else info += "not read yet.";

        return info;
  }


Book.prototype.updateRead = function(){
    console.log("will change read for: "+ this.info())
    if(this.read) {
        this.read = false;
    } else this.read = true;
}


//first three books
//we can push it directly or create a const and push the const
myLibrary.push(new Book("Percy Jackson","Rick Riordan", 500, true));

myLibrary.push(new Book("The Martian","Andy Weir", 400, true));

const book0 = new Book("Sapiens","Unknown", 550, false)
myLibrary.push(book0);






//setting up local Storage if available, the function is defined at the end...
let hasLocalStorage = true;

if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    console.log("has local storage")

    if(!localStorage.length) {
        console.log("empty, will save on storage myLibrary")
        setStorage();
      } else {
          console.log("already has data, will pull")
        getStorage();
      }
} else {
    // Too bad, no localStorage for us
    hasLocalStorage = false;
    console.log("does not have localStorage")
}

function setStorage(){
    let iLength = localStorage.length;
    //first we delete current localStorage
    for(i=0; i<iLength; i++){
        localStorage.removeItem(i);
    }

    // we update localStorage according to myLibrary
    myLibrary.forEach((e,index)=>{
        let bookString;
        if(e == undefined){
            bookString == undefined
        }else{
            bookString = e.title + "," +
                            e.author + "," +
                            e.pages + "," +
                            e.read;
        }
        
        localStorage.setItem(index,bookString)
    })

}

// Not needed finally
// function updateStorageCounter(){
//     const currentCounter = Number(localStorage.getItem("counter"));
//     storageCounter ++
//     localStorage.setItem("counter", storageCounter)
//     console.log(storageCounter);
// }

function getStorage(){
    myLibrary =[]
    let iLength = localStorage.length;
    for(i=0; i<iLength; i++){
        const arr = localStorage.getItem(i).split(",");
        myLibrary[i] = new Book(arr[0],arr[1],arr[2],arr[3])
        console.table(myLibrary);
    }
}

//calling the function render
render();

//click event for newBook button
newBook.onclick = function(e){ 
    console.log("clicked newBook")
    createForm();
}


//click event for addBook button
addBook.onclick = function (e){
    console.log("clicked addBook")
    addBookToLibrary();
}

//render books on the window
function render(){
    //If render is called, then we updated something on myLybrary
    //we have to send it to localStorage
    setStorage();


    //clear all books from div
    bookshelf.innerHTML = ""
    console.log("cleaned books")
    //create divs from myLibrary and append to parent

    console.log("will create and append following books:")
    console.table(myLibrary)
    myLibrary.forEach((element,index) => createDivsAndAppend(element,index));

    //Update buttons for new divs.
    updateButtons();
}

function createDivsAndAppend(element,index){
    //what we are recreating
/* <div class="book">
        <div>The Martian</div>
        <div>Andy Weir</div>
        <div>365 pages</div>
        <div id="read?">Already read!</div>
        <div class="extraButtons">
            <div>
                <button class="changeRead">Not read</button>
            </div>
            <div>
                <button class="deleteBook" title="0">Delete</button>
            </div>
            
        </div>
    </div> */
    if(element ==undefined || element.title == "undefined"){
        console.log("index " +index+ " is undefined. Skipping...")
        return;
    }

    //creating the divs and card from the book object
    const book = document.createElement("div");
    book.classList.add("book");
    const title = document.createElement("div");
    title.innerHTML = element.title
    const author = document.createElement("div");
    author.innerHTML = element.author
    const pages = document.createElement("div");
    pages.innerHTML = element.pages + " pages"
    const read = document.createElement("div");
    read.setAttribute('id', 'read' + index)
    if (element.read){
        read.innerHTML = "Already read!";
    } else read.innerHTML = "Not read yet!"
    const extraButtons = document.createElement("div");
    extraButtons.classList.add("extraButtons")
    const readButton = document.createElement("button");
    readButton.classList.add("changeRead");
    readButton.setAttribute("name", index)
    readButton.innerHTML = "Read?"
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteBook");
    deleteButton.setAttribute("title", index)
    deleteButton.innerHTML = "Delete"

    //appending

    //we could use append but it's still considered experimental
    //listElement.append(listItem,listItemCheckbox,listItemLabel,editButton)
    extraButtons.appendChild(readButton);
    extraButtons.appendChild(deleteButton);

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    book.appendChild(extraButtons);

    bookshelf.appendChild(book);

    console.log("Created: ");
    console.log(myLibrary[index]);

    //other DOM functionalities
    // winnerCall.textContent = 'Congratulations User, you won!';
    //   winnerCall.style.cssText = "background-color: green;";
    //   winnerDiv.appendChild(winnerCall);

    

}



function updateButtons(){
    //updating the array containing the buttons
    changeReads = document.querySelectorAll(".changeRead")
    deleteBooks = document.querySelectorAll(".deleteBook")

    //Create event for clicks
    changeReads.forEach(e => createReadClickEvent(e));
    deleteBooks.forEach(e => createDeleteClickEvent(e));

}


function createReadClickEvent(e){
    e.onclick = function(e){
        const idBtn = e.target.name;
        console.log("pressed read on:")
        console.log(myLibrary[idBtn]);
        myLibrary[idBtn].updateRead();
        render()
    }
}

function createDeleteClickEvent(e){
    e.onclick = function(e){
        const idBtn = e.target.title;
        console.log("will delete:");
        console.log(myLibrary[idBtn]);
        myLibrary[idBtn] = undefined;
        render();
    }
}





function addBookToLibrary() {
    // do stuff here
    myLibrary.push(new Book(newTitle.value, newAuthor.value, newPages.value, newRead.checked));
    render();
    hideForm();

  }


function createForm(){
    form.style.display = "block";
    addBook.style.display = "block";
    resetValues();

}

function hideForm(){
    console.log("object created, hiding form")
    form.style.display = "none";
    addBook.style.display = "none";


}

function resetValues(){
    newTitle.value = ""
    newAuthor.value = ""
    newPages.value = ""
    newRead.checked = ""
}


//not used but good to know if we need a reference.
// function deleteBook(book){
//     const index = comments.findIndex(comment => comment.id === 823423);
//     console.log(index);


//     // we can either do a splice or call undefined on the index
//     // we should do undefined as we will control the functionalities of
//     // each book through their ids and index
//     comments.splice(index,1)
//     console.log(comments)

// }


function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
