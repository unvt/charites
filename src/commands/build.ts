import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'

export function build(source: string, destination: string) {
  const sourcePath = path.resolve(process.cwd(), source)
  const destinationPath = path.resolve(process.cwd(), destination)

  const yaml = fs.readFileSync(sourcePath, 'utf8')
  const style = JSON.stringify(YAML.load(yaml), null, '  ')

  try {
    fs.writeFileSync(destinationPath, style)
  } catch(err) {
    // TODO: Error handling
  }
}
