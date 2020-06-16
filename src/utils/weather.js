const request = require("request");

let url =
  "http://api.weatherstack.com/current?access_key=2953c33ec55d390b08dce9033d9afa8a&%20query=";

const geocodingUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/city.json?access_token=pk.eyJ1IjoidG9tYWFzejEyMyIsImEiOiJjazlsNGR0cmMwMnJqM2ZwZzYyeXVyaWJzIn0.RmOnEDS-gjBkJXJFdM3J-w";

const getWeather = (url) => {
  request({ url: url, json: true }, (error, response) => {
    if (response.body.error) {
      console.log("geocoding request error");
    } else if (response) {
      const body = response.body;
      // console.log(body);
      console.log("current temparature is " + body.current.temperature);
      return body.current.temperature;
    }
  });
};
// actually when using calback put is always in this form (error, response) => so you can react on error is main funtion
const geoCode = (geocodingUrl, city, weatherUrl, callback) => {
  geocodingUrl = geocodingUrl.replace("city", city);
  request({ url: geocodingUrl, json: true }, (error, response) => {
    if (error) {
      console.log("request error");
    } else if (response.code) {
      console.log("weather app request error");
    } else {
      console.log("success");
      if (response) {
        const body = response.body;

        const lat = body.features[0].center[0];
        const lang = body.features[0].center[1];
        // const coordinates = lat.toString() + "," + lang.toString();
        const coordinates = lang.toString() + "," + lat.toString();

        weatherUrl = weatherUrl + coordinates;
        console.log("weatherUrl" + weatherUrl);
        callback(weatherUrl);
        // console.log(url + coordinates);
      }
    }
  });
};

exports.geoCode = geoCode;
exports.geocodingUrl = geocodingUrl;
exports.url = url;
exports.getWeather = getWeather;
//geoCode(geocodingUrl, "Paris", url, getWeather);
