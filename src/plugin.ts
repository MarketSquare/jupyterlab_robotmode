/*
  Copyright (c) 2022 MarketSquare
  Distributed under the terms of the BSD-3-Clause License
*/

import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';

import { ICodeMirror } from '@jupyterlab/codemirror';

import {
  DEFAULT_EXTENSION,
  MIME_TYPE,
  MODE_LABEL,
  PLUGIN_ID,
  RESOURCE_EXTENSION,
} from './tokens';

import { robotIcon, resourceIcon } from './icons';

import { defineRobotMode } from './mode';

/**
 * Initialization data for the jupyterlab_robotmode extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  autoStart: true,
  requires: [ICodeMirror],
  activate: (app: JupyterFrontEnd, codeMirror: ICodeMirror) => {
    defineRobotMode(codeMirror);

    app.docRegistry.addFileType({
      name: MODE_LABEL,
      mimeTypes: [MIME_TYPE],
      extensions: [`.${DEFAULT_EXTENSION}`],
      icon: robotIcon,
    });

    app.docRegistry.addFileType({
      name: `${MODE_LABEL} resource`,
      mimeTypes: [MIME_TYPE],
      extensions: [`.${RESOURCE_EXTENSION}`],
      icon: resourceIcon,
    });
  },
};

export default extension;
