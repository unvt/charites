const spritezero = require('@mapbox/spritezero')
const fs = require('fs')
const glob = require('glob')
const path = require('path')

type spriteOption = {
  imgs: string
  pixelRatio: number
  format: boolean
}

function generateLayoutAsync(option: spriteOption): Promise<string> {
  return new Promise((resolve, reject) => {
    spritezero.generateLayout(option, (err: TypeError, result: string) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

function generateImageAsync(option: string): Promise<string> {
  return new Promise((resolve, reject) => {
    spritezero.generateImage(option, (err: TypeError, result: string) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

export async function buildSprite(
  svgPath: string,
  publicPath: string,
  iconSlug: string,
) {
  const pxRatios = [1, 2]

  for (let i = 0; i < pxRatios.length; i++) {
    const pxRatio = pxRatios[i]

    const svgFiles = glob
      .sync(path.join(svgPath, `*.svg`))
      .map(function (iconPath: string) {
        return {
          svg: fs.readFileSync(iconPath),
          id: path.basename(iconPath).replace('.svg', ''),
        }
      })

    let file = ''
    if (pxRatio > 1) {
      file = `@${pxRatio}x`
    }

    const pngPath = path.join(publicPath, `${iconSlug}${file}.png`)
    const jsonPath = path.join(publicPath, `${iconSlug}${file}.json`)

    try {
      const dataLayout = await generateLayoutAsync({
        imgs: svgFiles,
        pixelRatio: pxRatio,
        format: true,
      })
      fs.writeFileSync(jsonPath, JSON.stringify(dataLayout))
    } catch (error) {
      throw `${publicPath}: No such file or directory`
    }

    try {
      const imageLayout = await generateLayoutAsync({
        imgs: svgFiles,
        pixelRatio: pxRatio,
        format: false,
      })
      const image = await generateImageAsync(imageLayout)
      fs.writeFileSync(pngPath, image)
    } catch (error) {
      throw `${publicPath}: No such file or directory`
    }
  }
}
