'use strict';

require('./_search-map.scss');

module.exports = {
  template: require('./search-map.html'),
  controller: ['$log', SearchMapController],
  controllerAs: 'searchMapCtrl',
  bindings: {
    onMapChange: '&'
  }
};

function SearchMapController($log) {
  $log.debug('SearchMapController()');

  let map = new google.maps.Map(document.getElementById('map'));

  this.setCenter = function(geo) {
    $log.debug('searchMapCtrl.setCenter()', geo);
    map.setCenter(geo);
    map.setZoom(12);
  };

  //Init center on CodeFellows.
  this.setCenter({ lat: 47.618217, lng: -122.351832 });

}

/*
var renderResultsMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: businessesArray[0].location.coordinate.latitude, lng: businessesArray[0].location.coordinate.longitude},
    zoom: 12
  });

  businessesArray.forEach(function(e){
    var coordinates = {
      lat:e.location.coordinate.latitude,
      lng:e.location.coordinate.longitude
      // console.log(e);
    };
    if(!contentString){
      var contentString = '<div class="content">' +
          '<a href=' + e.url + '>' + e.name + ' </a>' + '<br>' + '<p>' + e.location.display_address + '<p>' + '</div>';

    }

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: coordinates,
      map: map
    });
    myInfowindows.push(infowindow);

    marker.addListener('click', function() {
      myInfowindows.forEach(function(myInfoWindow) {
        myInfoWindow.close();
      });
      infowindow.open(map, marker);
    });
    return marker;
  });
};
*/
