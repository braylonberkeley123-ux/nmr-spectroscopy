/* ============================================================
   LEARNSPECTROSCOPY.COM — SCRIPT
   ============================================================ */

const STORAGE_KEY = "ls_progress_v1";

let lessonStep = 0;
let quizAnswered = false;

let practiceIndex = 0;
let practiceStep = 0;
let practiceQuizAnswered = false;

let audioPrimed = false;

/* Each lesson is either:
   - an info step: { text, image, bubbleImage, audio, chapter? }
   - a quiz step:  { type: "quiz", text, options, correctIndex,
                      feedbackCorrect, feedbackIncorrect }
   Quiz steps are genuine comprehension checks built from the
   narration that precedes them (not tied to a specific diagram),
   so they can be graded honestly. */

const lessons = [
  {
    chapter: "Introduction",
    text: "Welcome to LearnSpectroscopy.com! Here you’ll learn the basics of NMR spectroscopy and how chemists use it to analyze molecules. Click anywhere on the board to move through the lesson.",
    image: "images/lesson1.png",
    bubbleImage: "",
    audio: "images/audio1.mp3"
  },
  {
    text: "Before diving into NMR, let’s define spectroscopy more broadly. Spectroscopy is the study of how electromagnetic radiation interacts with matter. Many forms of spectroscopy exist, including X-ray, infrared, and visible-light spectroscopy, among others.",
    image: "images/lesson2.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio2.mp3"
  },
  {
    text: "Spectroscopy is widely used to determine chemical composition and structure. In experimental chemistry, optical spectroscopy can determine reaction rates by measuring absorbance. In space exploration, spectroscopy reveals what materials are present in distant geological bodies like mars or the moon!",
    image: "images/lesson3.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio3.mp3"
  },
  {
    text: "A key concept in spectroscopy is the spectrum. When electromagnetic waves interact with a sample, each wavelength or frequency of light can be plotted against the “response” it induces in a chemical. This plot — the spectrum — contains information about the sample’s structure.",
    image: "images/lesson4.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio4.mp3"
  },
  {
    chapter: "What Is NMR?",
    text: "This lesson focuses on Nuclear Magnetic Resonance (NMR) spectroscopy. NMR uses low-energy radio waves to probe atomic nuclei and is widely used in chemistry to identify molecules and functional groups.",
    image: "images/lesson5.png",
    bubbleImage: "",
    audio: "images/audio5.mp3"
  },
  {
    chapter: "Spin & Resonance",
    text: "NMR works because certain nuclei have a property called spin. Nuclei with an odd number of protons and/or neutrons have non-zero spin and therefore magnetic properties. Common nuclei studied include ¹H and ¹³C.",
    image: "images/lesson6.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio1.mp3"
  },
  {
    text: "Each nuclei with a non-zero spin can be thought of as microscopic magnet, with its own north and south pole. When placed in a strong magnetic field, these magnetic nuclei align with or against the field, depending on which face of the magnetic dipole aligns with the magnetic field. This forms two spin states.",
    image: "images/lesson7.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio2.mp3"
  },
  {
    text: "Applying radio-frequency energy of the correct amount can flip the spin of the nucleus. We denote the spin as being either ½ or -½ depending on the orientation of the nucleus. This “flipping event” is core to the study of NMR. (Note: the reasoning for the specific integer, ½, is derived from quantum mechanics. We won’t explore why this is the case, as it is not essential to understanding how to apply NMR for most applications).",
    image: "images/lesson8.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio3.mp3"
  },
  {
    text: "When a nucleus is excited to a higher energy spin state, it absorbs energy from applied radiofrequency electromagnetic radiation. As the nucleus relaxes back to the lower energy state, it emits radiofrequency signals that are detected by the spectrometer in an NMR instrument.",
    image: "images/lesson9.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio4.mp3"
  },
  {
    type: "quiz",
    text: "Quick check: when an excited nucleus relaxes back to its lower-energy spin state, what does it do?",
    options: [
      "Absorbs additional radiofrequency energy",
      "Emits a radiofrequency signal that the spectrometer detects",
      "Releases visible light",
      "Stops spinning entirely"
    ],
    correctIndex: 1,
    feedbackCorrect: "Exactly — that emitted RF signal is what the NMR spectrometer actually measures.",
    feedbackIncorrect: "Not quite — on relaxation, the nucleus emits an RF signal, and that's what the spectrometer detects."
  },
  {
    text: "The amount of energy required to induce a spin flip depends on the nucleus being studied, and the local environment around the nucleus. This is something we will dive more deeply into shortly.",
    image: "images/lesson10.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio5.mp3"
  },
  {
    text: "To briefly recap what we just learned: Low frequency radio waves are applied to nuclei in the presence of a strong magnetic field. These electromagnetic waves stimulate spin flips in specific isotopes with a nonzero spin. The excitation and subsequent relaxation of spin flips forces nuclei to release energy as radio waves. These waves can be detected as a spectrum in the spectrometer apparatus of the NMR machine.",
    image: "images/lesson11.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio1.mp3"
  },
  {
    chapter: "Chemical Shift",
    text: "Great! Now let’s examine what causes the differences in energy levels that lead to spin flips. While many factors influence spin behavior across different elemental isotopes, we will focus on hydrogen-1. This isotope is present in nearly all organic molecules, is the most commonly analyzed nucleus in NMR spectroscopy, and provides a foundation that can be readily extended to other nuclei once its principles are understood.                                To clarify, the remainder of this lesson will focus on ¹H NMR spectroscopy—a technique in which radiofrequency radiation is tuned to induce spin flips in hydrogen nuclei, and ignoring all other atoms. This method exploits the omnipresence and high natural abundance of ¹H nuclei to identify and quantify chemical environments in organic molecules.",
    image: "images/lesson12.png",
    bubbleImage: "",
    audio: "images/audio2.mp3"
  },
  {
    text: "Electron density around a nucleus alters the magnetic field it experiences. Nuclei surrounded by more electron density are said to be shielded and require less energy to undergo a spin flip.",
    image: "images/lesson13.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio3.mp3"
  },
  {
    text: "Unlike other forms of spectroscopy, NMR requires the use of the ppm scale instead of frequency or wavelength. This is because the resonance frequency of a nucleus depends directly on the strength of the external magnetic field, which can vary between instruments and even slightly over time. Expressing them in ppm normalizes the data so spectra can be compared across different instruments.",
    image: "images/lesson14.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio4.mp3"
  },
  {
    text: "This shielding effect leads to chemical shift on the resultant NMR spectrum. In essence, chemical shift reflects how electronically shielded a nucleus is, and it determines where a signal appears along the x-axis of an NMR spectrum. Note that terms upfield and downfield simply refer to the relative positions on the x-axis. In this way, the differences in energy levels required to induce spin flips can be visualized graphically and tell us something about a sample molecule.",
    image: "images/lesson15.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio5.mp3"
  },
  {
    type: "quiz",
    text: "Quick check: a nucleus that is more shielded by electron density requires ___ energy to flip, and its signal appears ___ on the spectrum.",
    options: [
      "More energy; downfield",
      "Less energy; upfield",
      "Less energy; downfield",
      "More energy; upfield"
    ],
    correctIndex: 1,
    feedbackCorrect: "Right — more shielding means less energy is needed to flip, so the signal shows up upfield.",
    feedbackIncorrect: "Not quite — more shielding means less energy is needed, which places the signal upfield."
  },
  {
    text: "For example, given these two molecules, where would you expect to find each signal? At 1 or 2? Take a moment to consider, then click anywhere on screen to see if you are correct!",
    image: "images/lesson16.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio1.mp3"
  },
  {
    text: "Great job! Since local electronegative atoms will “hog” the electron density around hydrogen atoms in polar molecules, their signal will be deshielded and appear downfield on the chemical shift. The opposite is true for nonpolar molecules, as the electron density tends to stay around the hydrogens resulting in more shielding. This means that less energy must be input to induce a spin flip, and the signal appears upfield.",
    image: "images/lesson17.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio2.mp3"
  },
  {
    chapter: "Equivalence & Symmetry",
    text: "There are a number of key principles we must understand to interpret signals as they appear. First, the number of signals from a given sample molecule corresponds to the number of chemically inequivalent hydrogen-1 nuclei in that molecule. In other words, nuclei in different magnetic environments will give off a distinct signal.",
    image: "images/lesson18.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio3.mp3"
  },
  {
    text: "To determine chemical equivalency, we must consider both connectivity and symmetry. Examine the example molecule below and note any symmetries you observe in its chemical structure. When you are finished with your observations, click anywhere to move forward!",
    image: "images/lesson19.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio4.mp3"
  },
  {
    text: "This molecule has no global planes of symmetry—that is, no axis or plane about which the entire carbon framework can be reflected to produce an identical structure. However, multiple hydrogens attached to the same carbon possess local symmetry. As a result, these hydrogens are chemically equivalent and appear as a single signal in the NMR spectrum.",
    image: "images/lesson20.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio5.mp3"
  },
  {
    text: "Overall, the molecule contains three chemically inequivalent regions. From this, we can form a practical definition of chemical equivalency: nuclei are chemically equivalent if they occupy identical environments as determined by the symmetry of the molecule.",
    image: "images/lesson21.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio1.mp3"
  },
  {
    text: "Let’s try another brief example. Consider the connectivity and symmetry of this molecule to determine its chemically inequivalent regions.",
    image: "images/lesson22.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio2.mp3"
  },
  {
    text: "Nice job! Note that this molecule does have a global plane of symmetry. In other words, it can be reflected across its vertical axis without changing the overall structure. We also have bond symmetry around four of the six carbons in this structure. Unlike the previous molecule, this structure also contains bond symmetry or equivalent bonding environments: the carbons at the ends of the branching structure can be interchanged without altering the molecule. As a result, these carbons—and the nuclei attached to them—are chemically equivalent.",
    image: "images/lesson23.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio3.mp3"
  },
  {
    text: "Overall, this molecule has 2 chemically equivalent regions. Although this molecule is much larger than the other example we just saw, its large amount of symmetry reduces the amount of signals we would expect to see!",
    image: "images/lesson24.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio4.mp3"
  },
  {
    type: "quiz",
    text: "Quick check: two hydrogens are chemically equivalent when...",
    options: [
      "They're on the same molecule, regardless of position",
      "They occupy identical environments as determined by the molecule's symmetry",
      "They have the same mass",
      "They're both attached to carbon"
    ],
    correctIndex: 1,
    feedbackCorrect: "That's the definition — identical environments, as determined by symmetry.",
    feedbackIncorrect: "Close, but not quite — equivalence comes down to occupying identical environments, as determined by symmetry."
  },
  {
    chapter: "Integration & Multiplicity",
    text: "Another feature of 1H NMR signals is integrals and multiplicity. The integral is the area under the curve of a signal, and is proportional to the number of nuclei causing that signal. The multiplicity is the peak shape of a given signal and provides information on neighboring nuclei adjacent to a chemically inequivalent region.",
    image: "images/lesson25.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio5.mp3"
  },
  {
    text: "For instance, if 6 nuclei existed in the same magnetic environment, we would expect an integral of 6, and thus a larger area under the signal curve. If only 3 nuclei existed in the same magnetic environment, we would expect an integral of 3. Simple!",
    image: "images/lesson26.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio1.mp3"
  },
  {
    text: "Multiplicity, on the other hand, is more complex. The central idea is this: surrounding chemically inequivalent nuclei cause a nucleus’s signal to split. For nuclei to be considered “surrounding,” they must be three or fewer bonds away, typically on adjacent carbons.                     The appearance of a signal can be determined using the following steps: Count the number of chemically inequivalent neighboring hydrogens for the region of interest. Apply the 𝑛 + 1 n+1 rule by adding one to this number. Match the resulting value to its corresponding splitting pattern (e.g., doublet, triplet, quartet).",
    image: "images/lesson27.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio2.mp3"
  },
  {
    type: "quiz",
    text: "Quick check: a proton has 3 chemically inequivalent neighboring hydrogens. Applying the n + 1 rule, what splitting pattern should you expect?",
    options: [
      "Doublet (2 lines)",
      "Triplet (3 lines)",
      "Quartet (4 lines)",
      "Quintet (5 lines)"
    ],
    correctIndex: 2,
    feedbackCorrect: "3 neighbors + 1 = 4, so it's a quartet.",
    feedbackIncorrect: "Remember the rule: neighbors + 1. With 3 neighbors, that's 3 + 1 = 4 → a quartet."
  },
  {
    text: "Let’s try an example, do your best to fill in the table based on the molecule here. When finished, click anywhere to compare your answers!",
    image: "images/lesson28.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio3.mp3"
  },
  {
    text: "Nice job!",
    image: "images/lesson29.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio4.mp3"
  },
  {
    text: "The N + 1 rule breaks down when we deal with more complex cases of multiplicity. For this, we need to apply the N+1 rule separately for each neighbor, then combine the names.",
    image: "images/lesson30.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio5.mp3"
  },
  {
    text: "Let’s try another example using a slightly more complex case. Do your best to fill in the table based on the molecule here. When finished, click anywhere to compare your answers!",
    image: "images/lesson31.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio1.mp3"
  },
  {
    text: "Nice job! After applying your knowledge of multiplicity, and performing the N+1 rule separately, you should have come up with the expected signal table seen here.",
    image: "images/lesson32.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio2.mp3"
  },
  {
    chapter: "Splitting Trees",
    text: "A key concept in NMR multiplicity is the splitting tree, which helps visualize and predict signal patterns. An unsplit signal is represented as a single line that branches each time it encounters a neighboring chemically inequivalent hydrogen. These branches do not recombine, and the final branches form the peaks of the expected NMR signal. This model also helps explain more complex splitting patterns. Note that the distance between branching events is known as the coupling constant.",
    image: "images/lesson33.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio3.mp3"
  },
  {
    type: "quiz",
    text: "Quick check: in a splitting tree diagram, what does the distance between branching events represent?",
    options: [
      "The chemical shift",
      "The integration value",
      "The coupling constant",
      "The number of neighboring hydrogens"
    ],
    correctIndex: 2,
    feedbackCorrect: "Right — that spacing is the coupling constant, usually measured in Hz.",
    feedbackIncorrect: "Not quite — the spacing between branches in a splitting tree is the coupling constant."
  },
  {
    text: "Let’s try this splitting pattern with the example molecule from earlier. Use the splitting tree to predict the appearance of the multiplet Hc, given a coupling constant Jac = 6 Hz and J BC = 12 Hz.",
    image: "images/lesson34.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio4.mp3"
  },
  {
    text: "Great job! The multiplicity obtained by our splitting tree matches the quartet multiplicity we obtained in the previous example.",
    image: "images/lesson35.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio5.mp3"
  },
  {
    text: "Now that we understand chemical inequivalence, chemical shifts, multiplicity, and integration, it is important to recognize that additional local magnetic environments can further influence a proton’s position in an NMR spectrum. For example, hydrogens attached to alkenes, benzene rings, aldehydes, and other functional groups experience characteristic shifts. These typical ranges are best identified by consulting a ¹H NMR chemical shift table as shown above.",
    image: "images/lesson36.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio1.mp3"
  },
  {
    chapter: "Putting It Together",
    text: "Congratulations! You’ve just learned the fundamentals of NMR spectroscopy and how to predict the spectra of organic molecules. In the next brief example, you’ll apply this knowledge to match a sample NMR spectrum to the hydrogens on a given chemical structure.",
    image: "images/lesson37.png",
    bubbleImage: "",
    audio: "images/audio2.mp3"
  },
  {
    text: "Take a moment to determine which regions of the spectrum correspond to each region of the molecule, and label them on the structure. Note that the umbrella symbol indicates that regions C and D are interchangeable, but they should still be labeled with different letters due to a lack of symmetry. Click anywhere on the board to see the correct answers!",
    image: "images/lesson38.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio3.mp3"
  },
  {
    text: "Great job! This example highlights the importance of multiplicity, chemical shifts, integration, and the other tools we’ve learned. By carefully analyzing the regions of an NMR spectrum, it is possible to reconstruct the structure of a molecule using these fundamental principles alone. Pretty cool!",
    image: "images/lesson39.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio4.mp3"
  },
  {
    text: "The tools and principles of NMR are everywhere—from pharmaceuticals to geology to chemistry and beyond—and they play a vital role in modern science. Some might even say it’s mesmerizing! We hope you learned a great deal from these lessons and gained an appreciation for the importance of NMR and spectroscopy as a whole.",
    image: "images/lesson40.png",
    bubbleImage: "",
    audio: "images/audio5.mp3"
  },
  {
    text: "This concludes our lesson. To continue practicing your skills, return to the home page and explore the many practice problems available on this website.",
    image: "images/lesson41.png",
    bubbleImage: "images/bubble2.png",
    audio: "images/audio5.mp3"
  }
];

