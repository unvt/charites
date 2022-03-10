import path from 'path'
import fs from 'fs'
import { parser } from '../lib/yaml-parser'
import { validateStyle } from '../lib/validate-style'
import { buildSprite } from '../lib/build-sprite'
import { getSpriteSlug } from '../lib/get-sprite-slug'
import { defaultValues } from '../lib/defaultValues'
import jsonminify from 'jsonminify'
import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec/types'
import watch from 'node-watch'

export interface buildOptions {
  provider?: string
  compactOutput?: boolean
  watch?: boolean
  spriteUrl?: string
  spriteInput?: string
  spriteOutput?: string
}

export async function build(
  source: string,
  destination: string,
  options: buildOptions,
) {
  let sourcePath = path.resolve(process.cwd(), source)

  // The `source` is absolute path.
  if (source.match(/^\//)) {
    sourcePath = source
  }

  if (!fs.existsSync(sourcePath)) {
    throw `${sourcePath}: No such file or directory`
  }

  let destinationPath = ''

  if (destination) {
    if (destination.match(/^\//)) {
      destinationPath = destination
    } else {
      destinationPath = path.resolve(process.cwd(), destination)
    }
  } else {
    destinationPath = path.join(
      path.dirname(sourcePath),
      `${path.basename(source, '.yml')}.json`,
    )
  }

  let provider = defaultValues.provider
  if (options.provider) {
    provider = options.provider
  }

  let style = ''

  try {
    const _style: StyleSpecification = parser(sourcePath)
    validateStyle(_style, provider)

    if (options.spriteUrl && 'sprite' in _style) {
      _style.sprite = options.spriteUrl
    }

    style = JSON.stringify(_style, null, '  ')

    if (options.spriteInput && options.spriteOutput) {
      if (!fs.existsSync(options.spriteInput)) {
        throw `${options.spriteInput}: No such directory. Please specify valid icon input directory. For more help run charites build --help`
      }

      if (!fs.existsSync(options.spriteOutput)) {
        throw `${options.spriteOutput}: No such directory. Please specify valid icon output directory. For more help run charites build --help`
      }

      const iconSlug = getSpriteSlug(JSON.parse(style))
      if (!iconSlug) {
        throw `Invalid sprite url format.`
      }

      await buildSprite(options.spriteInput, options.spriteOutput, iconSlug)
    }

    if (options.compactOutput) {
      style = jsonminify(style)
    }
  } catch (err) {
    if (err) {
      throw err
    } else {
      throw `${sourcePath}: Invalid YAML syntax`
    }
  }

  try {
    fs.writeFileSync(destinationPath, style)
  } catch (err) {
    throw `${destinationPath}: Permission denied`
  }
}

export function buildWatch(
  source: string,
  destination: string,
  options: buildOptions,
) {
  let sourcePath = path.resolve(process.cwd(), source)
  if (source.match(/^\//)) {
    sourcePath = source
  }
  console.log(path.dirname(sourcePath))
  return watch(
    path.dirname(sourcePath),
    { recursive: true, filter: /\.yml$/ },
    (event, file) => {
      console.log(`${(event || '').toUpperCase()}: ${file}`)
      try {
        build(source, destination, options)
      } catch (e) {
        // Nothing to do
      }
    },
  )
}
