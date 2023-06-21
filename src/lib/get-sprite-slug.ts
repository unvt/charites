import { StyleSpecification, SpriteSpecification } from '@maplibre/maplibre-gl-style-spec'

export function getSpriteSlug(style: StyleSpecification): string | false {
  if (!style.hasOwnProperty('sprite')) {
    return false
  }

  const sprites = coerceSpriteToArray(style.sprite)

  const matchedUrl = sprites.map(sprite => sprite.url.match(
    /^(?:[^:\/?#]+:)?(?:\/\/[^\/?#]*)?(?:([^?#]*\/)([^\/?#]*))?(\?[^#]*)?(?:#.*)?$/,
  ))

  if (!matchedUrl[0] || !matchedUrl[0][2]) {
    return false
  }

  // icon slug
  return matchedUrl[0][2]
}

// https://github.com/maplibre/maplibre-gl-js/blob/main/src/util/style.ts
function coerceSpriteToArray(sprite?: SpriteSpecification): {id: string; url: string}[] {
  const resultArray: {id: string; url: string}[]  = [];

  if (typeof sprite === 'string') {
      resultArray.push({id: 'default', url: sprite});
  } else if (sprite && sprite.length > 0) {
      const dedupArray: string[] = [];
      for (const {id, url} of sprite) {
          const key = `${id}${url}`;
          if (dedupArray.indexOf(key) === -1) {
              dedupArray.push(key);
              resultArray.push({id, url});
          }
      }
  }

  return resultArray;

}
