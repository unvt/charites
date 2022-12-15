.. charites documentation master file, created by
   sphinx-quickstart on Wed Dec  8 09:24:35 2021.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Charites - Documentation
====================================

:Date:   2022-12-15
:Copyright: CC-BY-SA
:Organization: The United Nations Vector Tile Toolkit
:Version: 0.3.0
:Abstract: This document contains the complete documentation of Charites, an application to style vector tiles easily

.. meta::
   :description lang=en: This document contains the complete documentation of Charites, an application to style vector tiles easily
   :keywords: Charites, Mapbox, Maplibre, Vectortiles, UNVT, webmapping

An easy, intuitive, and efficient command-line tool for writing vector map styles compatible with the `Mapbox <https://docs.mapbox.com/mapbox-gl-js/style-spec/>`_ and `MapLibre <https://maplibre.org/maplibre-gl-js-docs/style-spec/>`_ Style Specification in YAML.
With YAML format's readability, JSON compiler, linter, and live style viewer on a local browser, you can simplify your map styling workflow.

.. note::
   In Greek mythology, the `Charites <https://en.wikipedia.org/wiki/Charites>`_ are the three goddesses of charm, beauty, and human creativity. They are believed to have been worshipped not only by artists but also by those who aspired to technology to infuse them with a creative spirit.

Features
==================

- Initiate a project from scratch, or convert an existing `style.json` file to generate YAML style files.
- Write styles in a simple YAML format.
- Divide groups of layers in to multiple files for better readability and mantainability. `!!inc/file <relative-path-to-the-file>`
- Use variables like `$backgroundColor` and `$waterColor` to style effectively.
- Compile YAML to a single style.json file, with a format linter.
- Use `--provider mapbox` to validate your style against Mapbox GL JS v2.x
- Run `charites serve <source>` to preview your style live while you make changes in a browser.

.. toctree::
   :maxdepth: 1
   :caption: Contents:

   install/index
   usage/index
   development/index

Translations
============

The documentation is available in several languages.

- `English </charites/en>`_
- `日本語 </charites/ja>`_
- `Français </charites/fr>`_
- `عربى </charites/ar>`_

If there is an error with a translation, please `help to improve it <https://www.transifex.com/unvt/charites-docs/>`_.

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
