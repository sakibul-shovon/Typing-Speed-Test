document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet, making it a popular tool for testing typewriters and fonts. Try typing it quickly and accurately!",
    "In a quiet village nestled between the mountains, the air is crisp and fresh. The morning sun casts a golden hue over the rooftops, and the scent of blooming flowers fills the air.",
    "Technology is rapidly evolving, bringing new innovations to every corner of our lives. From smartphones to smart homes, our world is becoming increasingly connected and automated.",
    "Reading books is a gateway to new worlds and ideas. Whether you're exploring a fantasy realm or diving into a historical account, books have the power to transport you far beyond the confines of your everyday life.",
    "The ocean waves crash against the shore, a rhythmic dance that has persisted for millions of years. Seagulls circle overhead, their cries mingling with the sound of the surf. It's a scene of timeless beauty and serenity.",
  ];

  const quoteDisplay = document.getElementById("quote");
  const startButton = document.getElementById("start-test");
  const inputBox = document.getElementById("input-box");
  const resultDisplay = document.getElementById("result-div");
  const timerDisplay = document.getElementById("timer-display");
  const timerButtons = document.querySelectorAll(".timer-options .button-74");

  let currentQuote = "";
  let startTime;
  let countdownInterval;
  let selectDuration = 0;
  let correctWordCount = 0;

  // Highlight the selected button 
  timerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      timerButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectDuration = parseInt(button.getAttribute("data-duration"));
    });
  });

  startButton.addEventListener("click", startTest);
  inputBox.addEventListener("input", checkInput);

  function startTest() {
    if (selectDuration === 0) {
      alert("Please select a timer duration first!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    quoteDisplay.textContent = ""; 
    inputBox.value = ""; // Clear input field
    inputBox.removeAttribute("disabled");
    inputBox.focus();
    startTime = new Date().getTime();
    correctWordCount = 0; 
    displayQuoteWithHighlight(); 
    startTimer(selectDuration);
  }

  function startTimer(duration) {
    let timeRemaining = duration;
    timerDisplay.textContent = `Timer: ${timeRemaining}s`;

    countdownInterval = setInterval(() => {
      timeRemaining--;
      timerDisplay.textContent = `Timer: ${timeRemaining}s`;

      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        timerDisplay.textContent = "Time's up!";
        inputBox.setAttribute("disabled", true);
        calculateWPM();
      }
    }, 1000);
  }

  function checkInput() {
    const typedText = inputBox.value;
    displayQuoteWithHighlight(typedText);

    if (typedText.endsWith(" ") || typedText === currentQuote) {
      const wordsTyped = typedText.trim().split(" ");
      const lastTypedWord = wordsTyped[wordsTyped.length - 1];
      const correspondingWord = currentQuote.split(" ")[wordsTyped.length - 1];
      if (lastTypedWord === correspondingWord) {
        correctWordCount++;
      }
    }

    if (typedText === currentQuote) {
      clearInterval(countdownInterval);
      calculateWPM();
    }
  }

  function displayQuoteWithHighlight(typedText = "") {
    const characters = currentQuote.split("").map((char, index) => {
      const typedChar = typedText[index];
      const className =
        typedChar == null
          ? ""
          : typedChar === char
          ? "correct"
          : "incorrect";
      return `<span class="${className}">${char}</span>`;
    });
    quoteDisplay.innerHTML = characters.join("");
  }

  function calculateWPM() {
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000 / 60; 
    const wordsPerMinute = correctWordCount / timeTaken;
    resultDisplay.textContent = `${wordsPerMinute.toFixed(2)} WPM`;
  }
});
