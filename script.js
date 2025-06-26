const graphic = document.getElementById("graphic");
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;

// 움직임 처리 함수
function handleMotion(event) {
  const ag = event.accelerationIncludingGravity;
  const x = ag.x;
  const y = ag.y;

  const magnitude = Math.sqrt(x * x + y * y);
  if (magnitude === 0) return;

  // 중력 기준 우측 방향
  const dirX = y / magnitude;
  const dirY = -x / magnitude;

  const speed = 4;
  posX += dirX * speed;
  posY += dirY * speed;

  const w = 80;
  const h = 80;

  // 화면 루프 처리
  if (posX < -w) posX = window.innerWidth;
  if (posX > window.innerWidth) posX = -w;
  if (posY < -h) posY = window.innerHeight;
  if (posY > window.innerHeight) posY = -h;

  graphic.style.left = `${posX}px`;
  graphic.style.top = `${posY}px`;
}

if (
  typeof DeviceMotionEvent !== "undefined" &&
  typeof DeviceMotionEvent.requestPermission === "function"
) {
  // Safari는 사용자 상호작용 이후에만 요청 가능
  document.body.addEventListener("click", () => {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("devicemotion", handleMotion);
        } else {
          alert("센서 권한이 필요합니다.");
        }
      })
      .catch((err) => {
        console.error("센서 권한 요청 실패:", err);
      });
  });
} else {
  // Android나 iOS 13 이하
  window.addEventListener("devicemotion", handleMotion);
}
