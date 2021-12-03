import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import os from 'os'

import { buildSprite } from '../src/lib/build-sprite'
const iconsPath = path.join(__dirname, 'data/icons')
let tmpdir = ''

describe('Test for the `build-sprite.ts`.', () => {
  beforeEach(function () {
    tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
  })

  it("should create icon's json/png at specified path and name ", async () => {
    const expectedJsonPath = path.join(tmpdir, 'basic.json')
    const expectedPngPath = path.join(tmpdir, 'basic.png')

    await buildSprite(iconsPath, tmpdir, `basic`)

    assert.deepEqual(true, !!fs.statSync(expectedJsonPath))
    assert.deepEqual(true, !!fs.statSync(expectedPngPath))
  })
})
