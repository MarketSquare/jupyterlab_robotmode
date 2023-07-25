# MarketSquare jupyterlab_robotmode

[![binder-badge]][binder] [![pypi-badge]][pypi] [![conda-badge]][conda]
[![npm-badge]][npm]

A JupyterLab extension which adds CodeMirror mode for Robot Framework syntax

![a screenshot of JupyterLab with Robot Framework files and launchers][screenshot]

## Prerequisites

- JupyterLab

## Installation

### For JupyterLab>3

> **Note**: Support for JupyterLab 4 and Notebook 7 is in the planning stage: see
> discussion on [#14].

```bash
pip install jupyterlab_robotmode
```

or

```bash
conda install jupyterlab_robotmode -c conda-forge
```

### For JupyterLab <=2

> **Note**: This will pull a significantly older, unmaintained version of the extension.

```bash
jupyter labextension install @marketsquare/jupyterlab_robotmode
```

[binder-badge]: https://mybinder.org/badge_logo.svg
[binder]: https://mybinder.org/v2/gh/MarketSquare/jupyterlab_robotmode/HEAD?urlpath=lab
[pypi]: https://pypi.org/project/jupyterlab-robotmode
[pypi-badge]: https://img.shields.io/pypi/v/jupyterlab_robotmode
[npm-badge]: https://img.shields.io/npm/v/@marketsquare/jupyterlab_robotmode
[npm]: https://www.npmjs.com/package/@marketsquare/jupyterlab_robotmode
[conda-badge]: https://img.shields.io/conda/vn/conda-forge/jupyterlab_robotmode
[conda]: https://anaconda.org/conda-forge/jupyterlab_robotmode
[screenshot]:
  https://user-images.githubusercontent.com/45380/162342746-48561188-5859-4469-8634-3c4fd13cdef5.png
[#14]: https://github.com/MarketSquare/jupyterlab_robotmode/issues/14
