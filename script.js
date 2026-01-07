let lessonStep = 0;

const lessons = [
  {
    text: "Welcome to InteractiveSpectroscopy.com! Here you’ll learn the basics of NMR spectroscopy and how chemists use it to analyze molecules. Click anywhere on the board to move through the lesson.",
    image: "images/lesson1.png",
    bubbleImage: "images/bubble1.png",
    audio: "images/audio1.mp3"
  },
  {
    text: "Before focusing on NMR, let’s define spectroscopy more broadly. Spectroscopy is the study of how electromagnetic radiation interacts with matter. Many types exist, including X-ray, infrared, and visible-light spectroscopy.",
    image: "images/lesson2.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio2.mp3"
  },
  {
    text: "Spectroscopy is widely used to determine chemical composition. In wet-lab chemistry, light spectroscopy can track reaction rates by measuring absorbance. In geology and NASA missions, spectroscopy reveals what materials are present in distant samples.",
    image: "images/lesson3.png",
    bubbleImage: "images/bubble3.png",
    audio: "images/audio3.mp3"
  },
  {
    text: "A key concept in spectroscopy is the spectrum. When electromagnetic waves interact with a sample, the response can be plotted versus wavelength or frequency. This plot — the spectrum — contains structural information.",
    image: "images/lesson4.png",
    bubbleImage: "",
    audio: "images/audio4.mp3"
  },
  {
    text: "This lesson focuses on Nuclear Magnetic Resonance (NMR) spectroscopy. NMR uses low-energy radio waves to probe atomic nuclei and is widely used in chemistry to identify molecules and functional groups.",
    image: "images/lesson5.png",
    bubbleImage: "images/bubble5.png",
    audio: "images/audio5.mp3"
  }
];

const practiceBoards = [
  {
    text: "Identify unique proton environments in the molecule shown.",
    image: "images/practice1.png"
  },
  {
    text: "Predict splitting patterns based on neighboring protons.",
    image: "images/practice2.png"
  },
  {
    text: "Estimate chemical shifts using functional group information.",
    image: "images/practice3.png"
  }
];

function showPage(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.add("hidden");
  });
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

  const blackboard = document.querySelector(".blackboard");
  const bubbleImage = document.getElementById("bubbleImage");
  const lessonImage = document.getElementById("lessonImage");
  const boardContent = document.querySelector(".board-content");

  // Text
  document.getElementById("lessonText").textContent = lesson.text;

  // Main spectrum image
  lessonImage.src = lesson.image;

  // Align spectrum with bubble image (TOP, not centered)
  boardContent.style.alignItems = "flex-start";
  boardContent.style.paddingTop = "10px";

  // Bubble image behavior
  if (lesson.bubbleImage && lesson.bubbleImage !== "") {
    bubbleImage.src = lesson.bubbleImage;
    bubbleImage.style.display = "block";

    // Prevent bubble image from exceeding blackboard height
    const blackboardHeight = blackboard.clientHeight;
    bubbleImage.style.maxHeight = `${blackboardHeight * 0.35}px`;
    bubbleImage.style.objectFit = "contain";
  } else {
    bubbleImage.style.display = "none";
  }

  // Audio narration
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
  document.getElementById("practiceText").textContent =
    practiceBoards[index].text;
  document.getElementById("practiceImage").src =
    practiceBoards[index].image;
  showPage("practiceBoardPage");
}

function peakInfo(label) {
  document.getElementById("lessonText").textContent =
    `You clicked a peak associated with ${label} protons. Peaks provide structural information in NMR spectra.`;
}
