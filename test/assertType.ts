import { assertType } from '../src'

describe('assert', () => {
  it('throws if test fails', () => {
    expect(() => {
      assertType('Object', 1)
    }).toThrow('Expected 1 to have type Object, but got Number')
  })

  it('returns value if test pass', () => {
    const testedValue = 1
    expect(() => {
      const returned: number = assertType('Number', 1)
      expect(returned).toBe(testedValue)
    }).not.toThrow()
  })
})
