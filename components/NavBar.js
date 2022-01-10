class NavBar extends HTMLElement{
    constructor(){
        super();     
    }

    connectedCallback() {  
        this.innerHTML = this.getHTML();
        this.querySelector(".menu-btn").addEventListener("click", (e) => {
            e.currentTarget.classList.toggle("open")
            this.querySelector("nav").classList.toggle("open")
        }, false)
    }

    

    getHTML(){
        return `
        <div class="menu">
            <div class="name">
                <a href="./index.html">
                    <img src="./images/growth.png" alt="Icon representing growth">
                    <h2>Curtis Ruder</h2>
                </a>
            </div>
            <div class="menu-btn">
                <div class="menu-btn__burger"></div>   
            </div>
        </div>
        <nav>              
            <ul>
                <li><a href="about.html">About</a></li>                    
                <li><a href="resume.html">Resume</a></li>                    
                <li><a href="projects.html">Projects</a></li>
                <li><a href="mailto:curtis@cjruder.net">Contact</a></li>
            </ul>
        </nav>
        `;
    }
}

customElements.define("nav-bar", NavBar);