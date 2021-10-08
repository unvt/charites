import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import os from 'os'

import { build } from '../src/commands/build'
import { defaultValues } from '../src/lib/defaultValues'

describe('Test for the `build.ts`.', () => {

  const stylePath = path.join(__dirname, 'data/style.yml')

  it('Should convert `data/style.yml` to JSON.', () => {
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleJson = path.join(tmpdir, 'style.json')

    build(stylePath, styleJson, {provider: defaultValues.provider})

    // The file should exists.
    assert.deepEqual(true, !! fs.statSync(styleJson))
    assert.deepEqual(8, JSON.parse(fs.readFileSync(styleJson, 'utf-8')).version)
  });

  it('Should minify `data/style.yml` to JSON.', () => {

    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleJson = path.join(tmpdir, 'style.json')

    build(stylePath, styleJson, {provider: defaultValues.provider, compactOutput: true})

    const contents = fs.readFileSync(styleJson, 'utf-8')
    const lines = contents.split('\n').length

    assert.deepEqual(lines, 1)
  });
});
