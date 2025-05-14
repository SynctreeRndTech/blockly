/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Former goog.module ID: Blockly.geras.ConstantProvider

import * as svgPaths from '../../utils/svg_paths.js';
import {ConstantProvider as BaseConstantProvider} from '../common/constants.js';

/**
 * An object that provides constants for rendering blocks in SyncTree mode.
 */
export class ConstantProvider extends BaseConstantProvider {
  override FIELD_TEXT_BASELINE_CENTER = false;

  // The dark/shadow path in classic rendering is the same as the normal block
  // path, but translated down one and right one.
  DARK_PATH_OFFSET = 1;

  /**
   * The maximum width of a bottom row that follows a statement input and has
   * inputs inline.
   */
  MAX_BOTTOM_WIDTH = 30;
  override STATEMENT_BOTTOM_SPACER = -this.NOTCH_HEIGHT / 2;

  GRID_UNIT = 4;
  CORNER_RADIUS = 1 * this.GRID_UNIT;

  /**
   * Offset from the top of the row for placing fields on inline input rows
   * and statement input rows.
   * Matches existing rendering (in 2019).
   *
   * @override
   */
  TALL_INPUT_FIELD_OFFSET_Y = 8;
  /**
   * @override
   */
  TAB_OFFSET_FROM_TOP = 5;
  TAB_HEIGHT = 15;
  TAB_WIDTH = 8;
  TAB_VERTICAL_OVERLAP = 7.5;

  /**
   * @override
   */
  NOTCH_WIDTH = 6 * this.GRID_UNIT;
  NOTCH_HEIGHT = 1.25 * this.GRID_UNIT;
  NOTCH_OFFSET_LEFT = 2.5 * this.GRID_UNIT;

  /**
   * Additional offset added to the statement input's width to account for the
   * notch.
   *
   * @override
   */
  STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT;
  //   STATEMENT_BOTTOM_SPACER = 0; // -this.NOTCH_HEIGHT;
  STATEMENT_INPUT_SPACER_MIN_WIDTH = 40 * this.GRID_UNIT;
  STATEMENT_INPUT_PADDING_LEFT = 4 * this.GRID_UNIT;

  // notch block & puzzle tab block same height
  /**
   * Vertical padding between consecutive statement inputs.
   *
   * @override
   */
  BETWEEN_STATEMENT_PADDING_Y = 5;
  TOP_ROW_MIN_HEIGHT = 5;
  TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT = 11;
  BOTTOM_ROW_MIN_HEIGHT = 5;
  BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT = 11; // bottom row height
  SPACER_DEFAULT_HEIGHT = 16;

  /**
   * The minimum width of the block.
   *
   * @override
   */
  MIN_BLOCK_WIDTH = 6 * this.GRID_UNIT;
  MIN_BLOCK_HEIGHT = 6 * this.GRID_UNIT;
  EMPTY_BLOCK_SPACER_HEIGHT = 16;
  MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH = 12 * this.GRID_UNIT;

  /**
   * The minimum height of a dummy input row.
   *
   * @override
   */
  EMPTY_INLINE_INPUT_HEIGHT = this.TAB_HEIGHT + 11; // empty block height
  EMPTY_INLINE_INPUT_PADDING = 4 * this.GRID_UNIT;
  EMPTY_STATEMENT_INPUT_HEIGHT = 6 * this.GRID_UNIT;
  EXTERNAL_VALUE_INPUT_PADDING = 2;
  DUMMY_INPUT_MIN_HEIGHT = this.TAB_HEIGHT;
  DUMMY_INPUT_SHADOW_MIN_HEIGHT = this.TAB_HEIGHT;
  CURSOR_RADIUS = 5;

  /**
   * The backing colour of a field's border rect.
   *
   * @type {string}
   * @package
   */
  FIELD_BORDER_RECT_COLOUR: string = '#000';

