import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import { exec } from './util/execPromise'
import { makeTempDir } from './util/makeTempDir'
import charites from './util/charitesCmd'

const tileJsonUrl =
  'https://raw.githubusercontent.com/mapbox/tilejson-spec/master/3.0.0/example/osm.json'
const metadataJsonUrl = 'https://optgeo.github.io/kokoromi-rw/zxy/metadata.json'

let tmpdir = ''

describe('Test for the `charites convert`', () => {
  beforeEach(async function () {
    tmpdir = makeTempDir()
  })

  it('charites init style.yml --tilejson-urls ${tileJsonUrl}', async () => {
    // prettier-ignore
    const { stdout, stderr } = await exec(`${charites} init style.yml --tilejson-urls ${tileJsonUrl}`, tmpdir)
    assert.deepEqual(stdout, '')
    assert.deepEqual(stderr, '')
    assert.isTrue(fs.existsSync(path.join(tmpdir, 'style.yml')))
    assert.isTrue(fs.existsSync(path.join(tmpdir, 'layers')))
  })

  it('charites init style.yml --metadatajson-urls ${metadataJsonUrl}', async () => {
    // prettier-ignore
    const { stdout, stderr } = await exec(`${charites} init style.yml --metadatajson-urls ${metadataJsonUrl}`, tmpdir)
    assert.deepEqual(stdout, '')
    assert.deepEqual(stderr, '')
    assert.isTrue(fs.existsSync(path.join(tmpdir, 'style.yml')))
    assert.isTrue(fs.existsSync(path.join(tmpdir, 'layers')))
  })

  it('charites init style.yml --tilejson-urls ${tileJsonUrl} --composite-layers', async () => {
    // prettier-ignore
    const { stdout, stderr } = await exec(`${charites} init style.yml --tilejson-urls ${tileJsonUrl} --composite-layers`, tmpdir)
    assert.deepEqual(stdout, '')
    assert.deepEqual(stderr, '')
    assert.isTrue(fs.existsSync(path.join(tmpdir, 'style.yml')))
    assert.isFalse(fs.existsSync(path.join(tmpdir, 'layers')))
  })
})
