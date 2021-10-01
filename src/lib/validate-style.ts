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
    throw `ERROR:\n* ${errors.join("\n* ")}`
  }
}
