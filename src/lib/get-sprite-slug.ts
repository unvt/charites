import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec'

export function getSpriteSlug(style: StyleSpecification): string | false {
  if (!style.hasOwnProperty('sprite') || !style.sprite) {
    return false
  }

  const firstUrl = Array.isArray(style.sprite)
    ? style.sprite[0].url
    : style.sprite

  const matchedUrl = firstUrl.match(
    /^(?:[^:\/?#]+:)?(?:\/\/[^\/?#]*)?(?:([^?#]*\/)([^\/?#]*))?(\?[^#]*)?(?:#.*)?$/,
  )

  if (!matchedUrl || !matchedUrl[2]) {
    return false
  }

  // icon slug
  return matchedUrl[2]
}
