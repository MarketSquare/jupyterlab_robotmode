"""Version information for jupyterlab_robotmode"""

import json
from pathlib import Path

__all__ = ["__version__", "__js__"]

__js__ = json.loads(
    (Path(__file__).parent / "labextension/package.json").read_text(encoding="utf-8")
)

__version__ = __js__["version"]
