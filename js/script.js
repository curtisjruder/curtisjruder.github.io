function checkPosition(){
    let winHeight = window.innerHeight;

    document.querySelectorAll(".fade-transition").forEach(element => {
        let eTop = element.getBoundingClientRect().top;
        let eBtm = element.getBoundingClientRect().bottom;


        if(isInWindow(winHeight, eTop, eBtm)){           
            element.classList.add("faded");
        }
        else{
            element.classList.remove("faded");
        }
    });
}

function isInWindow(winHeight, eTop, eBtm){
    if (eBtm < 0) return false;
    if (eTop > winHeight) return false
    return true;
}

window.addEventListener("scroll",checkPosition)
window.addEventListener("resize",checkPosition)

checkPosition();