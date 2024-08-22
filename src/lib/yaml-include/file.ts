import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import * as yamlinc from './index.js'

function construct(data: string): unknown {
  const basepath = yamlinc.getBasePath()
  const fullpath = path.join(basepath, data)

  yamlinc.YAML_VISITED_FILES.push(fullpath.replace(basepath + path.sep, ''))

  const src = fs.readFileSync(fullpath, 'utf8')
  const included = yaml.load(src, {
    schema: yamlinc.YAML_INCLUDE_SCHEMA,
    filename: fullpath,
  })

  return included
}

function resolve(data: unknown): boolean {
  return typeof data === 'string'
}

export default new yaml.Type('tag:yaml.org,2002:inc/file', {
  kind: 'scalar',
  resolve: resolve,
  construct: construct,
})
