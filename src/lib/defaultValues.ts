import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const providerDir = path.join(
  path.dirname(path.dirname(__dirname)),
  'provider',
)
