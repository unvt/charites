Development
===========

Build from source code
----------------------

The following procedures is how to build and install charites from source code.

.. code-block:: bash

    $ git clone https://github.com/unvt/charites.git
    $ cd charites
    $ npm install
    $ npm run build
    $ npm install -g .


.. warning::
    if you have already installed other version's `charites` from npm globally, it might occur some conflicts. Please uninstall all charites from globally by using following commands before installing development version.

.. code-block:: bash
    
    npm uninstall -g .
    npm uninstall -g @unvt/charites

Then run:

.. code-block:: bash

    $ charites help


Releasing this package
----------------------

.. code-block:: bash

    $ npm version patch # Or `minor` or `major`
    $ git push
    $ git push origin <version>
