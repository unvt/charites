const map = new maplibregl.Map({
  container: 'map',
  hash: true,
  style: `http://${window.location.host}/style.json`,
})

const socket = new WebSocket('ws://localhost:___PORT___')

socket.addEventListener('message', (message) => {
  map.setStyle(JSON.parse(message.data))
})

map.addControl(new maplibregl.NavigationControl(), 'top-right')

const showTileBoundaries = document.getElementById('showTileBoundaries')
const setShowTileBoundaries = function () {
  const checked = showTileBoundaries.checked
  map.showTileBoundaries = checked
}
setShowTileBoundaries()
showTileBoundaries.addEventListener('click', setShowTileBoundaries)

const showCollisionBoxes = document.getElementById('showCollisionBoxes')
const setShowCollisionBoxes = function () {
  const checked = showCollisionBoxes.checked
  map.showCollisionBoxes = checked
}
setShowCollisionBoxes()
showCollisionBoxes.addEventListener('click', setShowCollisionBoxes)

const showPadding = document.getElementById('showPadding')
const setShowPadding = function () {
  const checked = showPadding.checked
  map.showPadding = checked
}
setShowPadding()
showPadding.addEventListener('click', setShowPadding)