/* Short blurb shown on the homepage roadmap card for each chapter. */
const chapterBlurbs = {
  "Introduction": "Get oriented before diving into the physics.",
  "What Is NMR?": "What NMR is and why chemists use it.",
  "Spin & Resonance": "Nuclear spin, magnetic alignment, and spin flips.",
  "Chemical Shift": "Shielding, the ppm scale, and what moves a signal.",
  "Equivalence & Symmetry": "Counting signals using molecular symmetry.",
  "Integration & Multiplicity": "Reading peak area and splitting patterns.",
  "Splitting Trees": "Predicting multiplets from coupling constants.",
  "Putting It Together": "Apply everything to a full spectrum."
};

/* practiceLessons[0..2] are the original image-based walkthroughs.
   practiceLessons[3..5] are new, fully graded multiple-choice sets.
   They're text-based rather than tied to new custom diagrams, since
   accurate new practice diagrams need real drawn structures/spectra —
   swap in illustrated steps here any time by following the same
   { text, image, bubbleImage } shape used in sets 0–2. */
const practiceLessons = [
  // PRACTICE 1
  [
    {
      text: "Identify all chemically inequivalent proton environments in this molecule.",
      image: "images/practice1_step1.png",
      bubbleImage: "images/bubble2.png"
    },
    {
      text: "Now count how many unique signals you would expect in the ¹H NMR spectrum.",
      image: "images/practice1_step2.png",
      bubbleImage: "images/bubble2.png"
    },
    {
      text: "Correct! This molecule has three unique proton environments.",
      image: "images/practice1_step3.png",
      bubbleImage: "images/bubble2.png"
    }
  ],

  // PRACTICE 2
  [
    {
      text: "Determine the number of neighboring hydrogens for each proton group.",
      image: "images/practice2_step1.png",
      bubbleImage: "images/bubble2.png"
    },
    {
      text: "Apply the n + 1 rule to predict the multiplicity.",
      image: "images/practice2_step2.png",
      bubbleImage: "images/bubble2.png"
    }
  ],

  // PRACTICE 3
  [
    {
      text: "Estimate the chemical shift for each labeled proton.",
      image: "images/practice3_step1.png",
      bubbleImage: "images/bubble2.png"
    },
    {
      text: "Compare your estimates with the reference ranges.",
      image: "images/practice3_step2.png",
      bubbleImage: "images/bubble2.png"
    }
  ],

  // PRACTICE 4 — Chemical Shift Ranges (new, quiz-based)
  [
    {
      type: "quiz",
      text: "Which proton environment typically appears furthest downfield?",
      options: [
        "Alkane C–H (~0.9–1.5 ppm)",
        "Alkyl C–H next to oxygen (~3.3–4.5 ppm)",
        "Aromatic ring C–H (~6.5–8 ppm)",
        "Aldehyde C–H (~9–10 ppm)"
      ],
      correctIndex: 3,
      feedbackCorrect: "Right — aldehyde protons are among the most deshielded common ¹H environments.",
      feedbackIncorrect: "Not quite — aldehyde protons (~9–10 ppm) are the most deshielded of these options."
    },
    {
      type: "quiz",
      text: "A signal appears at about 1.2 ppm. Which environment does that most likely represent?",
      options: [
        "Aromatic ring hydrogen",
        "Simple alkane C–H",
        "Vinyl (alkene) hydrogen",
        "Carboxylic acid O–H"
      ],
      correctIndex: 1,
      feedbackCorrect: "Correct — alkane C–H sits far upfield, typically around 0.9–1.5 ppm.",
      feedbackIncorrect: "Not quite — signals that far upfield (~0.9–1.5 ppm) usually belong to simple alkane C–H."
    },
    {
      type: "quiz",
      text: "Vinyl (alkene, C=C–H) protons and aromatic ring protons are both deshielded by nearby pi systems. Roughly where do vinyl protons usually fall relative to aromatic ones?",
      options: [
        "Further downfield than aromatic protons",
        "Slightly upfield of aromatic protons, typically around 4.5–6.5 ppm",
        "In the exact same range as alkane protons",
        "They never appear on a ¹H spectrum"
      ],
      correctIndex: 1,
      feedbackCorrect: "Right — vinyl protons (~4.5–6.5 ppm) sit upfield of aromatic protons (~6.5–8 ppm).",
      feedbackIncorrect: "Not quite — vinyl protons typically land around 4.5–6.5 ppm, upfield of the aromatic range."
    }
  ],

  // PRACTICE 5 — Multiplicity Rules (new, quiz-based)
  [
    {
      type: "quiz",
      text: "A proton has 4 chemically equivalent neighboring hydrogens. What multiplicity does the n + 1 rule predict?",
      options: ["Triplet", "Quartet", "Quintet", "Sextet"],
      correctIndex: 2,
      feedbackCorrect: "Correct — 4 neighbors + 1 = 5, a quintet.",
      feedbackIncorrect: "Remember: neighbors + 1. With 4 neighbors, 4 + 1 = 5, a quintet."
    },
    {
      type: "quiz",
      text: "A signal shows up as a triplet. How many chemically equivalent neighboring hydrogens does that suggest?",
      options: ["1", "2", "3", "4"],
      correctIndex: 1,
      feedbackCorrect: "Right — a triplet (3 lines) means n + 1 = 3, so n = 2 neighboring hydrogens.",
      feedbackIncorrect: "Work backward from n + 1 = 3: that means n = 2 neighboring hydrogens."
    },
    {
      type: "quiz",
      text: "A proton has no chemically inequivalent neighbors within three bonds. What splitting pattern should it show?",
      options: [
        "Doublet",
        "Triplet",
        "Singlet (unsplit)",
        "Quartet"
      ],
      correctIndex: 2,
      feedbackCorrect: "Correct — with 0 neighbors, n + 1 = 1, meaning a single unsplit peak.",
      feedbackIncorrect: "Not quite — 0 neighbors means n + 1 = 1, a singlet with no splitting."
    }
  ],

  // PRACTICE 6 — Symmetry & Equivalence (new, quiz-based)
  [
    {
      type: "quiz",
      text: "A molecule has a mirror plane that maps one end of a chain perfectly onto the other. What does this mean for the protons on each end?",
      options: [
        "They are chemically equivalent and produce one combined signal",
        "They are always chemically inequivalent",
        "One end will not appear in the spectrum at all",
        "They must have different integrations"
      ],
      correctIndex: 0,
      feedbackCorrect: "Right — mirror-symmetric positions are chemically equivalent and give a single signal.",
      feedbackIncorrect: "Not quite — protons related by a molecule's symmetry are chemically equivalent, producing one shared signal."
    },
    {
      type: "quiz",
      text: "Three hydrogens are attached to the very same carbon (like a methyl group). Are they typically chemically equivalent?",
      options: [
        "No, each one is always distinct",
        "Yes, hydrogens on the same carbon are usually locally equivalent",
        "Only if the molecule has no other atoms",
        "Equivalence doesn't apply within a single carbon"
      ],
      correctIndex: 1,
      feedbackCorrect: "Correct — hydrogens sharing a carbon are generally equivalent by local symmetry, giving one signal.",
      feedbackIncorrect: "Not quite — hydrogens on the same carbon are usually equivalent by local symmetry."
    },
    {
      type: "quiz",
      text: "How many total ¹H NMR signals would you expect from a molecule with 3 chemically inequivalent proton environments?",
      options: ["1", "2", "3", "It can't be determined"],
      correctIndex: 2,
      feedbackCorrect: "Right — the number of signals equals the number of chemically inequivalent environments.",
      feedbackIncorrect: "Not quite — each chemically inequivalent environment produces its own signal, so 3 environments → 3 signals."
    }
  ]
];

