/*jslint browser: true */
/*global google */

(function () {
    'use strict';

    window.initialize = function () {
        var mapOptions = {
                center: new google.maps.LatLng(56.663, 16.363),
                zoom: 13
            },
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    };

    function loadScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBL0CUs0aFTQhrpfZvurxyn1BBYzDBQkOE&sensor=false&callback=initialize';
        document.body.appendChild(script);
    }

    window.onload = loadScript;
}());
