import {
  Map,
  Popup,
  MapOptions,
  NavigationControl,
  addProtocol,
  IControl,
} from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import '@maplibre/maplibre-gl-inspect/dist/maplibre-gl-inspect.css'
import MaplibreInspect from '@maplibre/maplibre-gl-inspect'
import { MaplibreLegendControl } from '@watergis/maplibre-gl-legend'
import '@watergis/maplibre-gl-legend/dist/maplibre-gl-legend.css'
import { Protocol } from 'pmtiles'
import './app.css'

const protocol = new Protocol()
addProtocol('pmtiles', protocol.tile)

class Charites {
  constructor() {}

  initializeWebSocket = (map: Map) => {
    const isHttps = window.location.protocol === 'https:'
    const wsProtocol = isHttps ? 'wss' : 'ws'
    const socket = new WebSocket(`${wsProtocol}://${window.location.host}`)

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data)
      if (data.event === 'styleUpdate') {
        console.log('styleUpdate', data)
        map.setStyle(`//${window.location.host}/style.json`)
      } else if (data.event === 'spriteUpdate') {
        map.setStyle(`//${window.location.host}/style.json`, {
          diff: false,
        })
      }
    })
  }

  parseMapStyle = async () => {
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
            if (!center && bounds) {
              center = [
                (bounds[0] + bounds[2]) / 2,
                (bounds[1] + bounds[3]) / 2,
              ]
            }
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
  }

  setupDebugCheckbox = (map: Map) => {
    const properties = [
      'showTileBoundaries',
      'showCollisionBoxes',
      'showPadding',
    ]
    for (const property of properties) {
      const control = document.getElementById(property) as HTMLInputElement
      const clickHandler = () => {
        const checked = control.checked
        map[property] = checked
      }
      clickHandler()
      control.addEventListener('click', clickHandler)
    }
  }
}

const init = async () => {
  const charites = new Charites()
  const { style, center, zoom } = await charites.parseMapStyle()
  const options: MapOptions = {
    container: 'map',
    hash: true,
    maxPitch: 85,
    style,
  }
  if (center) {
    options.center = center
  }
  if (zoom) {
    options.zoom = zoom
  }
  const map = new Map(options)

  charites.initializeWebSocket(map)

  map.addControl(
    new MaplibreInspect({
      popup: new Popup({
        closeButton: false,
        closeOnClick: false,
      }),
    }),
  )
  map.addControl(new NavigationControl(), 'top-right')
  map.addControl(
    new MaplibreLegendControl(
      {},
      {
        showDefault: true,
        showCheckbox: true,
        onlyRendered: true,
        reverseOrder: true,
      },
    ) as unknown as IControl,
    'bottom-left',
  )
  charites.setupDebugCheckbox(map)
}
init()
