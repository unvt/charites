import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import { getSpriteSlug } from '../src/lib/get-sprite-slug'

const stylePath = path.join(__dirname, 'data/style.json')
const styleJson = fs.readFileSync(stylePath, 'utf-8')

describe('Test for the `get-sprite-slug.ts`.', () => {
  it('should get sprite slug from style.json', async () => {
    const spriteSlug = getSpriteSlug(JSON.parse(styleJson))

    // the test/data/style.json sprit slug is basic-white
    assert.deepEqual('basic-white', spriteSlug)
  })

  it("should return false with no icon's slug in url", async () => {
    const styleObject = JSON.parse(styleJson)
    const styleObject1 = styleObject
    const styleObject2 = styleObject

    styleObject.sprite = 'http://localhost:8080'
    styleObject1.sprite = 'http://localhost:8080/'
    styleObject2.sprite = ''

    const spriteSlug = getSpriteSlug(styleObject)
    const spriteSlug1 = getSpriteSlug(styleObject1)
    const spriteSlug2 = getSpriteSlug(styleObject2)

    assert.isFalse(spriteSlug)
    assert.isFalse(spriteSlug1)
    assert.isFalse(spriteSlug2)
  })
})
