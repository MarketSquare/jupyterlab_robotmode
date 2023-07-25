"""
jupyterlab_robotmode setup
"""
import json
import sys
import os
from pathlib import Path
import logging
import setuptools

logging.basicConfig(format="%(levelname)s: %(message)s")

try:
    from jupyter_packaging import wrap_installers, npm_builder, get_data_files
except ImportError as e:
    logging.warning(
        "Build tool `jupyter-packaging` is missing. Install it with pip or conda."
    )
    if not ("--name" in sys.argv or "--version" in sys.argv):
        raise e


HERE = Path(__file__).parent.resolve()

# Get the package info from package.json
pkg_json = json.loads((HERE / "package.json").read_text(encoding="utf-8"))

# The name of the project
name = "jupyterlab_robotmode"

lab_path = HERE / pkg_json["jupyterlab"]["outputDir"]

remote_entry_and_source_map = [*lab_path.rglob("remoteEntry.*.js*")]
if len(remote_entry_and_source_map) > 2:
    logging.error(
        "Not ready to build distributions, "
        f"{len(remote_entry_and_source_map)} remoteEntry.*.js* files found, "
        "expected no more than 2.\n\n\t"
        f"""*** Clean out {pkg_json["jupyterlab"]["outputDir"]} and retry ***"""
        "\n"
    )
    sys.exit(1)


# Representative files that should exist after a successful build
ensured_targets = [str(lab_path / "package.json")]

share = f"""share/jupyter/labextensions/{pkg_json["name"]}"""

data_files_spec = [
    (share, str(lab_path.relative_to(HERE)), "**"),
    (share, str("."), "install.json"),
]

long_description = (HERE / "README.md").read_text(encoding="utf-8")

version = (
    pkg_json["version"]
    .replace("-alpha.", "a")
    .replace("-beta.", "b")
    .replace("-rc.", "rc")
)

setup_args = dict(
    name=name,
    version=version,
    url=pkg_json["homepage"],
    author=pkg_json["author"],
    project_urls=dict(Source=pkg_json["homepage"], Tracker=pkg_json["bugs"]["url"]),
    description=pkg_json["description"],
    license=pkg_json["license"],
    license_file="LICENSE",
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=setuptools.find_packages(),
    install_requires=[
        "jupyterlab >=3,<4",
    ],
    zip_safe=False,
    include_package_data=True,
    python_requires=">=3.8",
    platforms="Linux, Mac OS X, Windows",
    keywords=["Jupyter", "JupyterLab", "JupyterLab3"],
    classifiers=[
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Framework :: Jupyter",
        "Framework :: Jupyter :: JupyterLab",
        "Framework :: Jupyter :: JupyterLab :: 3",
        "Framework :: Jupyter :: JupyterLab :: Extensions",
        "Framework :: Jupyter :: JupyterLab :: Extensions :: Prebuilt",
        "Framework :: Robot Framework",
    ],
)

if json.loads(os.environ.get("SKIP_POST_INSTALL", "0")):
    logging.warning(
        "Skipping postinstall: remember to run\n\n\t"
        "jupyter labextension develop --overwrite ."
    )
    post_develop = None
else:
    post_develop = npm_builder(
        build_cmd="install:extension", source_dir="src", build_dir=lab_path
    )

setup_args["cmdclass"] = wrap_installers(
    post_develop=post_develop, ensured_targets=ensured_targets
)
setup_args["data_files"] = get_data_files(data_files_spec)

if __name__ == "__main__":
    setuptools.setup(**setup_args)
