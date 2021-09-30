import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import os from 'os'

import { convert } from '../src/commands/convert'

describe('Test for the `convert.ts`.', () => {

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
  const jsonPath = path.join(__dirname, 'data/convert.json')
  const yamlPath = path.join(tmp, 'convert.yml')
  const layerPath = path.join(tmp, 'layers/background.yml')

  it('Should convert `data/convert.json` to YAML.', () => {

    convert(jsonPath, yamlPath)
    const yml = fs.readFileSync(yamlPath, 'utf-8')

    assert.equal(`version: 8
name: example
metadata: {}
sources:
  geolonia:
    type: vector
    url: https://api.geolonia.com/v1/sources?key=YOUR-API-KEY
sprite: https://sprites.geolonia.com/basic-white
glyphs: https://glyphs.geolonia.com/{fontstack}/{range}.pbf
layers:
  - !!inc/file layers/background.yml
id: example
`, yml)
  });

  it('Should create layers directory.', () => {

    convert(jsonPath, yamlPath)

    const result = fs.existsSync(layerPath)

    assert.equal(true, result)
  })
});
