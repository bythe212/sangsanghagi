let emitter;
let bursts = [];

class FireworkParticle {
  constructor(origin) {
    this.position = origin.copy();
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D().mult(random(1, 4));
    this.lifespan = 255;

    this.r = random(150, 255);
    this.g = random(80, 200);
    this.b = random(80, 255);
    this.size = random(2, 4);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  run() {
    this.applyForce(createVector(0, 0.03));
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 3;
    this.show();
  }

  show() {
    noStroke();
    fill(this.r, this.g, this.b, this.lifespan);
    circle(this.position.x, this.position.y, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

class FireworkBurst {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
    for (let i = 0; i < 80; i++) {
      this.particles.push(new FireworkParticle(this.origin));
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  isDead() {
    return this.particles.length === 0;
  }
}

function setup() {
  createCanvas(640, 240);
  emitter = new Emitter(width / 2, height - 10);
}

function draw() {
  drawSeaBackground();

  for (let i = 0; i < 5; i++) {
    emitter.addParticle();
  }

  // 뒤쪽 하늘에서 터지는 폭죽 (배경 쪽)
  for (let i = bursts.length - 1; i >= 0; i--) {
    bursts[i].run();
    if (bursts[i].isDead()) {
      bursts.splice(i, 1);
    }
  }

  // 앞쪽에서 올라오는 빨간 불꽃
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

function mousePressed() {
  let burstY = random(height * 0.2, height * 0.5);
  bursts.push(new FireworkBurst(mouseX, burstY));
}
