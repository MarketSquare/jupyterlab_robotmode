"""A JupyterLab extensions which adds CodeMirror mode for Robot Framework syntax"""
from ._version import __version__, __js__


def _jupyter_labextension_paths():
    """The labextension entry points"""
    return [{"src": "labextension", "dest": __js__["name"]}]
