import { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import os from 'os'
import YAML from 'js-yaml'

import { init } from '../src/commands/init'

describe('Test for the `init.ts`.', () => {

  const tempStylePath = path.join(__dirname, 'data/init.yml')

  it('Should initialize default style.yml.', () => {
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
    const styleYaml = path.join(tmpdir, 'style.yml')

    init(styleYaml)

    // The file should exists.
    assert.deepEqual(true, !! fs.statSync(styleYaml))
    // the file should be the same with init.yml
    assert.deepEqual(YAML.load(fs.readFileSync(styleYaml, 'utf8')), YAML.load(fs.readFileSync(tempStylePath, 'utf-8')))
  });
});