/* ---------- PAGE CONTROL ---------- */

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function goHome() {
  pauseAudioSafely();
  refreshContinueBanner();
  showPage("homePage");
}

function openBasics(startStep) {
  lessonStep = typeof startStep === "number" ? startStep : 0;
  populateChapterMenu();
  updateLesson();
  showPage("basicsPage");
}

function resumeLesson() {
  const saved = loadProgress();
  openBasics(saved ? saved.step : 0);
}

function openPractice() {
  pauseAudioSafely();
  showPage("practicePage");
}

/* ---------- PROGRESS PERSISTENCE ---------- */

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: lessonStep, total: lessons.length }));
  } catch (e) {
    /* localStorage unavailable — fail silently, not essential to core function */
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function refreshContinueBanner() {
  const banner = document.getElementById("continueBanner");
  if (!banner) return;
  const saved = loadProgress();
  if (saved && saved.step > 0 && saved.step < lessons.length - 1) {
    document.getElementById("continueBannerText").textContent =
      `Pick up where you left off — Step ${saved.step + 1} of ${lessons.length}.`;
    banner.classList.remove("hidden");
  } else {
    banner.classList.add("hidden");
  }
}

/* ---------- CHAPTER JUMP MENU + HOMEPAGE ROADMAP ---------- */

function populateChapterMenu() {
  const select = document.getElementById("chapterSelect");
  if (!select) return;
  select.innerHTML = "";
  lessons.forEach((lesson, i) => {
    if (lesson.chapter) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = lesson.chapter;
      select.appendChild(opt);
    }
  });
  syncChapterMenu();
}

