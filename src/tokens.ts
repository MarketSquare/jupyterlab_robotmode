/*
  Copyright (c) 2022 MarketSquare
  Distributed under the terms of the BSD-3-Clause License
*/

/** The source of truth for the plugin id */
export const PLUGIN_ID = '@marketsquare/jupyterlab_robotmode:plugin';

/** well-known mime type for robot framework (pygments, etc.) */
export const MIME_TYPE = 'text/x-robotframework';

/** the canonical CodeMirror mode name */
export const MODE_NAME = 'robotframework';

/** the human-readable name of the CodeMirror mode */
export const MODE_LABEL = 'robotframework';

/** primary file extension */
export const DEFAULT_EXTENSION = 'robot';

/** resource file extension */
export const RESOURCE_EXTENSION = 'resource';

/** all recognized file extensions */
export const EXTENSIONS = [DEFAULT_EXTENSION, RESOURCE_EXTENSION];
