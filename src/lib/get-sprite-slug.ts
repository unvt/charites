export function getSpriteSlug(style: any): string|false {

  if (!style.hasOwnProperty('sprite')) {
    return false
  }

  const matchedUrl = style.sprite.match(/^(?:[^:\/?#]+:)?(?:\/\/[^\/?#]*)?(?:([^?#]*\/)([^\/?#]*))?(\?[^#]*)?(?:#.*)?$/)

  if (!matchedUrl || !matchedUrl[2]) {
    return false
  }

   // icon slug
  return matchedUrl[2]
}
