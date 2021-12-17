document.querySelector('#submitBtn').addEventListener('click', submit)
let n=0;

function submit(){

    //create div for tasks section
    let div = document.createElement('div');
    div.setAttribute('class',`task${n} editable${n}`)
    document.querySelector('#description').appendChild(div);
    //create checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = document.querySelector('#taskInput').value;
    div.appendChild(checkbox);
    //create label for checkbox
    let label = document.createElement('label');
    label.setAttribute('for',checkbox.id);
    label.innerText = checkbox.id; 
    div.appendChild(label);

    //create div for due date section
    let divDate = document.createElement('div');
    divDate.setAttribute('class',`task${n} editable${n}`)
    document.querySelector('#displayDate').appendChild(divDate);
    //add due date
    if(document.querySelector('#dueDate').value !== ""){
        let dueDate = document.querySelector('#dueDate').value;
        divDate.append(dueDate);
    } else {
        let dueDate = 'No Due Date Selected'
        divDate.append(dueDate);
    }

    //create button for edit
    let editBtn = document.createElement('button');
    editBtn.setAttribute('class',`task${n} editable${n}`)
    editBtn.innerHTML = 'Edit'
    document.body.appendChild(editBtn);
    editBtn.addEventListener('click', edit)
    //create button for delete
    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class',`task${n}`)
    deleteBtn.innerHTML = 'Delete'
    document.body.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', remove)

    n=n+1;
}

function remove(){
    let targetClass = this.className;
    let x = document.getElementsByClassName(`${targetClass}`); //get array of divs with same classname as button
    //run until all class with this classname is removed. Tried for loop doesnt work. Apparently getElementByClassName updates when stuff is removed so some things will get missed.
    //use while loop and run until everything is gone safer.
    while (x.length > 0){   
        x[0].remove()
    }
}
function edit(){
    let targetClass = this.className;
    let x = document.getElementsByClassName(`${targetClass}`); //get array of divs with same classname as button
    for(let i=0; i<x.length-1; i++){ //length - 1 so the edit button cant be changed
        x[i].setAttribute('contenteditable','true')
    }
    x[x.length-1].innerText = "Done Edit"  //manually changing edit button
    x[x.length-1].addEventListener('click', doneEdit)
}
function doneEdit(){
    let targetClass = this.className;
    let x = document.getElementsByClassName(`${targetClass}`); //get array of divs with same classname as button
    for(let i=0; i<x.length-1; i++){
        x[i].setAttribute('contenteditable','false')
    }
    x[x.length-1].innerText = "Edit"
    x[x.length-1].removeEventListener('click', doneEdit) //have to remove event listener?? doesnt work if i dun remove
    x[x.length-1].addEventListener('click', edit)
}