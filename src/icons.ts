/*
  Copyright (c) 2022 MarketSquare
  Distributed under the terms of the BSD-3-Clause License
*/

import { LabIcon } from '@jupyterlab/ui-components';
import ROBOT_SVG from '../style/icon.svg';

/** an icon for robot files */
export const robotIcon = new LabIcon({
  name: 'robotframework:file-robot',
  svgstr: ROBOT_SVG,
});

/** an icon for robot resource files */
export const resourceIcon = new LabIcon({
  name: 'robotframework:file-resource',
  svgstr: ROBOT_SVG.replace('jp-icon4', 'jp-icon-contrast0'),
});
