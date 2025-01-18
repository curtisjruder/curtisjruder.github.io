const roster = new Map()

// Save roster mapping
set_roster()
function set_roster(){ 
    roster.clear()  
    roster.set("14", 3)
    roster.set("15", 1)
    roster.set("16", 1)
    roster.set("17", 5)
    roster.set("18", 1)
    roster.set("19", 3)
    roster.set("21", 4)
    roster.set("28", 4)
    roster.set("29", 2)
    roster.set("30", 5)
}

// Add the deets to the webpage
print_roster()
function print_roster(){
    let btn = document.getElementById('calc')
    btn.addEventListener('click', calculate)

    let parent = document.getElementById("roster")

    for(let x of roster.keys()){
        parent.appendChild(get_row(x))
    }
}

function calculate(e){
    reset_classlist()
    set_roster()
    set_active_players()
    set_line_ups()

    let line_up = get_line_up()
    print_line_up(line_up)    
}

function reset_classlist(){
    let itms = document.querySelectorAll('.player-in')

    console.log(itms.length)
    for(let i = 0; i < itms.length; i++){
        itms[i].classList.remove('player-in')
    }
}

function print_line_up(line_up){
    for(let q = 1; q <= 4; q++){
        for(let i = 0; i < 5; i++){ 
            let player = line_up[(q - 1) * 5 + i]
            itm = document.getElementById(q + '-' + player)
            itm.classList.add('player-in')
        }
    }
}

function get_line_up(){
    let max = 0
    let line_up = []

    for(let x of line_ups.values()){       
        let score = get_score(x)
        if(score > max){
            max = score
            line_up = x
        }
    }

    return line_up
}

function get_score(x){
    // let scores = []
    let sum = 0
    let min = Number.MAX_SAFE_INTEGER
    for(let i = 1; i <=4; i++){
        let score = get_score_by_period(x,i)
        min = Math.min(min, score)
        sum += score
    }
    
    return min + (sum / 4.0)
}

function get_score_by_period(x, period){
    let iX = (period - 1) * 5
    let sum = 0;
    for(let i = iX; i < (iX + 5); i++){
        sum += roster.get(x[i])
    }
    return sum
}

function set_line_ups(){
    line_ups.clear()
    if(roster.keys().length == 0) return

    let x = randomize(roster.keys())

    set_line_up(x)

    for(let x of line_ups.values()){
        // console.log(x)
        let len = x.length
        for(let i = len; i < 20; i++){
            x.push(x[i % len])
        }
    }
}


function set_active_players(){
    checks = document.getElementsByClassName('checkbox')
    for(let i = 0; i < checks.length; i++){
        let x = checks[i]
        if(!x.checked)
            roster.delete(x.name)
    }
}

function randomize(arr){
    let x = [...arr]
    let newx = []
    while(x.length > 0){
        let i = Math.floor(Math.random() * x.length)
        newx.push(x[i])
        x.splice(i, 1)
    }
    return newx
}

const line_ups = new Map()
function set_line_up(arr, line_up = []){
    
    line_up = [...line_up]

    if(arr.length == 1){
        line_up.push(arr[0])
        let key = get_key(line_up)
        if(line_ups.has(key)) return
        line_ups.set(key, line_up)
    }

    for(let i = 0; i < arr.length; i++){
        let mod_arr = [...arr]
        let mod_line_up = [...line_up]

        mod_line_up.push(arr[i])
        mod_arr.splice(i,1)
        set_line_up(mod_arr, mod_line_up)
    }
}

function get_key(line_up){
    strX = ""    
    for(let x of line_up){
        if(strX != "") strX += "|"
        strX += roster.get(x)
    }
    return strX
}

function get_row(label){
    tr = document.createElement("tr")
    td1 = document.createElement("th")
    td1.textContent = label

    td2 = document.createElement("td")
    td2.classList.add('check')

    input = document.createElement("input")
    input.setAttribute('type', 'checkbox')
    input.setAttribute('name', label)
    input.className = 'checkbox'

    td2.appendChild(input)

    tr.appendChild(td1)
    tr.appendChild(td2)

    for(let i = 1; i <= 4; i++){
        qtr = document.createElement("td")
        qtr.setAttribute('id', i + '-' + label)
        qtr.className ='qtr'
        tr.appendChild(qtr)
    }

    return tr
}





