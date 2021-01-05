/*
  Copyright (c) 2020 MarketSquare
  Distributed under the terms of the BSD-3-Clause License
*/

/// <reference path="../node_modules/@jupyterlab/codemirror/typings/codemirror/codemirror.d.ts" />

import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICodeMirror } from '@jupyterlab/codemirror';

import { PLUGIN_ID } from '.';

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
  },
};

export default extension;
