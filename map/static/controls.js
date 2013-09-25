/**
 * Created with PyCharm.
 * User: kobi
 * Date: 9/24/13
 * Time: 11:12 PM
 * To change this template use File | Settings | File Templates.
 */
    L.Control.Command = L.Control.extend({
        options: {
            position: 'topleft'
        },

        onAdd: function (map) {
            var controlDiv = L.DomUtil.create('div', 'leaflet-control-command');
            L.DomEvent
                .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
                .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
            .addListener(controlDiv, 'click', function () { MapShowCommand(); });

            var controlUI = L.DomUtil.create('div', 'leaflet-control-command-interior', controlDiv);
            controlUI.title = 'Map Commands';
            return controlDiv;
        }
    });

    var info = new L.Control.Command;


----------------------------




var info = new L.Control.extend({options: {
        position: 'topleft'
    }})

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

leaflet_map.addControl(info);