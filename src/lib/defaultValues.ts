import path from 'path'
import os from 'os'
import fs from 'fs'
import YAML from 'js-yaml'

interface Config {
  provider: string
  providerDir: string
  mapboxAccessToken?: string
}

const homedir = os.homedir()
const defaultProvider = "default"

const configDir = path.join(homedir, '.charites')
fs.mkdirSync(configDir, { recursive: true });

const configFile = path.join(configDir, 'config.yml')
let config: Config = {provider: '', providerDir: '', mapboxAccessToken: ''}

try {
  const yaml = fs.readFileSync(configFile, 'utf-8')
  config = YAML.load(yaml) as Config
} catch(e) {
  // nothing to do
}

export const defaultValues: Config = {
  provider: config.provider || defaultProvider,
  providerDir: path.join(path.dirname(path.dirname(__dirname)), 'provider'),
  mapboxAccessToken: config.mapboxAccessToken || ''
}

export const defaultSettings = {
  configFile: configFile
}
