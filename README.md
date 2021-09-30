# Charites

Allows to edit a Mapbox GL JS based styles with YAML format.

Demo: https://github.com/miya0001/style-template

## Usage

```
$ charites help
Usage: charites [options] [command]

Options:
  -h, --help                      display help for command

Commands:
  init <file>                     initialize a style JSON
  build <source> [destination]    build a style JSON from the YAML
  convert <source> [destination]  convert the style JSON to YAML
  help [command]                  display help for command
```

### Example:

Build the style.json from style.yml:

```
charites build style.yml style.json
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
