import YAML from 'js-yaml'

export function parser(yaml: string) {
  // Don't detect as comment if it is RGB color code like `#FF0000`.
  const obj = YAML.load(yaml.replace(/(#[a-f0-9]{6})/ig, "'$1'").trim(), {
    schema: YAML.JSON_SCHEMA,
    json: true
  })

  const styleObj: any = {}
  let variables = {}

  for (const key in obj as any) {
    if (key.match(/^\$/)) {
        // TODO:
        // @ts-ignore
        variables[key] = obj[key]
    } else {
      // TODO:
      // @ts-ignore
      styleObj[key] = obj[key]
    }
  }

  // Handle all nested variables.
  while(JSON.stringify(Object.values(variables)).match(/\$/)) {
    for (const key in variables as any) {
      for (const variable in variables) {
        // @ts-ignore
        let _value = JSON.stringify(variables[key])
        const regex = new RegExp(`\"\\${variable}\"`, 'g')
        // @ts-ignore
        _value = _value.replace(regex, JSON.stringify(variables[variable]))
        // @ts-ignore
        variables[key] = JSON.parse(_value)
      }
    }
  }

  let style = JSON.stringify(styleObj)

  for (const key in variables) {
    const regex = new RegExp(`\"\\${key}\"`, 'g')
    // @ts-ignore
    style = style.replace(regex, JSON.stringify(variables[key]))
  }

  return JSON.parse(style)
}
