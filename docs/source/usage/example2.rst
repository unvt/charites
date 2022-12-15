Example 2: Import existing style.json and edit it with charites
===================================================================
This is an example of using charites for importing an existing style.json and editing it as yaml files, and exporting them back to a json style. 

Condition
------------------------
- OS: Windows 10
- Charites version: 0.3.0
- Running on WindowsPowershell


Steps
-----


Step 1. Import style json into a series of YAML files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If your style json is in the Internet, it may need to downloat it from the Internet before you convert because charites cannot directly convert json a file in the Internet. Use curl.exe (in WindowsPowershell) or curl (in bash environment).

.. code-block:: 

    curl.exe -O https://ubukawa.github.io/cmv-test/style1.json
    charites convert style1.json editing/style.yml

Then, you will see a series of yaml files are converted from the source json. You will obtain an overall YAML that contains a list of style layers with the style yamls in the layer directory.  
In this case, we will have "style.yml" in "editing" directory together with a lot of yaml files for layers in "layers" directory.

.. image:: ./img/example02-001.png
   :scale: 75%
   :align: center

.. image:: ./img/example02-002.png
   :scale: 75%
   :align: center

(Tips) It is good to know that if your source json has some folder structure in its layer ids, that structure would be maintained when you import. 

.. image:: ./img/example02-005.png
   :scale: 75%
   :align: center

.. image:: ./img/example02-003.png
   :scale: 75%
   :align: center

.. image:: ./img/example02-004.png
   :scale: 75%
   :align: center

Step 2. Checking an overall yaml (style.yml in this case)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Check the style.yml by opening it with Notepad or any text editor. You will see it like this:

.. image:: ./img/example02-006.png
   :scale: 75%
   :align: center

Sometimes, if id for each layer is too long, YAML automatically uses ">-" and break the line to improve human's readability. However, it will cause some problem for Charites, so please fix line brake with ">-" in the layers if you find it.

.. image:: ./img/example02-007.png
   :scale: 75%
   :align: center


