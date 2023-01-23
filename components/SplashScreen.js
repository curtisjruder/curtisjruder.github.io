class SplashScreen extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.getTemplate().content);
        setTimeout(()=>{this.classList.add("splash-complete")},2500)
        setTimeout(()=>{
            this.shadowRoot.getElementById("splashscreen")?.classList.add("display-none")
        },2500) 
    }

    connectedCallback() {
        const canvas = this.shadowRoot.getElementById("splashscreen");
        const ctx = canvas.getContext("2d");

        
        let color = window.getComputedStyle(this).getPropertyValue("color");
        canvas.style.backgroundColor = window.getComputedStyle(this).getPropertyValue("fill")
        //console.log(color)

        // Set text properties


        let textMultiplier = 12;
        let limit = 6;

        // Global text properties set within "generateTextDetails()""
     
        let xOffset = 0;
        let yOffset = 0;


        // Data arrays
        let particles = [];
        let sourceData;


        // Called initially to configure the text

        // Prints the text to canvas, records the pixel info, and clears the canvas
        function generateSourceDetails(){   
            if(canvas.width < 1400)
                generateImage();
            else
                generateText();

            
        }

        function generateText(){
            const textSize = 16;
            const textValue = "C J R U D E R . N E T"; 
            
            limit = canvas.width / 100;
            limit = Math.min(Math.max(14, limit),20) // 14 to 20

            textMultiplier = canvas.width / 200         
            textMultiplier = Math.min(Math.max(7, textMultiplier),10) // 7 - 10

            ctx.fillStyle = "black";
            ctx.font = textSize + "px Verdana";
            let textLength = ctx.measureText(textValue).width
            xOffset = (canvas.width - textLength * textMultiplier) / 2
            yOffset = (canvas.height - textSize * textMultiplier) / 2

            // Draw text, get data, and reset
            ctx.fillText(textValue, 0, textSize, canvas.width)
            sourceData = ctx.getImageData(0, 0, textLength, textSize)
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            config();
        }

        function generateImage(){
            const imageBase64 = "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAmzSURBVFhHzZl3aBbdEsbjzbVXYsVuLKiosZdIsHfBiooi2Luo2FsUFRWNUVDsnSh2I9gr2GusWDBWYu8Ve+5v9znfZvOW5FXvH98DvszMmT07O2faiWkSExOD/n34W7PevHmzf//+uLi4q1evpkmTJl26dIULFw4JCalTp06NGjUyZsxo9H4XmPVniI+PHzhwYI4cOcxGvhARETF+/PibN2+aZwLGb3jryJEjT58+bd++fdq0aVevXj1s2LC3b98ir1q1anh4eLFixfLkyfPo0aPPnz9fvHgR4vz583oQtGzZsnv37m3btjV8qpB1KYMzatSoUdGiRTky2Llz5wYHB/Mszjh37px0vPHz58+YmJimTZvqRaBevXo3btwwyykiFbO+fv06duzY7Nmzs+muXbuQ7Nu3L0OGDLDDhw///v07EmzdunVrZGTkuHHjJk+e7G0onuvbt69tmIWJEyeaBf9IyayXL1+2atVKe3Xr1g0JB1S+fHnYwYMHSyc6Ojp37tzScVC3bt1r165JwcH9+/c7duwohZo1a75+/dos+IJfs65fv86psQVBvXLlSglXrFiBxDlNwtl+S1CtWrWGDh2Kq9q0aSMJiI2N1VNusIMCoEiRIrdu3TJSL/g2i9zhMR4uV66cOxpat26NUKewadMm6CxZsqxZs0arwrdv35zQJvaN1AUcGRoaymrOnDn9WebDrBcvXpQpU4bHwsLCHj58aKQ28ubNi1wHJBOnTp0KzXFHRUVNmjTpzJkztmJily5dWC1QoIBYD7x69apChQooFCxY0OdpeppF+jRr1owHSpUqRagaqY13794hB79+/YLNlSsXdEJCwvv370uWLKklMGHCBFYRFipUCHbnzp32057AMvmsfv36RuSCp1mzZs1ClXg6efKkEf0D4oml9OnTi4WA5ciIQgiCZtmyZVR56OPHj6MwevRoaNwmfW/cvn1b+vPmzTOif5DMLEIqa9as6C1evNiIXMCRKg337t2DrVy5MvTy5cuht2zZMnLkSAhYhB06dICmoEDjEmh/2L59OzrAI8iSmaXSRxob3gvUQxQWLFgA7exIC1Kc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"
            
            limit = 25;
            textMultiplier = canvas.width * 0.006 + 4.5;
           
            const png = new Image();
            
            png.onload = () => {
                ctx.drawImage(png,0,0);
                xOffset = (canvas.width - png.width * textMultiplier) / 2
                yOffset = (canvas.height - png.height * textMultiplier) / 2    
                sourceData = ctx.getImageData(0, 0, png.width, png.height);
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                config();
            }
            png.src = "data:image/png; base64," + imageBase64;       
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
                document.getElementsByTagName("splash-screen")[0].classList.add("hidden");
                return;
            } 
            // Set canvas size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            generateSourceDetails();            
        }

        function config(){
            particles = [];
            for(let i = 0; i < sourceData.height; i++){
                for (let j = 0; j < sourceData.width; j++){
                    addParticle(i,j)
                }
            }

            setTimeout(animate, 300)
        }

        function addParticle(i, j){
            const row = sourceData.width * i * 4
            const col = j * 4

            if(sourceData.data[row + col] === 255 && sourceData.data[row + col + 1] === 255 && sourceData.data[row + col + 2] === 255) return; 
            if(sourceData.data[row + col + 3] < 30) return; 
            particles.push(new Particle(j * textMultiplier + xOffset, i * textMultiplier + yOffset))
        }

        function animate(){    
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            let sumDistances = 0
            for(let i = 0; i < particles.length; i++)
                sumDistances += particles[i].update();

            connect(sumDistances / particles.length / 10);
            if(sumDistances < 10) {                               
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
                    height: 500vh;
                    width: 500vw;
                    left: -200vw;
                    top: -200vh;
                    transition: all 1s linear;
                }
            </style> 

            <canvas id="splashscreen"></canvas>
            `;
            return template;
    }


}

customElements.define("splash-screen", SplashScreen);