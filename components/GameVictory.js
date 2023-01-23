class GameVictory extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.getTemplate().content);
        this.classList.add("game-complete")
        this.addEventListener("winner", () =>{
            this.XconnectedCallback();
            if(this.classList.contains("game-complete")) this.classList.remove("game-complete")
            if(this.shadowRoot.getElementById("gamevictory")?.classList.contains("display-none")) this.shadowRoot.getElementById("gamevictory")?.classList.remove("display-none")
            setTimeout(()=>{this.classList.add("game-complete")},3500)
            setTimeout(()=>{
                this.shadowRoot.getElementById("gamevictory")?.classList.add("display-none")
            },3500) 
        })
        
    }

    XconnectedCallback(){
        //////////////////////////
        ///  Global Variables  ///
        //////////////////////////
            // Canvas stuff
            const canvas = this.shadowRoot.getElementById("gamevictory");   
            const ctx = canvas.getContext("2d");

            let colorX = window.getComputedStyle(this).getPropertyValue("color");
            const rgb = colorX.substring(5, colorX.length - 1)
            let colorBack = window.getComputedStyle(this).getPropertyValue("fill")
            canvas.style.backgroundColor = colorBack

            let size = 0
            let velocityX = 0;
            let velocityY = 0;

            // Color to use  
            const color = (opacity = 1) => {
                return "rgba(" + rgb + "," + opacity + ")"            
            }

            // Array used to track fireworks
            let fireworks = [];    
        //////////////////////////

        ////////////////////////
        ///  Firework Class  ///
        ////////////////////////
            class Firework {
                constructor(x = canvas.width / 2, y = canvas.height, bExplode = true){
                    this.x = x
                    this.y = y

                    this.bExplode = bExplode 

                    if(this.bExplode){
                        this.size = size;            
                        this.dirX = velocityX * (Math.random() * 1.0 - 0.5);                
                        this.dirY = velocityY * (Math.random() * 0.2 + 0.8); 
                    } else {
                        this.size = Math.max(2, size / 5)

                        let val = Math.max(velocityX, velocityY);
                        this.dirX = val * (Math.random()*1.0 - 0.5)
                        this.dirY = val * (Math.random()*1.0 - 0.5)
                    }


                    this.timer = 100;
                    this.time = 0

                    this.gravity = -.003
                    
                    this.valid = true;
                    this.exploded = []
                }

                getColorOpacity(){
                    if(this.bExplode) return (this.time % 30 + 10)/ 40;
                    return (this.timer - this.time) / this.timer
                }

                draw(){
                    if(this.y < 0) return;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                    ctx.fillStyle = color(this.getColorOpacity());
                    ctx.fill();
                }

                update(){            
                    if(this.bExplode && this.valid && this.time > this.timer){
                        this.valid = false;

                        for(let i = 0; i < 100; i++){
                            this.exploded.push(new Firework(this.x, this.y, false, this.rgb))
                        }
                    }
                    let cnt = 0;
                    for(let i = 0; i < this.exploded.length; i++){
                        cnt += this.exploded[i].update();
                    }
                    
                    if(!this.valid) return cnt;

                    if(this.x > canvas.width || this.x < 0)            
                        this.valid = false;
                    if(this.y > canvas.height)                
                        this.valid = false;
            
                    
                    
                    this.dirY += this.time * this.gravity;
                    this.time += 1
                                

                    this.x += -this.dirX;
                    this.y += -this.dirY;
                    this.draw();   

                    return cnt + 1;         
                }
            }
        ////////////////////////

        ////////////////////////////////
        ///  Implementation Details  ///
        ////////////////////////////////
            function init() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            
                velocityX = canvas.width / 150;
                velocityY = canvas.height / 75;
            
                size = Math.max(Math.ceil(Math.min(canvas.height, canvas.width)/50),10)

                fireworks = [];
                let num = 30;
                
                //num = 1
                for(let i = 0; i < num; i++){
                    setTimeout(() => {
                        fireworks.push(new Firework());    
                    }, i * 50);            
                }

                setTimeout(() => {
                    animate()
                }, 50)
            }

            function animate(){
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                let cnt = 0;
                for(let i = 0; i < fireworks.length; i++){
                    cnt += fireworks[i].update();             
                }

                if(cnt > 0) {
                    requestAnimationFrame(animate);
                }                
            }            

            init();
        ////////////////////////////////
    }

    getTemplate(){
        const template = document.createElement("template")
        template.innerHTML = ` 
            <style>
                #gamevictory {
                    height: 100%;
                    width: 100%;
                    
                    position: fixed;
                    top: 0;
                    z-index: 150;
                    left: 0;    
                    overflow: hidden;
                }
                
                #gamevictory.display-none {
                    opacity: 0;
                    z-index: -100;   
                    height: 500vh;
                    width: 500vw;
                    left: -200vw;
                    top: -200vh;
                    transition: all 1s linear;
                }
            </style>
            <canvas id="gamevictory"></canvas>
            `;
            return template;
    }
}

customElements.define("game-victory", GameVictory);