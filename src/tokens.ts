/*
  Copyright (c) 2022 MarketSquare
  Distributed under the terms of the BSD-3-Clause License
*/

/** The npm namespace */
export const NS = '@marketsquare/jupyterlab_robotmode';

/** The source of truth for the mode plugin id */
export const MODE_PLUGIN_ID = `${NS}:plugin`;

/** The source of truth for the robot file plugin id */
export const FILE_PLUGIN_ID = `${NS}:robot-file-plugin`;

/** The source of truth for the resource file plugin id */
export const RESOURCE_PLUGIN_ID = `${NS}:robot-resource-plugin`;

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

/** A namespace for robot JupyterLab commands */
export namespace CommandIDs {
  export const createNew = 'fileeditor:create-new-robot-file';
  export const createNewResource = 'fileeditor:create-new-robot-resource';
}
