#!/usr/bin/env node

import { Command } from 'commander';

import { init } from './commands/init'
import { build } from './commands/build'

const program = new Command();

program
  .command('init <file>')
  .description('initialize a style JSON')
  .action(init)

program
  .command('build <source> [destination]')
  .description('build a style JSON from the YAML')
  .action(build);

program.parse(process.argv)
