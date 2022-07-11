// Основной JS код приложения
// ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ: Было бы очень круто, если бы в данном приложении мы применили "компонентный" подход
// Суть заключается в том, что бы создать папку components, а в ней для каждого 'компонента' создать отдельный файл с функцией
// Эта функция должна принимать необходимые ей данный, а затем возвращать заполненный HTML код. P.S. конструируем HTML с помощью шаблонных строк ``
// После описания функции ее необходимо экспортировать, а что бы ее использовать в основном коде необходимо соответственно сделать import 
// После этого элемент c помощью JS вставляется в HTML.
// Все "компоненты" я пометил в HTML с помощью аттрибута data-component
// В таком случае у нас HTML файл изначально будет практически пустым. Основные HTML элементы мы будем создавать и вставлять через JS.
// Все стили прописаны в файле index.css, главное сохранить html структуру и классы. Просто аккуратно скопировать код из index.html :) 
// Пример использования: 
/*
import Forecast from './components/forecast.js'

const initializeForecast = () => {
  const forecastContainer = Forecast(); // Передаем необходимые аргументы, например массив элементов полученный с API. В переменную forecastContainer у нас поместится html код компонента
  const forecastPlace = document.querySelector('.forecast-place'); // Место, в которое будем вставлять компонент
  forecastPlace.insertAdjacentHTML('afterbegin', forecastContainer); // Собственно метод "вставки"
}
 */


//объявление даты
const valueDate = document.querySelector('.today-value');

function addNewDate(){
  let data = new Date(Date.now());
  function getFullDate(){
    return `${data.getUTCDate().toString().padStart(2, '0')}.${(data.getUTCMonth()+1).toString().padStart(2, '0')}.${data.getUTCFullYear()}` //исправить ноль дня и мес
  }
  valueDate.innerHTML = getFullDate();
}
addNewDate()

//блок работы ввода Города
const errorInput = document.querySelector('.error');
const inputCity = document.querySelector('.input');
const buttonSearch = document.querySelector('.button-search');
const geoButton = document.querySelector('.button-geolocation');

//генерация API_URl
const API_KEY = '04527021658c1646a461ebbbc59d599e';

