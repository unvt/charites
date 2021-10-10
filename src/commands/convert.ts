import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'
import { Buffer } from 'buffer'
import { readlineSync } from 'readline-sync'

// TODO: Type of style should be loaded from maplibre or mapbox style spec.
const writeYaml = (destinationPath: string, style: any) => {
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

  fs.writeFileSync(destinationPath, YAML.dump(style).replace(/'\!\!inc\/file layers\/.+\.yml'/g, function (match) {
    return match.replace(/'/g, '')
  }))
}

export function convert(source: string, destination: string) {
  let style, sourcePath, destinationPath

  if ('-' === source) {
    const buf = Buffer.alloc(1024)
    let data

    while (true) {
      var n = fs.readSync(proce, 100, 0, 'utf8')
      if (!n) break
      data += b.toString(null, 0, n)
    }
  } else {
    sourcePath = path.resolve(process.cwd(), source)

    // The `source` is absolute path.
    if (source.match(/^\//)) {
      sourcePath = source
    }

    if (! fs.existsSync(sourcePath)) {
      throw `${sourcePath}: No such file or directory`
    }

    style = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'))
  }

  if (destination) {
    if (destination.match(/^\//)) {
      destinationPath = destination
    } else {
      destinationPath = path.resolve(process.cwd(), destination)
    }
  } else {
    if (sourcePath) {
      destinationPath = path.join(path.dirname(sourcePath), `${path.basename(source, '.json')}.yml`)
    } else {
      destinationPath = path.join(process.cwd(), 'style.yml')
    }
  }

  try {
    writeYaml(destinationPath, style)
  } catch(err) {
    throw `${destinationPath}: Permission denied`
  }
}
