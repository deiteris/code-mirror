/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   code-mirror.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../iron-validatable-behavior/iron-validatable-behavior.d.ts" />
/// <reference path="../iron-form-element-behavior/iron-form-element-behavior.d.ts" />
/// <reference path="codemirror-import.d.ts" />

declare namespace UiElements {

  /**
   * [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)
   * Web component wrapping for [CodeMirror](http://codemirror.net)
   *
   * ```
   * <custom-element-demo>
   *  <template>
   *    <link rel="import" href="code-mirror.html">
   *    <next-code-block></next-code-block>
   *  </template>
   * </custom-element-demo>
   * ```
   * ```html
   * <code-mirror required></code-mirror>
   * ```
   *
   * ## What is this?
   *
   * Code-Mirror is a Web Component made with [Polymer](https://www.polymer-project.org/)
   * that wraps a default text-area with CodeMirror's highlight syntax, plugins and options.
   *
   * ### Example:
   *
   * ```html
   * ...
   * <head>
   *  <link rel="import" href="bower_components/code-mirror/code-mirror.html"/>
   * </head>
   * <body>
   *  <code-mirror mode="javascript" theme="ambiance" line-numbers on-change="valueChanged">
   *    function myScript() {
   *      return 100;
   *    }
   *  </code-mirror>
   * </body>
   * ```
   *
   * The `<code-mirror>` element must be initialized with the `mode` property.
   * Otherwise it will initialize itself without any syntaxt highlighting,
   * indent and autofill support.
   *
   * ## Accessing options
   *
   * The element exposes `setOption()` function that should be used to set
   * editor options.
   *
   * ```javascript
   * this.$.cm.setOption('extraKeys', {
   *  'Ctrl-Space': (cm) => {
   *    CodeMirror.showHint(cm, CodeMirror.hint['http-headers'], {
   *      container: this.shadowRoot
   *    });
   *  }
   * });
   * ```
   * Additionaly the element has the `editor` property which is a refferene to CodeMirror instance.
   *
   * ## Rendering hidden element
   *
   * CodeMirror has issues with rendering while the element is hidden.
   * If the element is active but not visible (e.g. in `<iron-pages>` element)
   * then you may want to call `refresh()` function on a CodeMirror instance
   * after showing the element.
   *
   * ## Changes in version 2
   *
   * - Theming is made exclusively by CSS variables. `theme` property has been
   * re moved and the component doesn't contain any theme definition.
   * - Property change observers will not set option on the editor if not the
   * value is not set by calling `setAttribute()` or `removeAttribute`.
   * The element uses `attributeChanged()` callback which only works when element
   * attribute change. Exception is `lint` property wich require to pass
   * complex object.
   * - Hints can now be appended as a child of this element with `slot="hints"`
   * attribute. The element handles styling of hints. Use `code-mirror-hints`
   * module for hints support and example implementation.
   *
   * ## Styling
   *
   * `<code-mirror>` provides the following custom properties and mixins for styling:
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--code-mirror` | Mixin applied to the element | `{}`
   * `--code-mirror-wrapper` | Mixin applied to the wrapper element (where the CM is rendered) | `{}`
   * `--code-mirror-editor` | Mixin applied to the editor element  | `{}`
   *
   * See `codemirror-styles.html` file for detailed theme instruction.
   */
  class CodeMirrorElement extends
    Polymer.IronValidatableBehavior(
    Polymer.IronFormElementBehavior(
    Polymer.Element)) {

    /**
     * An array of options to set after the editor has been created.
     */
    _pendingOptions: any[]|null;

    /**
     * Editor's value.
     * If set at initialization time any content inside this element will be replaced by this
     * value.
     */
    value: String|null;

    /**
     * The mode to use. When not given, this will default to the first mode that was loaded.
     * It may be a string, which either simply names the mode or is a MIME type associated with
     * the mode.
     * Alternatively, it may be an object containing configuration options for the mode, with
     * a name property that names the mode. For example
     * <code>{name: "javascript", json: true}</code>
     */
    mode: String|null;

    /**
     * Explicitly set the line separator for the editor. By default (value null), the document
     * will be split on CRLFs as well as lone CRs and LFs, and a single LF will be used as line
     * separator in all output.
     */
    lineSeparator: String|null;

    /**
     * The width of a tab character.
     * Defaults to 2.
     */
    tabSize: Number|null;

    /**
     * Whether to show line numbers to the left of the editor.
     */
    lineNumbers: Boolean|null;

    /**
     * Whether to use the context-sensitive indentation that the mode provides (or just indent
     * the same as the line before).
     */
    smartIndent: Boolean|null;

    /**
     * Configures the key map to use. The default is "default", which is the only key map
     * defined in codemirror.js itself.
     */
    keyMap: String|null;

    /**
     * Whether CodeMirror should scroll or wrap for long lines. Defaults to false (scroll).
     */
    lineWrapping: Boolean|null;

    /**
     * This disables editing of the editor content by the user. If the special value "nocursor"
     * is given (instead of simply true), focusing of the editor is also disallowed.
     */
    readOnly: Boolean|null;

    /**
     * Whether the cursor should be drawn when a selection is active.
     */
    showCursorWhenSelecting: Boolean|null;

    /**
     * When enabled, which is the default, doing copy or cut when there is no selection will
     * copy or cut the whole lines that have cursors on them.
     */
    lineWiseCopyCut: Boolean|null;

    /**
     * The maximum number of undo levels that the editor stores. Note that this includes
     * selection change events. Defaults to 200.
     */
    undoDepth: Boolean|null;

    /**
     * The period of inactivity (in milliseconds) that will cause a new history event to be
     * started when typing or deleting. Defaults to 1250.
     */
    historyEventDelay: Number|null;

    /**
     * Can be used to make CodeMirror focus itself on initialization. Defaults to off.
     */
    autofocus: Boolean|null;

    /**
     * An option for CodeMirror's gutters.
     * For example `['CodeMirror-lint-markers']`
     */
    gutters: any[]|null|undefined;

    /**
     * Lint option. It should be a linter object used to lint the
     * value. Usually it is combined with `lineNumbers`.
     *
     * This option works when `../codemirror/addon/lint.lint.js` is
     * imcluded into the document.
     */
    lint: object|null|undefined;

    /**
     * A reference to the CodeMirror instance.
     */
    readonly editor: object|null;

    /**
     * Location of codemirror directory where CM's assests are located
     * If not set it will use `../codemirror` as a default location
     */
    importLocation: string|null|undefined;
    attributeChanged(name: any, oldValue: any, newValue: any): void;
    ready(): void;

    /**
     * Sets options to an editor that has been set before the editor was created
     */
    _setPendingOptions(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;

    /**
     * Focus cursor on an editor.
     */
    focus(): void;

    /**
     * Set option on an editor.
     *
     * @param option An option name to setOption
     * @param value A value to be set.
     */
    setOption(option: String|null, value: Any|null): void;

    /**
     * Handler for the `lint` property change.
     *
     * @param value Linter to use with the editor.
     */
    _lintChanged(value: object|null): void;

    /**
     * Set an editor value when `value` property changed.
     */
    _valueChanged(value: any): void;

    /**
     * Auto-called when mode has changed
     */
    _modeChanged(val: any): void;
    _onChangeHandler(): void;
    _onBeforeChangeHnalder(instance: any, changeObj: any): void;
    _getValidity(): any;
  }
}

interface HTMLElementTagNameMap {
  "code-mirror": UiElements.CodeMirrorElement;
}
