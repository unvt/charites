import commandLineArgs from 'command-line-args'
import Command from './Command'

class startCommand extends Command{
  description = 'Start a development server.'
  usage = 'vt-style start'

  run() {
    const runDefinitions = [
      { name: 'port', alias: 'p', type: Number, defaultValue: 8080 },
    ]
    const runOptions = commandLineArgs(runDefinitions, { stopAtFirstUnknown: true })

    console.log('\nrunOptions\n==========')
    console.log(runOptions)
  }
}

export default startCommand
