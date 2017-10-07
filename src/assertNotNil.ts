export default function assertNotNil<X>(x: X | null | undefined): X | never {
  if (x !== null && x !== undefined && !isNaN(x as any)) return x

  const error = new Error(`Got unexpected ${x}`)
  error.name = 'Assert not nil error'
  throw error
}
