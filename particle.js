class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);

    // 아래에서 위로 쏘는 느낌 (y가 마이너스면 위로)
    this.velocity = createVector(random(-0.5, 0.5), random(-8, -5));

    this.lifespan = 255.0;
    this.vanishTimer = 0; // 마우스 바람 맞고 잠시 사라지는 시간
  }

  run() {
    // 중력 (위로 쏘고 다시 내려오게)
    let gravity = createVector(0, 0.2);
    this.applyForce(gravity);

    // 마우스 바람 적용
    this.applyMouseWind();

    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  applyMouseWind() {
    // mouseX, mouseY는 p5에서 전역으로 제공
    if (mouseX === undefined || mouseY === undefined) return;

    let d = dist(mouseX, mouseY, this.position.x, this.position.y);

    // 마우스 근처를 지나가면 바람 맞은 것처럼 힘 + 잠시 사라짐
    if (d < 70) {
      let dir = p5.Vector.sub(this.position, createVector(mouseX, mouseY));
      dir.normalize();
      dir.mult(0.5);           // 바람 세기
      this.applyForce(dir);

      this.vanishTimer = 10;   // 대략 10프레임 정도 안 보이게
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0);
  }

  show() {
    // 바람 맞으면 잠시 투명
    if (this.vanishTimer > 0) {
      this.vanishTimer--;
      return;
    }

    // 어두운 배경에서 빛나는 폭죽 느낌
    stroke(255, this.lifespan);
    strokeWeight(2);
    fill(255, 180, 50, this.lifespan); // 노랑-오렌지 계열
    circle(this.position.x, this.position.y, 8);
  }

  isDead() {
    return this.lifespan < 0.0;
  }
}
