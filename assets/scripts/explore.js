// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const inputForm = document.querySelector("main");
  const inputTxt = document.getElementById("text-to-speak");
  const voiceSelect = document.getElementById('voice-select');
  // const pitch = document.querySelector("#pitch");
  // const pitchValue = document.querySelector(".pitch-value");
  // const rate = document.querySelector("#rate");
  // const rateValue = document.querySelector(".rate-value");
  const voices = synth.getVoices();
  const button = document.querySelector("button");

  function populateVoiceList() {
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  
  populateVoiceList();
  if (
    typeof speechSynthesis !== "undefined" &&
    speechSynthesis.onvoiceschanged !== undefined
  ) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }


  function pressSpeak() {
    if (inputTxt.value !== "") {
      const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
      utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend");
      };
      utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror");
      };
      const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
      for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
          break;
        }
      }
      // utterThis.pitch = pitch.value;
      // utterThis.rate = rate.value;
      synth.speak(utterThis);
      utterThis.onstart = function (event) {
        document.querySelector("img").src = "assets/images/smiling-open.png";
      }
      utterThis.onend = function (event) {
        document.querySelector("img").src = "assets/images/smiling.png";
      }
    }
  }

  inputForm.onsubmit = function (event) {
    event.preventDefault();
    pressSpeak();
    inputTxt.blur();
  };

  voiceSelect.onchange = function () {
    pressSpeak();
  };

  button.onclick = function () {
    pressSpeak();
  };
}