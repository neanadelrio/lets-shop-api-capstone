# lets-shop-api-capstone
Thinkful api capstone app 
Live Preview at https://neanadelrio.github.io/lets-shop-api-capstone/


# Store-Search-Weather-API-Capstone
Thinkful (https://www.thinkful.com) First Capstone Project - App integrating with Google and Openweather API

![landing page](ScreenShots/Screen%20Shot%202018-03-12%20at%209.32.36%20PM.png)
![landing page small screen](ScreenShots/Screen%20Shot%20Landing%20Page%20sm%202018-03-18%20at%204.25.02%20PM.png)




## Background
I, like almost every fashion enthusiast hunts for the perfect store.  The stakes are even higher when in a new area and you’re not sure what stores are nearby.  I thought to create an app that retrieves not only the current weather for your excursion but most importantly nearby stores for your potential new coveted fashion piece.  

## Use Case
This app includes a location search input. A person can provide the current State or thier potential location to retrive current weather data along with the name and location of nearby stores from Foursquare.

## Working Prototype
You can access a working prototype of the app here: https://neanadelrio.github.io/lets-shop-api-capstone/

## Functionality
The app's functionality includes:
* The option to input your current or future location.
* The app returns a Foursquare results indicating stores nearby or near targeted input location.
* The app returns current weather from your location input.
* A 'Go Back' button that takes you back to the main screen.

## Technology
* HTML
* CSS
* JavaScript
* jQuery

The app uses AJAX JSON calls to the <a href="https://maps.googleapis.com/maps">Google Maps</a>Open Platform API to return location suggestions in the input box.
The app uses AJAX JSON calls to the <a href="https://api.openweathermap.org/data">Weather</a>Open Platform API to return Current Weather results.
The app uses AJAX JSON calls to the <a href="https://api.foursquare.com/v2/venues/explore">Foursquare</a>Open Platform API to return store suggestions near the location input.


## Responsive
App is built to be responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
