#!/usr/bin/env node

import { Command } from 'commander'

import init from './cli/init.js'
import convert from './cli/convert.js'
import build from './cli/build.js'
import serve from './cli/serve.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'

// ESMの__dirnameの代わり
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()

const packageJson = readFileSync(join(__dirname, '../package.json'), 'utf-8')
const { version } = JSON.parse(packageJson)
program
  .version(version, '-v, --version', 'output the version number')
  .addCommand(init)
  .addCommand(convert)
  .addCommand(build)
  .addCommand(serve)

program.parse(process.argv)
