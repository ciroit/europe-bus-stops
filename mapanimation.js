var markers = [];

mapboxgl.accessToken = 'pk.eyJ1IjoiaGlkYWxnb2Npcm8iLCJhIjoiY2tyNGg2cHp2MWF0MzJucnpicDJhdG5ueiJ9.Ygc3-GLjRFucS4HeIbjDtQ';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v11',
  center: [2.380160747, 48.83568689],
  zoom: 5
});

async function printStops(){

  let url = "https://api.idbus.com/v1/stops";

  const response = await fetch(url, { method: "GET" , headers : {"Authorization" : "Token hIVT-km49ATuU1vI-X9zQQ"}});

  const responseJson = await response.json();

  setMarkers(responseJson.stops);
  
}

function setMarkers(stops){

  if(markers.length == 0){

    for(let a = 0; a<1000; a++){

      let stop = stops[a];
  
      let marker = new mapboxgl.Marker()
      .setLngLat([stop.longitude, stop.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<h3>' + stop.long_name + '</h3>'))
      .addTo(map);    
  
      markers.push(marker);
  
    }

  }

}

function removeStops(){

  markers.forEach(marker => {
    
    marker.remove();

  });

  markers = [];

}

