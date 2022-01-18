const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);
const generateNewCard = (taskData) =>
    `
    <div class="col-sm-12 col-md-6 col-lg-4" ">
    <div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success" ><i class="fas fa-pencil-alt"></i></button>
    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
    </div>
    <div class="card-body">
    <img src="${taskData.imageUrl}" class="card-img-top" alt="...">
    <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
    <p class="card-text">${taskData.taskDescription}</p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
    </div>
    </div>
    </div>
    `;

const loadInitialCardData = () => {
//local storage to get tasky card data
 const getCardData  = localStorage.getItem("tasky");
//Convert to array of object
 const {cards} = JSON.parse(getCardData) ;

//loop over thoose array of task object and create HTML card then inject in Dom
 cards.map((cardObject) => {
     taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

     //update our globalStorage
     globalStore.push(cardObject);
 }
 )


};

//Delete Function 
const deleteCard = (event) => {
    event = window.event;
    const targetId = event.target.id;
    const tagname = event.target.tagName;
    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetId );
    localStorage.setItem("tasky",JSON.stringify({cards : globalStore}));


    if (tagname === "BUTTON") {
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);        
    }

};



let globalStore = [];
const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value
    }
    
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

    globalStore.push(taskData);
    localStorage.setItem("tasky",JSON.stringify({cards : globalStore}));

};
