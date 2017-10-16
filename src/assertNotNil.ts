import { isNil } from 'ramda'

export default function assertNotNil<X>(x: X | null | undefined): X | never {
  if (!isNil(x)) {
    return x as any
  }

  const error = new Error(`Got unexpected ${x}`)
  error.name = 'Assert not nil error'
  throw error
}