function syncChapterMenu() {
  const select = document.getElementById("chapterSelect");
  if (!select) return;
  let current = 0;
  lessons.forEach((lesson, i) => {
    if (lesson.chapter && i <= lessonStep) current = i;
  });
  select.value = String(current);
}

function jumpToChapter(value) {
  lessonStep = parseInt(value, 10) || 0;
  updateLesson();
}

function buildRoadmap() {
  const grid = document.getElementById("roadmapGrid");
  if (!grid) return;
  grid.innerHTML = "";
  lessons.forEach((lesson, i) => {
    if (!lesson.chapter) return;
    const card = document.createElement("div");
    card.className = "roadmap-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    const blurb = chapterBlurbs[lesson.chapter] || "";
    card.innerHTML = `<h3>${lesson.chapter}</h3><p>${blurb}</p>`;
    const go = () => openBasics(i);
    card.addEventListener("click", go);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
    grid.appendChild(card);
  });
}

/* ---------- LESSON LOGIC ---------- */

function onBoardClick() {
  const lesson = lessons[lessonStep];
  if (lesson.type === "quiz" && !quizAnswered) return;
  nextLesson();
}

function nextLesson() {
  const lesson = lessons[lessonStep];
  if (lesson.type === "quiz" && !quizAnswered) return;
  if (lessonStep >= lessons.length - 1) {
    openPractice();
    return;
  }
  lessonStep++;
  updateLesson();
}

