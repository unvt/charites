import path from 'path'

// import YamlIncludeDirType from './lib/dir';
import YamlIncludeFileType from './file.js'

export const YAML_VISITED_FILES: string[] = []
export const YAML_TYPES = [
  // YamlIncludeDirType,
  YamlIncludeFileType,
]
export const YAML_INCLUDE_SCHEMA = { customTags: YAML_TYPES }
export let basefile = ''

// so we know where to find files referenced relative to the base file
export function setBaseFile(file: string): void {
  YAML_VISITED_FILES.push(file)
  basefile = file
}

export function getBasePath(): string {
  return path.dirname(basefile)
}

export {
  // YamlIncludeDirType,
  YamlIncludeFileType,
}
