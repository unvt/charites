import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'

export const copyFixturesFile = (file: string, destDir: string) => {
  fs.copyFileSync(
    path.join(__dirname, '..', 'data', file),
    path.join(destDir, file),
  )
}

export const copyFixturesDir = (dir: string, destDir: string) => {
  fse.copySync(path.join(__dirname, '..', 'data', dir), path.join(destDir, dir))
}
