const roster = new Map()

// Save roster mapping
set_roster()
function set_roster(){ 
    roster.clear()  
    
    roster.set("Aarav", 1)
    roster.set("Amari", 3)
    roster.set("Arthur", 3)
    roster.set("Austin", 4)
    roster.set("Finley 🏀", 1)
    roster.set("Jack", 6)
    roster.set("John", 2)
    roster.set("Maxson 🏀", 2)
    roster.set("Royce", 5)
    roster.set("Warren", 6)
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
    set_roster()
    reset_classlist('hidden')
    if(reset_classlist('player-in') > 0) return
    set_active_players()
    set_line_ups()

    let line_up = get_line_up()
    print_line_up(line_up)    
}

function reset_classlist(className){
    let itms = document.querySelectorAll('table .' + className)

    for(let i = 0; i < itms.length; i++){
        itms[i].classList.remove(className)
    }

    return itms.length
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
        if(!x.checked){
            roster.delete(x.name)
            let  blah = document.getElementById(x.name)
            blah.classList.add('hidden')
        }            
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
        // console.log(key + " | " + line_up)
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
    tr.setAttribute('id', label)

    td1 = document.createElement("th")
    td1.textContent = label
    td1.className = 'player'

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
        qtr.classList.add('qtr')
        if ((i % 2) == 0) qtr.classList.add('even')
        tr.appendChild(qtr)
    }

    return tr
}