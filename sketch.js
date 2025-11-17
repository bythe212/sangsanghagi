let emitter;

function setup() {
  createCanvas(640, 240);
  emitter = new Emitter(width / 2, height - 10);
}

function draw() {
  drawSeaBackground(); 
  for (let i = 0; i < 5; i++) {  
    emitter.addParticle();
  }
  emitter.run();
}

function drawSeaBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(0, 10, 30), color(0, 30, 70), inter); 
    stroke(c);
    line(0, y, width, y);
  }
}
