import { assertNotNil } from '../src'

describe('assert', () => {
  const notNils = [[], {}, 1]
  notNils.forEach((notNil: any) => {
    it(`acts like identity for ${typeof notNil}`, () => {
      expect(() => {
        const returned = assertNotNil(notNil)
        expect(returned).toBe(notNil)
      }).not.toThrow()
    })
  })

  const nils = [null, undefined]
  nils.forEach((nil: any) => {
    it(`throws if ${nil}`, () => {
      expect(() => {
        assertNotNil(nil)
      }).toThrow(`Got unexpected ${nil}`)
    })
  })
})
