function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  noStroke();
  drawNebula();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawNebula();
}

function drawNebula() {
  background(10, 10, 20); // Deep space background

  // Stars
  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(0.5, 2);
    fill(255, 255, 255, random(150, 255));
    ellipse(x, y, r, r);
  }

  // Nebula clouds
  for (let i = 0; i < 5; i++) {
    drawCloud(random(width), random(height), random(100, 300), color(random(150, 255), random(50, 150), random(150, 255), 50));
  }
}

function drawCloud(x, y, size, col) {
  for (let i = 0; i < 100; i++) {
    let offsetX = random(-size, size);
    let offsetY = random(-size, size);
    let d = dist(0, 0, offsetX, offsetY);
    if (d < size) {
      fill(col);
      ellipse(x + offsetX, y + offsetY, random(5, 20));
    }
  }
}
