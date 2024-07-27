import { assert } from 'chai'
import path from 'path'

import { parser } from '../src/lib/yaml-parser'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
describe('Test for the `yaml-parser.ts`.', () => {
  it('should parse `data/example.yml`.', () => {
    const yamlPath = path.join(__dirname, 'data/example.yml')
    const style = parser(yamlPath)

    assert.deepEqual(
      {
        // @ts-ignore
        color: '#ff0000',
        'stroke-width': 2,
        background: '#ff0000',
        backgroundColor: '#ffff00',
        alias: '#ff0000',
        fruits: ['apple', 'banana', '#ff0000'],
        names: ['John', '花子', '#ff0000'],
      },
      style,
    )
  })
})
