/*
 *
 */

var _devPolyCreated = false;
var _devPoly;
var _devFeaturesEnabled = false;

SetupDeveloperFeatures();

function SetupDeveloperFeatures() {

    $("#btn-new-shape").click(function () {
        alert("Handler for .click() called.");
    });

    _map.on('click', function (e) {

        console.Log

        if(_devFeaturesEnabled == false)
        {
            return;
        }

        if (_devPolyCreated) {
            _devPoly.addLatLng(e.latlng);

            var s = "";
            var latlngs = _devPoly.getLatLngs();
            for (var i = 0; i < latlngs.length; i++) {
                s += '{"lat" : ' + latlngs[i].lat.toFixed(7) + ', "long" : ' + latlngs[i].lng.toFixed(7) + '}';

                if (i < latlngs.length - 1) {
                    s += ',\n';
                }
            }

            console.log(s);
        } else {
            _devPoly = L.polygon([e.latlng]).addTo(_map);
            _devPolyCreated = true;
        }
    });

    var origin = window.location.origin;
    if (origin.includes("localhost")) {
        EnableDeveloperFeatures();
    }
}

function EnableDeveloperFeatures() {
    $(".dev-toolbar").show();

    _devFeaturesEnabled = true;
    console.log("Developer Features Enabled");
}

function DisableDeveloperFeatures() {
    $(".dev-toolbar").hide();

    _devFeaturesEnabled = false;
    console.log("Developer Features Disabled");
}