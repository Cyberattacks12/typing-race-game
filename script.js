const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed is measured in words per minute.",
  "JavaScript makes websites interactive and dynamic."
];

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const countdownEl = document.getElementById("countdown");

let startTime, selectedSentence;

function startGame() {
  selectedSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceEl.textContent = selectedSentence;
  inputEl.value = "";
  inputEl.disabled = true;
  resultEl.textContent = "";
  countdown(3);
}

function countdown(i) {
  countdownEl.textContent = `Starting in ${i}...`;
  if (i > 0) {
    setTimeout(() => countdown(i - 1), 1000);
  } else {
    countdownEl.textContent = "GO!";
    inputEl.disabled = false;
    inputEl.focus();
    startTime = new Date();
  }
}

inputEl.addEventListener("input", () => {
  const typed = inputEl.value;
  if (typed.endsWith(".") && typed.length >= selectedSentence.length) {
    endGame(typed);
  }
});

function endGame(typed) {
  const endTime = new Date();
  const timeTaken = (endTime - startTime) / 1000;
  const wordCount = typed.trim().split(/\s+/).length;
  const wpm = Math.round((wordCount / timeTaken) * 60);

  let correct = 0;
  for (let i = 0; i < Math.min(typed.length, selectedSentence.length); i++) {
    if (typed[i] === selectedSentence[i]) correct++;
  }
  const accuracy = ((correct / selectedSentence.length) * 100).toFixed(1);

  inputEl.disabled = true;
  resultEl.innerHTML = `WPM: <strong>${wpm}</strong><br>Accuracy: <strong>${accuracy}%</strong>`;
  countdownEl.textContent = "Finished!";
}

startBtn.addEventListener("click", startGame);
