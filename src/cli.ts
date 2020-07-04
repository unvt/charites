#!/usr/bin/env node

import commandLineArgs from 'command-line-args'
import Usage from './lib/Usage'

import initCommand from './lib/initCommand'
import startCommand from './lib/startCommand'

type Commands = {
  [key: string]: any;
}

const commands: Commands = {
  init: initCommand,
  start: startCommand,
}

const mainCommand = commandLineArgs([
  { name: 'name', defaultOption: true }
], { stopAtFirstUnknown: true })

if (commands[mainCommand.name]) {
  const command = new commands[mainCommand.name]()
  command.run(mainCommand)
} else {
  Usage(commands)
}
