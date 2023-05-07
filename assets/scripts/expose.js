// expose.js

window.addEventListener('DOMContentLoaded', init);


function init() {
  const img = document.querySelector("img");
  const horn_select = document.getElementById("horn-select");
  const vlm = document.getElementById("volume");
  const audio = document.querySelector("audio");
  const button = document.querySelector("button");
  const jsConfetti = new JSConfetti()



  function changeHorn() {
    let horn = horn_select.value;
    img.src="assets/images/"+horn+".svg";
    audio.src="assets/audio/"+horn+".mp3";
  }
  

  function change_volume() {
    let volume = vlm.value;
    if (volume == 0){
      document.querySelector('#volume-controls img').src="assets/icons/volume-level-0.svg";
    }else if(volume >= 1 && volume < 33){
      document.querySelector('#volume-controls img').src="assets/icons/volume-level-1.svg";
    }else if(volume>=33 && volume<67){
      document.querySelector('#volume-controls img').src="assets/icons/volume-level-2.svg";
    }else{
      document.querySelector('#volume-controls img').src="assets/icons/volume-level-3.svg";
    }
    audio.volume = volume/100;
  }


  function play_audio(){
    if(horn_select.value!="select"){
      if(horn_select.value=="party-horn"){
        jsConfetti.addConfetti()
      }
      audio.play();
    }
  }

  horn_select.addEventListener("change", changeHorn);
  vlm.addEventListener("input", change_volume);
  button.onclick = play_audio;

}