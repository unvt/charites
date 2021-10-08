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

    const minifiedJson = fs.readFileSync(path.join(__dirname, 'data/minified.json'), 'utf-8')

    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleJson = path.join(tmpdir, 'style.json')

    build(stylePath, styleJson, {provider: defaultValues.provider, compactOutput: true})

    assert.deepEqual(fs.readFileSync(styleJson, 'utf-8'),fs.readFileSync(minifiedJson, 'utf-8'))
  });
});
