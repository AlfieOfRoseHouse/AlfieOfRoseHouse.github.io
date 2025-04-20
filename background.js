function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  noStroke();
  drawNebula();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawNebula();
}


function drawNebula(){
  background(10, 10, 20);

  //Stars
  for (let idx = 0; idx < 300; idx++) {
    const x = random(width), y = random(height);
    const r = random(0.5, 2);
    fill(255, 255, 255, random(150, 255));
    ellipse(x, y, r, r);
  }

  //Nebula Clouds
  for (let idx = 0; idx < 5; idx++) {
    drawCloud(random(width), random(height), random(100, 300), color(random(150, 255), random(50, 150), random(150, 255), 50));
  }
}

function drawCloud(x, y, size, colour) {
  for (let idx = 0; idx < 100; idx++) {
    let offsetX = random(-size, size), offsetY = random(-size, size);
    let d = dist(0, 0, offsetX, offsetY);
    if (d < size) {
      fill(colour);
      ellipse(x + offsetX, y + offsetY, random(5, 20));
    }
  }
}
