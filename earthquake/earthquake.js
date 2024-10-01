var map = L.map('earthquakemap').setView([20, -155], 4);
var basemapUrl = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
var basemap = L.tileLayer(basemapUrl, {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(map);

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
            layer.bindPopup('Magnitude: ' + feature.properties.mag + '</br>' + 'Location: ' + feature.properties.place + '</br>' + 'Time: ' + feature.properties.time);
        }
    }).addTo(map);
});