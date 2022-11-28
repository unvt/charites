Examples
========

Example: https://github.com/geoloniamaps/basic

init
------

Initialize `style.yml` from either TileJSON or metadata.json.
If you do not specify TileJSON URL, it will generate empty `style.yml`.

.. code-block:: bash

    charites init style.yml --tilejson-urls https://raw.githubusercontent.com/mapbox/tilejson-spec/master/3.0.0/example/osm.json


.. code-block:: bash

    charites init style.yml --metadatajson-urls https://optgeo.github.io/kokoromi-rw/zxy/metadata.json

In `init` command, you can just generate a single YAML instead of creating layer configuration files separately when you add optional `-c` or `--composite-layers` parameter.

build
-------

Build `style.json` from `style.yml`:

.. code-block:: bash

    charites build style.yml style.json

Add ``-c`` or ``--compact-output`` to minify the JSON

.. code-block:: bash

    charites build style.yml style.json -c


Add ``--sprite-input`` and ``--sprite-output`` to build svg files for map icons.

.. code-block:: bash

    charites build style.yml style.json --sprite-input icons/ --sprite-output public/


Convert `style.json` to `style.yml`
------------------------------------

.. code-block:: bash

    charites convert style.json style.yml


Load JSON as a standard input to generate `style.yml`:

.. code-block:: bash

    curl http://example.com/style.json | charites convert - style.yml

serve
-------

Launch a live preview of your map style in your local environment:

.. code-block:: bash

    charites serve style.yml


For Mapbox users:

.. code-block:: bash

    charites serve style.yml --provider mapbox --mapbox-access-token xxxx
