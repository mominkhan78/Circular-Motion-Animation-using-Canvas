var canvas = document.querySelector('canvas');

canvas.height = innerHeight;
canvas.width = innerWidth;

var c = canvas.getContext('2d');


var x = canvas.width / 2;
var y = canvas.height / 2;
var radius = 10;
var circleArray = [];

var colors = [
    "#606E8C",
    "#EC7C26",
    "#C2B078",
    "#999950",
    "#008F39"
]

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})



function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColors(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}



function init() {
    for (var i = 0; i < 150; i++) {
        const radius = (Math.random() * 3) + 1;
        circleArray.push(new Circle(x, y, radius, randomColors(colors)));
    }
}

window.addEventListener('resize', function () {
    canvas.height = innerHeight;
    canvas.width = innerWidth;

    init();
})

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radians = Math.random() * Math.PI * 2;
    this.velosity = 0.08;
    this.distanceFromCenter = randomIntFromRange(50, 120);
    this.lastPoint = { x: this.x, y: this.y };
    this.lastMouse = { x: x, y: y };

    this.Draw = function () {
        c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = color;
        c.lineWidth = this.radius;
        c.moveTo(this.lastPoint.x, this.lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
        // c.fillStyle = "red";
        // c.fill();
    }
    this.update = function () {
        this.lastPoint.x = this.x; // Update last point
        this.lastPoint.y = this.y;

        this.lastMouse.x += ((mouse.x - this.lastMouse.x) * 0.05);
        this.lastMouse.y += ((mouse.y - this.lastMouse.y) * 0.05);
        this.radians += this.velosity;
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

        this.Draw();

    }


}
var draw = new Circle(x, y, radius);
init();

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255,0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();