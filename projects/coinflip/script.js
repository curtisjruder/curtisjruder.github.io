let coin = document.getElementById("project-coin-flip");
let result = document.getElementById("project-label");

coin.addEventListener("click", () => {
    coin.className = "";
    
    setTimeout(()=>{
        result.textContent = "Coin Flip";

        if (Math.random() < 0.5) {
            coin.className = "flipHead";             
        } else {
            coin.className = "flipTail";
        }

        setTimeout(() => {                      
            result.textContent = (coin.className === "flipHead") ? "Heads!" : "Tails!";
        },1900)
    },100)
    
});