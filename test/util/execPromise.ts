import child_process from 'child_process'
import util from 'util'

// MEMO: Remove node-abort-controller when requiring NodeJS >=16
// NOTE: AbortController is available by default from NodeJS 15
import { AbortSignal } from 'node-abort-controller'
import { makeTempDir } from './makeTempDir'
const execSync = util.promisify(child_process.exec)

type ExecResult = {
  stdout: string
  stderr: string
  cwd: string
}

export const exec: (cmd: string, cwd?: string) => Promise<ExecResult> = async (
  cmd,
  cwd,
) => {
  const temp = cwd ? cwd : makeTempDir()
  const { stdout, stderr } = await execSync(cmd, {
    encoding: 'utf8',
    cwd: temp,
  })

  return { stdout, stderr, cwd: temp }
}

// MEMO: This can be replaced with the native AbortSignal support in child_process.exec after
// requiring NodeJS >= 16.4.0, see:
// https://nodejs.org/docs/latest-v16.x/api/child_process.html#child_processexeccommand-options-callback
export const abortableExecFile = (
  file: string,
  args: string[],
  signal: AbortSignal,
  cwd?: string,
) =>
  new Promise<ExecResult>((resolve, reject) => {
    const temp = cwd ? cwd : makeTempDir()

    // Because Windows can't catch the SIGINT signal (it doesn't have signals)
    // we set a flag in the parent whether the command can die or not.
    // If the command exits before we request it to exit, the error will be
    // thrown, but if it exits after we request it to exit, it won't be an error.
    let noErrorOnDie = false
    const process = child_process.execFile(
      file,
      args,
      {
        encoding: 'utf8',
        cwd: temp,
      },
      (error, stdout, stderr) => {
        if (error && noErrorOnDie !== true) {
          return reject(error)
        }
        resolve({ stdout, stderr, cwd: temp })
      },
    )
    signal.addEventListener('abort', () => {
      noErrorOnDie = true
      process.kill('SIGINT')
    })
  })
