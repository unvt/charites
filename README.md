# Charites

Charites は、MapboxGL JS や MapLibre GL JS のスタイルを YAML で記述するためのコマンドラインツールです。

＜ここに Charites という単語にからめたうんちくがほしい！＞

例: https://github.com/miya0001/style-template

## 主な機能

* スタイルを YAML で記述することができます。
* `!!inc/file <related-path-the-file>` のように記述することで外部ファイルを読み込むことができます。
* `$backgroundColor` のように変数を利用して、その値を再利用することができます。
* スタイルのビルド時に、スタイルの構文チェックを自動的に行います。
* ブラウザでライブリロードしながら、スタイルを編集することが可能です。
* 既存の JSON を読み込んで、編集しやすい YAML に変換することができます。

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

各コマンド別のヘルプを `charites help <command>` で確認することもできます。

## Global Options

Charites には、すべてのコマンドに共通する以下の２つの Global Options があります。

* `--provider` - `mapbox`、`geolonia` または `default` を指定することができ、なにも指定しない場合は `default` または、後述する設定ファイルの値が利用されます。
  * `mapbox` - Mapbox GL JS v2.x 互換の仕様に基づいてスタイルの構文チェックが行われます。
  * `geolonia` 及び `default` - MapLibre GL JS 互換の仕様に基づいてスタイルの構文チェックが行われます。
* `--mapbox-access-token` - Mapbox 向けのスタイルを使用する場合には、Mapbox のアクセストークンを取得して、このオプションで指定する必要があります。

## Configuration

`charites` の global otptions は、YML で記述された設定ファイルから読み込むこともできます。

設定ファイルは、初めての `charites` コマンド実行時に、以下のパスに自動的に保存されます。

```
~/.charites/config.yml
```

Global options は、このファイルの中で以下の様に指定することで、コマンド入力時のオプション入力を省略することができます。

```
provider: mapbox
mapboxAccessToken: xxxx
```

上の例は、`charites --provider mapbox --mapbox-access-token xxxx` と同じ結果を得ることができます。

### Examples

`style.yml` から `style.json` をビルドする:

```
charites build style.yml style.json
```

`style.json` を `style.yml` に変換する:

```
charites convert style.json
```

ローカル環境で地図を起動し、スタイルの編集を watch して、地図のライブリロードを行う:

```
charites serve style.yml
```

もし、あなたが Mapbox のユーザーであるなら以下のようにコマンドを実行してください。

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

## ライセンス

MIT
