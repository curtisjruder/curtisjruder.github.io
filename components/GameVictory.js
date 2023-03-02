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
            setTimeout(()=>{this.classList.add("game-complete")},3000)
            setTimeout(()=>{
                this.shadowRoot.getElementById("gamevictory")?.classList.add("display-none")
            },2500) 
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

            //let size = 0
            let velocityX = 0;
            let velocityY = 0;

            let gravity = -.003

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
                constructor(size, x = canvas.width / 2, y = canvas.height, loop = 0){
                    this.x = x
                    this.y = y
                    this.size = size;                    
                    this.loop = loop;
                    this.bExplode = loop < 1;

                    if(loop == 0){         
                        this.dirX = velocityX * (Math.random() * 1.0 - 0.5);                
                        this.dirY = velocityY * (Math.random() * 0.2 + 0.8); 
                    } else {
                        let val = Math.max(velocityX, velocityY);
                        this.dirX = val * (Math.random()*1.0 - 0.5)
                        this.dirY = val * (Math.random()*1.0 - 0.5)
                    }

                    this.timer = 90;
                    this.time = 0                    
                    
                    this.valid = true;
                    this.exploded = []
                }

                getColorOpacity(){
                    if(this.bExplode) return 1;
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
                            this.exploded.push(new Firework(Math.max(2, this.size / 5), this.x, this.y, this.loop + 1))
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
            
                    
                    
                    this.dirY += this.time * gravity;
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
            
                console.log(canvas.width, canvas.height)
                velocityX = canvas.width / 150;
                velocityY = canvas.height / 40 - 3.68;
                gravity = canvas.height / -120000

                
                let size = Math.min(Math.max(Math.ceil(Math.min(canvas.height, canvas.width)/150 + 8),10),20)
                
                fireworks = [];
                
                let num = 25;
                
                //num = 1
                for(let i = 0; i < num; i++){
                    setTimeout(() => {
                        fireworks.push(new Firework(size));    
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
                    transition: all 0.7s linear;
                }
            </style>
            <canvas id="gamevictory"></canvas>
            `;
            return template;
    }
}

customElements.define("game-victory", GameVictory);