var _devPoly;
var _devPolyCreated = false;

var _map = Initialise();
LoadDevelopmentData();
__SetupDevFeatures();

function Initialise()
{
    var map = L.map( 'map', {
        center: [55.948513, -3.199966],
        minZoom:12,
        zoom: 14,

        attributionControl: false
    });
    
    L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        /*attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',*/
        subdomains: ['a','b','c']
    }).addTo( map );

    L.tileLayer.provider('OpenStreetMap.HOT').addTo(map);

    return map;
}

function LoadDevelopmentData()
{
    $.getJSON( "js/data.json", __LoadDevelopmentData);
}

function __LoadDevelopmentData(data)
{
    var count = data.developments.length;

    var latDif = 55.9642874 - 55.9622216;
    var longDif = -3.2186344 - -3.2226714

    for(var i = 0; i < count; i++)
    {
        points = data.developments[i].Points;

        if(points.length == 0)
        {
            points.push({"lat" : 55.9639511 + (i * latDif), "long" : -3.2216407});
            points.push({"lat" : 55.9612127 + (i * latDif), "long" : -3.2216407 + longDif});
            points.push({"lat" : 55.9609725 + ((i + 1) * latDif), "long" : -3.2162295});
            points.push({"lat" : 55.9638550 + ((i + 1) * latDif), "long" : -3.2160577 + longDif});
        }

       var latlngs = [];
       for(j = 0; j < points.length; j++)
       {
           latlngs.push([points[j].lat, points[j].long])
       }

        var polygon = L.polygon(latlngs).addTo( _map );

        var pop =   "<div class=\"development\">";
        pop +=      "<div class=\"development-name\">" + data.developments[i].Name + "</div>";
        pop +=      "<img class=\"development-thumb\" src=\"" + data.developments[i].Image + "\">"
        pop +=      "<ul>"
        pop +=      "<li><a href=\"" + data.developments[i].URL + "\" target=\"_blank\">Official Website</a></li>"
        pop +=      "<li><a href=\"" + data.developments[i].URL + "\" target=\"_blank\">Skyscraper City</a></li>"
        pop +=      "</ul>"
        pop +=      "</div>"
        
        polygon.bindPopup(pop);
    }
}

function __SetupDevFeatures()
{
    _map.on('click', function(e) {

        if(_devPolyCreated)
        {
            _devPoly.addLatLng(e.latlng);

            var s = "";
            var latlngs = _devPoly.getLatLngs();
            for(var i = 0; i < latlngs.length; i++)
            {
                s += '{"lat" : ' + latlngs[i].lat.toFixed(7) + ', "long" : ' + latlngs[i].lng.toFixed(7) + '}';

                if(i < latlngs.length - 1)
                {
                    s += ',\n';
                }
            }

            console.log(s);
        }
        else
        {
            _devPoly = L.polygon([e.latlng]).addTo( _map );
            _devPolyCreated = true;
        }              
    });
}