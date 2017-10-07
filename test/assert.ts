import * as R from 'ramda'
import { assert } from '../src'

describe('assert', () => {
  const errorMessage = 'custom error string message'
  const testFn = R.identity

  describe('when throws error', () => {
    const testVal = null
    const expectedDefaultErrorMessage = `Unexpected "${testVal}" after applying test function "${testFn.name}" on value "${testVal}"`

    class MyError extends Error {
      public name = "MyError";
      constructor (public message: string = '') {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        expect(message).toBe(expectedDefaultErrorMessage)
      }
    }

    it('if only test function, curried', () => {
      const validator = assert(testFn)
      expect(() => { validator(testVal) }).toThrow()
    })

    it('if test function with string, curried', () => {
      const validator = assert(testFn, errorMessage)
      expect(() => { validator(testVal) }).toThrow(errorMessage)
    })

    it('if test function with error, curried', () => {
      const validator = assert(testFn, MyError)
      expect(() => { validator(testVal) }).toThrow(MyError)
    })

    it('if test function with string, uncurried', () => {
      expect(() => {
        assert(testFn, errorMessage, testVal)
      }).toThrow()
    })

    it('if test function with error, uncurried', () => {
      expect(() => {
        assert(testFn, MyError, testVal)
      }).toThrow()
    })
  })
})
