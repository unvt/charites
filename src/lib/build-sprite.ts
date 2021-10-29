var spritezero = require('@mapbox/spritezero');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

function generateLayoutAsync(option: any): Promise<any> {
    return new Promise((resolve,reject) => {
        spritezero.generateLayout(option,(err:any, result:object) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function generateImageAsync(option: any): Promise<any> {
  return new Promise((resolve,reject) => {
      spritezero.generateImage(option,(err:any ,result:object) => {
          if (err) reject(err);
          else resolve(result);
      });
  });
}

export async function buildSprite(svgPath: string, publicPath: string, iconSlug: string) {

  const pxRatios = [1, 2]

  for (let i = 0; i < pxRatios.length; i++) {
    const pxRatio = pxRatios[i];

    var svgFiles = glob.sync(path.join(svgPath, `*.svg`))
    .map(function (iconPath: string) {
      return {
        svg: fs.readFileSync(iconPath),
        id: path.basename(iconPath).replace('.svg', '')
      };
    });

    var file = ''
    if (pxRatio > 1) {
      file = `@${pxRatio}x`;
    }

    var pngPath = path.join(publicPath, `${iconSlug}${file}.png`);
    var jsonPath = path.join(publicPath, `${iconSlug}${file}.json`);

    try {
      const dataLayout = await generateLayoutAsync({ imgs: svgFiles, pixelRatio: pxRatio, format: true })
      fs.writeFileSync(jsonPath, JSON.stringify(dataLayout));
    } catch (error) {
      throw `${publicPath}: No such file or directory`
    }

    try {
      const imageLayout = await generateLayoutAsync({ imgs: svgFiles, pixelRatio: pxRatio, format: false })
      const image = await generateImageAsync(imageLayout)
      fs.writeFileSync(pngPath, image);
    } catch (error) {
      throw `${publicPath}: No such file or directory`
    }
  }
}
