function getWeather(latlong){
  var thisUrl = "//api.darksky.net/forecast/e6a23e4c1c25782ec571f2fe3a975775/" + latlong;
  $.getJSON(thisUrl + "?callback=?", function(json){
render(json);
})}

function render(weather){


  $("#currentTemp").html(Math.round(weather.currently.temperature) + '<span class="temp">&#8451;</span>');
    var src = "src/images/icons/";
  $("#date-icon").attr('src', src + weather.currently.icon + ".png");
  $("#currentWind").html(Math.round(weather.currently.windSpeed) + ' km/h');
  $("#currentRain").html(Math.round(weather.currently.precipProbability) + '%');
// console.log(weather.daily.data[1].temperatureMax);
  for (var i = 1; i < weather.daily.data.length; i++) {
    var day = "#day" + i;
    $(day).html(Math.round(weather.daily.data[i].temperatureMax) + "&#8451;");
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
  }

function init(){
  $.getJSON("https://ipapi.co/json/", function(data) {
      $("#location").text(data.city +", " + data.country);
      var latlong = data.latitude + "," + data.longitude;
      getWeather(latlong);
  });

}


$(document).ready(init);
