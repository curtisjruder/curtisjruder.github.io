const wordArray = [
    // "- ch -",
    // "- ee -",
    // "- er -",
    // "- oo -",
    // "- qu -",
    // "- sh -",
    // "- st -",
    // "- th -",
    // "- wh -",
    "a",
    "all",
    "am",
    "an",
    "and",
    "are",
    "at",
    "be",
    "best",
    "but",
    "can",
    "come",
    "could",
    "dad",
    "do",
    "for",
    "from",
    "go",
    "had",
    "has",
    "have",
    "he",
    "her",
    "here",
    "him",
    "how",
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
    "mother",
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
    "try",
    "up",
    "we",
    "what",
    "when",
    "where",
    "who",
    "why",
    "would",
    "yes",
    "you",
    "your"    
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