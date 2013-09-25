
var leaflet_map = L.map('map').setView([31.768942802505826, 35.21461486816406], 9);
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(leaflet_map);

var geojson;
var user_select = 4;
var info;

function getColor(d) {
    return d > 500  ? '#BD0026' :
        d > 200  ? '#E31A1C' :
            d > 100  ? '#FC4E2A' :
                d > 50   ? '#FD8D3C' :
                    d > 20   ? '#FEB24C' :
                        d > 10   ? '#FED976' :
                            d > 1    ? '#800026' :
                                '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.id),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#87AFC7',
        dashArray: '',
        fillOpacity: 0.99
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    leaflet_map.fitBounds(e.target.getBounds());
}

function filter_muni(feature,layer){
    if (feature.properties.id == 1 ){
        return false
    }
    if (feature.properties.id <= 7 ){
        return false
    }

    if (feature.properties.division_id == user_select){
        return true;
    }

    else return false
}
function onEachFeature(feature, layer) {
    if(feature.properties.id == 1){
        return
    }
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(geo_data, {
    style: style,
    onEachFeature: onEachFeature,
    filter: filter_muni
}).addTo(leaflet_map);


var info = L.control();

info.onAdd = function (leaflet_map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};


// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4> Budget Data </h4>' +  (props ?
        '<b>' + props.name_en + '</b><br />'+'<h3> api id:<h3>' + props.id + '  #' +'<h3> division id :<h3>' + props.division_id + '  #'
        : 'Hover over a Muni');
};

info.addTo(leaflet_map)

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    this._div = L.DomUtil.create('div', 'info legend'),
    this.update();
    return this._div;
};
legend.update = function(props){
 this._div.innerHTML = '<h4>US Population Density</h4>';
}

legend.addTo(leaflet_map)
