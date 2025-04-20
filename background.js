let clouds = [];
let cloudCount = 5;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-100');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  noStroke();

  colorMode(HSL, 360, 100, 100, 100);

  for (let i = 0; i < cloudCount; i++) {
    let blobs = [];
    let baseX = random(width);
    let baseY = random(height);
    let hue = random(260, 320);
    for (let j = 0; j < 100; j++) {
      blobs.push({
        angleOffset: random(TWO_PI),
        radius: random(100),
        size: random(30, 80),
        offsetX: random(-30, 30),
        offsetY: random(-30, 30),
        hueOffset: random(-20, 20)
      });
    }
    clouds.push({
      baseX,
      baseY,
      blobs,
      angle: random(TWO_PI),
      speed: random(0.001, 0.003),
      hue
    });
  }
}

function draw() {
  clear();
  background(260, 80, 5, 10);

  for (let cloud of clouds) {
    cloud.angle += cloud.speed;

    let centerX = cloud.baseX + cos(cloud.angle) * 50;
    let centerY = cloud.baseY + sin(cloud.angle) * 50;

    for (let b of cloud.blobs) {
      let x = centerX + cos(cloud.angle + b.angleOffset) * b.radius + b.offsetX;
      let y = centerY + sin(cloud.angle + b.angleOffset) * b.radius + b.offsetY;
      let h = cloud.hue + b.hueOffset;

      fill(h % 360, 80, 60, 5);
      ellipse(x, y, b.size);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

document.getElementById("backgroundToggle").addEventListener("click", function () {
  const canvas = document.querySelector("canvas"); // p5.js creates a <canvas> element
  if (canvas) {
    canvas.style.display = (canvas.style.display === "none") ? "block" : "none";
  }
});
