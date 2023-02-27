const wordArray = [
    "all",
    "an",
    "and",
    "are",
    "at",
    "am",
    "be",
    "but",
    "can",
    "come",
    "Cora",
    "do",
    "dad",
    "for",
    "from",
    "go",
    "got",
    "had",
    "have",
    "he",
    "here",
    "in",
    "is",
    "it",
    "love",
    "like",
    "look",
    "me",
    "my",
    "mom",
    "no",
    "of",
    "on",
    "out",
    "said",
    "saw",
    "see",
    "she",
    "so",
    "the",
    "to",
    "up",
    "Warren",
    "we",
    "you"     
]

let i = wordArray.length

document.getElementById("result").textContent = "Remaining: " + i;

i = Math.floor(Math.random() * i);
document.getElementById("word").textContent = wordArray[i]

wordArray.splice(i, 1)

// Event listener
document.getElementById("correct").addEventListener("click", () =>{
    elemWord = document.getElementById("word")
    let i = wordArray.length
    
    if(i == 0){
        let splash = document.getElementsByTagName("game-victory")[0]
        splash.dispatchEvent(new Event("winner"))
        
        document.getElementById("result").textContent = ""
        document.getElementById("buttons").classList.add("hidden")
        document.getElementsByTagName("H1")[0].classList.add("hidden")
        elemWord.textContent = "WAY TO GO!!!!";        
    } else {
        document.getElementById("result").textContent = "Remaining: " + i;
        i = Math.floor(Math.random() * i);
        elemWord.textContent = wordArray[i]
        wordArray.splice(i, 1)
    }
})

document.getElementById("wrong").addEventListener("click", () =>{
    wordArray.push(document.getElementById("word").textContent)
    document.getElementById("correct").dispatchEvent(new Event("click"))
})