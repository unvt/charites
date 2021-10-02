const map = new maplibregl.Map({
  container: 'map',
  hash: true,
  style: `http://${window.location.host}/style.json`
});

const socket = new WebSocket('ws://localhost:___PORT___');

socket.addEventListener('message',(message)=>{
  map.setStyle(JSON.parse(message.data))
});
