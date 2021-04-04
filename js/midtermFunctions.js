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


var slide1 = {
    slideNumber: 1,
    title: "Overview of Crashes in Philadelphia (2017) ",
    content:"content1",
    bbox: [[ 39.88682114233502,  -75.25772094726562],[40.02603705467397, -75.02151489257812]]
  };

  var slide2 = {
    slideNumber: 2,
    title: "title 2 ",
    content:"content2",
    bbox: [[ 39.88682114233502,  -75.25772094726562],[40.02603705467397, -75.02151489257812]]
  };

  var slides =[slide1,slide2];
  var currentPage = 0



var nextPage = function() {
  // event handling for proceeding forward in slideshow
  tearDown();
  var nextPage = currentPage + 1 ;
  buildPage(slides[nextPage]);
  currentPage = nextPage;
}
var prevPage = function() {
  // event handling for going backward in slideshow
}

var buildPage = function(pageDefinition) {

  featureGroup = L.geoJson(parsedData,{
    pointToLayer: function(feature,latlng){
      return L.circleMarker(latlng,geojsonMarkerOptions);
    }
  });
  clusters = L.markerClusterGroup();
  clusters.addLayer(featureGroup);
  map.addLayer(clusters);
  // build up a 'slide' given a page definition
  $("#title").text(pageDefinition.title);
  $("#content").text(pageDefinition.content);
  map.fitBounds(pageDefinition.bbox);
}

var tearDown = function() {
  // remove all plotted data in prep for building the page with new filters etc
  map.removeLayer(clusters);
}



/*================
Data Processing
==================*/
var dataset = "https://raw.githubusercontent.com/Xy16-5/CPLN692-Midterm/main/crashes.geojson";
var parsedData;
var featureGroup;
var clusters;
var markerlist;

var markers = function(feature){
  markerlist = [];
  _.each(feature,function(object){
    var marker = L.circleMarker([object.geometry.coordinates[1],object.geometry.coordinates[0]]);
    markerlist.push(marker)
  });
  return markerlist
}

var plotMarkers = function(markers){
  _.each(markers,function(marker){
    marker.addTo(map)
  })

}


var myStyle;
var geojsonMarkerOptions = {
  radius: 4,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};


$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    parsedData = JSON.parse(data);
    buildPage(slides[currentPage]);
  });

  });