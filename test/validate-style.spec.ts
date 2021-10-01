import { assert } from 'chai'

import { validateStyle } from '../src/lib/validate-style'

describe('Test for the `validate-style.ts`.', () => {
  it('should validate as expected.', (done) => {
    const style = {
      version: 8,
    }

    try {
      validateStyle(style)
    } catch(error) {
      assert.deepEqual(true, !! error) // It should have something error.
      done()
    }
  });
});
