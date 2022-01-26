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

document.querySelector(".lightmode").addEventListener("click", ()=>{
    document.querySelector(".lightmode").querySelectorAll("svg").forEach((itm) => {
        itm.classList.toggle("hidden")
    })

    let setting = isLightMode() ? "on" : "off";
    localStorage.setItem("light-mode",setting)

    checkColor();
})

function checkColor(){
    if(isLightMode()){
        if(document.getElementById("light-mode-css")) return;
        
        let cssItm = document.createElement("link");
        cssItm.type="text/css";
        cssItm.rel = "stylesheet";
        cssItm.href = "/css/light.css"
        cssItm.id = "light-mode-css"
        
        document.head.insertBefore(cssItm, document.getElementById("primary-css").nextSibling)
    }
    else{        
        let cssItm = document.getElementById("light-mode-css");
        if(cssItm) cssItm.remove();
    }        
}

setInitialMode();

function setInitialMode(){
    let mode = localStorage.getItem("light-mode")

    if(mode === null || mode === "off")
        document.getElementById("light-mode-on").classList.add("hidden");
    else
        document.getElementById("light-mode-off").classList.add("hidden");

    checkColor();
}

function isLightMode(){
    return document.getElementById("light-mode-off").classList.contains("hidden")
}