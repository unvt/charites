// @ts-ignore
const styleSpec = require('@maplibre/maplibre-gl-style-spec')

export function validateStyle(style: object): void {
  const result = styleSpec.validate(style)

  const errors = []
  for (let i = 0; i < result.length; i++) {
    if (result[i].message) {
      errors.push(result[i].message)
    }
  }

  if (errors.length) {
    throw `\u001b[31mError:\u001b[0m ${errors.join("\n\u001b[31mError:\u001b[0m ")}`
  }
}
