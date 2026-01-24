/* --- PHẦN 1: COUNTDOWN TIMER --- */
const countdown = () => {
  // Đặt ngày đích: 10 ngày kể từ hiện tại (Bạn có thể thay bằng ngày cụ thể)
  const countDate = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;
  // Hoặc dùng ngày cố định: const countDate = new Date("Dec 31, 2025 00:00:00").getTime();

  const now = new Date().getTime();
  const gap = countDate - now;

  // Tính toán thời gian
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  // Cập nhật DOM
  document.getElementById("days").innerText =
    textDay < 10 ? "0" + textDay : textDay;
  document.getElementById("hours").innerText =
    textHour < 10 ? "0" + textHour : textHour;
  document.getElementById("minutes").innerText =
    textMinute < 10 ? "0" + textMinute : textMinute;
  document.getElementById("seconds").innerText =
    textSecond < 10 ? "0" + textSecond : textSecond;
};

// Chạy mỗi giây
setInterval(countdown, 1000);

/* --- PHẦN 2: BACKGROUND PARTICLES ANIMATION --- */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Xử lý khi thay đổi kích thước màn hình
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1; // Kích thước hạt
    this.speedX = Math.random() * 1.5 - 0.75;
    this.speedY = Math.random() * 1.5 - 0.75;
    this.color = "rgba(255, 255, 255, 0.6)";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Đảo chiều nếu chạm cạnh màn hình
    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  const numberOfParticles = 100; // Số lượng hạt
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    // Vẽ đường nối nếu các hạt gần nhau (tạo hiệu ứng mạng lưới)
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

init();
animate();