function prevLesson() {
  if (lessonStep <= 0) return;
  lessonStep--;
  updateLesson();
}

function updateLesson() {
  const lesson = lessons[lessonStep];
  quizAnswered = false;
  saveProgress();
  syncChapterMenu();
  updateProgressUI(lessonStep, lessons.length);

  document.getElementById("lessonText").textContent = lesson.text;

  const bubbleImage = document.getElementById("bubbleImage");
  if (lesson.bubbleImage) {
    bubbleImage.src = lesson.bubbleImage;
    bubbleImage.style.display = "block";
  } else {
    bubbleImage.style.display = "none";
  }

  const quizCard = document.getElementById("quizCard");
  const boardContent = document.getElementById("boardContent");

  if (lesson.type === "quiz") {
    boardContent.classList.add("hidden");
    quizCard.classList.remove("hidden");
    renderQuizInto(
      lesson,
      { question: "quizQuestion", options: "quizOptions", feedback: "quizFeedback" },
      () => {
        quizAnswered = true;
        updateNavButtons(lessonStep, lessons.length, lesson);
      }
    );
  } else {
    quizCard.classList.add("hidden");
    boardContent.classList.remove("hidden");
    document.getElementById("lessonImage").src = lesson.image;
  }

  playLessonAudio(lesson.audio);
  updateNavButtons(lessonStep, lessons.length, lesson);
}

