import { promisify } from 'util'

export const sleep = promisify(setTimeout)

// Poll until the server responds, instead of sleeping for a fixed time.
// Spec files run in parallel, so server startup time varies with CPU load.
export const waitForServer = async (url: string, timeoutMs = 10000) => {
  const deadline = Date.now() + timeoutMs
  for (;;) {
    try {
      await fetch(url)
      return
    } catch (error) {
      if (Date.now() > deadline) throw error
      await sleep(100)
    }
  }
}
