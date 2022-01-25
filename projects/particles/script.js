const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

let color = window.getComputedStyle(canvas).getPropertyValue("color");
let rgb = color.substring(4,color.length - 1);

const mouse = {
    x: undefined,
    y: undefined,
    radius: (canvas.height * canvas.width / 18000 + 60)
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    }
)


class Particle {
    constructor(x, y, dirX, dirY, size, color){
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(){
        if(this.x > canvas.width || this.x < 0)
            this.dirX = -this.dirX;
        if(this.y > canvas.height || this.y < 0)
            this.dirY = -this.dirY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;     

        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10)
                this.x += 10;
            if(mouse.x > this.x && this.x > this.size * 10)
                this.x -= 10;
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10)
                this.y += 10;
            if(mouse.y > this.y && this.y > this.size * 10)
                this.y -= 10;
        }

        this.x += this.dirX;
        this.y += this.dirY;

        this.draw();
    }
}

function init() {
    particles = [];
    let num = innerHeight * innerWidth / 35000 + 30;

    //num = 70;

    for(let i = 0; i < num; i++){
        let size = Math.random() * 5 + 1;

        let x = Math.random() * (innerWidth - size*4) + size*2;
        let y = Math.random() * (innerHeight - size*4) + size*2;

        let dirX = Math.random() * num / 15 - num / 30;
        let dirY = Math.random() * num / 15  - num / 30;

        particles.push(new Particle(x, y, dirX, dirY, size, color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < particles.length; i++)
        particles[i].update();

    connect();
}

function connect(){
    
    let maxDistance = innerHeight * innerWidth / 15000 + 135;
    let minDistance = maxDistance / 10;
    for(let i = 0; i < particles.length - 1; i++){
        for(let j = i; j < particles.length; j++){
            let distance = getDistance(i, j);

            if(distance < maxDistance){
                let opacity = distance < minDistance ? 1 : (maxDistance - (distance-minDistance)) / maxDistance;
                ctx.strokeStyle = "rgba(" + rgb + "," + opacity + ")";                
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
    
    //console.log(x, y, Math.sqrt(x+y))
    return Math.sqrt(x + y);
}

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
    }
)

window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;

})


init();
animate();
