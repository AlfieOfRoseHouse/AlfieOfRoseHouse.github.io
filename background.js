let stars = [];
let canvas;
let showBackground = true;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-100');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  noStroke();
  
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.5, 2),
      alpha: random(100, 255),
      delta: random(0.5, 1.5), // how fast it twinkles
      increasing: random() > 0.5
    });
  }

  const toggleBtn = document.getElementById('toggleBackground');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      showBackground = !showBackground;
      if (!showBackground) {
        clear(); // Remove stars visually
      }
    });
  }
}

function draw() {
  if (showBackground) {
    drawNebula();
  }
}

function drawNebula() {
  background(5, 5, 15, 50); // soft translucent background

  // Twinkling stars
  for (let star of stars) {
    // Update alpha for twinkling
    if (star.increasing) {
      star.alpha += star.delta;
      if (star.alpha >= 255) star.increasing = false;
    } else {
      star.alpha -= star.delta;
      if (star.alpha <= 100) star.increasing = true;
    }

    fill(255, star.alpha);
    ellipse(star.x, star.y, star.size);
  }

  // Gentle nebula clouds drifting
  for (let i = 0; i < 5; i++) {
    let x = noise(frameCount * 0.001 + i) * width;
    let y = noise(frameCount * 0.001 + i + 1000) * height;
    fill(100, 0, 255, 30);
    ellipse(x, y, 300, 200);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
