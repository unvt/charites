import { expect } from 'chai'
import { AbortController } from 'node-abort-controller'
import { abortableExecFile } from './util/execPromise'
import { copyFixturesDir, copyFixturesFile } from './util/copyFixtures'
import { makeTempDir } from './util/makeTempDir'
import { charitesCliJs } from './util/charitesCmd'
import { sleep } from './util'

let tmpdir = ''

describe('Test for `charites serve`', () => {
  beforeEach(async function () {
    tmpdir = makeTempDir()
    copyFixturesFile('style.yml', tmpdir)
    copyFixturesDir('layers', tmpdir)
    copyFixturesDir('icons', tmpdir)
  })

  it('charites serve style.yml', async () => {
    const abort = new AbortController()
    const server = abortableExecFile(
      process.execPath,
      [charitesCliJs, 'serve', '--no-open', 'style.yml'],
      abort.signal,
      tmpdir,
    )
    try {
      await sleep(500)
      await Promise.all([
        (async () => {
          const res = await fetch('http://127.0.0.1:8080/style.json')
          const data = await res.json()
          expect(data.version).to.equal(8)
        })(),
        (async () => {
          const res = await fetch('http://127.0.0.1:8080/sprite.json')
          expect(res.status).to.equal(404)
        })(),
      ])
    } finally {
      abort.abort()
    }
    abort.abort()
    const { stdout, stderr } = await server
    expect(stderr).to.equal('')
    expect(stdout).to.match(/^Your map is running on http:\/\/localhost:8080/m)
  })

  it('charites serve --sprite-input ./icons style.yml', async () => {
    const abort = new AbortController()
    const server = abortableExecFile(
      process.execPath,
      [
        charitesCliJs,
        'serve',
        '--no-open',
        '--sprite-input',
        './icons',
        'style.yml',
      ],
      abort.signal,
      tmpdir,
    )

    try {
      await sleep(500)
      await Promise.all([
        (async () => {
          const res = await fetch('http://127.0.0.1:8080/style.json')
          expect(res.status).to.equal(200)
          const data = await res.json()
          expect(data.version).to.equal(8)
          expect(data.sprite).to.equal('http://127.0.0.1:8080/sprite')
        })(),
        (async () => {
          const res = await fetch('http://127.0.0.1:8080/sprite.json')
          expect(res.status).to.equal(200)
          const data = await res.json()
          expect(Object.entries(data).length).to.be.greaterThan(0)
        })(),
        (async () => {
          const res = await fetch('http://127.0.0.1:8080/sprite@2x.json')
          expect(res.status).to.equal(200)
          const data = await res.json()
          expect(Object.entries(data).length).to.be.greaterThan(0)
        })(),
        (async () => {
          const res = await fetch('http://127.0.0.1:8080/sprite.png')
          expect(res.status).to.equal(200)
          const buffer = await res.arrayBuffer()
          expect(buffer.byteLength).to.be.greaterThan(0)
        })(),
        (async () => {
          const res = await fetch('http://127.0.0.1:8080/sprite@2x.png')
          expect(res.status).to.equal(200)
          const buffer = await res.arrayBuffer()
          expect(buffer.byteLength).to.be.greaterThan(0)
        })(),
      ])
    } finally {
      abort.abort()
    }
    const { stdout, stderr } = await server
    expect(stderr).to.equal('')
    expect(stdout).to.match(/^Your map is running on http:\/\/localhost:8080/m)
  })
})
