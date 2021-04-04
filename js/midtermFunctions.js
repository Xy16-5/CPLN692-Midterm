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
    content:"The project is a gateway to the Philadelphia crash statistics in 2017. Here you could have an overall understanding of when, why and how severe the crashes are. On the last page, you could find the specific crash based on the conditions you put in.",
    bbox: [[39.874438536988166, -75.26596069335938],[40.10486150812275, -74.88418579101562]],
    style: myStyle1

  };

  var slide2 = {
    slideNumber: 2,
    title: "title 2 ",
    content:"content2",
    bbox: [[ 39.88682114233502,  -75.25772094726562],[40.02603705467397, -75.02151489257812]]
  };

  var slide3 = {
    slideNumber: 3,
    title: "title 3 ",
    content:"content3",
    bbox: [[ 39.88682114233502,  -75.25772094726562],[40.02603705467397, -75.02151489257812]]
  };

  var slides =[slide1,slide2,slide3];
  var currentPage = 0



var nextPage = function() {
  // event handling for proceeding forward in slideshow
  tearDown();
  var nextPage = currentPage + 1 ;
  currentPage = nextPage;
  buildPage(slides[nextPage]);
}


var prevPage = function() {
  // event handling for going backward in slideshow
  tearDown();
  var previousPage = currentPage - 1 ;
  currentPage = previousPage;
  buildPage(slides[previousPage]);
}

var buildPage = function(pageDefinition) {

  featureGroup = L.geoJson(parsedData,{
    pointToLayer: function(feature,latlng){
      return L.circleMarker(latlng,pageDefinition.style);
    }
  });
  if(pageDefinition.slideNumber === 1){
    clusters = L.markerClusterGroup();
    clusters.addLayer(featureGroup);
    map.addLayer(clusters);
  }else{
    featureGroup.addTo(map);
  }
  // build up a 'slide' given a page definition
  $("#title").text(pageDefinition.title);
  $("#content").text(pageDefinition.content);
  map.fitBounds(pageDefinition.bbox);

  if (currentPage === slides.length - 1){
    $(".nextbutton").prop("disabled", true)
  }else{$(".nextbutton").prop("disabled", false)};

  if (currentPage === 0){
    $(".previousbutton").prop("disabled", true)
  }else {$(".previousbutton").prop("disabled", false)}
}

var tearDown = function() {
  // remove all plotted data in prep for building the page with new filters etc
  map.removeLayer(clusters);
  map.removeLayer(featureGroup)
}



/*================
Data Processing
==================*/
var dataset = "https://raw.githubusercontent.com/Xy16-5/CPLN692-Midterm/main/crashes.geojson";
var parsedData;
var featureGroup;
var clusters;
var markerlist;

$(".nextbutton").click(nextPage)
$(".previousbutton").click(prevPage)


var myStyle1 = {
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