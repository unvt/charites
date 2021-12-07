import path from 'path'
import fs from 'fs'
import readline from 'readline'
import { writeYaml } from '../lib/yaml-writer'

const getDestinationPath = (destination: string, sourcePath = '') => {
  let destinationPath

  if (destination) {
    if (destination.match(/^\//)) {
      destinationPath = destination
    } else {
      destinationPath = path.resolve(process.cwd(), destination)
    }
  } else {
    if (sourcePath) {
      destinationPath = path.join(
        path.dirname(sourcePath),
        `${path.basename(sourcePath, '.json')}.yml`,
      )
    } else {
      destinationPath = path.join(process.cwd(), 'style.yml')
    }
  }

  return destinationPath
}

export function convert(source: string, destination: string) {
  let style, sourcePath

  if ('-' === source) {
    const rl = readline.createInterface({
      input: process.stdin,
      terminal: false,
    })

    const lines: string[] = []

    rl.on('line', (line) => {
      lines.push(line)
    })

    rl.on('close', () => {
      const style = JSON.parse(lines.join(''))
      const destinationPath = getDestinationPath(destination)

      try {
        writeYaml(destinationPath, style, false)
      } catch (err) {
        throw `${destinationPath}: Permission denied`
      }
    })
  } else {
    sourcePath = path.resolve(process.cwd(), source)

    // The `source` is absolute path.
    if (source.match(/^\//)) {
      sourcePath = source
    }

    if (!fs.existsSync(sourcePath)) {
      throw `${sourcePath}: No such file or directory`
    }

    style = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'))

    const destinationPath = getDestinationPath(destination, sourcePath)

    try {
      writeYaml(destinationPath, style, false)
    } catch (err) {
      throw `${destinationPath}: Permission denied`
    }
  }
}
