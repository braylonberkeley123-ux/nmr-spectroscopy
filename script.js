let lessonStep = 0;

const lessons = [
  {
    text: "NMR spectroscopy studies how nuclei interact with magnetic fields.",
    image: "images/lesson1.png",
    audio: "images/audio1.mp3"
  },
  {
    text: "Chemical shift reflects electronic shielding around nuclei.",
    image: "images/lesson2.png",
    audio: "images/audio2.mp3"
  },
  {
    text: "Spin–spin coupling splits peaks based on neighboring protons.",
    image: "images/lesson3.png",
    audio: "images/audio3.mp3"
  }
];

const practiceBoards = [
  {
    text: "Identify unique proton environments.",
    image: "images/practice1.png"
  },
  {
    text: "Predict splitting patterns.",
    image: "images/practice2.png"
  },
  {
    text: "Estimate chemical shifts.",
    image: "images/practice3.png"
  }
];

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function goHome() {
  showPage("homePage");
}

function openBasics() {
  lessonStep = 0;
  updateLesson();
  showPage("basicsPage");
}

function nextLesson() {
  lessonStep = (lessonStep + 1) % lessons.length;
  updateLesson();
}

function updateLesson() {
  document.getElementById("lessonText").textContent = lessons[lessonStep].text;
  document.getElementById("lessonImage").src = lessons[lessonStep].image;

  const audio = document.getElementById("narration");
  audio.src = lessons[lessonStep].audio;
  audio.play();
}

function openPractice() {
  showPage("practicePage");
}

function openPracticeBoard(index) {
  document.getElementById("practiceText").textContent =
    practiceBoards[index].text;
  document.getElementById("practiceImage").src =
    practiceBoards[index].image;
  showPage("practiceBoardPage");
}

function peakInfo(label) {
  document.getElementById("lessonText").textContent =
    `You clicked the ${label} proton peak.`;
}
