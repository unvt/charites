import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'
import {
  StyleSpecification,
  LayerSpecification,
} from '@maplibre/maplibre-gl-style-spec/types'

export const writeYaml = (
  destinationPath: string,
  style: StyleSpecification,
  composite = false,
) => {
  if (composite === true) {
    writeCompositedYaml(destinationPath, style)
  } else {
    writeDecompositedYaml(destinationPath, style)
  }
}

const writeCompositedYaml = (
  destinationPath: string,
  style: StyleSpecification,
) => {
  const styleYAML = YAML.dump(style)
  let stylePath = path.resolve(process.cwd(), destinationPath)

  // The `source` is absolute path.
  if (destinationPath.match(/^\//)) {
    stylePath = destinationPath
  }

  try {
    fs.writeFileSync(stylePath, styleYAML)
  } catch (err) {
    throw `${stylePath}: Permission denied`
  }
}

const writeDecompositedYaml = (
  destinationPath: string,
  style: StyleSpecification,
) => {
  const layers: LayerSpecification[] = []

  for (let i = 0; i < style.layers.length; i++) {
    const layer = style.layers[i]
    const layerYml = YAML.dump(layer)
    const fileName = `${style.layers[i].id}.yml`
    const dirName = path.join(path.dirname(destinationPath), 'layers')
    fs.mkdirSync(dirName, { recursive: true })
    fs.writeFileSync(path.join(dirName, fileName), layerYml)
    // @ts-ignore
    layers.push(`!!inc/file ${path.join('layers', fileName)}`)
  }

  style.layers = layers

  fs.writeFileSync(
    destinationPath,
    YAML.dump(style).replace(
      /'\!\!inc\/file layers\/.+\.yml'/g,
      function (match) {
        return match.replace(/'/g, '')
      },
    ),
  )
}
