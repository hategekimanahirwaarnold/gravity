import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

let gravity = 1;
let friction = 0.98;
let xfriction = 0.999;

const colors = ['#2185C5', '#7ECEFD', 'orange', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener("click", function() {
  init();
})
// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color;
    c.fill()
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height)
    {
      this.dy = - this.dy * friction;
      this.dx = this.dx * xfriction;
    } else {
      this.dy += gravity;
      // console.log("y: ", this.y, "dy: ", this.dy)
    }

    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0)
    {
      this.dx = - this.dx;
    }
    this.y += this.dy;
    this.x += this.dx;
    this.draw()
  }
}

// Implementation
let balls
function init() {
  balls = []
  for (let i = 0; i < 50; i++) {
    let radius =randomIntFromRange(10, 20);
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(0, canvas.height - radius);
    let dx = randomIntFromRange(-2, 2);
    let dy = randomIntFromRange(-2, 2);
    let color = randomColor(colors);
    balls.push(new Ball(x, y, dx, dy, radius, color))
  }
//  ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  // ball.update();

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  balls.forEach(object => {
   object.update()
  })
}

init()
animate()
