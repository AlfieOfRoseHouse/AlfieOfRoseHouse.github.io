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
      delta: random(0.5, 1),
      increasing: random() > 0.5
    });
  }

  // Generate nebula clouds
  for (let i = 0; i < 5; i++) {
    clouds.push({
      x: random(width),
      y: random(height),
      size: random(100, 300),
      col: color(random(150, 255), random(50, 150), random(150, 255), 50),
      offset: random(1000) // For unique movement
    });
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
      clear();
    }
  });
}

function draw() {
  if (!showBackground) return;

  background(10, 10, 20, 50); // slight alpha for motion trails

  // Twinkling stars
  for (let star of stars) {
    if (star.increasing) {
      star.alpha += star.delta;
      if (star.alpha >= 255) star.increasing = false;
    } else {
      star.alpha -= star.delta;
      if (star.alpha <= 150) star.increasing = true;
    }

    fill(255, 255, 255, star.alpha);
    ellipse(star.x, star.y, star.r);
  }

  // Moving nebula clouds
  for (let cloud of clouds) {
    drawAnimatedCloud(cloud);
  }
}

function drawAnimatedCloud(cloud) {
  for (let i = 0; i < 100; i++) {
    let angle = noise(frameCount * 0.002 + i + cloud.offset) * TWO_PI;
    let offsetX = cos(angle) * random(cloud.size);
    let offsetY = sin(angle) * random(cloud.size);
    let d = dist(0, 0, offsetX, offsetY);
    if (d < cloud.size) {
      fill(cloud.col);
      ellipse(cloud.x + offsetX, cloud.y + offsetY, random(5, 20));
    }
  }
}
