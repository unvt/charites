import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { buildSprite } from '../src/lib/build-sprite'
const iconsPath = path.join(__dirname, 'data/icons')
let tmpdir = ''

describe('Test for the `build-sprite.ts`.', () => {
  beforeEach(function () {
    tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
  })

  it("should create icon's json/png at specified path and name ", () => {
    const expectedJsonPath = path.join(tmpdir, 'basic.json')
    const expectedPngPath = path.join(tmpdir, 'basic.png')

    buildSprite(iconsPath, tmpdir, `basic`).then(() => {
      assert.deepEqual(true, !!fs.statSync(expectedJsonPath))
      assert.deepEqual(true, !!fs.statSync(expectedPngPath))
    })
  })
})
