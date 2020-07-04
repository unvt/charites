import commandLineUsage from 'command-line-usage'

type Commands = {
  [key: string]: any;
}

const sections = [
  {
    header: 'vt-style',
    content: 'A command-line utility for Mapbox GL style.'
  },
  {
    header: 'Synopsis',
    content: '$ vt-style <command> [options]'
  },
]

const Usage = (commands: Commands) => {
  const commandList = []
  for (const name in commands) {
    const cmd = new commands[name]()
    commandList.push({
      name: name,
      summary: cmd.description,
    })
  }

  sections.push({
    header: 'Command List',
    // @ts-ignore
    content: commandList
  })

  const usage = commandLineUsage(sections)
  console.log(usage)
}

export default Usage
