import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import os from 'os'
import fs from 'fs'
import YAML from 'js-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface Config {
  provider: string
  providerDir: string
}

const homedir = os.homedir()
const defaultProvider = 'default'

const configDir = path.join(homedir, '.charites')
fs.mkdirSync(configDir, { recursive: true })

const configFile = path.join(configDir, 'config.yml')
let config: Config = { provider: '', providerDir: '' }

try {
  const yaml = fs.readFileSync(configFile, 'utf-8')
  config = YAML.load(yaml) as Config
} catch (_) {
  // nothing to do
}

export const defaultValues: Config = {
  provider: config.provider || defaultProvider,
  providerDir: path.join(path.dirname(path.dirname(__dirname)), 'provider'),
}

export const defaultSettings = {
  configFile: configFile,
}
