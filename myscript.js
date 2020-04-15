const bookshelf = document.querySelector("#bookshelf")
let changeReads = document.querySelectorAll(".changeRead")
let deleteBooks = document.querySelectorAll("deleteBook")


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

const book0 = new Book("Percy Jackson","Rick Riordan", 500, true)
myLibrary.push(book0);

const book1 = new Book("The Martian","Andy Weir", 400, true)
myLibrary.push(book1);

const book2 = new Book("Sapiens","Unknown", 550, false)
myLibrary.push(book2);


//calling the function render
render();



function render(){
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
    if(element ==undefined){
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
  }


function resetForm(){

}



function deleteBook(book){
    const index = comments.findIndex(comment => comment.id === 823423);
    console.log(index);


    // we can either do a splice or call undefined on the index
    // we should do undefined as we will control the functionalities of
    // each book through their ids and index
    comments.splice(index,1)
    console.log(comments)

}

