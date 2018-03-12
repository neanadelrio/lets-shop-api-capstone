
const WEATHER_SEARCH_URL = "https://api.openweathermap.org/data/2.5/weather?id=524901&APPID=5b6db5278fb609ae944e0bd7f3f21c02";

const GEOLOCATION_API = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAB8jz353KbMR6lRkCWCfpFBgHrlPQXUK8';

const FOURSQUARE_SEARCH_URL = "https://api.foursquare.com/v2/venues/explore?&client_id=CLMUPDJ5DLZDTIAWOLLWVXZ0HNJP3QHZP0I5GUB3EWRF532E&client_secret=SIWUEB2DSLSJ3S0ZAXUWC2S0F2TCUJNBXKERUQT2O2AYYQ32&v=20170915"



/* JQUERY CODES FOR ANIMATION
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
        getWeatherData();
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

//END OF ANIMATION

function scrollPageTo(myTarget, topPadding) {
    if (topPadding == undefined) {
        topPadding = 0;
    }
    var moveTo = $(myTarget).offset().top - topPadding;
    $('html, body').stop().animate({
        scrollTop: moveTo
    }, 200);
}

//retrieve data from OpenWeather API
function getWeatherData(city) {
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

//END OF WEATHER INPUT

//Get Foursquare info

function getDataFoursquare(city) {
    $.ajax(FOURSQUARE_SEARCH_URL, {
            data: {
                near: city,
                venuePhotos: 1,
                limit: 9,
                query: 'malls',
                section: "Malls",
            },
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                console.log(data);
                try {
                    let results = data.response.groups[0].items.map(function (item, index) {
//                        console.log(item);
                        return displayResults(item);
                    });
                    $('#foursquare-results').html(results);
                    scrollPageTo('#foursquare-results', 15);
                } catch (e) {
                    $('#foursquare-results').html("<div class='result'><p>Whoopsie! No Results Found.</p></div>");
                }
            },
            error: function () {
                $('#foursquare-results').html("<div class='result'><p>Whoopsie! Lets try that again.</p></div>");
            }
        });
}
      

function enterLocation() {
    $(".mainlink").click(function () {
        $('button').removeClass("selected");
        event.preventDefault();
        $('.navigation').removeClass("hide");
        $('#weather-display').html("");
        let city = $('.controls').val();
        getDataFoursquare(city);
        getWeatherData(city);
        $('button').removeClass("selected");
        $(this).addClass("selected");
    });
}

function displayResults(result) {
    return `
        <div class="result col-3">
            <div class="result-image" style="background-image: url(https://igx.4sqi.net/img/general/width960${result.venue.photos.groups[0].items[0].suffix})" ;>
            </div>
            <div class="result-description">
                <h2 class="result-name"><a href="${result.venue.url}" target="_blank">${result.venue.name}</a></h2>
                <span class="icon">
                    <img src="${result.venue.categories[0].icon.prefix}bg_32${result.venue.categories[0].icon.suffix}" alt="category-icon">
                </span>
                <span class="icon-text">
                    ${result.venue.categories[0].name}
                </span>
                <p class="result-address">${result.venue.location.formattedAddress[0]}</p>
                <p class="result-address">${result.venue.location.formattedAddress[1]}</p>
                <p class="result-address">${result.venue.location.formattedAddress[2]}</p>
            </div>
        </div>
`;
}


var map;
var infowindow; 

  function initMap() {
    var atlanta = {lat: 33.753746, lng: -84.386330};
      
      map = new google.maps.Map(document.getElementById('map-input'), {
          center: atlanta,
          zoom: 15,
      });
      
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);

    infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: atlanta,
        radius: 500,
        type: ['clothing_store']
        }, callback);
      }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        }
      }
  }



  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

      google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
      });
    }


function activatePlacesSearch() {
    let options = {
        types: ['(regions)']
    };
    let input = document.getElementById('pac-input');
    let autocomplete = new google.maps.places.Autocomplete(input, options);
    
}



enterLocation();


    

