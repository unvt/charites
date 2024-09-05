import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const charitesCliJs = path.join(__dirname, '..', '..', 'dist', 'cli.js')

export default `"${process.execPath}" "${charitesCliJs}"`
