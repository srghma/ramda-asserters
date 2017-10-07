export type TestFn = (x: any) => any

export interface Constructable {
  new (...args: any[]): any
}

export type MessageOrConsructor = string | Constructable

export interface AssertFn {
  (test: TestFn, messageOrConsructor?: MessageOrConsructor): <T>(x: T) => T
  <T>(test: TestFn, messageOrConsructor: MessageOrConsructor, x: T): T
}

function assertUncurried(
  test: TestFn,
  messageOrConsructor: MessageOrConsructor | undefined,
  x: any
): any {
  const testRes = test(x)
  if (testRes) return x

  if (typeof messageOrConsructor === 'string') {
    const err = new Error(messageOrConsructor)
    err.name = 'Assert error'
    throw err
  } else {
    let message = `Unexpected "${testRes}" after applying test function "${test.name}" on value "${x}"`
    const errorConst = messageOrConsructor || Error
    throw new errorConst(message)
  }
}

const assert: AssertFn = (...args: any[]) => {
  if (args.length === 3) {
    const [test, messageOrConsructor, x] = args
    return assertUncurried(test, messageOrConsructor, x)
  } else {
    return (x: any) => {
      const [test, messageOrConsructor] = args
      return assertUncurried(test, messageOrConsructor, x)
    }
  }
}

export default assert
