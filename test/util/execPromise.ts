import child_process from 'child_process'
import util from 'util'
import { makeTempDir } from './makeTempDir'
const execSync = util.promisify(child_process.exec)

export const exec = async (cmd: string, cwd?: string) => {
  const temp = cwd ? cwd : makeTempDir()
  const { stdout, stderr } = await execSync(cmd, {
    encoding: 'utf8',
    cwd: temp,
  })

  return { stdout, stderr, cwd: temp }
}
