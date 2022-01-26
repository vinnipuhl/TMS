/**
 * Основная трудность может заключаться в правильном рассчете времени. Для этого надо использовать setInterval.
 * При запуске функции start() мы должны сохранять время Date.now() в переменную startTime.
 * Date.now() возвращает кол-во миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC.
 * Внутри фукнции start() должен быть setInterval который каждые 10мс будет отнимать от текущего Date.now() сохраненное значения Date.now (которое в переменной startTime) и обновлять значение переменной lastTime
 * В таком случае мы получим разницу между стартом таймера и текущим временем в миллисекундах, которая будет храниться в переменной lastTime
 * Далее конвертируем это значение в нужный нам формат с помощью функции timeToString
 */

// Функция конвертации времени. В качестве аргумента принимает время в миллисекундах.
function timeToString(time) {
  let diffInHrs = time / 3600000; // В 1 часе 3600000 миллисекунд. Разделив наше время на это число мы получим значение в часах.
  let hh = Math.floor(diffInHrs); // Округляем значение

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}


let startTime;
let lastTime = 0;
let interval;

let lapArray = [];

const value = document.querySelector('.value');
const startCont = document.querySelector('.controls-initial');
const lapPauseCont = document.querySelector('.controls-active');
const resetStartCont = document.querySelector('.controls-paused');
const startButtons = document.querySelectorAll('.button--start');


function start(){
  startTime = Date.now() - lastTime;
  interval = setInterval(() => {
    lastTime = Date.now() - startTime;
    value.innerHTML = timeToString(lastTime);
  }, 10)

  startCont.classList.add('hidden')
  lapPauseCont.classList.remove('hidden')
  resetStartCont.classList.add('hidden')
}

for (let i of startButtons){
  i.addEventListener('click', start);
}


function lap(){
  document.querySelector('.table-row').insertAdjacentHTML('beforebegin', `
  <div class="table-row">
      <div class="table-cell">Круг ${lapArray.length + 1}</div>
      <div class="table-cell">${timeToString(lastTime)}</div>
    </div>
  `);
  lapArray.push(timeToString(lastTime));
}

const lapButton = document.querySelector('.button--lap')
lapButton.addEventListener('click', lap);


function stop(){
  clearInterval(interval);
  lapPauseCont.classList.add('hidden')
  startCont.classList.add('hidden')
  resetStartCont.classList.remove('hidden')
}

const pauseButton = document.querySelector('.button--pause')
pauseButton.addEventListener('click', stop);


function reset(){
  lastTime = 0;
  lapArray = [];
  let arr = Array.from(document.querySelectorAll('.table-cell'));
  arr.map(function(item, index, array){
    item.remove();
  })
  value.innerHTML = timeToString(lastTime);
  resetStartCont.classList.add('hidden')
  startCont.classList.remove('hidden')
}

const resetButton = document.querySelector('.button--reset')
resetButton.addEventListener('click', reset);