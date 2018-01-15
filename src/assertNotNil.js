import * as R from 'ramda'

import assertMeta from './assertMeta'

const onTestFail = ({ x }) => {
  const error = new Error(`Got unexpected ${x}`)
  error.name = 'Assert not nil error'
  throw error
}

const assertNotNil = assertMeta(onTestFail, R.identity, isNil)

export default assertNotNil
