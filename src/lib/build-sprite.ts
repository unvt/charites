import { generateSprite } from '@unvt/sprite-one'
import path from 'path'

export async function buildSprite(
  svgPath: string,
  publicPath: string,
  iconSlug: string,
  sdf = false,
): Promise<void> {
  const pxRatios = [1, 2]
  const outPath = path.join(publicPath, iconSlug)
  await generateSprite(outPath, [svgPath], pxRatios, sdf)
  return
}
