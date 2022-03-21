# Charites
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Documentation

Documentation is available [here](https://unvt.github.io/charites/).

## Contributing

see [CONTRIBUTING.md](./.github/CONTRIBUTING.md)

## License

MIT

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://geolonia.com/"><img src="https://avatars.githubusercontent.com/u/42296593?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Geolonia</b></sub></a><br /><a href="https://github.com/unvt/charites/commits?author=geolonia" title="Code">💻</a></td>
    <td align="center"><a href="https://naoki-is.me"><img src="https://avatars.githubusercontent.com/u/8760841?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Naoki Ohashi</b></sub></a><br /><a href="https://github.com/unvt/charites/commits?author=naogify" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ubukawa"><img src="https://avatars.githubusercontent.com/u/59204379?v=4?s=100" width="100px;" alt=""/><br /><sub><b>UBUKAWA Taro</b></sub></a><br /><a href="https://github.com/unvt/charites/commits?author=ubukawa" title="Code">💻</a></td>
    <td align="center"><a href="https://geolonia.com/"><img src="https://avatars.githubusercontent.com/u/309946?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Takayuki Miyauchi</b></sub></a><br /><a href="https://github.com/unvt/charites/commits?author=miya0001" title="Code">💻</a></td>
    <td align="center"><a href="https://jin-igarashi.me"><img src="https://avatars.githubusercontent.com/u/2639701?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jin Igarashi</b></sub></a><br /><a href="https://github.com/unvt/charites/commits?author=JinIgarashi" title="Code">💻</a></td>
    <td align="center"><a href="http://smellman.hatenablog.com/"><img src="https://avatars.githubusercontent.com/u/135112?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Taro Matsuzawa aka. btm</b></sub></a><br /><a href="https://github.com/unvt/charites/commits?author=smellman" title="Code">💻</a></td>
    <td align="center"><a href="https://shinichi.blog"><img src="https://avatars.githubusercontent.com/u/1124652?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shinichi Nishikawa</b></sub></a><br /><a href="https://github.com/unvt/charites/commits?author=ShinichiNishikawa" title="Documentation">📖</a></td>
    <td align="center"><a href="http://yuiseki.net/"><img src="https://avatars.githubusercontent.com/u/25507?v=4?s=100" width="100px;" alt=""/><br /><sub><b>yuiseki</b></sub></a><br /><a href="https://github.com/unvt/charites/commits?author=yuiseki" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->


This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