/* Shared multiple-choice quiz renderer, used by both the basics
   lesson board and the new practice quiz sets. */
function renderQuizInto(lesson, ids, onAnswered) {
  const questionEl = document.getElementById(ids.question);
  const optionsEl = document.getElementById(ids.options);
  const feedbackEl = document.getElementById(ids.feedback);

  questionEl.textContent = lesson.text;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "quiz-feedback";

  lesson.options.forEach((optionText, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = optionText;
    btn.addEventListener("click", () => {
      const buttons = optionsEl.querySelectorAll(".quiz-option");
      if (buttons[0] && buttons[0].disabled) return; // already answered
      buttons.forEach((b) => (b.disabled = true));

      if (i === lesson.correctIndex) {
        btn.classList.add("correct");
        feedbackEl.textContent = lesson.feedbackCorrect;
        feedbackEl.classList.add("correct");
      } else {
        btn.classList.add("incorrect");
        buttons[lesson.correctIndex].classList.add("correct");
        feedbackEl.textContent = lesson.feedbackIncorrect;
        feedbackEl.classList.add("incorrect");
      }
      onAnswered();
    });
    optionsEl.appendChild(btn);
  });
}

/* ---------- SHARED PROGRESS UI ---------- */

function updateProgressUI(step, total, prefix) {
  const counterId = prefix ? "practiceStepCounter" : "stepCounter";
  const railId = prefix ? "practiceChalkFill" : "chalkFill";
  const markerId = prefix ? "practiceChalkMarker" : "chalkMarker";

  const counter = document.getElementById(counterId);
  const fill = document.getElementById(railId);
  const marker = document.getElementById(markerId);

  if (counter) counter.textContent = `Step ${step + 1} of ${total}`;

  const pct = total > 1 ? (step / (total - 1)) * 100 : 0;
  if (fill) fill.style.width = pct + "%";
  if (marker) marker.style.left = pct + "%";
}

