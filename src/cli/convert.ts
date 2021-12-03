import { Command } from 'commander'
import { convert } from '../commands/convert'
import { error } from '../lib/error'

const program = new Command()
program
  .name('convert')
  .arguments('<source> [destination]')
  .description('convert the style JSON to YAML')
  .action((source: string, destination: string) => {
    try {
      convert(source, destination)
    } catch (e) {
      error(e)
    }
  })

export default program
