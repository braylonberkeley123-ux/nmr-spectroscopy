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
  },
  {
    text: "Nuclei with an odd number of protons and/or neutrons possess spin, a quantum mechanical property that gives them magnetic behavior. Common nuclei studied include ¹H and ¹³C.",
    image: "images/lesson6.png",
    bubbleImage: "",
    audio: "images/audio6.mp3"
  },
  {
    text: "When placed in a strong magnetic field, nuclear spins align with or against the field. Applying radio-frequency energy of the correct amount causes a spin flip — the fundamental NMR transition.",
    image: "images/lesson7.png",
    bubbleImage: "images/bubble7.png",
    audio: "images/audio7.mp3"
  },
  {
    text: "Electron density surrounding a nucleus alters the magnetic field it experiences. Greater shielding means the nucleus requires less energy to flip its spin.",
    image: "images/lesson8.png",
    bubbleImage: "",
    audio: "images/audio8.mp3"
  },
  {
    text: "This leads to chemical shift. In essence, chemical shift reflects electronic shielding and determines where a signal appears on the x-axis of an NMR spectrum.",
    image: "images/lesson9.png",
    bubbleImage: "images/bubble9.png",
    audio: "images/audio9.mp3"
  },
  {
    text: "An NMR spectrum contains several features: the number of signals, their chemical shifts, integrals, and multiplicities. Together, these allow chemists to determine molecular structure.",
    image: "images/lesson10.png",
    bubbleImage: "",
    audio: "images/audio10.mp3"
  }
];

const practiceBoards = [
  { text: "Identify unique proton environments in the molecule shown.", image: "images/practice1.png" },
  { text: "Predict splitting patterns based on neighboring protons.", image: "images/practice2.png" },
  { text: "Estimate chemical shifts using functional group information.", image: "images/practice3.png" }
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

function peakInfo(label) {
  document.getElementById("lessonText").textContent =
    `You clicked a peak associated with ${label} protons. Peaks provide structural information in NMR spectra.`;
}
