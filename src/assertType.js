import * as R from 'ramda'
import assertMeta from './assertMeta'

const onTestFail = expectedType => ({ x, xAfterModification }) => {
  const error = new Error(
    `Expected ${x} to have type ${expectedType}, but got ${xAfterModification}`
  )
  error.name = 'Assert not nil error'
  throw error
}

function assertType(expectedType, x) {
  return assertMeta(onTestFail(expectedType), R.type, R.equals(expectedType), x)
}

export default R.curry(assertType)
