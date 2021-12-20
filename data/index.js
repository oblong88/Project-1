document.querySelector('#submitBtn').addEventListener('click', submit)
let n=0;
document.querySelector('#todayDate').innerHTML = `Today's Date: ${new Date().toDateString()}`
document.querySelector('form').addEventListener('submit',submit)
document.querySelector('#toggleForm').addEventListener('click',toggleForm)

function submit(event){
    event.preventDefault()
    if(document.querySelector('#taskInput').value === ''){
        alert('Please enter a task description') //throw alert if no description
    } else {
        //create checkbox with id = input text
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `id${n}`
        checkbox.setAttribute('class',`task${n}`)
        document.querySelector('.listContainer').appendChild(checkbox);

        //create label for checkbox
        let label = document.createElement('label');
        label.setAttribute('for',checkbox.id);
        label.setAttribute('class',`task${n}`)
        label.innerText = document.querySelector('#taskInput').value; 
        label.style.width = '100%'
        label.style.height = 'fit-content'
        label.style.justifySelf = 'center'
        label.style.alignSelf = 'center'
        label.style.wordBreak = 'break-all'
        label.style.fontSize = '18px'
        document.querySelector('.listContainer').appendChild(label);

        //create label for due date section
        let divDate = document.createElement('label');
        divDate.setAttribute('for',checkbox.id);
        divDate.setAttribute('class',`task${n}`)
        divDate.style.display = 'inline-block'
        divDate.style.width = '100%'
        divDate.style.textAlign = 'center'
        divDate.style.justifySelf = 'stretch'
        divDate.style.fontSize = '18px'
        divDate.style.height = '100%'
        document.querySelector('.listContainer').appendChild(divDate);
        //add due date
        if(document.querySelector('#dueDate').value !== ""){
            let dueDate = document.querySelector('#dueDate').value;
            divDate.append(dueDate);
        } else {
            let dueDate = 'No Due Date'
            divDate.append(dueDate);
        }
        //add mouseover for label and due date
        let mouseoverElems = [label, divDate]
        mouseoverElems.forEach((elems)=>{
            elems.addEventListener('mouseenter',()=>{
                label.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                divDate.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            })
            elems.addEventListener('mouseleave',()=>{
                label.style.backgroundColor = 'initial';
                divDate.style.backgroundColor = 'initial';
            })
        })
        class Button {
            constructor(innerHTML){
                let Btn = document.createElement('button');
                Btn.setAttribute('class',`task${n}`);
                Btn.innerHTML = innerHTML;
                document.querySelector('.listContainer').appendChild(Btn);
                Btn.style.color = 'rgb(255, 255, 255)';
                Btn.style.backgroundColor = 'rgba(0, 0, 0, 0.384)';
            }
        }
        new Button('Edit')
        let editBtn = document.getElementsByClassName(`task${n}`)[3];
        editBtn.addEventListener('click', edit)
        editBtn.addEventListener('mouseenter',()=>{editBtn.style.backgroundColor = 'rgb(14, 207, 14)';})
        editBtn.addEventListener('mouseleave',()=>{editBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.384)';})
        new Button('Delete')
        let deleteBtn = document.getElementsByClassName(`task${n}`)[4];
        deleteBtn.addEventListener('click', remove)
        deleteBtn.addEventListener('mouseenter',()=>{deleteBtn.style.backgroundColor = 'rgb(14, 207, 14)';})
        deleteBtn.addEventListener('mouseleave',()=>{deleteBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.384)';})

        n=n+1; //n increase by 1 for each new task added
        document.querySelector('#taskInput').value = null;
        document.querySelector('#dueDate').value = null;
    }
}
//function to toggle show/hide input area
function toggleForm(event){
    event.preventDefault();
    let form = document.querySelector('form')
    if(form.style.display !== 'none'){  
        form.style.display='none'
    } else{
        form.style.display='block'
    } 

}
//create function for delete
function remove(){
    let targetClass = this.className;
    let x = document.getElementsByClassName(`${targetClass}`); //get array of elements with same classname as button
    //run until all class with this classname is removed. Tried for loop doesnt work. Apparently getElementByClassName updates when stuff is removed so some things will get missed.
    //use while loop and run until everything is gone safer.
    while (x.length > 0){   
        x[0].remove()
    }
}
//create function for edit
function edit(){
    let targetClass = this.className;
    let x = document.getElementsByClassName(`${targetClass}`); //get array of elements with same classname as button
    for(let i=1; i<x.length-1; i++){ //i start at 1 to skip checkbox-------------length - 1 so the edit button cant be changed
        x[i].setAttribute('contenteditable','true')
    }
    x[0].disabled = true; //disable checkbox while edit mode on
    x[x.length-2].innerText = "Done"  //manually changing text in edit button
    x[x.length-2].addEventListener('click', doneEdit)
}
//create function to complete edit
function doneEdit(){
    let targetClass = this.className;
    let x = document.getElementsByClassName(`${targetClass}`); //get array of elements with same classname as button
    for(let i=1; i<x.length-1; i++){
        x[i].setAttribute('contenteditable','false')
    }
    x[0].disabled = false;
    x[x.length-2].innerText = "Edit" //change text back to edit
    x[x.length-2].removeEventListener('click', doneEdit) //remove new event listener from button. 
}
//create function to update progress bar whenever window is clicked
window.addEventListener('click', updateProgressBar)
function updateProgressBar (){
    //getting width of background bar from css computed size
    let progressBar = document.querySelector('#progressBarContainer');
    let compStyle = window.getComputedStyle(progressBar);
    //get tasks shown on page and tasks checked
    let tasksCompleted = document.querySelectorAll('.listContainer>input[type="checkbox"]:checked') //select all checked checkboxes in .listContainer
    let tasksShown = document.querySelectorAll('.listContainer>label').length/2; //select all labels in .listContainer. 2 labels for each task
    //line-through task when checkbox is checked
    for (let count = 0; count<tasksCompleted.length;count++){ 
        let targetClass = tasksCompleted[count].className;
        let x = document.getElementsByClassName(`${targetClass}`)
        for(let n=0; n<x.length; n++){ 
            x[n].style.textDecoration = 'line-through rgba(0, 255, 0, 1) 2px'
            x[n].style.color = 'rgba(0, 255, 0, 1)'
        }
    }
    //remove line-through task when checkbox is checked
    let tasksUncompleted = document.querySelectorAll('.listContainer>input[type="checkbox"]:not(:checked)')
    for (let count = 0; count<tasksUncompleted.length;count++){
        let targetClass = tasksUncompleted[count].className;
        let x = document.getElementsByClassName(`${targetClass}`)
        for(let n=0; n<x.length; n++){ 
            x[n].style.textDecoration = 'initial'
            x[n].style.color = 'inherit'
        }
    }
    //count hidden tasks for display
    let tasksHidden = 0;
    let progress = tasksCompleted.length/tasksShown*parseInt(compStyle.width); //progressbar size
    for (let count = 0; count<tasksCompleted.length;count++){ //loop through checked tasks and see if any are display:none, if yes +1 to tasksHidden
        if (tasksCompleted[count].style.display === 'none'){
            tasksHidden += 1;
        }
    }   
    document.querySelector('#progressBar').setAttribute('style',`width: ${progress}px`)
    document.querySelector('#progressBarText').innerHTML = `${tasksCompleted.length}/${tasksShown} Tasks Completed (${tasksHidden} Hidden)`
    document.querySelector('#hiddenTasks').innerHTML = `(${tasksHidden} Hidden Tasks)`
}
//2 possiblities to toggle thru. If no hidden tasks, hide whatever is checked.
//If there are hidden tasks, show all hidden tasks. DONT HIDE checked tasks which are not hidden.
let hidden = 0;
function toggleAll(){
    let tasksCompleted = document.querySelectorAll('.listContainer>input[type="checkbox"]:checked')
    if (hidden > 0){ //if anything hidden, show all
        for (let count = 0; count<tasksCompleted.length;count++){
            let targetClass = tasksCompleted[count].className;
            let x = document.getElementsByClassName(`${targetClass}`);
            for(let n=0; n<x.length; n++){ 
                x[n].style.display = 'block'
            }
            hidden = 0; //set hidden to 0 after showing all checked tasks
        }
    } else { //if nothing hidden run this
        for (let count = 0; count<tasksCompleted.length;count++){
            hidden += 1; //hidden +1 for every row that is hidden
            let targetClass = tasksCompleted[count].className;
            let x = document.getElementsByClassName(`${targetClass}`);
            for(let n=0; n<x.length; n++){ 
                x[n].style.display = 'none'
            }
        }
    }
}
//delete all checked tasks with confirmation
function deleteAllChecked(){
    if(confirm('Delete all completed tasks?')){
        let tasksCompleted = document.querySelectorAll('.listContainer>input[type="checkbox"]:checked');
        for (let i in tasksCompleted){
            let targetClass = tasksCompleted[i].className //get classname of all checked tasks
            let x = document.getElementsByClassName(`${targetClass}`) //target all elems with same classname
            while (x.length>0)
            x[0].remove()
        }
    }
}
function deleteAll(){
    if(confirm('Delete all tasks?')){
        let tasks = document.querySelectorAll('.listContainer>label');
        for (let i in tasks){
            let targetClass = tasks[i].className //get classname of all checked tasks
            let x = document.getElementsByClassName(`${targetClass}`) //target all elems with same classname
            while (x.length>0)
            x[0].remove()
        }
    }
}
