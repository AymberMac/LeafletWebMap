var map = L.map('earthquakemap').setView([20, -155], 4);
var basemapUrl = 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}.png';
var basemap = L.tileLayer(basemapUrl).addTo(map);

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