// let puzzleSolution; // array[0-8][0-8]
// let puzzleInitial; 

// let board = document.getElementById("project-sudoku");

// let solutionCount = 0;
// let solutionCountMax = 0;


// setupKeypad();
// setupNewGame();

// function setupNewGame(){
//     document.getElementById("result").textContent = "";

//     if(window.innerWidth < 1000) document.querySelectorAll(".instructions").forEach((itm)=> {itm.classList.add("hidden")});

//     clearGridCells();
//     setupMajorGrid();
//     setupMinorGrid();     
//     generateSolution();
//     populateGrid();
// }

// function populateGrid(){
//     for(let i = 0; i < 9; i++){
//         for(let j = 0; j < 9; j++){
//             let itm = document.getElementById("" + i + j)            
//             if(puzzleInitial[i][j] !==0) {
//                 itm.classList.add("readonly")
//                 itm.value = puzzleInitial[i][j];
//                 itm.readOnly = true;                             
//             }
//             itm.addEventListener("click", inputClick) 
//         }
//     }
// }

// function inputClick(e){    
//     if(document.getElementById("result").textContent !== "") {
//         setupNewGame();
//         return;
//     }

//    document.querySelectorAll("input").forEach((itm) => {
//        if(itm.classList.contains("selected")) itm.classList.remove("selected");
//    })

//    let itm = e.target;
//    if(!itm.classList.contains("readonly")) itm.classList.add("selected");
// }

// function keyPadClick(e){
//     pushValueIntoPuzzle(parseInt(e.target.textContent));
// }

// function pushValueIntoPuzzle(val){
//     let itm = document.querySelector(".selected");
//     if(!itm) return;

//     let i = parseInt(itm.id.substring(0,1))
//     let j = parseInt(itm.id.substring(1,2))

//     if(val == puzzleSolution[i][j]){
//         itm.classList.remove("selected")
//         itm.classList.add("readonly") 
//         itm.value = val;       
//         checkForWin();
//     }
// }

// document.addEventListener("keyup", (e) =>{
//     if(!Number(e.key)) return;

//     let val = parseInt(e.key);
//     if(val < 1 || val > 9) return;

//     pushValueIntoPuzzle(val)  
// })



// function checkForWin(){
//     for(let i = 0; i < 9; i++){
//         for(let j = 0; j < 9; j++){           
//             if(document.getElementById("" + i + j).value != puzzleSolution[i][j]) return;
//         }
//     }

//     let splash = document.getElementsByTagName("game-victory")[0]
//     splash.dispatchEvent(new Event("winner"))
    
//     document.getElementById("result").textContent = "YOU WIN!!!"
// }


// function clearGridCells(){           
//     while(document.getElementsByTagName('input').length > 0){
//         let x = document.getElementsByTagName('input')[0];
//         x.removeEventListener("click", inputClick);  
//         x.remove();
//     }

//     while(document.getElementsByClassName('inputGroup').length > 0){
//         document.getElementsByClassName('inputGroup')[0].remove();
//     }
// }

// function setupMajorGrid(){
//     let template = document.getElementById("inputGroup");

//     for(let i = 0; i < 3; i++){
//         for(let j = 0; j < 3; j++){
//             let x = template.content.cloneNode(true);
//             x.querySelector(".inputGroup").setAttribute('id', "g" + i + j)
//             board.appendChild(x);
//         }
//     }
// }

// function setupMinorGrid(){
//     let template = document.getElementById("inputElement");

//     for(let i = 0; i < 9; i++){ 
//         for(let j = 0; j < 9; j++){
//             let x = template.content.cloneNode(true);        
//             x.querySelector("input").setAttribute('id', "" + i + j)
//             getMajorGridElement(i,j).appendChild(x);
//         }        
//     }
// }

// function setupKeypad(){
//     let parent = document.getElementById("keypad")

//     for(let i = 1; i < 10; i++){
//         let key = document.createElement("div");
//         key.textContent = i;
//         key.classList.add("key-element");
//         key.addEventListener("click", keyPadClick);
//         parent.appendChild(key);
//     }
// }

// function getMajorGridElement(i, j){
//     return document.getElementById("g" + Math.floor(i/3) + Math.floor(j/3))
// }

