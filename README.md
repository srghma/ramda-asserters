[![Greenkeeper badge](https://badges.greenkeeper.io/BjornMelgaard/ramda-asserters.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/BjornMelgaard/ramda-asserters.svg?branch=master)](https://travis-ci.org/BjornMelgaard/ramda-asserters)

# ramda-asserters
Collection of curried assert functions

## Usage

### assert
```ts
import * as R from 'ramda'
import { assert } from 'ramda-asserters'

// use assert with some test function without custom error message and it will try to be smart making error message
assert(R.identity)(1) // returns 1
assert(R.identity)(null) // throws `Unexpected "null" after applying test function "f1" on value "null"`

// note: there is no way to make uncurried version of assert without user message
// so this is not valid
// const validate = assert(R.identity, 1)

// or use assert with custom error message
assert(R.identity, 'Custom message')(null) //  throws error with name 'Assert error'
assert(R.identity, 'Custom message', null) //  throws error with name 'Assert error'

// or overwrite error complitely
class MyError extends Error {
  public name = "MyError";
  constructor (public message = '') {
    // message is `Unexpected "null" after applying test function "f1" on value "null"`
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

assert(R.identity, MyError)(null)
assert(R.identity, MyError, null)
```

### assertNotNil

```ts
// chack if null, undefined or NaN
import { assertNotNil } from 'ramda-asserters'

assertNotNil(1) // returns 1
assertNotNil(null) // throws 'Got unexpected null'
```

### assertType
```ts
// uses R.type function
// will infer type using this TypeMap
// interface TypeMap {
//   Object: object
//   Number: number
//   Boolean: boolean
//   String: string
//   Null: null
//   Array: Array<any>
//   RegExp: RegExp
//   Function: Function
//   Undefined: undefined
//   Symbol: symbol
// }

import { assertType } from 'ramda-asserters'

const validate = assertType('Object') // returns function (x: any) => object
const result = validate(42) // throws 'Expected 42 to have type Object, but got Number'
```

## Installation
`npm i ramda-asserters` or `yarn add ramda-asserters`

Corresponding `.babelrc`, if you want to use it with babel (using [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports)):

```json
{
  "plugins": [
    ["transform-imports", {
      "ramda-asserters": {
        "transform": "ramda-asserters/lib/${member}",
        "preventFullImport": true
      }
    }]
  ]
}
```

