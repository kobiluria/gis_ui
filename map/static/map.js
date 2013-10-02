
HOME_URL = 'http://kobiluria.github.io/open_entity_gis/jsonp/maps/'

var geojson;

function get_jsonp(url){
$.ajax({
                    url: url,
                    dataType: 'jsonp',
                    success: function(data){
                        self._otherMethod = function(data){
                            return function(){
                            geojson = data;
                            }
                        }
                    }
});
}


function map_func(json){
    return json
}
var haifa_district = L.geoJson(haifa, {
    style: style,
    onEachFeature: onEachFeature,
    filter: filter_muni
});
alert(geojson)
var the_center_district = L.geoJson(the_center, {
    style: style,
    onEachFeature: onEachFeature,
    filter: filter_muni
});



cmAttr = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
    cmUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/{styleId}/256/{z}/{x}/{y}.png';

var minimal = L.tileLayer(cmUrl, {
    styleId: 22677,
    attribution: cmAttr
}),
    midnight = L.tileLayer(cmUrl, {
        styleId: 999,
        attribution: cmAttr
    });

var leaflet_map = L.map('map', {
    center: new L.LatLng(31.768942802505826, 35.21461486816406),
    zoom: 9,
    layers: [minimal, haifa_district],
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
});

the_center = '';

var baseMaps = {
    "Minimal": minimal,
    "Night View": midnight
};

var overlayMaps = {
    "haifa":haifa_district,
        "the center" : the_center_district
};


L.control.layers(baseMaps, overlayMaps,{position: 'topleft',collapsed:false}).addTo(leaflet_map);

var user_select = 4;
var info;

legend.addTo(leaflet_map)

leaflet_map.on('click', function(e) {
    alert(e.latlng);
});
L.control.mousePosition().addTo(leaflet_map);

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

function resetHighlight(e){
        for( var i in overlayMaps){
        overlayMaps[i].resetStyle(e.target);
	    info.update();
        }
}

    function zoomToFeature(e) {
        leaflet_map.fitBounds(e.target.getBounds());
}

function filter_muni(feature,layer){
   return true
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

