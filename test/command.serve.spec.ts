import { assert } from 'chai'
import { exec } from 'child_process'
import axios from 'axios'
import { killPortProcess } from 'kill-port-process'
import { copyFixturesFile, copyFixturesDir } from './util/copyFixtures'
import { makeTempDir } from './util/makeTempDir'
import charites from './util/charitesCmd'

let tmpdir = ''

describe('Test for the `charites serve`', () => {
  beforeEach(async function () {
    tmpdir = makeTempDir()
    copyFixturesFile('style.yml', tmpdir)
    copyFixturesDir('layers', tmpdir)
  })

  afterEach(async function () {
    await killPortProcess(8080)
  })

  it('charites serve style.yml', (done) => {
    // add --no-open option for test
    // prettier-ignore
    exec(`${charites} serve style.yml --no-open`, { encoding: 'utf8',cwd: tmpdir })

    setTimeout(async () => {
      const res = await axios.get('http://localhost:8080')
      assert.deepEqual(res.status, 200)
      done()
    }, 500)
  })

  it('charites serve style.yml --provider mapbox --mapbox-access-token xxxxxxx', (done) => {
    // add --no-open option for test
    // prettier-ignore
    exec( `${charites} serve style.yml style.json --provider mapbox --mapbox-access-token xxxxxxx --no-open`,{ encoding: 'utf8', cwd: tmpdir })

    setTimeout(async () => {
      const res = await axios.get('http://localhost:8080/app.js')
      assert.include(res.data, "mapboxgl.accessToken = 'xxxxxxx'")
      done()
    }, 500)
  })
})
