import path from 'path'
import fs from 'fs'
import { parser } from '../lib/yaml-parser'
var jsonminify = require("jsonminify");


export function build(source: string, destination: string) {
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

  let style = ''

  try {
    style = JSON.stringify(parser(sourcePath), null, '  ')
    style = jsonminify(style)
    // style = style.replace(/\n/g, '')
    console.log('あああああああああああ')

  } catch(err) {
    console.log(err)
    throw `${sourcePath}: Invalid YAML syntax`
  }

  try {
    console.log(style)
    fs.writeFileSync(destinationPath, style)
  } catch(err) {
    throw `${destinationPath}: Permission denied`
  }
}
