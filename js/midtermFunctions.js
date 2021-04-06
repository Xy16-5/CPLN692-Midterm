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
    title: "Weather Conditions of Crashes",
    content:"In 2017, there are about 17% crashes are due to the adverse weather. Among them, 72.5% crashes happened when it was raining, and snow is the second common adverse weather when crashes happened. ",
    bbox: [[39.874438536988166, -75.26596069335938],[40.10486150812275, -74.88418579101562]],
    filter: function(features){
      if (document.getElementById("Rain").checked === true ){
        return features.properties.weather === 2
      }else if (document.getElementById("Sleet").checked === true){
        return features.properties.weather === 3
      }else if (document.getElementById("Snow").checked === true){
        return features.properties.weather === 4
      }else if (document.getElementById("Fog").checked === true){
        return features.properties.weather === 5
      }else if (document.getElementById("Rainfog").checked === true){
        return features.properties.weather === 6
      }else if (document.getElementById("Sleetfog").checked === true){
        return features.properties.weather === 7
      }
    },
    style: function(features){
      if(features.properties.weather === 2){
        return {
          color: "DarkBlue",
          radius: 2,
          fillOpacity: 0.5
        }
      }else if (features.properties.weather === 3){
        return {
          color: "RoyalBlue",
          radius: 4,
          fillOpacity: 0.85
        }
      }else if (features.properties.weather ===4){
        return {
          color: "lightgrey",
          radius: 3,
          fillOpacity: 0.85
        }
      }else if (features.properties.weather ===5){
        return {
          color: "DimGray",
          radius: 4,
          fillOpacity: 0.85
        }
      }else if (features.properties.weather ===6){
        return {
          color: "DarkBlue",
          fillColor: "DimGray",
          radius: 4,
          fillOpacity: 0.85
        }
      }else if (features.properties.weather ===7){
        return {
          color: "RoyalBlue",
          fillColor: "DimGray",
          radius: 4,
          fillOpacity: 0.85
        }
      }
    }
  };


  var slide4 = {
    slideNumber: 4,
    title: "Temporal Chracteristics of Crashes",
    content:"The crashes in 2017 happened evenly on seven days of a week. Crashes on Saturday (1407) and Sunday (1320) have happened slightly more than the weekdays, while the number of crashes on Tuesday is the least of 1173. The spatial distribution of crashes is not significantly different on each day. Adversely, most of the crashes happened around several important intersections, such as the Philadelphia City Hall.",
    bbox: [[39.874438536988166, -75.26596069335938],[40.10486150812275, -74.88418579101562]],
    filter: function(features){
      if (document.getElementById("monday").checked === true ){
      return features.properties.day === 1
    }else if (document.getElementById("tuesday").checked === true){
      return features.properties.day === 2
    }else if (document.getElementById("wednesday").checked === true){
      return features.properties.day === 3
    }else if (document.getElementById("thursday").checked === true){
      return features.properties.day === 4
    }else if (document.getElementById("friday").checked === true){
      return features.properties.day === 5
    }else if (document.getElementById("saturday").checked === true){
      return features.properties.day === 6
    }else if (document.getElementById("sunday").checked === true){
      return features.properties.day === 7
    }
    },
    style: function(features) {
      switch(features.properties.day){
        case 1 : return {fillColor: '#658EA9', stroke : false, fillOpacity: 0.7, radius: 4};
        case 2 : return {fillColor: '#88B2CC', stroke : false, fillOpacity: 0.7, radius: 4};
        case 3 : return {fillColor: '#E7D4C0', stroke : false, fillOpacity: 0.7, radius: 4};
        case 4 : return {fillColor: '#E98973', stroke : false, fillOpacity: 0.7, radius: 4};
        case 5 : return {fillColor: '#C4AC95', stroke : false, fillOpacity: 0.7, radius: 4};
        case 6 : return {fillColor: '#008000', stroke : false, fillOpacity: 0.7, radius: 4};
        case 7 : return {fillColor: '#FFD700', stroke : false, fillOpacity: 0.7, radius: 4};
      }
    }
  };

  var slide5 = {
    slideNumber: 5,
    title: "Crashes Look Up Table",
    content:"You could find the crashes under several specific conditions",
    bbox: [[39.874438536988166, -75.26596069335938],[40.10486150812275, -74.88418579101562]],
    filter: function (features){
    return true
    }
  };



  var slides =[slide1,slide2,slide3,slide4,slide5];
  var currentPage = 0



