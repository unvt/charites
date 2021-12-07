#!/usr/bin/env node

import { Command } from 'commander'

import init from './cli/init'
import convert from './cli/convert'
import build from './cli/build'
import serve from './cli/serve'

const program = new Command()
const version = require('../package.json').version
program
  .version(version, '-v, --version', 'output the version number')
  .addCommand(init)
  .addCommand(convert)
  .addCommand(build)
  .addCommand(serve)

program.parse(process.argv)
