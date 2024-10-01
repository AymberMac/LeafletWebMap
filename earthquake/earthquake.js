var map = L.map('earthquakemap').setView([20, -155], 4);
var basemapUrl = 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}.png';
var basemap = L.tileLayer(basemapUrl).addTo(map);

//add earthquake alerts layer
var earthquakeFeedUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
$.getJSON(earthquakeFeedUrl, function(data) {
    L.geoJSON(data, {
        style: function(feature){
            var magColor = 'Black';
            if (feature.properties.mag > 9.0) alertColor = 'Indigo';
            else if (feature.properties.mag > 8.0) alertColor = 'DarkMagenta';
            else if (feature.properties.mag > 7.0) alertColor = 'DarkRed';
            else if (feature.properties.mag > 6.0) alertColor = 'Red';
            else if (feature.properties.mag > 5.0) alertColor = 'OrangeRed';
            else if (feature.properties.mag > 4.0) alertColor = 'DarkOrange';
            else if (feature.properties.mag > 3.0) alertColor = 'Orange';
            else if (feature.properties.mag > 2.0) alertColor = 'Gold';
            else if (feature.properties.mag > 1.0) alertColor = 'Yellow';
            return { color: alertColor }
          },
        onEachFeature: function(feature, layer) {
            layer.bindPopup('Magnitude: ' + feature.properties.mag + '</br>' + 'Location: ' + feature.properties.place + '</br>' + 'Time: ' + feature.properties.time);
        }
    }).addTo(map);
});