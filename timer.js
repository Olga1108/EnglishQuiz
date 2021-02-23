

// timer
function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
 
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}
 
function initializeClock(id, endtime) {
    let clock = document.getElementById(id);
  
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');
 
function updateClock() {
    let t = getTimeRemaining(endtime);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    submitButton.onclick = (e) => {
    e.preventDefault();
    clearInterval(timeinterval);
      clock.innerHTML = '';
      showResults();
  }
    if (t.total <= 0) {
      clearInterval(timeinterval);
      clock.innerHTML = '';
      showResults();
    }
  }
 
  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
  return timeinterval;
}

 
let deadline = new Date(Date.parse(new Date()) + 60 * 1000);
//initializeClock('countdown', deadline);
const btnStart = document.getElementById('btnStart');
btnStart.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    initializeClock('countdown', deadline);
    buildQuiz();
    localStorage.setItem('timeinterval', initializeClock('countdown', deadline));
}
const btnGradeMe = document.getElementById('submit');

window.onload = function () {
    localStorage.removeItem('answers')
}