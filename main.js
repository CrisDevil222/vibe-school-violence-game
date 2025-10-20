const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu-screen");
const game = document.getElementById("game-screen");
const result = document.getElementById("result-screen");
const resultText = document.getElementById("result-text");
const choicesDiv = document.getElementById("choices");

const scenes = [
  {
    text: "Một học sinh bị bạn trêu chọc giữa sân trường. Bạn sẽ làm gì?",
    choices: [
      { text: "Giúp đỡ và an ủi bạn ấy", effect: "positive" },
      { text: "Giả vờ không thấy gì", effect: "neutral" },
      { text: "Cười cùng nhóm bắt nạt", effect: "negative" }
    ]
  },
  {
    text: "Một nhóm học sinh lan tin sai về người khác trên mạng.",
    choices: [
      { text: "Báo cho giáo viên hoặc người lớn", effect: "positive" },
      { text: "Tham gia bình luận", effect: "negative" },
      { text: "Im lặng cho qua", effect: "neutral" }
    ]
  },
  {
    text: "Một người bạn buồn vì bị tẩy chay. Bạn sẽ...",
    choices: [
      { text: "Ngồi nói chuyện và động viên bạn", effect: "positive" },
      { text: "Tránh xa để không bị liên lụy", effect: "negative" },
      { text: "Giả vờ không biết", effect: "neutral" }
    ]
  }
];

let currentScene = 0;
let score = 0;

const bg = new Image();
bg.src = "assets/images/background.png";
const student = new Image();
student.src = "assets/images/student_normal.png";
const bully = new Image();
bully.src = "assets/images/bully.png";

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(student, 150, 200, 150, 200);
  ctx.drawImage(bully, 550, 200, 150, 200);

  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, canvas.width, 100);
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText(scenes[currentScene].text, 30, 50);
}

function showChoices() {
  choicesDiv.innerHTML = "";
  scenes[currentScene].choices.forEach((c) => {
    const btn = document.createElement("button");
    btn.textContent = c.text;
    btn.onclick = () => chooseAction(c.effect);
    choicesDiv.appendChild(btn);
  });
}

function chooseAction(effect) {
  if (effect === "positive") {
    score++;
    student.src = "assets/images/student_happy.png";
  } else if (effect === "negative") {
    score--;
  }

  setTimeout(() => {
    currentScene++;
    student.src = "assets/images/student_normal.png";
    if (currentScene < scenes.length) {
      drawScene();
      showChoices();
    } else {
      endGame();
    }
  }, 800);
}

function endGame() {
  game.classList.remove("active");
  result.classList.add("active");
  if (score > 1) resultText.textContent = "Tuyệt vời! Bạn là người biết quan tâm và ngăn chặn bạo lực học đường!";
  else resultText.textContent = "Hãy thử lại và học cách hành xử tích cực hơn nhé!";
}

document.getElementById("start-btn").onclick = () => {
  menu.classList.remove("active");
  game.classList.add("active");
  drawScene();
  showChoices();
};

document.getElementById("restart-btn").onclick = () => {
  currentScene = 0;
  score = 0;
  result.classList.remove("active");
  menu.classList.add("active");
};
