;(async () => {
  const { style, center, zoom } = await window._charites.parseMapStyle()
  const options = {
    container: 'map',
    hash: true,
    style,
  }
  if (center) options.center = center
  if (zoom) options.zoom = zoom
  const map = new geolonia.Map(options)

  window._charites.initializeWebSocket((message) => {
    map.setStyle(JSON.parse(message.data))
  })

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

  window._charites.setupDebugCheckboxes(map)
})()