  /**
   * @override
   */
  FIELD_BORDER_RECT_RADIUS = this.CORNER_RADIUS * 3;
  FIELD_BORDER_RECT_X_PADDING = 8;
  FIELD_BORDER_RECT_Y_PADDING = 4;
  FIELD_BORDER_RECT_HEIGHT = 4 * this.GRID_UNIT;
  FIELD_DROPDOWN_BORDER_RECT_HEIGHT = 4 * this.GRID_UNIT;

  /**
   * @override
   */
  FIELD_TEXT_FONTSIZE = 11; // (11pt=14px)
  FIELD_TEXT_FONTWEIGHT = 'normal';
  FIELD_TEXT_FONTFAMILY = '"Roboto", "Helvetica", "Arial", sans-serif';
  /**
   * The selected glow colour.
   *
   * @type {string}
   */
  SELECTED_GLOW_COLOUR: string = '#fff';
  /**
   * The size of the selected glow.
   *
   * @type {number}
   */
  SELECTED_GLOW_SIZE: number = 0.5;
  /**
   * The replacement glow colour.
   *
   * @type {string}
   */
  REPLACEMENT_GLOW_COLOUR: string = '#fff';
  /**
   * The size of the selected glow.
   *
   * @type {number}
   */
  REPLACEMENT_GLOW_SIZE: number = 2;
  /**
   * The ID of the selected glow filter, or the empty string if no filter is
   * set.
   *
   * @type {string}
   * @package
   */
  selectedGlowFilterId: string = '';
  /**
   * The <filter> element to use for a selected glow, or null if not set.
   *
   * @type {SVGElement}
   * @private
   */
  selectedGlowFilter_: SVGElement | null = null;
  /**
   * The ID of the replacement glow filter, or the empty string if no filter is
   * set.
   *
   * @type {string}
   * @package
   */
  replacementGlowFilterId: string = '';
  /**
   * The <filter> element to use for a replacement glow, or null if not set.
   *
   * @type {SVGElement}
   * @private
   */
  replacementGlowFilter_: SVGElement | null = null;

  constructor() {
    super();
  }

  override getCSS_(selector: string) {
    return super.getCSS_(selector).concat([
      // Text.
      `${selector} .blocklyText, `,
      `${selector} .blocklyFlyoutLabelText {`,
      `font-family: ${this.FIELD_TEXT_FONTFAMILY};`,
      `font-size: ${this.FIELD_TEXT_FONTSIZE}pt;`,
      `font-weight: ${this.FIELD_TEXT_FONTWEIGHT};`,
      'fill: #fff;',
      '}',

      // Fields.
      `${selector} .blocklyNonEditableText>text,`,
      `${selector} .blocklyEditableText>text {`,
      `font-family: ${this.FIELD_TEXT_FONTFAMILY};`,
      `font-weight: ${this.FIELD_TEXT_FONTWEIGHT};`,
      'fill-opacity: 0.9;',
      '}',
      `${selector} .blocklyNonEditableText>rect,`,
      `${selector} .blocklyEditableText>rect {`,
      `fill: ${this.FIELD_BORDER_RECT_COLOUR};`,
      'fill-opacity: 0.15;',
      'stroke: #000;',
      'stroke-opacity: .1;',
      '}',

      // Editable field hover.
      `${selector} .blocklyEditableText:not(.editing):hover>rect {`,
      'fill-opacity: 0.25;',
      '}',

      // Text field input.
      `${selector} .blocklyHtmlInput {`,
      `font-family: ${this.FIELD_TEXT_FONTFAMILY};`,
      `font-weight: ${this.FIELD_TEXT_FONTWEIGHT};`,
      'color: rgba(255,255,255,0.7);',
      'background-color: rgba(0,0,0,0.75);',
      // "border-radius: 12px !important;",
      'border-radius: 1em !important;',
      'letter-spacing: 0.01071em;',
      '}',

      // Selection highlight.
      `${selector} .blocklySelected>.blocklyPath {`,
      'stroke: #fff;',
      'stroke-opacity: .9;',
      'stroke-width: 2;',
      '}',

      // Connection highlight.
      `${selector} .blocklyHighlightedConnectionPath {`,
      'stroke: #fff;',
      '}',

      // Replaceable highlight.
      `${selector} .blocklyReplaceable .blocklyPath {`,
      'fill-opacity: .5;',
      '}',
      `${selector} .blocklyReplaceable .blocklyPathLight,`,
      `${selector} .blocklyReplaceable .blocklyPathDark {`,
      'display: none;',
      '}',

      // Bubbles.
      `${selector} .blocklyText.blocklyBubbleText {`,
      'fill: #fff;',
      'fill-opacity: .75;',
      '}',

      // scroll.
      ' .blocklyScrollbarHandle,',
      ' .blocklyFlyout .blocklyScrollbarHandle {',
      'fill: #575c66;',
      'fill-opacity: 0.7;',
      '}',

      ' .blocklyScrollbarBackground:hover + .blocklyScrollbarHandle,',
      ' .blocklyScrollbarHandle:hover,',
      ' .blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
      ' .blocklyFlyout .blocklyScrollbarHandle:hover {',
      'fill: #575c66;',
      'fill-opacity: 0.9;',
      '}',

      // Flyout labels.
      /*
        selector + " .blocklyFlyoutLabelText {",
        "fill: #fff;",
        "}",

        // Insertion marker.
        selector + " .blocklyInsertionMarker>.blocklyPath {",
        "fill-opacity: " + this.INSERTION_MARKER_OPACITY + ";",
        "stroke: none",
        "}",
        /* eslint-enable indent */
    ]);
  }

