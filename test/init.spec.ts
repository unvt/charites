import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import os from 'os'
import YAML from 'js-yaml'

import { init } from '../src/commands/init'

describe('Test for the `init.ts`.', () => {

  it('Should initialize default style.yml.', async() => {
    const tempStylePath = path.join(__dirname, 'data/init.yml')
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleYaml = path.join(tmpdir, 'style.yml')

    await init(styleYaml, {})

    // The file should exists.
    assert.deepEqual(true, !! fs.statSync(styleYaml))
    // the file should be the same with init.yml
    assert.deepEqual(YAML.load(fs.readFileSync(styleYaml, 'utf8')), YAML.load(fs.readFileSync(tempStylePath, 'utf-8')))
  });

  it('Should initialize default style.yml from tilejson provided', async() => {
    const tempStylePath = path.join(__dirname, 'data/init_tilejson.yml')
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleYaml = path.join(tmpdir, 'style.yml')

    const options = {
      tilejson_urls : 'https://raw.githubusercontent.com/mapbox/tilejson-spec/master/3.0.0/example/osm.json'
    }

    await init(styleYaml, options)

    // The file should exists.
    assert.deepEqual(true, !! fs.statSync(styleYaml))
    // the file should be the same with init_tilejson.yml
    assert.deepEqual(YAML.load(fs.readFileSync(styleYaml, 'utf8')), YAML.load(fs.readFileSync(tempStylePath, 'utf-8')))
  });

  it('Should produce style.yml without layers if tilejson without vector_layers is specified', async() => {
    const tempStylePath = path.join(__dirname, 'data/init_tilejson_without_layers.yml')
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleYaml = path.join(tmpdir, 'style.yml')

    const options = {
      tilejson_urls : 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json'
    }

    await init(styleYaml, options)
    
    // The file should exists.
    assert.deepEqual(true, !! fs.statSync(styleYaml))
    assert.deepEqual(YAML.load(fs.readFileSync(styleYaml, 'utf8')), YAML.load(fs.readFileSync(tempStylePath, 'utf-8')))
  });
});
