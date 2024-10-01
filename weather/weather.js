var map = L.map('weathermap').setView([38, -95], 4);
var basemapUrl = 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}.png';
var basemap = L.tileLayer(basemapUrl).addTo(map);

//add national precipitation layer
var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

//add weather alerts layer
var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {
    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'yellow';
            if (feature.properties.severity === 'Extreme') alertColor = 'red';
            else if (feature.properties.severity === 'Severe') alertColor = 'orange';
            return { color: alertColor }
          },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.headline);
        }
    }).addTo(map);
});
