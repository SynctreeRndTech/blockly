/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Former goog.module ID: Blockly.geras.Drawer

import type {BlockSvg} from '../../block_svg.js';
import * as svgPaths from '../../utils/svg_paths.js';
import type {BaseShape, DynamicShape, Notch} from '../common/constants.js';
import {Drawer as BaseDrawer} from '../common/drawer.js';
import type {Row} from '../measurables/row.js';
import {RenderInfo} from './info.js';
// import type {ConstantProvider} from './constants.js';
// import type {RenderInfo} from './info.js';
// import type {InlineInput} from './measurables/inline_input.js';
import type {StatementInput} from './measurables/inputs.js';
import type {PathObject} from './path_object.js';

/**
 * An object that draws a block based on the given rendering information,
 * customized for the geras renderer.
 */
export class Drawer extends BaseDrawer {
  // TODO(b/109816955): remove '!', see go/strict-prop-init-fix.
  override info_!: RenderInfo;

  /**
   * @param block The block to render.
   * @param info An object containing all information needed to render this
   *     block.
   */
  constructor(block: BlockSvg, info: RenderInfo) {
    super(block, info);
  }

  override draw() {
    this.drawOutline_();
    this.drawInternals_();
    this.updateConnectionHighlights();

    const pathObject = this.block_.pathObject as PathObject;
    pathObject.setPath(this.outlinePath_ + '\n' + this.inlinePath_);
    if (this.info_.RTL) {
      pathObject.flipRTL();
    }
    this.recordSizeOnBlock_();
    if (this.info_.outputConnection) {
      // Store the output connection shape type for parent blocks to use during
      // rendering.
      pathObject.outputShapeType = this.info_.outputConnection.shape.type;
    }
    pathObject.endDrawing();
  }

  override drawOutline_() {
    if (
      this.info_.outputConnection &&
      this.info_.outputConnection.isDynamicShape &&
      !this.info_.hasStatementInput &&
      !this.info_.bottomRow.hasNextConnection
    ) {
      this.drawFlatTop_();
      this.drawRightDynamicConnection_();
      this.drawFlatBottom_();
      this.drawLeftDynamicConnection_();
    } else {
      super.drawOutline_();
    }
  }

  override drawLeft_() {
    if (
      this.info_.outputConnection &&
      this.info_.outputConnection.isDynamicShape
    ) {
      this.drawLeftDynamicConnection_();
    } else {
      super.drawLeft_();
    }
  }

  protected drawRightDynamicConnection_() {
    if (!this.info_.outputConnection) {
      throw new Error(
        `Cannot draw the output connection of a block that doesn't have one`,
      );
    }
    this.outlinePath_ += (
      this.info_.outputConnection.shape as DynamicShape
    ).pathRightDown(this.info_.outputConnection.height);
  }
  protected drawLeftDynamicConnection_() {
    if (!this.info_.outputConnection) {
      throw new Error(
        `Cannot draw the output connection of a block that doesn't have one`,
      );
    }
    this.positionOutputConnection_();

    this.outlinePath_ += (
      this.info_.outputConnection.shape as DynamicShape
    ).pathUp(this.info_.outputConnection.height);

    // Close off the path.  This draws a vertical line up to the start of the
    // block's path, which may be either a rounded or a sharp corner.
    this.outlinePath_ += 'z';
  }

  /** Add steps to draw a flat top row. */
  protected drawFlatTop_() {
    const topRow = this.info_.topRow;
    this.positionPreviousConnection_();

    this.outlinePath_ += svgPaths.moveBy(topRow.xPos, this.info_.startY);
    this.outlinePath_ += svgPaths.lineOnAxis('h', topRow.width);
  }

  /** Add steps to draw a flat bottom row. */
  protected drawFlatBottom_() {
    const bottomRow = this.info_.bottomRow;
    this.positionNextConnection_();

    this.outlinePath_ += svgPaths.lineOnAxis('V', bottomRow.baseline);
    this.outlinePath_ += svgPaths.lineOnAxis('h', -bottomRow.width);
  }

  override drawStatementInput_(row: Row) {
    const input = row.getLastInput() as StatementInput;
    // Where to start drawing the notch, which is on the right side in LTR.
    const x = input.xPos + input.notchOffset + (input.shape as BaseShape).width;

    const insideCorners = this.constants_.INSIDE_CORNERS;
    const innerTopLeftCorner =
      (input.shape as Notch).pathRight +
      svgPaths.lineOnAxis('h', -(input.notchOffset - insideCorners.width)) +
      insideCorners.pathTop;

    const innerHeight = row.height - 2 * insideCorners.height;

    const innerBottomLeftCorner =
      insideCorners.pathBottom +
      svgPaths.lineOnAxis('h', input.notchOffset - insideCorners.width) +
      (input.connectedBottomNextConnection
        ? ''
        : (input.shape as Notch).pathLeft);

    this.outlinePath_ +=
      svgPaths.lineOnAxis('H', x) +
      innerTopLeftCorner +
      svgPaths.lineOnAxis('v', innerHeight) +
      innerBottomLeftCorner +
      svgPaths.lineOnAxis('H', row.xPos + row.width);

    this.positionStatementInputConnection_(row);
  }
}
