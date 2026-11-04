import { it as nodeIt, type TestOptions } from 'node:test'

// Per-test timeout. Not set via `--test-timeout`, because on Node 22 that flag
// also applies to each spec file as a whole, so files with many slow tests time
// out even when every test passes.
const DEFAULT_TIMEOUT = 5000

type TestFn = NonNullable<Parameters<typeof nodeIt>[2]>

export function it(name: string, fn: TestFn): Promise<void>
export function it(
  name: string,
  options: TestOptions,
  fn: TestFn,
): Promise<void>
export function it(name: string, a: TestOptions | TestFn, b?: TestFn) {
  const [options, fn] = typeof a === 'function' ? [{}, a] : [a, b]
  return nodeIt(name, { timeout: DEFAULT_TIMEOUT, ...options }, fn)
}
