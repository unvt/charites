import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'

export function convert(source: string, destination: string) {
  const sourcePath = path.resolve(process.cwd(), source)

  let destinationPath = ""

  if (destination) {
    destinationPath = path.resolve(process.cwd(), destination)
  } else {
    destinationPath = path.join(path.dirname(sourcePath), `${path.basename(source, '.json')}.yml`)
  }

  const style = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'))
  const layers = []

  for (let i = 0; i < style.layers.length; i++) {
    const layer = style.layers[i]
    const layerYml = YAML.dump(layer)
    const fileName = `${style.layers[i].id}.yml`
    const dirName = path.join(path.dirname(destinationPath), 'layers')
    fs.mkdirSync(dirName, { recursive: true })
    fs.writeFileSync(path.join(dirName, fileName), layerYml)

    layers.push(`!!inc/file ${path.join('layers', fileName)}`)
  }

  style.layers = layers

  try {
    fs.writeFileSync(destinationPath, YAML.dump(style).replace(/'\!\!inc\/file layers\/.+\.yml'/g, function (match) {
      return match.replace(/'/g, '')
    }))
  } catch(err) {
    // TODO: Error handling
  }
}
