import path from 'path'
import fs from 'fs'
import { parser } from '../lib/yaml-parser'

export function build(source: string, destination: string) {
  const sourcePath = path.resolve(process.cwd(), source)
  const destinationPath = path.resolve(process.cwd(), destination)

  const style = JSON.stringify(parser(sourcePath), null, '  ')

  try {
    fs.writeFileSync(destinationPath, style)
  } catch(err) {
    // TODO: Error handling
  }
}
