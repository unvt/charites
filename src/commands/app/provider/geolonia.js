const map = new geolonia.Map('#map')
const socket = new WebSocket('ws://localhost:___PORT___');
socket.addEventListener('message',(message)=>{
  map.setStyle(JSON.parse(message.data))
});
