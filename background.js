let stars = [];
let clouds = [];
let showBackground = true;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-10');
  canvas.style('position', 'fixed');
  noStroke();

  // Generate stars
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      r: random(0.5, 2),
      alpha: random(150, 255),
      delta: random(0.05, 0.2),
      increasing: random() > 0.5
    });
  }
  for (let i = 0; i < 5; i++) {
    const col = color(random(150, 255), random(50, 150), random(150, 255), 50);
    createCloud(random(width), random(height), random(100, 300), col);
  }
}
  // Generate nebula clouds
function createCloud(x, y, size, col) {
  // Create particles for the cloud
  for (let i = 0; i < 100; i++) {
    let offsetX = random(-size, size);
    let offsetY = random(-size, size);
    let d = dist(0, 0, offsetX, offsetY);
    if (d < size) {
      clouds.push(new CloudParticle(x + offsetX, y + offsetY, random(5, 20), col));
    }
  }
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const toggleBtn = document.getElementById('toggleBackground');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    showBackground = !showBackground;
    if (!showBackground) {
      background(0, 0, 0);
    }
  });
}

function draw() {
  if (!showBackground) return;

  background(10, 10, 20, 50); // slight alpha for motion trails

  // Twinkling stars
  for (let star of stars) {
    star.alpha += star.delta;  // Change in alpha
    if (star.alpha >= 255 || star.alpha <= 50) {
      star.delta *= -1;  // Reverse direction when it hits the extremes
    }
  
    fill(255, 255, 255, star.alpha);
    ellipse(star.x, star.y, star.size);
  }

  // Moving nebula clouds
  for (let cloud of clouds) {
    cloud.update();
    cloud.display();
  }
}

class CloudParticle {
  constructor(x, y, size, col) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;
    this.xSpeed = random(-0.2, 0.2); // Random movement speed for x-axis
    this.ySpeed = random(-0.2, 0.2); // Random movement speed for y-axis
  }

  // Update the position of the particle
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  // Draw the particle
  display() {
    fill(this.col);
    ellipse(this.x, this.y, this.size);
  }
}
