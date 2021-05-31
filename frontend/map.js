const coordsPrestatyn = [53.335400, -3.406320];
const coordsLlandudno = [53.326542, -3.834460];
const coordsLlanfairfechan = [53.253899, -3.978390];

let map = L.map('map').setView(coords, 13);

let marker1 = L.marker(coordsPrestatyn).addTo(map);
marker1.bindPopup("<b>Here is our start</b><br> What stories will you hear today.");

let marker2 = L.marker(coordsLlandudno).addTo(map);
marker2.bindPopup("<b>This is the midway point.</b><br> Exciting!");

let marker3 = L.marker(coordsLlanfairfechan).addTo(map);
marker3.bindPopup("<b>This is the end!</b><br> Time to go back home.");