const canvas1 = document.querySelector('#canvas1');
const canvas2 = document.querySelector('#canvas2');

canvas1.height = window.innerHeight / 2;
canvas1.width = window.innerWidth;

const ctx1 = canvas1.getContext('2d');

canvas2.height = window.innerHeight / 2;
canvas2.width = window.innerWidth;

const ctx2 = canvas2.getContext('2d');

const diagonal = Math.sqrt(
  Math.pow(canvas1.width, 2) +
  Math.pow(canvas1.height, 2)
);

const quant = {
  obstacles: 3,
  rays: 500,
  fov: 45,
};

const obstacles = [];

for(let i = 0; i < quant.obstacles; i++) {
  const obstacle = new Obstacle(ctx1);
  obstacles.push(obstacle);
};

const rays = [];

for(let i = 0; i < quant.rays; i++) {
  const ray = new Ray(ctx1, 0, 0, i, quant.rays, quant.fov);

  ray.size = diagonal;
  rays.push(ray);
};

function collision(ray, obstacle) {
  const x1 = obstacle.initialPoint.x;
  const y1 = obstacle.initialPoint.y;
  const x2 = obstacle.finalPoint.x;
  const y2 = obstacle.finalPoint.y;

  const x3 = ray.initialPoint.x;
  const y3 = ray.initialPoint.y;
  const x4 = ray.finalPoint.x;
  const y4 = ray.finalPoint.y;

  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if(denominator === 0) return;

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  const u = ((y1 - y2) * (x1 - x3) - (x1 - x2) * (y1 - y3)) / denominator;

  if(t < 0 || t > 1 || u < 0) return;

  const x = x1 + t * (x2 - x1);
  const y = y1 + t * (y2 - y1);

  const dx = x - x3;
  const dy = y - y3;

  const newSize = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

  if(newSize < ray.size) {
    ray.size = newSize;
    return;
  };

};

canvas1.addEventListener('mousemove', function(e) {
  const x = e.clientX;
  const y = e.clientY;

  for(let i = 0; i < rays.length; i++) {
    const ray = rays[i];

    ray.initialPoint.x = x;
    ray.initialPoint.y = y;
  };
});

function animate(timestamp) {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  for(let i = 0; i < obstacles.length; i++) {
    obstacles[i].render();
  };

  for(let i = 0; i < rays.length; i++) {
    const ray = rays[i];

    ray.size = diagonal;

    for(let j = 0; j < obstacles.length; j++) {
      collision(ray, obstacles[j]);
    };
    ray.finalPoint = ray.changeFinal();

    ray.render();

    const width = canvas2.width / rays.length;
    const height = canvas2.height * (1 - ray.size / diagonal);

    ctx2.fillStyle = `hsl(0deg, 0%, ${100 * (1 - ray.size / diagonal)}%)`;
    ctx2.fillRect(i * width, (canvas2.height - height) / 2, width, height);
  };

  requestAnimationFrame(animate);
};

animate(0);
