var map = L.map('earthquakemap').setView([38, -95], 4);
var basemapUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';
var basemap = L.tileLayer(basemapUrl, {attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

//add earthquake alerts layer
var earthquakeFeedUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
$.getJSON(earthquakeFeedUrl, function(data) {
    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'yellow';
            if (feature.properties.mag >= 6.6) {
                alertColor = 'red';
            } else if (feature.properties.mag >= 3.3) {
                alertColor = 'orange';
            } else return {color: alertColor};
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.title, feature.properties.mag,);
        }
    }).addTo(map);
});