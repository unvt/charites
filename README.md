# Charites

A command line tool for writing MapboxGL JS and MapLibre GL JS styles in YAML, which gives you easy, intuitive, and efficient experience in styling digital maps. With YAML format's readability, JSON compiler, linter, and live style viewer on a local browser, the workflow of map styling gets modern and simple.

The name Charites, or Graces, comes from the that of the goddesses of charm, beauty, and human creativity. They are believed to have been worshipped not only by artists, but also by those who aspired to technology to infuse them with creative spirit.


## Features

- Initiate a project or convert existing style json to generate YAML style files
- Write styles in a simple YAML format
- One file for one layer; Include external files with `!!inc/file <relative-path-to-the-file>`
- Use variables like `$backgroundColor` and `$waterColor` to style effectively
- Convert YAML to a style.json, with a format linter.
- `--provider mapbox` is an option to validate your style against Mapbox GL JS v2.X
- Run `charis serve <source>` to view your style in a live reloading browser

Example: https://github.com/miya0001/style-template



## Usage

```
$ charites help
Usage: charites [options] [command]

Options:
  --provider [provider]                      your map service. e.g. `mapbox`, `geolonia`
  --mapbox-access-token [mapboxAccessToken]  Access Token for the Mapbox
  -h, --help                                 display help for command

Commands:
  init <file>                                initialize a style JSON
  convert <source> [destination]             convert the style JSON to YAML
  build <source> [destination]               build a style JSON from the YAML
  serve <source>                             serve your map locally
  help [command]                             display help for command
```

## Global Options

Charites has two Global Options that are common to all commands.

- `--provider` - `mapbox`, `geolonia`, or `default`. When not specified, default or the value in the configuration file will be used.
    - `mapbox` - The format linter runs against the Mapbox GL JS v2.x compatible specification.
    - `geolonia` and `default` - the format linter runs against the MapLibre GL JS compatible specification.
- `--mapbox-access-token` - Set your access-token when styling for Mapbox.

# Configuration

The global options for Charites can be stored in a configuration file written in YML.

The config file will be automatically created to the following path the first time the charites command is executed.

```
~/.charites/config.yml
```

Global options can be specified as follows:


```
provider: mapbox
mapboxAccessToken: xxxx
```

With the example above, you get the same result as `charites --provider mapbox --mapbox-access-token xxxx`.

## Examples

Build `style.json` from `style.yml`:

```
charites build style.yml style.json
```

Convert `style.json` to `style.yml`:

```
charites convert style.json
```

Launch a live preview of your map style in your local environment:

```
charites serve style.yml
```

For Mapbox users:

```
charites serve style.yml --provider mapbox --mapbox-access-token xxxx
```

## Contributing

### Development

```
$ git clone https://github.com/geolonia/charites.git
$ cd charites
$ npm install
$ npm run build
$ npm install -g .
```
Then run:

```
$ charites help
```

## License

MIT
