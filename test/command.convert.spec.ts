import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import { copyFixturesFile } from './util/copyFixtures'
import { exec } from './util/execPromise'
import { makeTempDir } from './util/makeTempDir'
import charites from './util/charitesCmd'

let tmpdir = ''

describe('Test for the `charites convert`', () => {
  beforeEach(async function () {
    tmpdir = makeTempDir()
    copyFixturesFile('style.json', tmpdir)
  })

  it('charites convert style.json style.yml', async () => {
    // prettier-ignore
    const { stdout, stderr } = await exec(`${charites} convert style.json style.yml`, tmpdir)
    assert.deepEqual(stdout, '')
    assert.deepEqual(stderr, '')
    assert.isTrue(fs.existsSync(path.join(tmpdir, 'style.yml')))
  })
})
