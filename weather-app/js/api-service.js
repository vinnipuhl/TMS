// Тут пишем код для обращения к API
// В данном задании мы используем 2 API с openweather
// 1. https://openweathermap.org/current
// 2. https://openweathermap.org/forecast16
// Код для обращения к API через fetch() смотрим по этим ссылкам в документации
// Тут должно быть 2 функции: получение информации о городе (current) и функция получения прогноза погоды на 16-дней.
// P.S. Помните, что для обращени к API необходимо использовать свой API_KEY

// const API_KEY = '04527021658c1646a461ebbbc59d599e';

// function createUrlApi(city, units){
//     return `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
// }

// export async function getCurrentW(url){
//     try{
//         const response = await fetch(url);
//         const result = await response.json();
//         console.log(result);
//     } catch (err) {
//         console.log(err.name);
//         console.log(err.massage);
//     }
// }

// getCurrentW(createUrlApi('Minsk', 'metric'));