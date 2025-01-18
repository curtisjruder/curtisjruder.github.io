const math_reset = 5
let i = math_reset

// console.log(Math.floor(1.1))

let num1, num2, correct

function setMathProblem(){
    num1 = Math.floor(Math.random() * 31) + 10;
    num2 = Math.floor(Math.random() * (num1-5)) + 5;
    
    let operator = ""
    if(Math.floor(Math.random() * 2) == 0){
        correct = num1 + num2
        operator =  " + "; 
    } else {
        correct = num1 - num2
        operator =  " - ";
    }
    
    document.getElementById("mathproblem").textContent = num1 + operator + num2
    document.getElementById("mathanswer").value = ""
    document.getElementById("mathresult").textContent = "Remaining: " + i;
}

setMathProblem()

// Event listener
document.getElementById("correct").addEventListener("click", () =>{
    if(parseInt(document.getElementById("mathanswer").value) == correct){
        i--
    } else {
        i = math_reset
    }

    if(i == 0){
        let splash = document.getElementsByTagName("game-victory")[0]
        splash.dispatchEvent(new Event("winner"))

        document.getElementById("mathresult").textContent = ""
        document.getElementById("buttons").classList.add("hidden")
        document.getElementsByTagName("H1")[0].classList.add("hidden")
        
        elemWord.textContent = "WAY TO GO!!!!";
    } else {
      
        setMathProblem()
    }
})