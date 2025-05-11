import path from 'path'
import fs from 'fs'
import YAML from 'yaml'
import {
  StyleSpecification,
  LayerSpecification,
} from '@maplibre/maplibre-gl-style-spec'

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
  const styleYAML = YAML.stringify(style, null, {
    singleQuote: true,
    indent: 2,
    lineWidth: 40,
  })
  let stylePath = path.resolve(process.cwd(), destinationPath)

  // The `source` is absolute path.
  if (destinationPath.match(/^\//)) {
    stylePath = destinationPath
  }

  fs.writeFileSync(stylePath, styleYAML)
}

class IncFileTag {
  value: string
  constructor(fileName: string) {
    // We use path.posix.join to make sure the path uses / path separators, even when run on Windows.
    this.value = path.posix.join('layers', fileName)
  }

  toString() {
    return this.value
  }
}

export const INC_PATH_TYPE = {
  tag: 'tag:yaml.org,2002:inc/file',
  identify: (value: unknown) => value instanceof IncFileTag,
  resolve: (str: string) => str,
  stringify: (item: IncFileTag | unknown) => {
    if (item instanceof IncFileTag) {
      const value = item.value
      return value
    }
    return String(item)
  },
}

const writeDecompositedYaml = (
  destinationPath: string,
  style: StyleSpecification,
) => {
  const layers: LayerSpecification[] = []

  for (let i = 0; i < style.layers.length; i++) {
    const layer = style.layers[i]
    const layerYml = YAML.stringify(layer, null, {
      singleQuote: true,
      indent: 2,
      lineWidth: 40,
    })
    const fileName = `${style.layers[i].id}.yml`
    const layersDirName = path.join(path.dirname(destinationPath), 'layers')
    const filePath = path.join(layersDirName, fileName)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, layerYml)

    // ts-ignore is required here because the !!inc/file object is not compatible with the Layer object type.
    // @ts-ignore
    layers.push(new IncFileTag(fileName))
  }

  style.layers = layers

  const yamlOutput = YAML.stringify(style, null, {
    customTags: [INC_PATH_TYPE],
    singleQuote: true,
    indent: 2,
    lineWidth: 40,
  })

  fs.writeFileSync(destinationPath, yamlOutput)
}
