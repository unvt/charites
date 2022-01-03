Global configuration
====================

Some options for Charites can be stored in a configuration file written in YAML.

The config file will be automatically created to the following path the first time the charites command is executed.

.. code-block:: bash

    ~/.charites/config.yml


Global options can be specified as follows:

.. code-block:: bash

    provider: mapbox
    mapboxAccessToken: xxxx


With the example above, you get the same result as `charites serve --provider mapbox --mapbox-access-token xxxx`.