var imperial = true;


function getWeather(latlong){
  var thisUrl = "//api.darksky.net/forecast/e6a23e4c1c25782ec571f2fe3a975775/" + latlong;
  $.getJSON(thisUrl + "?callback=?", function(json){
render(json);
})}

function render(weather){

    var src = "src/images/icons/";
  $("#date-icon").attr('src', src + weather.currently.icon + ".png");
  $("#currentRain").html(Math.round(weather.currently.precipProbability) + '%');
// console.log(weather.daily.data[1].temperatureMax);
  for (var i = 1; i < weather.daily.data.length; i++) {


      //Insert icons

    var icon = "#date-icon" + i;
    var src = "src/images/icons/";
    $(icon).attr('src', src + weather.daily.data[i].icon + ".png");
  }

  // Insert Dates of days
    $("#currentDate").html(moment().format('dddd, Do'));
    for (var i = 1; i <= 6; i++) {
      var day = "#day" + i + "Date";
      $(day).html(moment().add(i, 'days').format('ddd'));
    }

    renderTemp(weather);
  }


function renderTemp(weather){
  if (imperial == true) {
    $("#currentTemp").html(Math.round(weather.currently.temperature) + '<span class="temp">&#8457;</span>');
    $("#currentWind").html(Math.round(weather.currently.windSpeed) + ' mph');

    for (var i = 1; i < weather.daily.data.length; i++) {
      var day = "#day" + i;
      $(day).html(Math.round(weather.daily.data[i].temperatureMax) + "&#8457;");
    }

  } else {
    $("#currentTemp").html(Math.round((weather.currently.temperature-32) / 1.8) + '<span class="temp">&#8451;</span>');
    $("#currentWind").html(Math.round(weather.currently.windSpeed * 1.609344) + ' km/h');

    for (var i = 1; i < weather.daily.data.length; i++) {
      var day = "#day" + i;
      $(day).html(Math.round((weather.daily.data[i].temperatureMax)-32) / 1.8) + "&#8451;");
    }
  }
}


function init(){
  $.getJSON("https://ipapi.co/json/", function(data) {
      $("#location").text(data.city +", " + data.country);
      var latlong = data.latitude + "," + data.longitude;
      getWeather(latlong);
  });

}



$(document).ready(init);

$("#unit").click(function() {
  if (imperial) {
    imperial = false;
    $("#unit").text("Farenheit");
  } else {
    imperial = true;
    $("#unit").text("Celcius");
  }
  console.log("Changed Unit");
  init();
})
