let emitter;

function setup() {
  createCanvas(640, 240);
  emitter = new Emitter(width / 2, height - 10); // 아래쪽에 폭죽 설치
}

function draw() {
  background(10); 
  emitter.addParticle();
  emitter.run();
}
