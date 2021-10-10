import path from 'path'
import fs from 'fs'
import { parser } from '../lib/yaml-parser'
import { validateStyle } from '../lib/validate-style'
import { defaultValues } from '../lib/defaultValues'
import jsonminify from 'jsonminify'

interface options {
  provider?: string,
  compactOutput?: boolean
}

export function build(source: string, destination: string, options: options) {
  let sourcePath = path.resolve(process.cwd(), source)

  // The `source` is absolute path.
  if (source.match(/^\//)) {
    sourcePath = source
  }

  if (! fs.existsSync(sourcePath)) {
    throw `${sourcePath}: No such file or directory`
  }

  let destinationPath = ""

  if (destination) {
    if (destination.match(/^\//)) {
      destinationPath = destination
    } else {
      destinationPath = path.resolve(process.cwd(), destination)
    }
  } else {
    destinationPath = path.join(path.dirname(sourcePath), `${path.basename(source, '.yml')}.json`)
  }

  let provider = defaultValues.provider
  if (options.provider) {
    provider = options.provider
  }

  let style = ''

  try {
    const _style = parser(sourcePath)
    validateStyle(_style, provider)
    style = JSON.stringify(_style, null, '  ')
    if (options.compactOutput) {
      style = jsonminify(style)
    }
  } catch(err) {
    if (err) {
      throw err
    } else {
      throw `${sourcePath}: Invalid YAML syntax`
    }
  }

  try {
    fs.writeFileSync(destinationPath, style)
  } catch(err) {
    throw `${destinationPath}: Permission denied`
  }
}
