let stars = [];
let blobs = [];
let showBackground = true;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-100');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  noStroke();

  // Generate stars
  for (let i = 0; i < 400; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.5, 2.5),
      speed: random(0.2, 0.6),
      alpha: random(150, 255),
      twinkle: random(0.01, 0.05)
    });
  }

  // Generate nebula clouds
  for (let i = 0; i < 10; i++) {
    blobs.push({
      baseX: random(width),
      baseY: random(height),
      size: random(300, 600),
      hue: random(260, 320),
      offset: random(1000),
      speed: random(0.001, 0.003)
    });
  }

  const toggleBtn = document.getElementById('toggleBackground');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      showBackground = !showBackground;
      if (!showBackground) clear();
    });
  }

  colorMode(HSL, 360, 100, 100, 100);
}

function draw() {
  if (!showBackground) return;
  background(250, 100, 5, 5);

  drawStars();
  drawNebula();
}

function drawStars() {
  for (let s of stars) {
    fill(0, 0, 100, s.alpha / 255 * 100);
    ellipse(s.x, s.y, s.size);
    s.y += s.speed;
    if (s.y > height) {
      s.y = 0;
      s.x = random(width);
    }
    s.alpha += random(-1, 1) * s.twinkle * 255;
    s.alpha = constrain(s.alpha, 100, 255);
  }
}

function drawNebula() {
  for (let b of blobs) {
    let t = frameCount * b.speed + b.offset;
    let x = b.baseX + sin(t * 2) * 50;
    let y = b.baseY + cos(t) * 50;
    fill(b.hue, 80, 60,
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
