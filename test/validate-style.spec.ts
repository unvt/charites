import { assert } from 'chai'
import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec/types'

import { validateStyle } from '../src/lib/validate-style'

describe('Test for the `validate-style.ts`.', () => {
  it('should validate as expected.', (done) => {
    // @ts-ignore
    const style: StyleSpecification = {
      version: 8,
    }

    try {
      validateStyle(style)
    } catch (error) {
      assert.deepEqual(true, !!error) // It should have something error.
      done()
    }
  })
})
