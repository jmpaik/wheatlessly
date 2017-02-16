'use strict';

require('./_search-map.scss');

module.exports = {
  template: require('./search-map.html'),
  controller: ['$log', 'bizService', SearchMapController],
  controllerAs: 'searchMapCtrl',
  bindings: {
    onSearch: '&'
  }
};

function SearchMapController($log, bizService) {
  $log.debug('SearchMapController()');

  // eslint-disable-next-line
  let map = new google.maps.Map(document.getElementById('map'));
  // eslint-disable-next-line
  let searchBox = new google.maps.places.SearchBox(document.getElementById('search-box'));
  searchBox.addListener('places_changed', () => {
    let place = searchBox.getPlaces()[0];
    $log.debug('place changed:', place);
    // map.panToBounds(place.geometry.viewport);
    map.setCenter(place.geometry.location);
    map.setZoom(10);
    this.onSearch();
  });
  map.addListener('zoom_changed', mapChanged);
  map.addListener('dragend', mapChanged);

  let tries = 0;
  function mapChanged() {
    $log.debug('mapChanged()... tries=', ++tries);
    let bounds = map.getBounds();

    //TODO: Sometimes we get a mapChanged call, and map.getBounds() === undefined.
    //******* HACK ********
    if(!bounds) {
      $log.debug('bounds undefined!');

      if(tries < 4) setTimeout(mapChanged, 50);
      return;
    }
    tries = 0; //reset for future calls.

    let sw = bounds.getSouthWest();
    let ne = bounds.getNorthEast();
    sw = { lat: sw.lat(), lng: sw.lng() };
    ne = { lat: ne.lat(), lng: ne.lng() };

    $log.debug('mapChanged(), sw:',sw);
    $log.debug('mapChanged(), ne:',ne);

    bizService.findBizs({ southwest: sw, northeast: ne })
    .then( bizs => {
      $log.debug('found:',bizs);
      bizs.forEach( biz => {
        let marker = new google.maps.Marker({
          position: biz.loc,
          map: map
        });

        let info = `<a href="${biz.url}">${biz.name}</a><br><p>${biz.address}</p>`;

        let infowindow = new google.maps.InfoWindow({
          content: info
        });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      });
    });
  }
  // map.setCenter({ lat: 47.618217, lng: -122.351832 });
  // map.setZoom(10);
}
