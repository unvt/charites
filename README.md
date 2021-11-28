# Charites

An easy, intuitive, and efficient command-line tool for writing vector map styles compatible with the [Mapbox](https://docs.mapbox.com/mapbox-gl-js/style-spec/) and [MapLibre](https://maplibre.org/maplibre-gl-js-docs/style-spec/) Style Specification in YAML.
With YAML format's readability, JSON compiler, linter, and live style viewer on a local browser, you can simplify your map styling workflow.

In Greek mythology, the [Charites](https://en.wikipedia.org/wiki/Charites) are the three goddesses of charm, beauty, and human creativity. They are believed to have been worshipped not only by artists but also by those who aspired to technology to infuse them with a creative spirit.

## Features

- Initiate a project from scratch, or convert an existing `style.json` file to generate YAML style files.
- Write styles in a simple YAML format.
- Divide groups of layers in to multiple files for better readability and mantainability. `!!inc/file <relative-path-to-the-file>`
- Use variables like `$backgroundColor` and `$waterColor` to style effectively.
- Compile YAML to a single style.json file, with a format linter.
- Use `--provider mapbox` to validate your style against Mapbox GL JS v2.x
- Run `charites serve <source>` to preview your style live while you make changes in a browser.

Example: https://github.com/geoloniamaps/basic

## Install

```
$ npm install -g @unvt/charites
```

Then try:

```
$ charites help
```

### Recommended environment

Chrities may work well on OSX, Ubuntu, but it might not work well in some envrionment such as arm64 (eg., M1 Mac) because some of NPM packages like sprite-zero uses mapnik.  

Docker can be the good environment in Windows while WSL might work well.

### charites on unvt/nanban

Charites runs on Docker with one of UNVT tools named [unvt/nanban](https://github.com/unvt/nanban).

```
docker run -ti --rm -v ${PWD}:/data -p 8080:8080 unvt/nanban

cd /data
```


## Usage

```
$ charites help
Usage: charites [options] [command]

Options:
  -v, --version                              output the version number
  --provider [provider]                      your map service. e.g. `mapbox`, `geolonia`
  --mapbox-access-token [mapboxAccessToken]  Access Token for the Mapbox
  -h, --help                                 display help for command

Commands:
  init [options] <file>                      initialize a style JSON
  convert <source> [destination]             convert the style JSON to YAML
  build [options] <source> [destination]     build a style JSON from the YAML
  serve <source>                             serve your map locally
  help [command]                             display help for command
```

## Global Options

Charites has two global options that are common to all commands.

- `--provider` - `mapbox`, `geolonia`, or `default`. When not specified, default or the value in the configuration file will be used.
    - `mapbox` - The format linter runs against the Mapbox GL JS v2.x compatible specification.
    - `geolonia` and `default` - the format linter runs against the MapLibre GL JS compatible specification.
- `--mapbox-access-token` - Set your access-token when styling for Mapbox.

# Configuration

The global options for Charites can be stored in a configuration file written in YAML.

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

- `init`

Initialize `style.yml` from either TileJSON or metadata.json.

```bash
$ charites init -h
Usage: charites init [options] <file>

initialize a style JSON

Options:
  -t, --tilejson-urls <tilejson_urls>          an URL for TileJSON. It will create empty layers from vector_layers
                                               property of TileJSON. Please use comma (,) in case multiple TileJSONs
                                               require.
  -m, --metadatajson-urls <metadatajson_urls>  an URL for metadata.json. It will create empty layers from vector_layers
                                               property of metadata.json. Please use comma (,) in case multiple
                                               metadata.json require.
  -c, --composite-layers                       If it is true, a single YAML will be generated with multiple layers.
                                               Default is false.
  -h, --help                                   display help for command
```

If you do not specify TileJSON URL, it will generate empty `style.yml`.

```bash
charites init style.yml --tilejson-urls https://raw.githubusercontent.com/mapbox/tilejson-spec/master/3.0.0/example/osm.json
```

```bash
charites init style.yml --metadatajson-urls https://optgeo.github.io/kokoromi-rw/zxy/metadata.json
```

In `init` command, you can just generate a single YAML instead of creating layer configuration files separately when you add optional `-c` or `--composite-layers` parameter.

- `build`

Build `style.json` from `style.yml`:

```
charites build style.yml style.json
```

Add `-c` or `--compact-output` to minify the JSON

```
charites build style.yml style.json -c
```

Add `--sprite-input` and `--sprite-output` to build svg files for map icons.

```
charites build style.yml style.json --sprite-input icons/ --sprite-output public/
```

Convert `style.json` to `style.yml`:

```
charites convert style.json style.yml
```

Load JSON as a standard input to generate `style.yml`:

```
curl http://example.com/style.json | charites convert - style.yml
```

- `serve`

Launch a live preview of your map style in your local environment:

```
charites serve style.yml
```

For Mapbox users:

```
charites serve style.yml --provider mapbox --mapbox-access-token xxxx
```

## Contributing

see [CONTRIBUTING.md](./.github/CONTRIBUTING.md)

### The United Nations Vector Tile Toolkit contributors

<!-- readme: geolonia,collaborators,contributors -start -->
<!-- readme: geolonia,collaborators,contributors -end -->
### Development

```
$ git clone https://github.com/unvt/charites.git
$ cd charites
$ npm install
$ npm run build
$ npm install -g .
```
Then run:

```
$ charites help
```

### Releasing this package

```
$ npm version patch # Or `minor` or `major`
$ git push
$ git push origin <version>
```

## License

MIT
