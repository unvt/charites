import path from 'path'
import fs from 'fs'
import os from 'os'

export const makeTempDir = () =>
  fs.mkdtempSync(path.join(os.tmpdir(), 'charites-'))
