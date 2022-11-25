;(async () => {
  const mapStyleUrl = `http://${window.location.host}/style.json`
  const mapStyleRes = await fetch(mapStyleUrl)
  const mapStyleJson = await mapStyleRes.json()

  // detect center & zoom from map style json
  let center = mapStyleJson.hasOwnProperty('center')
    ? mapStyleJson.center
    : undefined
  let zoom = mapStyleJson.hasOwnProperty('zoom') ? mapStyleJson.zoom : undefined

  // detect center & zoom from tile json
  if (center === undefined || zoom === undefined) {
    for (const sourceName in mapStyleJson.sources) {
      if (
        mapStyleJson.sources[sourceName].type === 'vector' &&
        mapStyleJson.sources[sourceName].hasOwnProperty('url')
      ) {
        const mapTileUrl = mapStyleJson.sources[sourceName].url
        const mapTileRes = await fetch(mapTileUrl)
        const mapTileJson = await mapTileRes.json()
        if (center === undefined) {
          const bounds = mapTileJson.bounds
          center = mapTileJson.center
            ? mapTileJson.center
            : [(bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2]
        }
        if (zoom === undefined) {
          zoom = (mapTileJson.minzoom + mapTileJson.maxzoom) / 2
        }
      }
    }
  }

  const map = new maplibregl.Map({
    container: 'map',
    hash: true,
    style: mapStyleUrl,
    center: center,
    zoom: zoom,
  })

  const socket = new WebSocket('ws://localhost:___PORT___')

  socket.addEventListener('message', (message) => {
    map.setStyle(JSON.parse(message.data))
  })

  map.addControl(new maplibregl.NavigationControl(), 'top-right')

  map.addControl(
    new MaplibreLegendControl(
      {},
      {
        showDefault: true,
        showCheckbox: true,
        onlyRendered: true,
        reverseOrder: true,
      },
    ),
    'bottom-left',
  )

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
})()
