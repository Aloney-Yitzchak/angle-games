// Shared helpers for the angle games (no external dependencies)
const W = 600, H = 400, CX = 300, CY = 200, SPEED = 6;

function el(cls, parent) {
  const d = document.createElement("div");
  if (cls) d.className = cls;
  parent.appendChild(d);
  return d;
}

function drawLine(area, cls, x1, y1, x2, y2) {
  const line = el(cls, area);
  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  line.style.width = length + "px";
  line.style.left = x1 + "px";
  line.style.top = y1 + "px";
  line.style.transform = `rotate(${angle}deg)`;
  return line;
}

// Angle map: 0° points up, angles grow clockwise
function drawAngleMap(area, from, to) {
  for (let a = from; a <= to; a += 15) {
    if (a === 360) continue;
    const rad = (a - 90) * Math.PI / 180;
    const x2 = CX + Math.cos(rad) * 85, y2 = CY + Math.sin(rad) * 85;
    drawLine(area, "angle-line", CX, CY, x2, y2);
    const lx = CX + Math.cos(rad) * 100, ly = CY + Math.sin(rad) * 100;
    const label = el("angle-label", area);
    label.innerText = a + "°";
    label.style.left = lx + "px";
    label.style.top = ly + "px";
  }
}

function createDirt(area, count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    let x, y;
    do {
      x = 10 + Math.random() * (W - 20);
      y = 10 + Math.random() * (H - 20);
    } while (Math.hypot(x - CX, y - CY) < 30); // not on top of the robot
    const d = el("dirt", area);
    d.dataset.x = x; d.dataset.y = y; d.dataset.hit = "0";
    d.style.left = (x - 5) + "px";
    d.style.top = (y - 5) + "px";
    list.push(d);
  }
  return list;
}
