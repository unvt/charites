import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'

// TODO: We need type definition for style.
const styleRoot = {
  version: 8,
  name: "My Style",
  sprite: "",
  glyphs: "",
  sources: {},
  layers: []
}

export function init(file: string) {
  const styleYAML = YAML.dump(styleRoot)
  let stylePath = path.resolve(process.cwd(), file)

  // The `source` is absolute path.
  if (file.match(/^\//)) {
    stylePath = file
  }

  try {
    fs.writeFileSync(stylePath, styleYAML)
  } catch(err) {
    throw `${stylePath}: Permission denied`
  }
}
