/*jslint browser: true */
/*global google, console */

(function () {
    'use strict';

    var choosenCategory,
        map,
        markers = [],
        messages;

    function placeMarker(message) {
        var marker = new google.maps.Marker({
                position: new google.maps.LatLng(message.latitude, message.longitude),
                map: map,
                title: message.title
            }),
            infoWindow = new google.maps.InfoWindow({
                content: message.description
            });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(marker.get('map'), marker);
        });

        markers.push(marker);
    }

    function setAllMap(map) {
        var i;
        for (i = 0; i < markers.length; i += 1) {
            markers[i].setMap(map);
        }
    }

    function deleteMarkers() {
        setAllMap(null);
        markers = [];
    }

    function placeMarkerForCategory(category) {
        messages.filter(function (m) { return m.category === category; })
                .forEach(placeMarker);
    }

    function unselectLinks(links) {
        [].forEach.call(links, function (link) {
            link.classList.add("unselected");
        });
    }

    function selectLinks(links) {
        [].forEach.call(links, function (link) {
            link.classList.remove("unselected");
        });
    }

    function categoryLink(link, index, links) {
        var category = +link.dataset.category;

        link.addEventListener('click', function (e) {
            if (choosenCategory === category) {
                // Show all categories
                choosenCategory = undefined;
                selectLinks(links);
                messages.forEach(placeMarker);
            } else {
                // Show category
                choosenCategory = category;
                unselectLinks(links);
                link.classList.remove("unselected");
                deleteMarkers();
                placeMarkerForCategory(category);
            }

            e.preventDefault();
        });
    }

    window.initialize = function () {
        var mapOptions = {
                center: new google.maps.LatLng(56.663, 16.363),
                zoom: 4,//10,
                disableDefaultUI: true
            },
            req = new XMLHttpRequest();

        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        req.open('GET', '/json', true);
        req.onreadystatechange = function (e) {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    messages = JSON.parse(req.responseText).messages;
                    messages.forEach(placeMarker);
                } else {
                    console.log("Error");
                }
            }
        };
        req.send(null);

        [].forEach.call(document.querySelectorAll('#categories ul li a'),
                categoryLink);
    };

    function loadScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBL0CUs0aFTQhrpfZvurxyn1BBYzDBQkOE&sensor=false&callback=initialize';
        document.body.appendChild(script);
    }

    window.onload = loadScript;
}());
