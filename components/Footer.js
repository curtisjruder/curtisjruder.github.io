class Footer extends HTMLElement{
    constructor(){
        super();
    }
    
    connectedCallback() {
      this.innerHTML = this.getHTML();      
  }

    getHTML(){
        return `           
        <footer>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="resume.html">Resume</a></li>                    
            <li><a href="projects.html">Projects</a></li>
            <li><a href="mailto:curtis@cjruder.net">Contact</a></li>
          </ul>
          <ul class="social-row">
            <li><a href="https://github.com/curtisjruder"><i class="fab fa-github"></i></a></li>
            <li><a href="https://www.linkedin.com/in/curtis-ruder/"><i class="fab fa-linkedin"></i></a></li>
          </ul>
        </footer>
      `;
    }
}

customElements.define("footer-comp", Footer);