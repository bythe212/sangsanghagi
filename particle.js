class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-0.5, 0.5), random(-7, -4));
    this.lifespan = 255;
    this.vanishTimer = 0;

    this.r = random(180, 255);
    this.g = random(20, 80);
    this.b = random(20, 40);

    this.size = random(3, 6);
  }

  run() {
    let gravity = createVector(0, 0.15);
    this.applyForce(gravity);
    this.applyMouseWind();
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  applyMouseWind() {
    let d = dist(mouseX, mouseY, this.position.x, this.position.y);
    if (d < 80) {
      let dir = p5.Vector.sub(this.position, createVector(mouseX, mouseY));
      dir.normalize();
      dir.mult(0.4);
      this.applyForce(dir);
      this.vanishTimer = 8;
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.5;
    this.acceleration.mult(0);
  }

  show() {
    if (this.vanishTimer > 0) {
      this.vanishTimer--;
      return;
    }

    noStroke();
    fill(this.r, this.g, this.b, this.lifespan);
    circle(this.position.x, this.position.y, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}
