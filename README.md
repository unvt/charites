# Charites

Allows to edit your style.json for Mapbox GL JS with YAML syntax.

Demo: https://github.com/miya0001/style-template

## Usage

```
$ charites help
Usage: charites [options] [command]

Options:
  -h, --help                      display help for command

Commands:
  init <file>                     initialize a style JSON
  convert <source> [destination]  convert the style JSON to YAML
  build <source> [destination]    build a style JSON from the YAML
  serve <source>                  serve your map locally
  help [command]                  display help for command
```

### Example:

Build the style.json from style.yml:

```
charites build style.yml style.json
```

Convert the `style.json` to `style.yml`:

```
charites convert style.json
```

Serve the map locally and watch updating the style:

```
charites serve style.yml
```

## Development

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
