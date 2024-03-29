let puzzleSolution; // array[0-8][0-8]
let puzzleInitial; 

let board = document.getElementById("project-sudoku");

let solutionCount = 0;
let solutionCountMax = 0;


setupKeypad();
setupNewGame();

function setupNewGame(){
    document.getElementById("result").textContent = "";

    if(window.innerWidth < 1000) document.querySelectorAll(".instructions").forEach((itm)=> {itm.classList.add("hidden")});

    clearGridCells();
    setupMajorGrid();
    setupMinorGrid();     
    generateSolution();
    populateGrid();
}

function populateGrid(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let itm = document.getElementById("" + i + j)            
            if(puzzleInitial[i][j] !==0) {
                itm.classList.add("readonly")
                itm.value = puzzleInitial[i][j];
                itm.readOnly = true;                             
            }
            itm.addEventListener("click", inputClick) 
        }
    }
}

function inputClick(e){    
    if(document.getElementById("result").textContent !== "") {
        setupNewGame();
        return;
    }

   document.querySelectorAll("input").forEach((itm) => {
       if(itm.classList.contains("selected")) itm.classList.remove("selected");
   })

   let itm = e.target;
   if(!itm.classList.contains("readonly")) itm.classList.add("selected");
}

function keyPadClick(e){
    pushValueIntoPuzzle(parseInt(e.target.textContent));
}

function pushValueIntoPuzzle(val){
    let itm = document.querySelector(".selected");
    if(!itm) return;

    let i = parseInt(itm.id.substring(0,1))
    let j = parseInt(itm.id.substring(1,2))

    if(val == puzzleSolution[i][j]){
        itm.classList.remove("selected")
        itm.classList.add("readonly") 
        itm.value = val;       
        checkForWin();
    }
}

document.addEventListener("keyup", (e) =>{
    if(!Number(e.key)) return;

    let val = parseInt(e.key);
    if(val < 1 || val > 9) return;

    pushValueIntoPuzzle(val)  
})



function checkForWin(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){           
            if(document.getElementById("" + i + j).value != puzzleSolution[i][j]) return;
        }
    }

    let splash = document.getElementsByTagName("game-victory")[0]
    splash.dispatchEvent(new Event("winner"))
    
    document.getElementById("result").textContent = "YOU WIN!!!"
}


function clearGridCells(){           
    while(document.getElementsByTagName('input').length > 0){
        let x = document.getElementsByTagName('input')[0];
        x.removeEventListener("click", inputClick);  
        x.remove();
    }

    while(document.getElementsByClassName('inputGroup').length > 0){
        document.getElementsByClassName('inputGroup')[0].remove();
    }
}

function setupMajorGrid(){
    let template = document.getElementById("inputGroup");

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            let x = template.content.cloneNode(true);
            x.querySelector(".inputGroup").setAttribute('id', "g" + i + j)
            board.appendChild(x);
        }
    }
}

function setupMinorGrid(){
    let template = document.getElementById("inputElement");

    for(let i = 0; i < 9; i++){ 
        for(let j = 0; j < 9; j++){
            let x = template.content.cloneNode(true);        
            x.querySelector("input").setAttribute('id', "" + i + j)
            getMajorGridElement(i,j).appendChild(x);
        }        
    }
}

function setupKeypad(){
    let parent = document.getElementById("keypad")

    for(let i = 1; i < 10; i++){
        let key = document.createElement("div");
        key.textContent = i;
        key.classList.add("key-element");
        key.addEventListener("click", keyPadClick);
        parent.appendChild(key);
    }
}

function getMajorGridElement(i, j){
    return document.getElementById("g" + Math.floor(i/3) + Math.floor(j/3))
}

function getRand(start){
    return Math.floor(Math.random() * 9 + start);
}

function initializeSolutionGrid(){
    puzzleInitial = [];
    puzzleSolution = [];
    for(let i = 0; i < 9; i++){
        puzzleSolution.push([]);
        for(let j = 0; j < 9; j++){
            puzzleSolution[i].push(0)
        }        
    }
}

function generateSolution(){    
    let count = 0;

    do{        
        initializeSolutionGrid();     
        solutionCountMax = 0;
        solutionCount = 0;
        if(++count > 2) return;
    } while(!generateFullSolution())
        
    configInitialPuzzle();

    let limit = 18 // sets the difficulty.  Higher number = more difficult
    let remaining = 81;
    while(limit > 0 && remaining > 25){
        let val = canEliminateDataPoint(getRand(0), getRand(0));

        if(val < 0){
            limit--;
        }            
        else if(val > 0){
            remaining--;
        }            
    }

    // Confirm everything is good to go
    resetSolutionPuzzle();
    solutionCountMax = 0;
    solutionCount = 0;
    generateFullSolution();
}

function canEliminateDataPoint(i,j){
    let val = puzzleInitial[i][j];
    
    if(val === 0) return 0

    puzzleInitial[i][j] = 0;

    resetSolutionPuzzle();

    solutionCountMax = 2;
    solutionCount = 0;

    if(generateFullSolution()){
        // created scenario for 2 or more solutions; reset value
        puzzleInitial[i][j] = val;
        return -1;
    }

    // only one solution... which is what we want
    return 1;
}

function configInitialPuzzle(){
    puzzleInitial = [];
    for(let i = 0; i < 9; i++){
        puzzleInitial.push([]);
        for(let j = 0; j < 9; j++){
            puzzleInitial[i].push(puzzleSolution[i][j])
        }        
    }
}

function resetSolutionPuzzle(){
    puzzleSolution = [];
    for(let i = 0; i < 9; i++){
        puzzleSolution.push([]);
        for(let j = 0; j < 9; j++){
            puzzleSolution[i].push(puzzleInitial[i][j])
        }        
    }
}

function generateFullSolution(iSt = 0, jSt = 0){
    // Brute force solve of Sudoku    
    // Loop each row and column filling in 1 through 9 and then proceding to the next

    for(let i = iSt; i < 9; i++){
        for(let j = jSt; j < 9; j++){
            if(puzzleSolution[i][j] === 0){
                let rnd = getRand(1);
                for(let val = rnd; val < 9 + rnd; val++){                   
                   if (isValidValue(i,j,(val % 9) + 1)){                    
                        puzzleSolution[i][j] = (val % 9) + 1;                        
                        // Recursive call moving on to the next column
                        if(generateFullSolution(i,j+1)) return true;

                        // If not true, invalid solution.  reset value and move on
                        puzzleSolution[i][j] = 0;
                    }                   
                }
                return false;
            }
        }
        jSt = 0; // reset jSt since we got here through recursion
    }

    // only get here if I've arrived at i = 8 and j = 8 which means 
    // we found a valid solution!! WOO
    if (solutionCountMax === 0) return true
    solutionCount++;
    return (solutionCount === solutionCountMax)
}

function isValidValue(row,col,val){
    // check for duplicates in the row
    for(let j = 0; j < 9; j++)
        if(val === puzzleSolution[row][j] && j !== col) return false;

    // check for duplicates in the column
    for(let i = 0; i < 9; i++)
        if(val === puzzleSolution[i][col] && i !== row) return false;

    // check for duplicates in the block
    let iSt = Math.floor(row / 3) * 3;
    let jSt = Math.floor(col / 3) * 3;
    for(let i = iSt; i < (iSt + 3); i++){
        for(let j = jSt; j < (jSt + 3); j++){
            if(puzzleSolution[i][j] === val && (i !== row || j !== col)) return false;
        }
    }
    
    return true;
}