function updateNavButtons(step, total, lesson) {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (!prevBtn || !nextBtn) return;

  prevBtn.disabled = step <= 0;

  const blockedByQuiz = lesson && lesson.type === "quiz" && !quizAnswered;
  nextBtn.disabled = !!blockedByQuiz;
  nextBtn.textContent = step >= total - 1 ? "Go to Practice →" : "Next ›";
}

/* ---------- AUDIO (hardened against autoplay blocks / load errors) ---------- */

function playLessonAudio(src) {
  const audio = document.getElementById("narration");
  const status = document.getElementById("audioStatus");
  if (!audio) return;

  if (status) status.textContent = "";

  if (!src) {
    audio.removeAttribute("src");
    setPlayIcon(false);
    return;
  }

  audio.src = src;
  try {
    audio.load();
  } catch (e) {
    /* some browsers don't need an explicit load() call — safe to ignore */
  }
  attemptPlay(audio);
}

function attemptPlay(audio) {
  const playAttempt = audio.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt
      .then(() => setPlayIcon(true))
      .catch((err) => {
        setPlayIcon(false);
        // AbortError happens when the src changes mid-play (fast navigation) — harmless.
        if (err && err.name === "NotAllowedError") {
          showAudioStatus("Tap ▶ to hear narration.");
        }
      });
  } else {
    setPlayIcon(true);
  }
}

function pauseAudioSafely() {
  const audio = document.getElementById("narration");
  if (audio && !audio.paused) audio.pause();
}

function toggleAudio() {
  const audio = document.getElementById("narration");
  if (!audio || !audio.src) return;
  if (audio.paused) {
    attemptPlay(audio);
  } else {
    audio.pause();
    setPlayIcon(false);
  }
}

function replayAudio() {
  const audio = document.getElementById("narration");
  if (!audio || !audio.src) return;
  audio.currentTime = 0;
  attemptPlay(audio);
}

function toggleMute() {
  const audio = document.getElementById("narration");
  if (!audio) return;
  audio.muted = !audio.muted;
  const muteBtn = document.getElementById("muteBtn");
  if (muteBtn) {
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";
    muteBtn.setAttribute("aria-pressed", String(audio.muted));
  }
}

function setPlayIcon(isPlaying) {
  const playPauseBtn = document.getElementById("playPauseBtn");
  if (!playPauseBtn) return;
  playPauseBtn.textContent = isPlaying ? "⏸" : "▶";
  playPauseBtn.setAttribute("aria-pressed", String(isPlaying));
}

function showAudioStatus(message) {
  const status = document.getElementById("audioStatus");
  if (status) status.textContent = message;
}

/* Browsers block audio-with-sound until the page has registered a real
   user gesture. Every lesson-advance action here is already a click or
   keypress, but as a defensive first pass we do one silent, muted
   play/pause on the very first interaction anywhere on the page —
   this "warms up" the audio element so the first real narration line
   is far less likely to be blocked. */
function primeAudioOnce() {
  if (audioPrimed) return;
  audioPrimed = true;
  const audio = document.getElementById("narration");
  if (!audio) return;
  try {
    const wasMuted = audio.muted;
    audio.muted = true;
    const p = audio.play();
    if (p && typeof p.catch === "function") {
      p.then(() => {
        audio.pause();
        audio.muted = wasMuted;
      }).catch(() => {
        audio.muted = wasMuted;
      });
    } else {
      audio.muted = wasMuted;
    }
  } catch (e) {
    /* nothing to unlock yet (no src) — fine, real playback still attempts normally later */
  }
}

/* ---------- PRACTICE LOGIC ---------- */

function openPracticeBoard(index) {
  practiceIndex = index;
  practiceStep = 0;
  updatePracticeLesson();
  showPage("practiceBoardPage");
}

function nextPracticeLesson() {
  const lessonSet = practiceLessons[practiceIndex];
  const lesson = lessonSet[practiceStep];
  if (lesson.type === "quiz" && !practiceQuizAnswered) return;
  if (practiceStep >= lessonSet.length - 1) {
    openPractice();
    return;
  }
  practiceStep++;
  updatePracticeLesson();
}

