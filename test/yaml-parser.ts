import { assert } from 'chai'
import fs from 'fs'
import path from 'path'

import { parser } from '../src/lib/yaml-parser'

describe('Test for the `yaml-parser.ts`.', () => {
  it('should parse `data/example.yml`.', () => {
    const yamlPath = path.join(__dirname, 'data/example.yml')
    const yaml = fs.readFileSync(yamlPath, 'utf8')
    const style = parser(yaml)

    assert.deepEqual({
      color: '#ff0000',
      'stroke-width': 2,
      background: '#ff0000',
      backgroundColor: '#ffff00',
      alias: '#ff0000',
      fruits: [ 'apple', 'banana', '#ff0000' ]
    }, style)
  });
});
