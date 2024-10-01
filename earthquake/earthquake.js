var map = L.map('earthquakemap').setView([15, -30], 2);
var basemapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}';
var basemap = L.tileLayer(basemapUrl, {attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service'}).addTo(map);

// create marker array
let markersArray = {}; 
// create magnitude array
let magsArray = {}; 

//add earthquake alerts layer
var earthquakeFeedUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
$.getJSON(earthquakeFeedUrl, function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            const mag = feature.properties.mag;
            const geojsonMarkerOptions = {
              opacity: 0.8,
              fillOpacity: 0.8,
              // define the marker color
              color: mag >= 9.0 ? 'DarkMagenta' : mag >= 8.0 ? 'MediumVioletRed' : mag >= 7.0 ? 'DarkRed' : 
              mag >= 6.0 ? 'Red' : mag >= 5.0 ? 'OrangeRed' : mag >= 4.0 ? 'DarkOrange' : mag >= 3.0 ? 'Orange' : 
              mag >= 2.0 ? 'Goldenrod' : mag >= 1.0 ? 'Gold': 'Yellow'
            };
    
            // define popups
            markersArray[feature.id] = L.circleMarker(latlng, geojsonMarkerOptions)
                   .addTo(map)
                   .bindPopup(
                  `<b>Magnitude:</b>  ${feature.properties.mag} 
                   <br><b>Location:</b>  ${feature.properties.place}
                   <br><b>Time:</b>  ${feature.properties.time}`, {
              closeButton: true,
              offset: L.point(0, -20)
            });
    
            // here record the mags
            magsArray[feature.id] = feature.properties.mag;
    
            return L.circleMarker(latlng, geojsonMarkerOptions);
          },
        })
    
        // add dynamically anchor tags
        let markup = '';
        for (let i in markersArray) {
          markup += `<a href="#" onclick="markersArray['${i}'].openPopup()"><b>${magsArray[i]} Mag</b></a><br/>`;
        }
        document.getElementById('anchors').innerHTML = markup;
      });