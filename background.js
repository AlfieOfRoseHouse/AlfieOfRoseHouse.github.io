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

  for (let i = 0; i < 500; i++) { // denser stars
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.5, 2),
      speed: random(0.1, 0.5),
      alpha: random(100, 255),
      twinkle: random(0.01, 0.05)
    });
  }

  const toggleBtn = document.getElementById('toggle-background');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      showBackground = !showBackground;
      if (!showBackground) clear();
    });
  }
}

function draw() {
  if (showBackground) drawNebula();
}

function drawNebula() {
  background(5, 5, 15, 30); // smooth trails

  // Stars - move downward gently and twinkle
  for (let star of stars) {
    fill(255, star.alpha);
    ellipse(star.x, star.y, star.size);

    star.y += star.speed;
    if (star.y > height) {
      star.y = 0;
      star.x = random(width);
    }

    // Twinkle effect
    star.alpha += random(-1, 1) * star.twinkle * 255;
    star.alpha = constrain(star.alpha, 100, 255);
  }

  // Nebula cloud blobs - slow drifting + noise-based positions
  for (let i = 0; i < 8; i++) {
    let offset = frameCount * 0.001 + i * 10;
    let x = noise(offset) * width;
    let y = noise(offset + 1000) * height;
    let sizeX = 400 + sin(offset * 2) * 50;
    let sizeY = 300 + cos(offset * 2) * 50;
    fill(100 + i * 10, 0, 255 - i * 20, 20); // varying purples
    ellipse(x, y, sizeX, sizeY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
