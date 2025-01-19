let docemntHtml = document,
  Apiurl,
  data,
  searchInput = docemntHtml.getElementById("searchInput"),
  thisDay = docemntHtml.getElementById("thisDay"),
  date = docemntHtml.getElementById("date"),
  cite = docemntHtml.getElementById("cite"),
  temp = docemntHtml.getElementById("temp"),
  icon = docemntHtml.getElementById("icon"),
  wind = docemntHtml.getElementById("wind"),
  humidity = docemntHtml.getElementById("humidity"),
  dir = docemntHtml.getElementById("dir"),
  twoday = docemntHtml.getElementById("twoday"),
  threeDay = docemntHtml.getElementById("threeDay"),
  comment = docemntHtml.getElementById("comment"),
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    " Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

// next dat variables
let titleNextDay = docemntHtml.getElementsByClassName("titleNextDay"),
  iconNextDay = docemntHtml.getElementsByClassName("iconNextDay"),
  maxNextDay = docemntHtml.getElementsByClassName("maxNextDay"),
  mainNextDay = docemntHtml.getElementsByClassName("mainNextDay"),
  textNextDay = docemntHtml.getElementsByClassName("textNextDay");

getAbi("cairo");
searchInput.addEventListener('keyup', function () {
  var searchvalue = searchInput.value;
  if (searchvalue != "") {
    getAbi(searchvalue);
  }
});
async function getAbi(location) {
  Apiurl = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bcfd21f1327d4af8b3142123230404&q=${location}&days=3`);
  data = await Apiurl.json();
  nextDayWeather();
  gettoday();
}

function gettoday() {
  let thedate = new Date();
  thisDay.innerHTML = days[thedate.getDay()];
  date.innerHTML = `${thedate.getDate()}${month[thedate.getMonth()]}`;
  comment.innerHTML = data.current.condition.text;
  wind.innerHTML = data.current.wind_kph;
  humidity.innerHTML = data.current.humidity;
  dir.innerHTML = data.current.wind_dir;
  temp.innerHTML = `${data.current.temp_c} C`;
  cite.innerHTML = data.location.name;
  icon.setAttribute("src", `https:${data.current.condition.icon}`);
}

function nextDayWeather() {
  for (let i = 0; i < titleNextDay.length; i++) {
    titleNextDay[i].innerHTML =days[new Date(data.forecast.forecastday[i + 1].date).getDay()];
    maxNextDay[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c;
    mainNextDay[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c;
    textNextDay[i].innerHTML =data.forecast.forecastday[i + 1].day.condition.text;
    iconNextDay[i].setAttribute("src",`https:${data.forecast.forecastday[i + 1].day.condition.icon}`);
  }
}
