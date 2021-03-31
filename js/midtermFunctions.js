/*=============== 
Map setup
================*/


var map = L.map('map', {
    center: [40.000, -75.1090],
    zoom: 11
  });
  var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);


/*===============
Slides Setup
=================*/
//var slide1 = {
//    slideNumber: 1,
//    title: "Overview of crashes in Philadelphia (2017) ",
//    filter: filter1
//  };

//var slide2 = {
//  slideNumber: 2,

//}



/*================
Data Processing
==================*/
var dataset = "https://raw.githubusercontent.com/Xy16-5/CPLN692-Midterm/main/crashes.geojson";
var featureGroup;

var myStyle


$(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      console.log(parsedData);
//      featureGroup = L.geoJson(parsedData, {
//        style: myStyle,
//        filter: myFilter
//      }).addTo(map);
//      })
      // quite similar to _.each
//      featureGroup.eachLayer(eachFeatureFunction);
    });
  });