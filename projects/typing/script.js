const typingArray = [
    {
        name: 'airplane',
        img: '../memory/img/airplane.png'
    },
    {
        name: 'boat',
        img: '../memory/img/boat.png'
    },
    {
        name: 'car',
        img: '../memory/img/car.png'
    },
    {
        name: 'coins',
        img: '../memory/img/coins.png'
    },
    {
        name: 'dog',
        img: '../memory/img/dog.png'
    },
    {
        name: 'elephant',
        img: '../memory/img/elephant.png'
    },
    {
        name: 'k-state',
        img: '../memory/img/emaw.png'
    },
    {
        name: 'fish',
        img: '../memory/img/fish.png'
    },
    {
        name: 'flower',
        img: '../memory/img/flower.png'
    },
    {
        name: 'house',
        img: '../memory/img/house.png'
    },
    {
        name: 'rainbow',
        img: '../memory/img/rainbow.png'
    },
    {
        name: 'tree',
        img: '../memory/img/tree.png'
    }
]

// Event listener to check if it is already solved
document.getElementsByClassName("typing")[0].addEventListener("click", () => {
    if(document.getElementById("result").textContent !== "") {
        setupNewGame();
    }
})

// Initialize game
setupNewGame();

function setupNewGame(){
    clearAll();
    let label = addImage(); 

    addSolution(label);
    addUserInput(label);  

    document.getElementById("u0").focus();
}

function addSolution(label){     
    let parent = document.getElementById("solution");
    addTextBoxes(parent, label.length)

    for(let i = 0; i < label.length; i++){ 
        let x = parent.children[i];
        x.value = label.substring(i,i + 1).toUpperCase();
        x.classList.add("solved");
        x.readOnly = true;
        x.id = "s" + i;
    }
}

function addUserInput(label){
    let parent = document.getElementById("user-input")  

    addTextBoxes(parent, label.length)
    
    for(let i = 0; i < label.length; i++){ 
        let x = parent.children[i];       
        x.id = "u" + i;
        x.addEventListener("input", inputEdit)
    }
}

function addTextBoxes(parent, cnt){
    let template = document.getElementById("inputElement");
    for(let i = 0; i < cnt; i++){
        let x = template.content.cloneNode(true);  
        parent.appendChild(x);
    }
}

function addImage(){
    let item = getArrayItem();

    const elem = document.createElement('img');
    elem.src = item.img;
    document.getElementById("item-img").appendChild(elem);

    return item.name;
}

function getArrayItem(){
    let i = Math.floor(Math.random() * typingArray.length);
    return typingArray[i];
}

function clearAll(){
    document.getElementById("result").textContent = "";
    clearChildren(document.getElementById("item-img"))
    clearChildren(document.getElementById("solution"))
    clearChildren(document.getElementById("user-input"))
}

function clearChildren(elem){
    while(elem.children.length > 0){
        let x = elem.children[0];
        x.removeEventListener("input", inputEdit); 
        x.remove();
    }
}


function inputEdit(e){           
    let i = parseInt(e.target.id.substring(1));
    
    let valid = false;
    if(document.getElementById("s" + i).value.toLowerCase() === e.target.value.toLowerCase()){
        e.target.classList.add("solved");
        e.target.classList.remove("wrong");    
        e.target.readOnly = true;
        valid = true;
    } else if(e.target.value === ""){
        e.target.classList.remove("wrong");
    } else {
        if(!e.target.classList.contains("wrong")) e.target.classList.add("wrong"); 
    }
    
    let inputs = document.getElementById("user-input").children;
    
    for(let i = 0; i < inputs.length; i++){
        if(!inputs[i].classList.contains("solved")){
            if(valid) inputs[i].focus();
            return;
        }
    }
        
    document.getElementById("result").focus();    
    document.getElementById("result").textContent = "YOU DID IT!!!!";
}