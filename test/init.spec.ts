import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import os from 'os'
import YAML from 'js-yaml'

import { init, initOptions } from '../src/commands/init'

describe('Test for the `init.ts`.', () => {
  it('Should initialize default style.yml.', async () => {
    const tempStylePath = path.join(__dirname, 'data/init/init.yml')
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleYaml = path.join(tmpdir, 'style.yml')

    await init(styleYaml, {})

    // The file should exists.
    assert.deepEqual(true, !!fs.statSync(styleYaml))
    // the file should be the same with init.yml
    assert.deepEqual(
      YAML.load(fs.readFileSync(styleYaml, 'utf8')),
      YAML.load(fs.readFileSync(tempStylePath, 'utf-8')),
    )
  })

  it('Should initialize default composited style.yml from tilejson provided', async () => {
    const tempStylePath = path.join(__dirname, 'data/init/init_tilejson.yml')
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleYaml = path.join(tmpdir, 'style.yml')

    const options: initOptions = {
      tilejsonUrls:
        'https://raw.githubusercontent.com/mapbox/tilejson-spec/master/3.0.0/example/osm.json',
      compositeLayers: true,
    }

    await init(styleYaml, options)

    // The file should exists.
    assert.deepEqual(true, !!fs.statSync(styleYaml))
    // the file should be the same with init_tilejson.yml
    assert.deepEqual(
      YAML.load(fs.readFileSync(styleYaml, 'utf8')),
      YAML.load(fs.readFileSync(tempStylePath, 'utf-8')),
    )
  })

  it('Should produce composited style.yml without layers if tilejson without vector_layers is specified', async () => {
    const tempStylePath = path.join(
      __dirname,
      'data/init/init_tilejson_without_layers.yml',
    )
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleYaml = path.join(tmpdir, 'style.yml')

    const options: initOptions = {
      tilejsonUrls: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json',
      compositeLayers: true,
    }

    await init(styleYaml, options)

    // The file should exists.
    assert.deepEqual(true, !!fs.statSync(styleYaml))
    assert.deepEqual(
      YAML.load(fs.readFileSync(styleYaml, 'utf8')),
      YAML.load(fs.readFileSync(tempStylePath, 'utf-8')),
    )
  })

  it('Should initialize default decomposited style.yml from tilejson provided', async () => {
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleYaml = path.join(tmpdir, 'style.yml')

    const options: initOptions = {
      tilejsonUrls:
        'https://raw.githubusercontent.com/mapbox/tilejson-spec/master/3.0.0/example/osm.json',
      compositeLayers: false,
    }

    await init(styleYaml, options)

    // The file should exists.
    assert.deepEqual(true, !!fs.statSync(styleYaml))
    // the file should be the same with init_tilejson.yml
    assert.deepEqual(
      fs.readFileSync(styleYaml, 'utf8'),
      fs.readFileSync(
        path.join(__dirname, 'data/init/tilejson/init_decomposite.yml'),
        'utf-8',
      ),
    )
    assert.deepEqual(
      YAML.load(
        fs.readFileSync(
          path.join(tmpdir, 'layers/bicycle_parking.yml'),
          'utf8',
        ),
      ),
      YAML.load(
        fs.readFileSync(
          path.join(__dirname, 'data/init/tilejson/layers/bicycle_parking.yml'),
          'utf-8',
        ),
      ),
    )
    assert.deepEqual(
      YAML.load(
        fs.readFileSync(path.join(tmpdir, 'layers/showers.yml'), 'utf8'),
      ),
      YAML.load(
        fs.readFileSync(
          path.join(__dirname, 'data/init/tilejson/layers/showers.yml'),
          'utf-8',
        ),
      ),
    )
    assert.deepEqual(
      YAML.load(
        fs.readFileSync(path.join(tmpdir, 'layers/telephone.yml'), 'utf8'),
      ),
      YAML.load(
        fs.readFileSync(
          path.join(__dirname, 'data/init/tilejson/layers/telephone.yml'),
          'utf-8',
        ),
      ),
    )
  })

  it('Should initialize default decomposited style.yml from metadatajson provided', async () => {
    const tempStylePath = path.join(__dirname, 'data/init/init_metadata.yml')
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleYaml = path.join(tmpdir, 'init_metadata.yml')

    const options: initOptions = {
      metadatajsonUrls:
        'https://optgeo.github.io/kokoromi-rw/zxy/metadata.json',
      compositeLayers: true,
    }

    await init(styleYaml, options)

    // The file should exists.
    assert.deepEqual(true, !!fs.statSync(styleYaml))
    assert.deepEqual(
      YAML.load(fs.readFileSync(styleYaml, 'utf8')),
      YAML.load(fs.readFileSync(tempStylePath, 'utf-8')),
    )
  })
})