function prevPracticeLesson() {
  if (practiceStep <= 0) return;
  practiceStep--;
  updatePracticeLesson();
}

function updatePracticeLesson() {
  const lessonSet = practiceLessons[practiceIndex];
  const lesson = lessonSet[practiceStep];
  practiceQuizAnswered = false;

  document.getElementById("practiceText").textContent = lesson.text;

  const bubbleImage = document.getElementById("practiceBubbleImage");
  if (lesson.bubbleImage) {
    bubbleImage.src = lesson.bubbleImage;
    bubbleImage.style.display = "block";
  } else {
    bubbleImage.style.display = "none";
  }

  const quizCard = document.getElementById("practiceQuizCard");
  const boardContent = document.getElementById("practiceBoardContent");

  if (lesson.type === "quiz") {
    boardContent.classList.add("hidden");
    quizCard.classList.remove("hidden");
    renderQuizInto(
      lesson,
      { question: "practiceQuizQuestion", options: "practiceQuizOptions", feedback: "practiceQuizFeedback" },
      () => {
        practiceQuizAnswered = true;
        updatePracticeNavButtons(lessonSet.length);
      }
    );
  } else {
    quizCard.classList.add("hidden");
    boardContent.classList.remove("hidden");
    document.getElementById("practiceImage").src = lesson.image || "";
  }

  updateProgressUI(practiceStep, lessonSet.length, "practice");
  updatePracticeNavButtons(lessonSet.length);
}

function updatePracticeNavButtons(total) {
  const lessonSet = practiceLessons[practiceIndex];
  const lesson = lessonSet[practiceStep];
  const prevBtn = document.getElementById("practicePrevBtn");
  const nextBtn = document.getElementById("practiceNextBtn");
  if (!prevBtn || !nextBtn) return;

  prevBtn.disabled = practiceStep <= 0;
  const blocked = lesson.type === "quiz" && !practiceQuizAnswered;
  nextBtn.disabled = !!blocked;
  nextBtn.textContent = practiceStep >= total - 1 ? "Back to Practice Menu" : "Next ›";
}

function onPracticeBoardClick() {
  const lessonSet = practiceLessons[practiceIndex];
  const lesson = lessonSet[practiceStep];
  if (lesson.type === "quiz" && !practiceQuizAnswered) return;
  nextPracticeLesson();
}

/* ---------- KEYBOARD & SWIPE NAVIGATION ---------- */

document.addEventListener("keydown", (e) => {
  const basicsVisible = !document.getElementById("basicsPage").classList.contains("hidden");
  const practiceVisible = !document.getElementById("practiceBoardPage").classList.contains("hidden");

  if (!basicsVisible && !practiceVisible) return;

  if (e.key === "ArrowRight") {
    e.preventDefault();
    basicsVisible ? nextLesson() : nextPracticeLesson();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    basicsVisible ? prevLesson() : prevPracticeLesson();
  } else if (e.key === " " && basicsVisible) {
    e.preventDefault();
    toggleAudio();
  }
});

function setupSwipe(elementId, onLeft, onRight) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let startX = null;

  el.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });

  el.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const deltaX = e.changedTouches[0].clientX - startX;
    const threshold = 50;
    if (deltaX <= -threshold) onLeft();
    else if (deltaX >= threshold) onRight();
    startX = null;
  }, { passive: true });
}

/* ---------- CONTACT EMAIL (basic scraper obfuscation) ---------- */

function setupEmailLink() {
  const el = document.getElementById("contactEmail");
  if (!el) return;
  const user = "braylonberkeley123";
  const domain = "berkeley.edu";
  el.textContent = `${user}@${domain}`;
  el.href = `mailto:${user}@${domain}`;
}

/* ---------- BROKEN IMAGE FALLBACK ----------
   Hides any <img> that fails to load (e.g. homepage/about assets that
   haven't been uploaded yet) instead of showing a broken-image icon. */
function setupImageFallbacks() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.visibility = "hidden";
    });
    img.addEventListener("load", () => {
      img.style.visibility = "visible";
    });
  });
}

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded", () => {
  setupEmailLink();
  refreshContinueBanner();
  buildRoadmap();
  setupImageFallbacks();
  setupSwipe("blackboard", nextLesson, prevLesson);
  setupSwipe("practiceBoardPage", nextPracticeLesson, prevPracticeLesson);

  document.addEventListener("click", primeAudioOnce, { once: true });
  document.addEventListener("keydown", primeAudioOnce, { once: true });

  const audio = document.getElementById("narration");
  if (audio) {
    audio.addEventListener("play", () => setPlayIcon(true));
    audio.addEventListener("pause", () => setPlayIcon(false));
    audio.addEventListener("ended", () => setPlayIcon(false));
    audio.addEventListener("error", () => {
      if (audio.getAttribute("src")) {
        showAudioStatus("Narration audio couldn't be loaded for this step — check the file path.");
      }
    });
  }
});
