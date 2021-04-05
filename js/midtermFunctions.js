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
    content:"The project is a gateway to the Philadelphia crash statistics in 2017. Here you could have an overall understanding of when, why and how severe the crashes are. On the last page, you could find the specific crashes based on the conditions you put in. In 2017, there are totally 9043 crashes in Philadelphia, which led to 78 people death and 9661 injury. ",
    bbox: [[39.874438536988166, -75.26596069335938],[40.10486150812275, -74.88418579101562]],
    filter: function(geojson){
      return true
    },
    style: function(features){
      if(features.properties.fatal > 0 || features.properties.injury >0 ){
        return{
          color: "red",
          radius: 8,
          fillOpacity: 0.85
        }
      }else {
        return {
          color: "green",
          radius: 8,
          fillOpacity: 0.85
        }
      }
    }
  };

  var slide2 = {
    slideNumber: 2,
    title: "Fatal and Injury Crashes",
    content:"If you check Involved Death, the map will show the crashes that only involved fatal accidents; if you check Involved Injury, the map will show the crashes that only involved injury accidents; and if you check both, the map will show the crashes that invovle both fatal and injury. Click on them and find out the number of fatalities and injuries in the accident. ",
    bbox: [[39.874438536988166, -75.26596069335938],[40.10486150812275, -74.88418579101562]],
    filter: function(features){ 
      if (document.getElementById("death").checked === true && document.getElementById("injury").checked === false){
        return features.properties.fatal >0 && features.properties.injury === 0 
      }else if(document.getElementById("death").checked === false && document.getElementById("injury").checked === true){
        return features.properties.injury >0 && features.properties.fatal === 0
      }else if (document.getElementById("death").checked === true && document.getElementById("injury").checked === true){
        return features.properties.fatal >0 && features.properties.injury >0 
      }
      
    },
    style: function(features){
      if(features.properties.injury > 0 && features.properties.fatal === 0){
        return{
          color: "orange",
          radius: 1+(features.properties.injury-1) ,
          fillOpacity: 0.2
        }
      }else if (features.properties.fatal >0 && features.properties.injury === 0 ){
        return{
          color: "red",
          radius: 6+(features.properties.fatal-1)*2,
          fillOpacity: 0.85
        }
      }else if (features.properties.injury > 0 && features.properties.fatal > 0){
        return{
          color: "darkred",
          radius: 6+(features.properties.fatal+features.properties.injury-2)*2,
          fillOpacity: 0.85
        } 
      }
    }
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

var showhide = function(currentPage){
  if (currentPage===1){
    $("#filterslide2").show()
  }else{
    $("#filterslide2").hide()
  }
}

var buildPage = function(pageDefinition) {

  featureGroup = L.geoJson(parsedData,{
    filter: pageDefinition.filter,
    style: pageDefinition.style ,
    pointToLayer: function(feature,latlng){
      return new L.CircleMarker(latlng)
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
  showhide(currentPage)
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
var parsedData ;
var featureGroup;
var clusters;
var markerlist;
var fatal = 0;
var injury = 0;

var fatalsum = function(obj){

  for(i=0;i<obj.length;i=i+1){
    fatal= fatal+obj[i].properties.fatal
  }
  return fatal
}

var injurysum = function(obj){
  for(i=0;i<obj.length;i=i+1){
    injury= injury+obj[i].properties.injury
  }
  return injury
}



$(".nextbutton").click(nextPage)
$(".previousbutton").click(prevPage)

function slide2click (){
    tearDown();
    buildPage(slides[currentPage]);
}





$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    parsedData = JSON.parse(data);
    buildPage(slides[currentPage]); 
    var crashnumber = parsedData.features.length;
    console.log("Total Crashes in 2017: ", crashnumber);
    fatalsum(parsedData.features);
    console.log("Total Fatal in 2017: ", fatal);
    injurysum(parsedData.features)
    console.log("Total Injury in 2017: ", injury)
    
    
   
  });

  });