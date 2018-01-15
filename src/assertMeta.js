import * as R from 'ramda'

function assertMeta(onTestFail, modFn, testFn, x) {
  const xAfterModification = modFn(x)
  const testOuput = testFn(xAfterModification)
  if (testOuput) {
    return x
  } else {
    onTestFail({
      x,
      xAfterModification,
      testOuput,
    })
  }
}

export default R.curry(assertMeta)
