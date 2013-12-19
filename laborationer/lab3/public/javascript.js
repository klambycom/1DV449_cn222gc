/*jslint browser: true */
/*global google, console */

(function () {
    'use strict';

    var choosenCategory,
        map,
        markers = [],
        messages,
        priority = ["",
                    "Mycket allvarlig händelse",
                    "Stor händelse",
                    "Störning",
                    "Information",
                    "Mindre störning"];

    function placeMarker(message) {
        var marker = new google.maps.Marker({
                position: new google.maps.LatLng(message.latitude, message.longitude),
                map: map,
                title: message.title,
                icon: "files/" + message.category + ".png"
            }),
            date = new Date(parseInt(message.createddate.replace(/(^.*\()|([+-].*$)/g, ''), 10)),
            hours,
            minutes,
            infoWindow;

        if (date.getHours() < 10) {
            hours = "0" + date.getHours();
        } else {
            hours = date.getHours();
        }

        if (date.getMinutes() < 10) {
            minutes = "0" + date.getMinutes();
        } else {
            minutes = date.getMinutes();
        }

        infoWindow = new google.maps.InfoWindow({
            content: "<h1>" + message.subcategory + ": " + message.title + "</h1>" +
                     "<p><strong>" + priority[message.priority] + " (" +
                     date.getDate() + "/" + (date.getMonth() + 1) + " " +
                     hours + ":" + minutes + ")</strong> " +
                     message.description + "</p><p>" + message.exactlocation + "</p>"
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

    function zoomOut() {
        var zoom = map.getZoom();
        if (zoom > 0) {
            zoom -= 1;
            map.setZoom(zoom);
        }

        return zoom === 0;
    }

    function zoomIn() {
        var zoom = map.getZoom();
        if (zoom < 21) {
            zoom += 1;
            map.setZoom(zoom);
        }

        return zoom === 21;
    }

    function zoomBtns() {
        var div, ul, liIn, liOut, linkIn, linkOut;

        div = document.createElement("div");
        div.setAttribute('id', 'zoom');

        ul = document.createElement('ul');

        liIn = document.createElement('li');
        linkIn = document.createElement('a');
        linkIn.innerHTML = '+';
        linkIn.setAttribute('id', 'zoom-in');
        linkIn.setAttribute('href', '#');
        liIn.appendChild(linkIn);
        ul.appendChild(liIn);

        liOut = document.createElement('li');
        linkOut = document.createElement('a');
        linkOut.innerHTML = '-';
        linkOut.setAttribute('id', 'zoom-out');
        linkOut.setAttribute('href', '#');
        liOut.appendChild(linkOut);
        ul.appendChild(liOut);

        linkIn.addEventListener('click', function (e) {
            zoomIn();
            e.preventDefault();
        });

        linkOut.addEventListener('click', function (e) {
            zoomOut();
            e.preventDefault();
        });

        google.maps.event.addListener(map, 'zoom_changed', function () {
            var zoom = map.getZoom();

            linkIn.classList.remove('unselected');
            linkOut.classList.remove('unselected');

            if (zoom === 0) {
                linkOut.classList.add('unselected');
            } else if (zoom === 21) {
                linkIn.classList.add('unselected');
            }
        });

        div.appendChild(ul);
        document.body.insertBefore(div, document.getElementById('map-canvas'));
    }

    window.initialize = function () {
        var mapOptions = {
                //center: new google.maps.LatLng(56.663, 16.363),
                center: new google.maps.LatLng(60.482778, 15.436389),
                zoom: 6,//10,
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

        zoomBtns();
    };

    function loadScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBL0CUs0aFTQhrpfZvurxyn1BBYzDBQkOE&sensor=false&callback=initialize';
        document.body.appendChild(script);
    }

    window.onload = loadScript;
}());
