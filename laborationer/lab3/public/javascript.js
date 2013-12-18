/*jslint browser: true */
/*global google */

(function () {
    'use strict';

    function initialize() {
        var mapOptions = {
                center: new google.maps.LatLng(56.663, 16.363),
                zoom: 13
            },
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
}());
