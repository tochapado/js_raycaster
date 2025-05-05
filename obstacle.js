class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;

    this.initialPoint = {
      x: ctx.canvas.width * Math.random(),
      y: ctx.canvas.height * Math.random(),
    };
    
    this.finalPoint = {
      x: ctx.canvas.width * Math.random(),
      y: ctx.canvas.height * Math.random(),
    };

    this.hue = 360 * Math.random();
    this.saturation = 50 * Math.random() + 50;
    this.luminance = 50 * Math.random() + 50;

    this.color = `hsl(${this.hue}deg, ${this.saturation}%, ${this.luminance}%)`;

    this.width = 3 * Math.random() + 2;

    this.render();
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
