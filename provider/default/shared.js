;(async () => {
  window._charites = {
    initializeWebSocket: function (map) {
      const isHttps = window.location.protocol === 'https:'
      const wsProtocol = isHttps ? 'wss' : 'ws'
      const socket = new WebSocket(`${wsProtocol}://${window.location.host}`)

      socket.addEventListener('message', (message) => {
        const data = JSON.parse(message.data)
        if (data.event === 'styleUpdate') {
          map.setStyle(`//${window.location.host}/style.json`)
        } else if (data.event === 'spriteUpdate') {
          map.setStyle(`//${window.location.host}/style.json`, {
            diff: false,
          })
        }
      })
    },
    parseMapStyle: async function () {
      const mapStyleUrl = `//${window.location.host}/style.json`
      const mapStyleRes = await fetch(mapStyleUrl)
      const mapStyleJson = await mapStyleRes.json()

      // detect center & zoom from map style json
      let center = mapStyleJson.hasOwnProperty('center')
        ? mapStyleJson.center
        : undefined
      let zoom = mapStyleJson.hasOwnProperty('zoom')
        ? mapStyleJson.zoom
        : undefined

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

      return {
        style: mapStyleUrl,
        center,
        zoom,
      }
    },
    setupDebugCheckboxes: function (map) {
      const properties = [
        'showTileBoundaries',
        'showCollisionBoxes',
        'showPadding',
      ]
      for (const property of properties) {
        const control = document.getElementById(property)
        const clickHandler = function () {
          const checked = control.checked
          map[property] = checked
        }
        clickHandler()
        control.addEventListener('click', clickHandler)
      }
    },
  }
})()
