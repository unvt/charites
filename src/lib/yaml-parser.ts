import fs from 'fs'
import YAML from 'js-yaml'
import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec'
import * as yamlinc from './yaml-include/index.js'

interface StyleObject {
  [key: string]: string
}

export function parser(file: string): StyleSpecification {
  yamlinc.setBaseFile(file)
  const schema = yamlinc.YAML_INCLUDE_SCHEMA
  const yaml = fs.readFileSync(file, 'utf8')

  const obj: StyleObject = YAML.load(yaml, {
    schema,
    filename: file,
    json: true,
  }) as StyleObject

  const styleObj: StyleObject = {}
  const variables: StyleObject = {}

  for (const key in obj) {
    if (key.match(/^\$/)) {
      variables[key] = obj[key]
    } else {
      styleObj[key] = obj[key]
    }
  }

  // Handle all nested variables.
  while (JSON.stringify(Object.values(variables)).match(/\$/)) {
    for (const key in variables) {
      for (const variable in variables) {
        let _value = JSON.stringify(variables[key])
        const regex = new RegExp(`\"\\${variable}\"`, 'g')
        _value = _value.replace(regex, JSON.stringify(variables[variable]))
        variables[key] = JSON.parse(_value)
      }
    }
  }

  let style: string = JSON.stringify(styleObj)

  for (const key in variables) {
    const regex = new RegExp(`\"\\${key}\"`, 'g')
    style = style.replace(regex, JSON.stringify(variables[key]))
  }

  return JSON.parse(style)
}
