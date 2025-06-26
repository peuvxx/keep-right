if (
  typeof DeviceMotionEvent !== "undefined" &&
  typeof DeviceMotionEvent.requestPermission === "function"
) {
  DeviceMotionEvent.requestPermission()
    .then((response) => {
      if (response === "granted") {
        window.addEventListener("devicemotion", handleMotion);
      }
    })
    .catch(console.error);
} else {
  window.addEventListener("devicemotion", handleMotion);
}

const graphic = document.getElementById("graphic");
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;

window.addEventListener("devicemotion", (event) => {
  const ag = event.accelerationIncludingGravity;
  const x = ag.x;
  const y = ag.y;

  const magnitude = Math.sqrt(x * x + y * y);
  if (magnitude === 0) return;

  // 중력 기준 '우측 방향' 벡터
  const dirX = y / magnitude;
  const dirY = -x / magnitude;

  // 이동 속도
  const speed = 4;
  posX += dirX * speed;
  posY += dirY * speed;

  const w = 80;
  const h = 80;

  // 화면 밖으로 나가면 반대쪽에서 등장 (루프)
  if (posX < -w) posX = window.innerWidth;
  if (posX > window.innerWidth) posX = -w;
  if (posY < -h) posY = window.innerHeight;
  if (posY > window.innerHeight) posY = -h;

  graphic.style.left = `${posX}px`;
  graphic.style.top = `${posY}px`;
});
