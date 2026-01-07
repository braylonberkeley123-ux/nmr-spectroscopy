let lessonStep = 0;

const lessons = [
  {
    text: "Welcome to InteractiveSpectroscopy.com! Here you’ll learn the basics of NMR spectroscopy and how chemists use it to analyze molecules. Click anywhere on the board to move through the lesson.",
    image: "images/lesson1.png",
    bubbleImage: "",
    audio: "images/audio1.mp3"
  },
  {
    text: "Before focusing on NMR, let’s define spectroscopy more broadly. Spectroscopy is the study of how electromagnetic radiation interacts with matter.",
    image: "images/lesson2.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio2.mp3"
  },
  {
    text: "Spectroscopy is widely used to determine chemical composition across chemistry, geology, and space science.",
    image: "images/lesson3.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio3.mp3"
  },
  {
    text: "A spectrum plots a system’s response versus wavelength or frequency and contains structural information.",
    image: "images/lesson4.png",
    bubbleImage: "images/bubble3.png",
    audio: "images/audio4.mp3"
  },
  {
    text: "NMR spectroscopy uses radio waves to probe nuclear spins and identify molecular structure.",
    image: "images/lesson5.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio5.mp3"
  }
];

const practiceBoards = [
  { text: "Identify unique proton environments.", image: "images/practice1.png" },
  { text: "Predict splitting patterns.", image: "images/practice2.png" },
  { text: "Estimate chemical shifts.", image: "images/practice3.png" }
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
  const lesson = lessons[lessonStep];

  document.getElementById("lessonText").textContent = lesson.text;
  document.getElementById("lessonImage").src = lesson.image;

  const bubbleImage = document.getElementById("bubbleImage");
  if (lesson.bubbleImage) {
    bubbleImage.src = lesson.bubbleImage;
    bubbleImage.style.display = "block";
  } else {
    bubbleImage.style.display = "none";
  }

  const audio = document.getElementById("narration");
  if (lesson.audio) {
    audio.src = lesson.audio;
    audio.play();
  }
}

function openPractice() {
  showPage("practicePage");
}

function openPracticeBoard(index) {
  document.getElementById("practiceText").textContent = practiceBoards[index].text;
  document.getElementById("practiceImage").src = practiceBoards[index].image;
  showPage("practiceBoardPage");
}
 
