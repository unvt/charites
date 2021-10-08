import fs from 'fs'
import YAML from 'js-yaml'

const yamlinc = require('yaml-include')

interface StyleObject {
  [key: string]: any;
}

export function parser(file: string): object {
  yamlinc.setBaseFile(file)
  const yaml = fs.readFileSync(file, 'utf8')

  const obj: StyleObject = YAML.load(yaml, {
    schema: yamlinc.YAML_INCLUDE_SCHEMA,
    filename: file,
    json: true
  }) as StyleObject

  const styleObj: StyleObject = {}
  let variables: StyleObject = {}

  for (const key in obj as any) {
    if (key.match(/^\$/)) {
      variables[key] = obj[key]
    } else {
      styleObj[key] = obj[key]
    }
  }

  // Handle all nested variables.
  while(JSON.stringify(Object.values(variables)).match(/\$/)) {
    for (const key in variables as any) {
      for (const variable in variables) {
        let _value = JSON.stringify(variables[key])
        const regex = new RegExp(`\"\\${variable}\"`, 'g')
        _value = _value.replace(regex, JSON.stringify(variables[variable]))
        variables[key] = JSON.parse(_value)
      }
    }
  }

  let style = JSON.stringify(styleObj)

  for (const key in variables) {
    const regex = new RegExp(`\"\\${key}\"`, 'g')
    style = style.replace(regex, JSON.stringify(variables[key]))
  }

  return JSON.parse(style)
}
