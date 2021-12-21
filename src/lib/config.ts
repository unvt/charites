import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'

type StyleConfig = {
  yamlPath: string
  jsonPath: string
  compactOutput: boolean
}

export default class Config {
  public version: string
  public style: StyleConfig

  constructor() {
    this.version = require('../../package.json').version
    this.style = {
      yamlPath: './style.yml',
      jsonPath: './public/style.json',
      compactOutput: false,
    }
  }

  write(projectDir: string) {
    const configJson = {
      version: this.version,
      style: this.style,
    }

    const configYAML = YAML.dump(configJson)
    const configPath = path.resolve(projectDir, 'config.yml')
    fs.writeFileSync(configPath, configYAML)
  }
}