  override init() {
    super.init();

    /**
     * An object containing sizing and path information about notches.
     *
     * @type {!object}
     */
    this.NOTCH = this.makeNotch();

    /**
     * An object containing sizing and path information about start hats
     *
     * @type {!object}
     */
    this.START_HAT = this.makeStartHat();

    /**
     * An object containing sizing and path information about puzzle tabs.
     *
     * @type {!object}
     */
    this.PUZZLE_TAB = this.makePuzzleTab();

    /**
     * An object containing sizing and path information about inside corners
     *
     * @type {!object}
     */
    this.INSIDE_CORNERS = this.makeInsideCorners();

    /**
     * An object containing sizing and path information about outside corners.
     *
     * @type {!object}
     */
    this.OUTSIDE_CORNERS = this.makeOutsideCorners();
  }
  //   TODO : check applyColour function
  //   applyColour() {
  //     if (this.sourceBlock_ && this.arrow_) {
  //       if (this.sourceBlock_.isShadow()) {
  //         this.arrow_.style.fill = '';
  //       } else {
  //         this.arrow_.style.fill = '';
  //       }
  //     }
  //   }

  override makePuzzleTab() {
    const width = this.TAB_WIDTH; // 8
    const height = this.TAB_HEIGHT; // 15

    function makeMainPath(up: boolean): string {
      const forward = up ? -1 : 1;
      const back = -forward;

      const overlap = 7.5; // 2.5
      const halfHeight = height / 2;
      const control1Y = 0; // halfHeight + overlap;
      const control2Y = 0; // halfHeight + 0.5;
      const control3Y = -overlap; // 7.5 // 2.5

      const endPoint1 = svgPaths.point(-width, forward * halfHeight);
      const endPoint2 = svgPaths.point(width, forward * halfHeight);

      return (
        svgPaths.curve('c', [
          svgPaths.point(0, forward * control1Y),
          svgPaths.point(-width, back * control2Y),
          endPoint1,
        ]) +
        svgPaths.curve('s', [
          svgPaths.point(width, back * control3Y),
          endPoint2,
        ])
      );
    }
    // c 0,-10  -8,8  -8,-7.5  s 8,2.5  8,-7.5
    const pathUp = makeMainPath(true);
    // c 0,10  -8,-8  -8,7.5  s 8,-2.5  8,7.5
    const pathDown = makeMainPath(false);

    return {
      type: this.SHAPES.PUZZLE,
      width,
      height,
      pathDown,
      pathUp,
    };
  }

