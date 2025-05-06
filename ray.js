class Ray {
  constructor(ctx, x, y, angle, quantRays, fov) {
    this.ctx = ctx;
    this.width = 0.5;

    this.size = 0;

    this.angle = angle * fov / quantRays;

    this.radians = this.angle * Math.PI / 180;

    this.hue = 180 + 60 * Math.abs(Math.cos(this.radians / 2));
    this.saturation = 60;
    this.luminance = 69;

    this.color = `hsl(${this.hue}deg, ${this.saturation}%, ${this.luminance}%)`;

    this.direction = {
      x: Math.cos(this.radians),
      y: Math.sin(this.radians),
    };

    this.initialPoint = { x: x, y: y };

    this.finalPoint = this.changeFinal();

    this.render();
  };

  changeFinal() {
    return {
      x: this.initialPoint.x + this.size * this.direction.x,
      y: this.initialPoint.y + this.size * this.direction.y,
    };
  };

  render() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.width;
    this.ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
    this.ctx.lineTo(this.finalPoint.x, this.finalPoint.y);
    this.ctx.stroke();
  };
};
