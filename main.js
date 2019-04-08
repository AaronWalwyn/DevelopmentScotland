var _map = Initialise();
AddPoly();
LoadDevelopmentData();

function Initialise()
{
    var map = L.map( 'map', {
        center: [55.948513, -3.199966],
        minZoom:10,
        zoom: 12
    });
    
    L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: ['a','b','c']
    }).addTo( map );

    L.tileLayer.provider('OpenStreetMap.HOT').addTo(map);

    return map;
}

function AddPoly()
{
    var polygon = L.polygon([
        [55.946307,-3.1929159],
        [55.9456527,-3.2043714],
        [55.9510052,-3.2058432],
        [55.9507843,-3.1940235]
    ]).addTo( _map );

    polygon.bindPopup("I am a polygon.");
}

function LoadDevelopmentData()
{
    $.getJSON( "data.json", __LoadDevelopmentData);
}

function __LoadDevelopmentData(data)
{
    var count = data.developments.length;
    console.log("Count: " + count);

    for(var i = 0; i < count; i++)
    {
        points = data.developments[i].Points;
        var latlngs = [];

        var s = "";

        for(j = 0; j < points.length; j++)
        {
            latlngs.push([points[j].lat, points[j].long])
            s += "{\"lat\" : " + points[j].lat + ", \"long\" : " + points[j].long + "}, \n"
        }

        console.log(s);

        var polygon = L.polygon(latlngs).addTo( _map );

        var pop = "";
        pop += data.developments[i].Name + "<br />";
        pop += "<a href=\"" + data.developments[i].URL + "\" target=\"_blank\">Website</a>"
        pop += " | "
        pop += "<a href=\"" + data.developments[i].URL + "\" target=\"_blank\">Skyscraper City</a>"
        
        polygon.bindPopup(pop);
    }
}