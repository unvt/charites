import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import * as yamlinc from './index.js'

const fileTag = {
  identify: () => false,
  tag: 'tag:yaml.org,2002:inc/file',
  resolve(str: string) {
    const basepath = yamlinc.getBasePath()
    const fullpath = path.join(basepath, str)

    yamlinc.YAML_VISITED_FILES.push(fullpath.replace(basepath + path.sep, ''))

    const src = fs.readFileSync(fullpath, 'utf8')
    // YAMLパッケージでのパース
    const included = YAML.parse(src, {
      customTags: yamlinc.YAML_TYPES,
    })

    return included
  },
}

export default fileTag
