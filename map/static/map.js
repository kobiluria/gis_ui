/**
 * Created with PyCharm.
 * User: kobi
 * Date: 8/14/13
 * Time: 9:27 PM
 * To change this template use File | Settings | File Templates.
 */


    var map = L.map('map').setView([31.768942802505826, 35.21461486816406], 10);
        L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);
    L.geoJson(geo_json).addTo(map);