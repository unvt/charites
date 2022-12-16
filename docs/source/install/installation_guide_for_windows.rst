Installation guide for windows users
======================================

Here is an typical work flow of installation for windows users.

Condition of this example
---------------------------
- Windows 10
- nodejs version 18.12.1
- npm version 8.19.2
- Windows PowerShell

Steps
------------------------

Step 1. Installation of nodejs (if it is not installed yet)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Check if nodejs is installed. If not, visit `nodejs <https://nodejs.org/en/>`_ to install them. Version 14 or later version is recommended. Installation will fail with the older version of nodejs than 12.20.0.

Step 2. Open Windows PowerShell
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Open Windows PowerShell and confirm if nodejs and npm works.

.. code-block:: 

    npm --version
    node --version

Step 3. Install @unvt/charites as a npm package
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Just rung the following command to install the charites.

.. code-block:: 

    npm install -g @unvt/charites


Step 4. Confirm if charites is properly installed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you can see the charites version and command lits with the following command. It seems that your installation has done successfully.

.. code-block:: 

    charites --version
    charites --help

Sample snapshot of Installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. image:: ./img/windows-guide-01.png
   :scale: 75%
   :align: center

