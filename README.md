# [WIP] `vt-style`

Demo: https://github.com/miya0001/style-template

## Usage

```
$ vt-style help
Usage: vt-style [options] [command]

Options:
  -h, --help                    display help for command

Commands:
  init <file>                   initialize a style JSON
  build <source> [destination]  build a style JSON from the YAML
  help [command]                display help for command
```

## Development

```
$ git clone https://github.com/geolonia/vt-style.git
$ cd vt-style
$ npm install
$ npm run build
$ npm install -g .
```

Then run:

```
$ vt-style help
```
