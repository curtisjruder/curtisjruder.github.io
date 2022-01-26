function setInitialMode(){
    let mode = localStorage.getItem("lightMode")
    if(mode === null) mode = sessionStorage.getItem("lightMode");
    if(mode === null || mode === "off") return

    let cssItm = document.createElement("link");
    cssItm.type="text/css";
    cssItm.rel = "stylesheet";
    cssItm.href = "/css/light.css"
    cssItm.id = "light-mode-css"
    
    document.head.appendChild(cssItm);   
}

setInitialMode();