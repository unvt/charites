import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'
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
  const styleYAML = YAML.dump(style)
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
}

const INC_PATH_TYPE = new YAML.Type('tag:yaml.org,2002:import/single', {
  kind: 'scalar',
  resolve: (data) => data,
  construct: (data) => new IncFileTag(data),
  instanceOf: IncFileTag,
  represent: (tag) => (tag as IncFileTag).value,
})
const INC_PATH_OUTPUT_SCHEMA = YAML.DEFAULT_SCHEMA.extend([INC_PATH_TYPE])

const writeDecompositedYaml = (
  destinationPath: string,
  style: StyleSpecification,
) => {
  const layers: LayerSpecification[] = []

  for (let i = 0; i < style.layers.length; i++) {
    const layer = style.layers[i]
    const layerYml = YAML.dump(layer)
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

  fs.writeFileSync(
    destinationPath,
    YAML.dump(style, {
      schema: INC_PATH_OUTPUT_SCHEMA,
    }),
  )
}