  makeNotch() {
    const width = this.NOTCH_WIDTH;
    const height = this.NOTCH_HEIGHT;

    const innerWidth = width / 3;
    const curveWidth = innerWidth / 3;

    const halfHeight = height / 2;
    const quarterHeight = halfHeight / 2;

    function makeMainPath(dir: number): string {
      return (
        svgPaths.curve('c', [
          svgPaths.point((dir * curveWidth) / 2, 0),
          svgPaths.point((dir * curveWidth * 3) / 4, quarterHeight / 2),
          svgPaths.point(dir * curveWidth, quarterHeight),
        ]) +
        svgPaths.line([svgPaths.point(dir * curveWidth, halfHeight)]) +
        svgPaths.curve('c', [
          svgPaths.point((dir * curveWidth) / 4, quarterHeight / 2),
          svgPaths.point((dir * curveWidth) / 2, quarterHeight),
          svgPaths.point(dir * curveWidth, quarterHeight),
        ]) +
        svgPaths.lineOnAxis('h', dir * innerWidth) +
        svgPaths.curve('c', [
          svgPaths.point((dir * curveWidth) / 2, 0),
          svgPaths.point((dir * curveWidth * 3) / 4, -(quarterHeight / 2)),
          svgPaths.point(dir * curveWidth, -quarterHeight),
        ]) +
        svgPaths.line([svgPaths.point(dir * curveWidth, -halfHeight)]) +
        svgPaths.curve('c', [
          svgPaths.point((dir * curveWidth) / 4, -(quarterHeight / 2)),
          svgPaths.point((dir * curveWidth) / 2, -quarterHeight),
          svgPaths.point(dir * curveWidth, -quarterHeight),
        ])
      );
    }

    const pathLeft = makeMainPath(1);
    const pathRight = makeMainPath(-1);

    return {
      type: this.SHAPES.NOTCH,
      width: width,
      height: height,
      pathLeft: pathLeft,
      pathRight: pathRight,
    };
  }

  override makeInsideCorners() {
    const radius = this.CORNER_RADIUS;

    const innerTopLeftCorner = svgPaths.arc(
      'a',
      '0 0,0',
      radius,
      svgPaths.point(-radius, radius),
    );

    const innerTopRightCorner = svgPaths.arc(
      'a',
      '0 0,1',
      radius,
      svgPaths.point(-radius, radius),
    );

    const innerBottomLeftCorner = svgPaths.arc(
      'a',
      '0 0,0',
      radius,
      svgPaths.point(radius, radius),
    );

    const innerBottomRightCorner = svgPaths.arc(
      'a',
      '0 0,1',
      radius,
      svgPaths.point(radius, radius),
    );

    return {
      width: radius,
      height: radius,
      pathTop: innerTopLeftCorner,
      pathBottom: innerBottomLeftCorner,
      rightWidth: radius,
      rightHeight: radius,
      pathTopRight: innerTopRightCorner,
      pathBottomRight: innerBottomRightCorner,
    };
  }
  override makeOutsideCorners() {
    const radius = this.CORNER_RADIUS;
    /**
     * SVG path for drawing the rounded top-left corner.
     *
     * @constant
     */
    const topLeft =
      svgPaths.moveBy(0, radius) +
      svgPaths.arc('a', '0 0,1', radius, svgPaths.point(radius, -radius));

    /**
     * SVG path for drawing the rounded top-right corner.
     *
     * @constant
     */
    const topRight = svgPaths.arc(
      'a',
      '0 0,1',
      radius,
      svgPaths.point(radius, radius),
    );

    /**
     * SVG path for drawing the rounded bottom-left corner.
     *
     * @constant
     */
    const bottomLeft = svgPaths.arc(
      'a',
      '0 0,1',
      radius,
      svgPaths.point(-radius, -radius),
    );

    /**
     * SVG path for drawing the rounded bottom-right corner.
     *
     * @constant
     */
    const bottomRight = svgPaths.arc(
      'a',
      '0 0,1',
      radius,
      svgPaths.point(-radius, radius),
    );

    return {
      topLeft: topLeft,
      topRight: topRight,
      bottomRight: bottomRight,
      bottomLeft: bottomLeft,
      rightHeight: radius,
    };
  }
}
