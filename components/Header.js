class Header extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback() {
        this.innerHTML = this.getHTML();
        this.querySelector("h1").innerText = this.getAttribute("name")   
    }

    getHTML(){
        return `                            
                <header>
                    <h1></h1>
                </header>
            `;
    }
}

customElements.define("header-comp", Header);