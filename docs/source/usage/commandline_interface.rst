Commandline Interface
======================

Help
----

.. code-block:: bash

    $ charites help
    Usage: charites [options] [command]

    Options:
    -v, --version                           output the version number
    -h, --help                              display help for command

    Commands:
    init [options] <file>                   initialize a style YAML
    convert <source> [destination]          convert the style JSON to YAML
    build [options] <source> [destination]  build a style JSON from the YAML
    serve [options] <source>                serve your map locally
    help [command]                          display help for command


Checking version
-------------------

.. code-block:: bash

    $ charites --version
    2.1.0


Inititalize `style.yml`
-----------------------

.. code-block:: bash

    $ charites init -h
    Usage: charites init [options] <file>

    initialize a style YAML

    Options:
    -t, --tilejson-urls <tilejson_urls>          an URL for TileJSON. It will create empty layers from vector_layers property of TileJSON. Please use
                                                comma (,) in case multiple TileJSONs require.
    -m, --metadatajson-urls <metadatajson_urls>  an URL for metadata.json. It will create empty layers from vector_layers property of metadata.json.
                                                Please use comma (,) in case multiple metadata.json require.
    -c, --composite-layers                       If it is true, a single YAML will be generated with multiple layers. Default is false.
    -h, --help                                   display help for command


Convert existing `style.json`
-----------------------------

.. code-block:: bash

    $ charites convert -h
    Usage: charites convert [options] <source> [destination]

    convert the style JSON to YAML

    Options:
    -h, --help  display help for command

Build `style.json` from `style.yml`
-----------------------------------

.. code-block:: bash

    charites build -h
    Usage: charites build [options] <source> [destination]

    build a style JSON from the YAML

    Options:
    -c, --compact-output                           build a minified style JSON
    -w, --watch                                    watch YAML and build when changed
    -u, --sprite-url [<sprite url>]                url to set as the sprite in style.json
    -i, --sprite-input [<icon input directory>]    directory path of icon source to build icons. The default <icon source> is `icons/`
    -o, --sprite-output [<icon output directory>]  directory path to output icon files. The default <icons destination> is the current directory
    -h, --help                                     display help for command

Realtime editor on browser
--------------------------

.. code-block:: bash

    charites serve -h
    Usage: charites serve [options] <source>

    serve your map locally

    Options:
    -i, --sprite-input [<icon input directory>]  directory path of icon source to build icons. The default <icon
                                                 source> is `icons/`
    --sdf                                        Allows to use SDF sprite in charites
    --port [port]                                Specify custom port
    --vite-port [vitePort]                       Specify custom port for vite server
    --no-open                                    Don't open the preview in the default browser
    -h, --help                                   display help for command

Charites has fifth options for `serve` command.

- ``--sprite-input`` - If you are building icon spritesheets with Charites, you can specify the directory of SVG files to compile here. See the ``build`` command for more information.

- ``--sdf`` - if this option is used together with ``--sprite-input``, the viewer will generate SDF sprite. If the option is not specified, non SDF sprite will be generated.

- ``--port`` - Set http server's port number. When not specified, the default is 8080.

- ``--vite-port`` - Set Vite server's port number. When not specified, the default is 5137.

- ``--no-open`` - If this option is used, the preview will not be opened in the default browser. This is useful when you want to use the preview in a headless environment.
