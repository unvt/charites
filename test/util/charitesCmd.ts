import path from 'path'

export const charitesCliJs = path.join(__dirname, '..', '..', 'dist', 'cli.js')

export default `${process.execPath} ${charitesCliJs}`
