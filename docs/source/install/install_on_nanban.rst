charites on unvt/nanban
=======================

Charites runs on Docker with one of UNVT tools named `unvt/nanban <https://github.com/unvt/nanban>`_. It is already in the tool, so you can use it by just staring unvt/nanban.

.. code-block:: bash

    $ docker run -ti --rm -v ${PWD}:/data -p 8080:8080 unvt/nanban
    $ cd /data
