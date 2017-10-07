import { assertNotNil } from '../src'

describe('assert', () => {
  it('throws if test fails', () => {
    expect(() => {
      assertNotNil(null)
    }).toThrow('Got unexpected null')
  })

  const nils = [null, undefined, NaN]
  nils.forEach((nil: any) => {
    it(`acts like identity if not ${nil}`, () => {
      const testedValue = 1
      expect(() => {
        const returned = assertNotNil(testedValue)
        expect(returned).toBe(testedValue)
      }).not.toThrow()
    })
  })
})
