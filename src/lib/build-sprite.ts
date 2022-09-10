import { generateSprite } from '@smellman/sprite-one'
const path = require('path')

export async function buildSprite(
  svgPath: string,
  publicPath: string,
  iconSlug: string,
): Promise<void> {
  const pxRatios = [1, 2]

  for (let i = 0; i < pxRatios.length; i++) {
    const pxRatio = pxRatios[i]

    let file = ''
    if (pxRatio > 1) {
      file = `@${pxRatio}x`
    }

    const outPath = path.join(publicPath, `${iconSlug}${file}`)
    try {
      await generateSprite(outPath, svgPath, pxRatio)
    } catch (error) {
      throw error
    }
  }
  return
}
