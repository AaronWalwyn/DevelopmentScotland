var _categories;
var _developments;

var _map = Initialise();
LoadDevelopmentData();

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
    _categories = data.categories;
    _developments = data.developments;

    var count = _developments.length;

    var latDif = 55.9642874 - 55.9622216;
    var longDif = -3.2186344 - -3.2226714

    for(var i = 0; i < count; i++)
    {
        var development = _developments[i];
        var category = _categories[development.Category];
        points = development.Points;

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

        polygon.setStyle({
            fillColor : category.Colour,
            color: category.Colour
        });

        var pop =   "<div class=\"development\">";
        pop +=      "<div class=\"development-name\">" + development.Name + "</div>";
        pop +=      "<img class=\"development-thumb\" src=\"" + development.Image + "\">"
        pop +=      "<ul>"
        pop +=      "<li><a href=\"" + development.URL + "\" target=\"_blank\">Official Website</a></li>"
        pop +=      "<li><a href=\"" + development.URL + "\" target=\"_blank\">Skyscraper City</a></li>"
        pop +=      "</ul>"
        pop +=      "</div>"
        
        polygon.bindPopup(pop);
    }
}