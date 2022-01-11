class SplashScreen extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.getTemplate().content);
    }

    connectedCallback() {
        const canvas = this.shadowRoot.getElementById("splashscreen");
        const ctx = canvas.getContext("2d");

        let color = window.getComputedStyle(this).getPropertyValue("color");
        canvas.style.backgroundColor = window.getComputedStyle(this).getPropertyValue("background-color")
        //console.log(color)

        // Set text properties
        const textSize = 11;

        let textMultiplier = 12;
        let limit = 6;

        // Global text properties set within "generateTextDetails()""
        let textLength = 0;
        let xOffset = 0;
        let yOffset = 0;


        // Data arrays
        let particles = [];
        let textData;


        // Called initially to configure the text

        // Prints the text to canvas, records the pixel info, and clears the canvas
        function generateTextDetails(){   
            // Set the text value to use
            let textValue = "C J R U D E R . N E T"; 
 
            if(canvas.width < 1400) textValue = "C J R U D E R"  
            if(canvas.width < 800) textValue = "C J R"
            
            limit = canvas.width * .00625 + 3.5// speeds up at larger sizes
            textMultiplier = 0.001875 * canvas.width + 8.25 // 9 at 400 and 12 at 2000
  
            ctx.fillStyle = "white";
            ctx.font = textSize + "px Verdana";
            textLength = ctx.measureText(textValue).width
            xOffset = (canvas.width - textLength * textMultiplier) / 2
            yOffset = (canvas.height - textSize * textMultiplier) / 2

            // Draw text, get data, and reset
            ctx.fillText(textValue, 0, textSize, canvas.width)
            textData = ctx.getImageData(0, 0, textLength, textSize)

            ctx.clearRect(0, 0, innerWidth, innerHeight);
        }

        // Saves the pixel data as a particle.  Updates the position for each iteration
        class Particle {
            constructor(baseX, baseY){
                // baseX and baseY represent the position within the text
                this.baseX = baseX;
                this.baseY = baseY;

                this.size = 1;
                this.color = color;

                // x and y represent the starting position
                this.y = Math.random() * canvas.height * 1.5 - 0.25 * canvas.height; 
                this.x = Math.random() * canvas.width * 1.5 - 0.25 * canvas.width;
            }

            update(){
                // reset position
                let dx = this.baseX - this.x;
                let dy = this.baseY - this.y;     
                let distance = Math.sqrt(dx * dx + dy * dy)
                                
                if(Math.abs(dx) < limit)
                    this.x += dx
                else
                    this.x += dx / distance * limit;

                if(Math.abs(dy) < limit)
                    this.y += dy
                else
                    this.y += dy / distance * limit;

                // redraw
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();

                return distance
            }
        }

        function init() {
            // do not run splash screen for internal redirects
            if(window.location.href.endsWith(".html")){
                canvas.remove();
                return;
            } 
            // Set canvas size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            generateTextDetails()
            particles = [];
                
            for(let i = 0; i < textData.height; i++){
                for (let j = 0; j < textData.width; j++){
                    addParticle(i,j)
                }
            }

            setTimeout(animate, 300)
        }

        function addParticle(i, j){
            const row = textData.width * i * 4
            const col = j * 4

            if(textData.data[row + col + 3] === 0) return;
            particles.push(new Particle(j * textMultiplier + xOffset, i * textMultiplier + yOffset))
        }

        function animate(){    
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            let sumDistances = 0
            for(let i = 0; i < particles.length; i++)
                sumDistances += particles[i].update();

            connect(sumDistances / particles.length / 10);
            if(sumDistances < 10) {
                setTimeout(()=>{canvas.classList.add("display-none")},500)
                return;
            }
            
            requestAnimationFrame(animate);            
        }

        function connect(maxDistance){
            maxDistance = Math.max(textMultiplier + textMultiplier, maxDistance)

            for(let i = 0; i < particles.length - 1; i++){
                for(let j = i; j < particles.length; j++){
                    let distance = getDistance(i, j);

                    if(distance < maxDistance){
                        //let opacity = 1 //(maxDistance - distance) / maxDistance;

                        ctx.strokeStyle = particles[i].color;
                        ctx.lineWidth = 1;
                        ctx.beginPath();                
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function getDistance(i, j){    
            let x = Math.pow(particles[i].x - particles[j].x,2)
            let y = Math.pow(particles[i].y - particles[j].y,2)
            return Math.sqrt(x + y);
        }

        init();

    }

    getTemplate(){
        const template = document.createElement("template")
        template.innerHTML = ` 
            <style>
                #splashscreen {
                    height: 100%;
                    width: 100%;
                    
                    position: fixed;
                    top: 0;
                    z-index: 150;
                    left: 0;    
                    overflow: hidden;
                }
                #splashscreen.display-none {
                    opacity: 0;
                    z-index: -100;   
                    height: 0;
                    width: 0;
                    left: 50vw;
                    top: 50vh;
                    transition: all 0.3s;
                }
            </style> 

            <canvas id="splashscreen"></canvas>
            `;
            return template;
    }


}

customElements.define("splash-screen", SplashScreen);