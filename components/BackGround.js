class BackGround extends HTMLElement{
    constructor(){
        super();        
    }

    connectedCallback() {
        this.innerHTML = this.getHTML();

        const canvas = this.querySelector("#background");
        const ctx = canvas.getContext("2d");

        //canvas.width = window.innerWidth;
        //canvas.height = window.innerHeight;

        // Global variables
        let arcs = [];
        let rgb = "255, 255, 255"
        let arcCnt = Math.floor(Math.random() * 10) + 15;

        // Saves the pixel data as an arc.  Updates the position for each iteration
        class Arc {            
            constructor(){ 
                let val = Math.max(canvas.width, canvas.height)
                this.radius = Math.random() * val / 6 + val
                //this.radius = 300
                this.x = canvas.width*(Math.random() + .5);
                this.y = canvas.height * (Math.random()*.5 - 1.5);
                this.size = Math.floor(Math.random() * 4) + 1;
            }

            draw(){              
                let opacity = Math.random() * 0.8 + 0.2;
                //let opacity = 1;

                ctx.beginPath();
                ctx.lineWidth = this.size;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(" + rgb + "," + opacity + ")";
                ctx.stroke();
            }
        }

        function init() {
            // Set canvas size

            arcs = [];
          
            for(let i = 0; i < arcCnt; i++){                
                    new Arc().draw();          
            }
        }
  
        init();
    }

    getHTML(){
       return `<canvas id="background"></canvas>`;            
    }
}

customElements.define("back-ground", BackGround);