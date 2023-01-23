const wordArray = [
    "- ch -",
    "- ee -",
    "- er -",
    "- oo -",
    "- qu -",
    "- sh -",
    "- st -",
    "- th -",
    "- wh -",
    "a",
    "all",
    "am",
    "and",
    "are",
    "at",
    "best",
    "best",
    "but",
    "can",
    "come",
    "dad",
    "do",
    "for",
    "from",
    "go",
    "had",
    "have",
    "her",
    "here",
    "I",
    "in",
    "is",
    "it",
    "like",
    "little",
    "look",
    "love",
    "me",
    "mom",
    "my",
    "no",
    "of",
    "on",
    "other",
    "run",
    "saw",
    "see",
    "she",
    "so",
    "stop",
    "the",
    "to",
    "up",
    "we",
    "what",
    "would",
    "yes",
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