import { curryN, type } from 'ramda'

export interface TypeMap {
  Object: object
  Number: number
  Boolean: boolean
  String: string
  Null: null
  Array: Array<any>
  RegExp: RegExp
  Function: Function
  Undefined: undefined
  Symbol: symbol
}

export interface AssertTypeofFn {
  <N extends keyof TypeMap>(expectedType: N, x: any): TypeMap[N]
  <N extends keyof TypeMap>(expectedType: N): (x: any) => TypeMap[N]
}

const assertType: AssertTypeofFn = curryN(2, function(
  expectedType: string,
  x: any
): any {
  const actualType = type(x)
  if (actualType === expectedType) return x

  const error = new Error(
    `Expected ${x} to have type ${expectedType}, but got ${actualType}`
  )
  error.name = 'Assert type error'
  throw error
})

export default assertType
