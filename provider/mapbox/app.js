;(async () => {
  mapboxgl.accessToken = '___MAPBOX_ACCESS_TOKEN___'

  const { style, center, zoom } = await window._charites.parseMapStyle()
  const options = {
    container: 'map',
    hash: true,
    style,
  }
  if (center) options.center = center
  if (zoom) options.zoom = zoom
  const map = new mapboxgl.Map(options)

  window._charites.initializeWebSocket(map)

  map.addControl(new mapboxgl.NavigationControl(), 'top-right')

  map.addControl(
    new MapboxLegendControl(
      {},
      {
        showDefault: true,
        showCheckbox: true,
        onlyRendered: true,
        reverseOrder: true,
        accesstoken: mapboxgl.accessToken,
      },
    ),
    'bottom-left',
  )

  window._charites.setupDebugCheckboxes(map)
})()