function createUrlApi(city, units){
    return `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
}

//блок с основной погодой
const containerMain = document.querySelector('.container-main');

//аним загрузка
function loader(){
  containerMain.insertAdjacentHTML('afterbegin',  `
    <img src="./images/loading.svg" class="loader"></img> 
  `)
}

function getTime(data){
  const time = new Date(data * 1000)
  const hours = time.getHours().toString();
  const min = time.getMinutes().toString();
  return `${hours}:${min}`
}

function getTemp(temp){
  return `${Math.round(temp)}`
}

let arr = [];

//контент блок погоды на день
function getMainBlock(result){
  containerMain.insertAdjacentHTML('afterbegin', `
    <div class="main-body">
      <div class="main-info" data-component >
        <div class="city">
          <span class="uppercase">${inputCity.value}</span> 
          <span class="type">${result.weather[0].main}</span>
        </div>
        <img class="icon" src="http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png" />
        <div class="temp">
          <div class="temp-value">
            <div class="temp-main">${getTemp(result.main.temp)}</div> 
            <div class="temp-controls">
              <button class="temp-type temp-type-active Tc-temp">°C</button>
              <span>|</span>
              <button class="temp-type Tf-temp">°F</button>
            </div>
          </div>
          <div>(min. ${getTemp(result.main.temp_min)} °C / max. ${getTemp(result.main.temp_max)} °C)</div> 
        </div>
      </div>
      <div class="info" data-component>
        <div class="info-row" data-component>
          <div class="info-row-label">Wind</div>
          <div class="info-row-value">${result.wind.speed} m/s</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Humidity</div>
          <div class="info-row-value">${result.main.humidity} %</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Pressure</div>
          <div class="info-row-value">${result.main.pressure} mb</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Clound</div>
          <div class="info-row-value">${result.clouds.all} %</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Sunrise</div>
          <div class="info-row-value">${getTime(result.sys.sunrise)}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Sunset</div>
          <div class="info-row-value">${getTime(result.sys.sunset)}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Visibility</div>
          <div class="info-row-value">${result.visibility} km</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">Rain</div>
          <div class="info-row-value">${result?.rain || result?.snow || '0'} mm</div>
        </div>
      </div>
    </div>
  </div>
  `)

  //переключение фаренгейт
  const tempFar = document.querySelector('.Tf-temp');
  const tempCel = document.querySelector('.Tc-temp');

  tempFar.addEventListener('click', () => {
    tempFar.classList.add('temp-type-active');
    tempCel.classList.remove('temp-type-active');
  })
  tempCel.addEventListener('click', () => {
    tempFar.classList.remove('temp-type-active');
    tempCel.classList.add('temp-type-active');
  })
}

//запрос
async function getCurrentW(url){
  try{
    loader();
    inputCity.setAttribute('disabled', 'disabled');
    buttonSearch.setAttribute('disabled', 'disabled');
    const response = await fetch(url);
    const resultCurr = await response.json();
    const loadImg = document.querySelector('.loader');
    if(response.ok){
      setTimeout(() => {
      loadImg.classList.add('hidden');
      getMainBlock(resultCurr);
    }, 500)
    }
    console.log(resultCurr); 
  } catch (err) {
      errorInput.classList.remove('hidden');
      console.log(err.name);
      console.log(err.massage);
  } finally {
    inputCity.removeAttribute('disabled');
    buttonSearch.removeAttribute('disabled');
  }
}

//ивенет вызова запросов и блоков
buttonSearch.addEventListener('click', () => {
  getCurrentW(createUrlApi(inputCity.value, 'metric')); //вызов запроса
  containerMain.classList.remove('hidden');
})

geoButton.addEventListener('click', () => {
  let geo = navigator.geolocation;
  console.log(geo)
})

//блок с погодой на пару дней
const containerForecast = document.querySelector('.container-forecast');

function getDaysWeather(){
  return `
  <div class="container-title">16-day forecast</div>
    <div class="forecast">
      <div class="forecast-item" data-component>
        <div class="fotecast-item-date">Today</div>
        <div class="fotecast-item-type">Clouds</div>
        <img class="forecast-item-icon" src="http://openweathermap.org/img/wn/02d@2x.png"></img>
        <div class="forecast-item-temp">17 °C / 8 °C</div>
      </div>
      <div class="forecast-item">
        <div class="fotecast-item-date">Mon, May 16</div>
        <div class="fotecast-item-type">Clouds</div>
        <img class="forecast-item-icon" src="http://openweathermap.org/img/wn/02d@2x.png"></img>
        <div class="forecast-item-temp">17 °C / 8 °C</div>
      </div>
      <div class="forecast-item">
        <div class="fotecast-item-date">Tue, May 17</div>
        <div class="fotecast-item-type">Clouds</div>
        <img class="forecast-item-icon" src="http://openweathermap.org/img/wn/02d@2x.png"></img>
        <div class="forecast-item-temp">17 °C / 8 °C</div>
      </div>
      <div class="forecast-item">
        <div class="fotecast-item-date">Wed, May 12</div>
        <div class="fotecast-item-type">Clouds</div>
        <img class="forecast-item-icon" src="http://openweathermap.org/img/wn/02d@2x.png"></img>
        <div class="forecast-item-temp">17 °C / 8 °C</div>
      </div>
      <div class="forecast-item">
        <div class="fotecast-item-date">Thu, May 13</div>
        <div class="fotecast-item-type">Clouds</div>
        <img class="forecast-item-icon" src="http://openweathermap.org/img/wn/02d@2x.png"></img>
        <div class="forecast-item-temp">17 °C / 8 °C</div>
      </div>
      <div class="forecast-item">
        <div class="fotecast-item-date">Fri, May 14</div>
        <div class="fotecast-item-type">Clouds</div>
        <img class="forecast-item-icon" src="http://openweathermap.org/img/wn/02d@2x.png"></img>
        <div class="forecast-item-temp">17 °C / 8 °C</div>
      </div>
      <div class="forecast-item">
        <div class="fotecast-item-date">Sat, May 15</div>
        <div class="fotecast-item-type">Clouds</div>
        <img class="forecast-item-icon" src="http://openweathermap.org/img/wn/02d@2x.png"></img>
        <div class="forecast-item-temp">17 °C / 8 °C</div>
      </div>
      <div class="forecast-item">
        <div class="fotecast-item-date">Sun, May 16</div>
        <div class="fotecast-item-type">Clouds</div>
        <img class="forecast-item-icon" src="http://openweathermap.org/img/wn/02d@2x.png"></img>
        <div class="forecast-item-temp">17 °C / 8 °C</div>
      </div>
    </div>
  `
}

//прооверка 16-дн блока
// setTimeout(() => {
//   containerForecast.classList.remove('hidden');
//   containerForecast.insertAdjacentHTML('afterbegin', getDaysWeather());
// 0
// },10000)