"""A JupyterLab extension which adds a CodeMirror mode for Robot Framework syntax"""
from ._version import __js__, __version__

__all__ = ["__version__", "_jupyter_labextension_paths"]


def _jupyter_labextension_paths():
    """The labextension entry points"""
    return [{"src": "labextension", "dest": __js__["name"]}]
