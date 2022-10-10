import { generateSprite } from '@unvt/sprite-one'
const path = require('path')

export async function buildSprite(
  svgPath: string,
  publicPath: string,
  iconSlug: string,
): Promise<void> {
  const pxRatios = [1, 2]
  const outPath = path.join(publicPath, iconSlug)
  try {
    await generateSprite(outPath, [svgPath], pxRatios)
  } catch (error) {
    throw error
  }
  return
}
