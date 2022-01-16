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
            const textSize = 11;
            const textValue = "C J R U D E R . N E T"; 
            
            limit = canvas.width * .00625 + 3.5// speeds up at larger sizes
            textMultiplier = 0.001875 * canvas.width + 8.25 // 9 at 400 and 12 at 2000
  
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
            const imageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAIAAAC3LO29AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA/cSURBVHhe3Zt7lFXjG8dPpGkpsZKwUqEkVi5NNMmqSRJiScYlYaUkCSm5F5Jr7gtJUkwrSYy0FlEzFFqEVDNdRAopa+QurAjn93G+T09ve845c85cfsvv9/ln9n7ed79nP/t93ufy7j114vF47P+a/6qGv//++5YtW+rWrVu/fv2dd97ZpLVMrWu4cuXKkpKSuXPnrlixYtOmTSgpeU5OTvPmzVsnOPjgg7t169auXTs11TBoWBv8+eefxcXFRx99dOZzteuuuw4YMGDy5Ml//PGHjVIT1IyGH330EZNjJ/H46tWrjzvuOLvxKjFkyJAPPvjAhqse1dXwjTfe6N69e2FhoZ3H4y+//PIee+xhd5qAmbz++uvnzZu3du3anxKsX7++tLR05syZ99133+DBgw855BDruiMdOnR48cUXbdyqUnUN33rrrRNOOIH7uOKKK0wUj0+aNKlhw4a6Pzj++OOXLFlibWnBA02dOvWCCy6oV6+eXbwN9Pzwww+tX/ZURcMffvhh+PDh0qRNmzacSv7CCy80atRIt8U0Pvnkk5JnxV9//TVx4sSOHTtqHGfo0KFbt261TtmQtYbz589v1aqV/Wwshk1KvnHjRjfOpk2brlq1SnJgfvA6PJTOnTvzRHJzc88666xRo0axeq1HMhYuXCgbcfC6b775pjVnTBYa/v3333feeafPEpx22mn4TLX27t1bQvQMjYo4QTBQU0WwwAULFljXZLz22mvhAwWWrrVlRqYaYoqXXXaZ/UgshomOGzfO7fPVV1+1hlhsypQpEjJ1LFGTpuXaa6/VJalgwq1rgjPPPNMaMiAjDdHknHPOseFjsWbNmuFCrS3Bueeeq6ZevXqxkCS88cYbJQQm9sILL5w1a9a77747Z86cBx98kPm3tgQ9e/bUVangwn322cd6x2L5+fn+Q+mpXEPUKygosIETQ3/33XfWloAOvgIJCRIWFRV5rGc5lZeXSx6Cm83Ly1Mf4BFYQwp+/PHHrl27Wu9YjONMlKxEw59//jmcvX79+rllOm6i6IllImHFEgMlPPvssxlEPZOCyaknECFNmhpf8ECuZ9LUpNOQG7300kttsFhs0KBBv/76q7UFYHLqgOFJsnTpUkl23313clEJiZ+EOzQ/+eST8VgMLjkgUX+ekYnSgitWf+jbt69JU5BOw/Hjx9swCRNKqh5ccskl6jNy5EhJpk2bJsnpp58uCdbrlixwsJ4MfPvttyYNHFV6wmWcPvCm1PCdd97xwNCjR4+Kxumcd9556vbAAw9Ictddd0ly3XXXSXLSSSdx2qBBg7322ktNsOeee/pTu/jiiyX0h5IeTIBsUZdAmji5k3XZEdb0wIEDWT8c77vvviyPyAyEUBPogKegAzTRgddKhE0stqysDKMlpZZXxGONHTtWHa688kodvPLKK/gPHaehTp06pFB77723TuWldBxFika45ZZb1Mq94khMmoLRo0erc//+/SXBs0vi6+q9997DmNFHp6Q46oDakoAntJiPiSqDoKVLYMSIESbdkSQaLlu2bLfddtNlYVadCp6lOod+Yv/995fQozNVAqduyd5hzZo1knTp0kWS5557TpJMCJMKimyTBiTRUGsGDjzwwDTLz2EtqT9gYxKGWQ6Tc+yxx+qp4UXVoVOnTmp1f0MhIklWKTv237JlS114yimnmDQgqmF4Z6QgJq0MwoAuYfWbKB6/9957JXSY5K+++oombmu//faT8NNPP1V/D6HPPvusJBnCfepCwP5Nuo2ohsRQdWUmM0yLgFinq+CZZ54xaTy+ePFiPC3+AH14wK7M7Nmz1RmdtWeBzp6ULVq0SN0yB2+va0899VQTbWMHDTEYT7VKSkpMmhnkLroQvKRKCpZ/6KGHqqdnap4k4JkJjxJmDiWILodIUbaDhoQvdWLZZD6B4qeffnLDgzFjxljDjnz++ee+3phATiV3700SK0m2HHbYYRqBPMxECbZrSPTzcPzYY4+ZNBswAby/RoAWLVpQFmHAGOe6detef/116nS0suZYbMKECbqQWfWfvuOOOyTMlkmTJmkEXJqJEmzX0NcrdxmpHjLn448/PuKIIzROGurVq0d5adfE47fddpvk6F/ln/7tt980CMyYMcOkoYYeWDLMm9KAiWqopBx55JHhDhp1ludAnuVVDc8fhwwZYqJQw+bNm6v56aefNlE14IlSc+B+WrVqlZOT07hx47Zt21IoEzBpsk7x+Pvvv+92S5qaSfhNA4FUQzGmiVzD9evXqw02bNggYW2zdu1a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"
            
            limit = 30;
            textMultiplier = canvas.width / 250 + 2.4;

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
                return;
            } 
            // Set canvas size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            generateSourceDetails();

            
        }

        function config(){
            particles = [];
            console.log(sourceData);
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
            if(sourceData.data[row + col + 3] === 0) return;
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
                    height: 500vh;
                    width: 500vw;
                    left: -200vw;
                    top: -200vh;
                    transition: all 0.7s ease-in-out;
                }
            </style> 

            <canvas id="splashscreen"></canvas>
            `;
            return template;
    }


}

customElements.define("splash-screen", SplashScreen);