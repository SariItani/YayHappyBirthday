const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');
const popup = document.getElementById('popup');
const aurora = document.getElementById('aurora');

let stars = [];
let lightRadius = 50;
let lightOpacity = 0.3;
let starsCollected = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Sound effects and background music using Howler.js
const starSound = new Howl({
  src: ['star-collect.mp3'],
  volume: 0.5
});

const backgroundMusic = new Howl({
  src: ['star-collecting-music.mp3'],
  loop: true
});

const auroraMusic = new Howl({
  src: ['aurora-music.mp3'],
  loop: true
});

backgroundMusic.play();

// Randomly scatter stars
for (let i = 0; i < 20; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 3
  });
}

// Main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  stars.forEach((star, index) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // Check if cursor is close enough to "collect" star
    const dx = mouseX - star.x;
    const dy = mouseY - star.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < lightRadius) {
      // Star collected
      stars.splice(index, 1);
      starsCollected++;
      lightRadius += 20;
      lightOpacity -= 0.03;
      starSound.play();

      // Check if all stars are collected
      if (starsCollected === 20) {
        revealAurora();
        backgroundMusic.stop();
        auroraMusic.play();
        showPopups();
      }
    }
  });

  // Draw light around cursor
  ctx.beginPath();
  ctx.arc(mouseX, mouseY, lightRadius, 0, Math.PI * 2);
  const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, lightRadius);
  gradient.addColorStop(0, `rgba(255, 255, 255, ${lightOpacity})`);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fill();

  requestAnimationFrame(animate);
}

let mouseX = 0;
let mouseY = 0;

// Track mouse movement
window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Reveal aurora when all stars are collected
function revealAurora() {
  aurora.style.opacity = 1;
}

// Show popup messages
function showPopups() {
  const messages = [
    "Like what you see?",
    "This is an aurora, it occurs during dawn.",
    "The northern lights are a sight to behold."
  ];

  let index = 0;
  function nextPopup() {
    if (index < messages.length) {
      popup.innerHTML = messages[index];
      gsap.to(popup, { opacity: 1, duration: 1, onComplete: () => {
        set
