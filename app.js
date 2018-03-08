 const WEATHER_SEARCH_URL = "https://api.openweathermap.org/data/2.5/weather?id=524901&APPID=5b6db5278fb609ae944e0bd7f3f21c02";

// const GEOLOCATION_API = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAB8jz353KbMR6lRkCWCfpFBgHrlPQXUK8';

"use strict";
 

/* JQUERY CODES
-------------------------------------------------*/

$(document).ready(function() {

    $.fn.animateRotate = function(angle, duration, easing, complete) {
      let args = $.speed(duration, easing, complete);
      let step = args.step;
      return this.each(function(i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function(now) {
          $.style(e, 'transform', 'rotate(' + now + 'deg)');
          if (step) return step.apply(e, arguments);
        };

        $({deg: 0}).animate({deg: angle}, args);
      });
    };
    
    $("#main-page").css("height", "100vh");
    $("#main-page").css("width", "100%");
    $("#main-page").fadeIn();
    $(".maincontent").fadeIn();
    
    $(".mainlink").on("click", function() {
        $(".maincontent").fadeOut();
        $("#main-page").animate({
            width: "25px",
            height: "375px"
        }, function() {
            $(this).animateRotate(90);
        });
        
        setTimeout(function() {
            $("#main-page").fadeOut();       
        }, 1500);
        
        setTimeout(function() {
            $("#next-page").animateRotate(0, 0);
            $("#next-page").css("height", "25px");
            $("#next-page").css("width", "375px");
            $("#next-page").fadeIn();
            $("#next-page").animate({
      backgroundimage: "url(https://images.unsplash.com/photo-1485570661444-73b3f0ff9d2f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4550661e949789d265b9df2662108c93&auto=format&fit=crop&w=1663&q=80"
            }, function() {
                $(this).animate({
                    height: "100vh"
                }, function() {
                    $(this).animate({
                        width: "100%"
                    }, function() {
                        $(".nextcontent").fadeIn(300);
                    });
                });
            });
        }, 800);
    });
        
    $(".nextlink").on("click", function() {
        $(".nextcontent").fadeOut();
        $("#next-page").animate({
            width: "25px",
            height: "375px"
        }, function() {
            $(this).animateRotate(-90);
        });
        
        setTimeout(function() {
            $("#next-page").fadeOut();          
        }, 1500);
        
        setTimeout(function() {
        $("#main-page").animateRotate(0, 0);
        $("#main-page").css("height", "25px");
        $("#main-page").css("width", "375px");
            $("#main-page").fadeIn();
            $("#main-page").animate({
                height: "100vh"
            }, function() {
                $(this).animate({
                    width: "100%"
                }, function() {
                    $(".maincontent").fadeIn(300);
                });
            });
        }, 1400);
    });
    
});

//retrieve data from OpenWeather API
function getWeatherData() {
  let city = $('.search-query').val();
  $.ajax(WEATHER_SEARCH_URL, {
  data: {
  units: 'imperial',
  q: city
  },
    dataType: 'jsonp',
    type: 'GET',
    success: function (data) {
    let widget = displayWeather(data);
    $('#weather-display').html(widget);
    scrollPageTo('#weather-display', 15);
    }
  });
}

function displayWeather(data) {
    return `
        <div class="weather-row">
        <h3><strong>Current Weather for ${data.name}</strong></h3>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <p style="font-size:15px;">${data.weather[0].main}</p>
        <p style="color:steelblue;">Description:</p><p> ${data.weather[0].description}</p>
        <p style="color:steelblue;">Temperature:</p><p> ${data.main.temp} &#8457; / ${(((data.main.temp)-32)*(5/9)).toFixed(2)} &#8451;</p>
        <p style="color:steelblue;">Humidity:</p><p> ${data.main.humidity} &#37;</p>
        </div>
`;
}

function enterLocation() {
    $(".mainlink").click(function () {
        $('button').removeClass("selected");
        $(this).addClass("selected");
    });

    $('.search-form').submit(function (event) {
        event.preventDefault();
        $('.navigation').removeClass("hide");
        $('#weather-display').html("");
        getWeatherData();
        $('button').removeClass("selected");
    });
}


$(enterLocation);