var nextPage = function() {
  // event handling for proceeding forward in slideshow
  tearDown();
  $('#infotext').show()
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
    $("#filterslide3").hide()
    $("#filterslide4").hide()
    $("#filterslide5").hide()
  }else if (currentPage===2){
    $("#filterslide2").hide()
    $("#filterslide3").show()
    $("#filterslide4").hide()
    $("#filterslide5").hide()
  }else if(currentPage===3){
    $("#filterslide2").hide()
    $("#filterslide3").hide() 
    $("#filterslide4").show()
    $("#filterslide5").hide()
  }else if (currentPage===4){
    $("#filterslide2").hide()
    $("#filterslide3").hide() 
    $("#filterslide4").hide()
    $("#filterslide5").show()
  } else{
    $("#filterslide2").hide()
    $("#filterslide3").hide() 
    $("#filterslide4").hide()
    $("#filterslide5").hide()
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
  featureGroup.eachLayer(eachFeatureFunction);

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




var buildlastPage =  function(){
  tearDown();
  var inputval = {
    Month: Number($('#text-input1').val()),
    Day: Number($('#text-input2').val()),
    fatal: Number(slider1.value),
    injury: Number(slider2.value),
  }
  console.log(inputval);
  var fatal =inputval.fatal;
  var injury = inputval.injury;
  var month = inputval.Month;
  var day = inputval.Day
  featureGroup = L.geoJson(parsedData,{
    style: function(features){
      return {
        color: "red",
        radius: 8 
      }
    },
    filter: function (features){ 
      if(features.properties.fatal === fatal && features.properties.injury<= injury && features.properties.month === month &&features.properties.day === day){
        return true
      }
    },
    pointToLayer: function(feature,latlng){
      return new L.CircleMarker(latlng)
    }
  });
  featureGroup.eachLayer(eachFeatureFunction);
  featureGroup.addTo(map);
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
var inputval;

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

var generateinfo = function(feature) {
  var info = {
    month: feature.properties.month,
    day: feature.properties.day ,
    Fatal: feature.properties.fatal ,
    Injury: feature.properties.injury,
    Weather: feature.properties.weather
  };
  var monthlist =["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var weeklist = ["Monday", "Tuesday", "Wednesday", "Turseday", "Friday","Saturday","Sunday"];
  var weatherlist = ["No adverse conditions", "Rain", "Sleet (hail)", "Snow", "Fog", "Rain and fog", "Sleet and fog", "Other", "Unknown"];
  info.month = monthlist[info.month -1];
  info.day = weeklist[info.day -1];
  info.Weather = weatherlist[info.Weather - 1]
  return info;
};


var displayinfo = function(info) {
  $('#infotext').hide();
  $('#infotable').show();
  $('#month').text(info.month);
  $('#day').text(info.day);
  $('#fatalnumber').text(info.Fatal);
  $('#injurynumber').text(info.Injury);
  $('#weather').text(info.Weather);
};




var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
    var infotable = generateinfo(event.target.feature)
    displayinfo(infotable);
    console.log(infotable);
  });
};

var slider1 = document.getElementById("fatalRange");
var output1 = document.getElementById("demo1");
output1.innerHTML = slider1.value;

slider1.oninput = function() {
  output1.innerHTML = this.value;
}

var slider2 = document.getElementById("injuryRange");
var output2 = document.getElementById("demo2");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
  output2.innerHTML = this.value;
}

$(".nextbutton").click(nextPage)
$(".previousbutton").click(prevPage)


function slideclick (){
    tearDown();
    buildPage(slides[currentPage]);
}




$('#text-input1').val('1');
$('#text-input2').val('1');



$('#text-input1').prop('disabled',false);
$('#text-input2').prop('disabled',false);







$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    parsedData = JSON.parse(data);
    buildPage(slides[currentPage]); 
    $('.submitbutton').click(function(){
      buildlastPage();
    })
    var crashnumber = parsedData.features.length;
    console.log("Total Crashes in 2017: ", crashnumber);
    fatalsum(parsedData.features);
    console.log("Total Fatal in 2017: ", fatal);
    injurysum(parsedData.features)
    console.log("Total Injury in 2017: ", injury)
    
    
   
  });

  });