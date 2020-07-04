import commandLineArgs from 'command-line-args'
import Command from './Command'

class initCommand extends Command{
  description = 'Create a style.'
  usage = 'vt-style init [URL]'

  run() {
    const runDefinitions = [
      { name: 'target', defaultOption: true }
    ]
    const runOptions = commandLineArgs(runDefinitions, { stopAtFirstUnknown: true })

    console.log('\nrunOptions\n==========')
    console.log(runOptions)
  }
}

export default initCommand