// function getRand(start){
//     return Math.floor(Math.random() * 9 + start);
// }

// function initializeSolutionGrid(){
//     puzzleInitial = [];
//     puzzleSolution = [];
//     for(let i = 0; i < 9; i++){
//         puzzleSolution.push([]);
//         for(let j = 0; j < 9; j++){
//             puzzleSolution[i].push(0)
//         }        
//     }
// }

// function generateSolution(){    
//     let count = 0;

//     do{        
//         initializeSolutionGrid();     
//         solutionCountMax = 0;
//         solutionCount = 0;
//         if(++count > 2) return;
//     } while(!generateFullSolution())
        
//     configInitialPuzzle();

//     let limit = 18 // sets the difficulty.  Higher number = more difficult
//     let remaining = 81;
//     while(limit > 0 && remaining > 25){
//         let val = canEliminateDataPoint(getRand(0), getRand(0));

//         if(val < 0){
//             limit--;
//         }            
//         else if(val > 0){
//             remaining--;
//         }            
//     }

//     // Confirm everything is good to go
//     resetSolutionPuzzle();
//     solutionCountMax = 0;
//     solutionCount = 0;
//     generateFullSolution();
// }

// function canEliminateDataPoint(i,j){
//     let val = puzzleInitial[i][j];
    
//     if(val === 0) return 0

//     puzzleInitial[i][j] = 0;

//     resetSolutionPuzzle();

//     solutionCountMax = 2;
//     solutionCount = 0;

//     if(generateFullSolution()){
//         // created scenario for 2 or more solutions; reset value
//         puzzleInitial[i][j] = val;
//         return -1;
//     }

//     // only one solution... which is what we want
//     return 1;
// }

// function configInitialPuzzle(){
//     puzzleInitial = [];
//     for(let i = 0; i < 9; i++){
//         puzzleInitial.push([]);
//         for(let j = 0; j < 9; j++){
//             puzzleInitial[i].push(puzzleSolution[i][j])
//         }        
//     }
// }

// function resetSolutionPuzzle(){
//     puzzleSolution = [];
//     for(let i = 0; i < 9; i++){
//         puzzleSolution.push([]);
//         for(let j = 0; j < 9; j++){
//             puzzleSolution[i].push(puzzleInitial[i][j])
//         }        
//     }
// }

// function generateFullSolution(iSt = 0, jSt = 0){
//     // Brute force solve of Sudoku    
//     // Loop each row and column filling in 1 through 9 and then proceding to the next

//     for(let i = iSt; i < 9; i++){
//         for(let j = jSt; j < 9; j++){
//             if(puzzleSolution[i][j] === 0){
//                 let rnd = getRand(1);
//                 for(let val = rnd; val < 9 + rnd; val++){                   
//                    if (isValidValue(i,j,(val % 9) + 1)){                    
//                         puzzleSolution[i][j] = (val % 9) + 1;                        
//                         // Recursive call moving on to the next column
//                         if(generateFullSolution(i,j+1)) return true;

//                         // If not true, invalid solution.  reset value and move on
//                         puzzleSolution[i][j] = 0;
//                     }                   
//                 }
//                 return false;
//             }
//         }
//         jSt = 0; // reset jSt since we got here through recursion
//     }

//     // only get here if I've arrived at i = 8 and j = 8 which means 
//     // we found a valid solution!! WOO
//     if (solutionCountMax === 0) return true
//     solutionCount++;
//     return (solutionCount === solutionCountMax)
// }

// function isValidValue(row,col,val){
//     // check for duplicates in the row
//     for(let j = 0; j < 9; j++)
//         if(val === puzzleSolution[row][j] && j !== col) return false;

//     // check for duplicates in the column
//     for(let i = 0; i < 9; i++)
//         if(val === puzzleSolution[i][col] && i !== row) return false;

//     // check for duplicates in the block
//     let iSt = Math.floor(row / 3) * 3;
//     let jSt = Math.floor(col / 3) * 3;
//     for(let i = iSt; i < (iSt + 3); i++){
//         for(let j = jSt; j < (jSt + 3); j++){
//             if(puzzleSolution[i][j] === val && (i !== row || j !== col)) return false;
//         }
//     }
    
//     return true;
// }
