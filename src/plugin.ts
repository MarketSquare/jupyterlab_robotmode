/*
  Copyright (c) 2022 MarketSquare
  Distributed under the terms of the BSD-3-Clause License
*/

import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { LabIcon } from '@jupyterlab/ui-components';
import { ICodeMirror } from '@jupyterlab/codemirror';
import { ICommandPalette } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { ITranslator, nullTranslator } from '@jupyterlab/translation';

import {
  CommandIDs,
  DEFAULT_EXTENSION,
  FILE_PLUGIN_ID,
  MIME_TYPE,
  MODE_LABEL,
  MODE_PLUGIN_ID,
  RESOURCE_EXTENSION,
  RESOURCE_PLUGIN_ID,
} from './tokens';

import { robotIcon, resourceIcon } from './icons';

import { defineRobotMode } from './mode';

/** The factory to use for new files. */
const FACTORY = 'Editor';

/** The section of the command palette for new files. */
const PALETTE_CATEGORY = 'Text Editor';

/** The section of the launcher for new files. */
const LAUNCHER_CATEGORY = 'Other';

/** A selector for where to show in the context menu. */
const CONTEXT_SELECTOR = '.jp-DirListing-content';

/**
 * Initialization data for the jupyterlab_robotmode extension.
 */
const modePlugin: JupyterFrontEndPlugin<void> = {
  id: MODE_PLUGIN_ID,
  autoStart: true,
  requires: [ICodeMirror],
  activate: (app: JupyterFrontEnd, codeMirror: ICodeMirror) => {
    defineRobotMode(codeMirror);
  },
};

/** Make a plugin with various (optional) features */
function makePlugin(
  id: string,
  name: string,
  mime: string,
  extension: string,
  icon: LabIcon,
  command: string
): JupyterFrontEndPlugin<void> {
  return {
    id,
    autoStart: true,
    optional: [ITranslator, IFileBrowserFactory, ILauncher, IMainMenu, ICommandPalette],
    activate: (
      app: JupyterFrontEnd,
      translator?: ITranslator,
      browserFactory?: IFileBrowserFactory,
      launcher?: ILauncher,
      menu?: IMainMenu,
      palette?: ICommandPalette
    ) => {
      const { commands, contextMenu } = app;

      const trans = (translator || nullTranslator).load(MODE_PLUGIN_ID);

      app.docRegistry.addFileType({
        name,
        mimeTypes: [mime],
        extensions: [`.${extension}`],
        icon,
      });

      commands.addCommand(command, {
        label: (args) =>
          args['isPalette'] || args['isContextMenu']
            ? trans.__('New %1 File', name)
            : trans.__('%1 File', name),
        caption: trans.__('Create a new %1 file', name),
        icon: (args) => (args['isPalette'] ? null : icon),
        execute: async (args) => {
          const cwd =
            args['cwd'] ?? browserFactory?.defaultBrowser.model.path ?? undefined;
          const model = await commands.execute('docmanager:new-untitled', {
            path: cwd,
            type: 'file',
            ext: extension,
          });
          return commands.execute('docmanager:open', {
            path: model.path,
            factory: FACTORY,
          });
        },
      });

      // add to the file browser context menu
      contextMenu.addItem({
        command,
        args: { isContextMenu: true },
        selector: CONTEXT_SELECTOR,
        rank: 3,
      });

      // add to the launcher
      if (launcher) {
        launcher.add({
          command,
          category: LAUNCHER_CATEGORY,
          rank: 1,
        });
      }

      // add to the palette
      if (palette) {
        palette.addItem({
          command,
          args: { isPalette: true },
          category: PALETTE_CATEGORY,
        });
      }

      // add to the menu
      if (menu) {
        menu.fileMenu.newMenu.addGroup([{ command }], 30);
      }
    },
  };
}

/** A plugin for .robot files */
const filePlugin = makePlugin(
  FILE_PLUGIN_ID,
  MODE_LABEL,
  MIME_TYPE,
  DEFAULT_EXTENSION,
  robotIcon,
  CommandIDs.createNew
);

/** A plugin for .resource files */
const resourcePlugin = makePlugin(
  RESOURCE_PLUGIN_ID,
  `${MODE_LABEL} Resource`,
  MIME_TYPE,
  RESOURCE_EXTENSION,
  resourceIcon,
  CommandIDs.createNewResource
);

export default [modePlugin, filePlugin, resourcePlugin];
