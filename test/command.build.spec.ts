import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import { copyFixturesFile, copyFixturesDir } from './util/copyFixtures'
import { exec } from './util/execPromise'
import { makeTempDir } from './util/makeTempDir'
import charites from './util/charitesCmd'

let tmpdir = ''

describe('Test for the `charites build`', () => {
  beforeEach(async function () {
    tmpdir = makeTempDir()
    copyFixturesFile('style.yml', tmpdir)
    copyFixturesDir('layers', tmpdir)
    copyFixturesDir('icons', tmpdir)
  })

  it('charites build style.yml', async () => {
    // prettier-ignore
    const { stdout, stderr } = await exec(`${charites} build style.yml`, tmpdir)
    assert.deepEqual(stdout, '')
    assert.deepEqual(stderr, '')
    assert.isTrue(fs.existsSync(path.join(tmpdir, 'style.json')))
  })

  it('charites build style.yml custom.json', async () => {
    // prettier-ignore
    const { stdout, stderr } = await exec(`${charites} build style.yml custom.json`, tmpdir)
    assert.deepEqual(stdout, '')
    assert.deepEqual(stderr, '')
    assert.isTrue(fs.existsSync(path.join(tmpdir, 'custom.json')))
  })

  it('charites build style.yml --compact-output', async () => {
    // prettier-ignore
    const { stdout, stderr } = await exec(`${charites} build style.yml --compact-output`, tmpdir)
    assert.deepEqual(stdout, '')
    assert.deepEqual(stderr, '')

    const contents = fs.readFileSync(path.join(tmpdir, 'style.json'), 'utf-8')
    assert.isNull(contents.match(/\\n/))
  })

  it('charites build style.yml style.json --sprite-url http://localhost:8080/icons', async () => {
    // prettier-ignore
    const { stdout, stderr } = await exec(`${charites} build style.yml style.json --sprite-url http://localhost:8080/icons`, tmpdir)
    assert.deepEqual(stdout, '')
    assert.deepEqual(stderr, '')

    const contents = fs.readFileSync(path.join(tmpdir, 'style.json'), 'utf-8')
    assert.deepEqual('http://localhost:8080/icons', JSON.parse(contents).sprite)
  })

  it('charites build style.yml style.json --sprite-input icons --sprite-output .', async () => {
    // prettier-ignore
    const { stdout, stderr } = await exec(`${charites} build style.yml style.json --sprite-input icons --sprite-output .`, tmpdir)
    assert.deepEqual(stdout, '')
    assert.deepEqual(stderr, '')

    assert.isTrue(fs.existsSync(path.join(tmpdir, 'basic-white.png')))
    assert.isTrue(fs.existsSync(path.join(tmpdir, 'basic-white.json')))
  })
})
