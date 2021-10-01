// @ts-ignore
const styleSpec = require('@maplibre/maplibre-gl-style-spec')

export function validateStyle(style: object) {
  const result = styleSpec.validate(style)

  const errors = []
  for (let i = 0; i < result.length; i++) {
    if (result[i].message) {
      errors.push(result[i].message)
    }
  }

  if (errors.length) {
    throw errors
  }

  return true
}
