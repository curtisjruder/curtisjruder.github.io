let minefield = [];
const gridSize = 10;

let toggleVisible = window.innerWidth < 1000;

// document.addEventListener('contextmenu', function(e) {e.preventDefault();});
setupNewGame();

function setupNewGame(){
    document.getElementById("result").textContent = "";
    if(toggleVisible){
        document.querySelectorAll(".instructions").forEach((itm)=> {itm.classList.add("hidden")})
    }
    else{
        document.querySelectorAll(".instructions").forEach((itm)=> {itm.classList.remove("hidden")})
    }

    clearGridCells()
    setupGridCells()
    generateSolution()            
}

function setupGridCells(){
    // Creates a grid based upon const gridSize and adds the appropriate event listeners
    var iMax = gridSize * gridSize;
    for(var i = 0; i < iMax; i++){
        let x = document.createElement("div");
        x.setAttribute('id', i)
        x.setAttribute('class','cell')
        x.textContent = ""
        x.addEventListener("mouseup",btnClick)
        x.addEventListener('contextmenu', function(e) {e.preventDefault();});
        document.getElementById("project-minesweeper").append(x);
    }
}

function clearGridCells(){           
    while(document.getElementsByClassName('cell').length > 0)
    document.getElementsByClassName('cell')[0].remove()
}



function generateSolution(){
    var cnt = 0;
    var cellCnt = document.getElementsByClassName('cell').length;
    var maxCnt = Math.round((1+Math.random())*0.1*cellCnt);
    minefield = [];
    
    do{            
        var val = Math.floor((Math.random()*100));
        if(!hasLocation(val)){
            minefield.push(val)
            cnt++
        }                
    } while(cnt < maxCnt);
}

function btnClick(e){            
    if(isGameOver()){
        setupNewGame()
        return;
    }

    let leftClick = getLeftClick(e);
    
    if(leftClick){        
        if(document.getElementById(this.id).attributes["class"].value == 'cell possiblemine') return;
        cellClick(this.id);
    }
    else
        toggleColor(this.id);            
}

function getLeftClick(e){
    if(toggleVisible){
        return document.getElementById("selector-on").classList.contains("on");
    }
    else{
        return (e.which && e.which == 1) || (e.button && e.button == 0);
    }
}

function toggleColor(id){
    let x = document.getElementById(id)    

    if(x.classList.contains("possiblemine")){
        x.classList.remove("possiblemine")
        x.textContent = ""
    }
    else if(x.textContent === ""){
        x.classList.add("possiblemine")
        x.textContent = "X"
    }
}


function cellClick(i){            
    if(hasLocation(i)){
        document.getElementById("result").textContent = "You Lose!"
        fillSolution();
    }                
    else{
        checkNeighborhood(i);
        checkIfComplete();
    }
}

function checkIfComplete(){
    var iMax = gridSize * gridSize;
    for(var i = 0; i < iMax; i++)
        if(isInitialValue(i) && !hasLocation(i)) return;
      
    fillSolution("cell possiblemine")
    document.getElementById("result").textContent = "WINNER!!!";
}

function isGameOver(){
    return document.getElementById("result").textContent !== "";
}

function hasLocation(xKey){
    for(i=0; i < minefield.length; i++)
        if(minefield[i] == xKey) return true

    return false;
}

function fillSolution(classVal = "cell mine"){            
    for(i=0; i < minefield.length; i++)
    {
        let x = document.getElementById(minefield[i])
        x.textContent = "X"
        x.setAttribute('class',classVal)
    }
}

function checkNeighborhood(id){
    let xCell = document.getElementById(id)
    var iR = Math.floor(id / gridSize);
    var iSt = Math.max(iR - 1, 0);
    var iEnd = Math.min(iR + 1, gridSize -1);

    var iC = id % gridSize;
    var jSt = Math.max(iC - 1, 0);
    var jEnd = Math.min(iC + 1, gridSize-1);

    var cnt = 0;
    for(var i=iSt; i <=iEnd;i++)
        for(var j = jSt; j <= jEnd; j++)
            if (hasLocation(i * gridSize + j)) cnt++;

    if(cnt == 0){
        xCell.classList.add("clearedmine")
        xCell.textContent="*";
        for(var i=iSt; i <=iEnd;i++)
            for(var j = jSt; j <= jEnd; j++)
                if (isInitialValue(i*gridSize+j)) checkNeighborhood(i*gridSize+j);
    }
    else if(isInitialValue(id)){
        xCell.textContent = cnt;
    }            
}

function isInitialValue(id){
    let x = document.getElementById(id);

    if (x.textContent == '') return true;
    return false;
}     


document.querySelector(".selector").addEventListener("click", (event) => {
    document.querySelectorAll(".toggle").forEach((itm) => {itm.classList.toggle("on")})
})

window.addEventListener("resize", ()=>{
    toggleVisible = window.innerWidth < 1000;
})