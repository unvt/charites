import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec/types'

export function getSpriteSlug(style: StyleSpecification): string | false {
  if (!style.hasOwnProperty('sprite')) {
    return false
  }

  const matchedUrl = style.sprite?.match(
    /^(?:[^:\/?#]+:)?(?:\/\/[^\/?#]*)?(?:([^?#]*\/)([^\/?#]*))?(\?[^#]*)?(?:#.*)?$/,
  )

  if (!matchedUrl || !matchedUrl[2]) {
    return false
  }

  // icon slug
  return matchedUrl[2]
}
