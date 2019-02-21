/**
@license
Copyright 2018 Pawel Psztyc, The ARC team

Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.

Adapted from https://github.com/PETComputacaoUFPR/code-mirror and
https://github.com/PolymerLabs/code-mirror
The MIT License (MIT)

Copyright (c) 2015 PET Computação UFPR

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) 2012 The Polymer Authors. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

  * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
  * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatableBehavior} from '@polymer/iron-validatable-behavior/iron-validatable-behavior.js';
import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import './codemirror-styles.js';
/**
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
 *  <code-mirror mode="javascript" on-change="valueChanged">
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
 * - lineNumber has been removed since setting this option render the editor
 * incorrectly. It is a problem with CM library and not tthe element.
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
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof UiElements
 * @appliesMixin IronValidatableBehavior
 * @appliesMixin IronFormElementBehavior
 */
class CodeMirrorElement extends
  mixinBehaviors([IronValidatableBehavior, IronFormElementBehavior], PolymerElement) {
  static get template() {
    return html`<style include="codemirror">
    :host {
      display: block;
      position: relative;
      @apply --code-mirror;
    }

    #content {
      display: none;
    }

    #wrapper {
      @apply --code-mirror-wrapper;
    }

    #wrapper .CodeMirror {
      @apply --code-mirror-editor;
    }
    </style>
    <div id="wrapper"></div>
    <div id="content">
      <slot></slot>
    </div>
    <div class="hints">
      <slot name="hints"></slot>
    </div>`;
  }

  static get is() {
    return 'code-mirror';
  }
  static get properties() {
    return {
      /**
       * An array of options to set after the editor has been created.
       *
       * @type {Array}
       */
      _pendingOptions: {
        type: Array
      },
      /**
       * Editor's value.
       * If set at initialization time any content inside this element will be replaced by this
       * value.
       *
       * @type {String}
       */
      value: {
        type: String,
        notify: true,
        observer: '_valueChanged'
      },
      /**
       * The mode to use. When not given, this will default to the first mode that was loaded.
       * It may be a string, which either simply names the mode or is a MIME type associated with
       * the mode.
       * Alternatively, it may be an object containing configuration options for the mode, with
       * a name property that names the mode. For example
       * <code>{name: "javascript", json: true}</code>
       *
       * @type {String}
       */
      mode: {
        type: String,
        value: function() {
          return {
            name: 'javascript',
            json: true
          };
        },
        observer: '_modeChanged'
      },
      /**
       * Explicitly set the line separator for the editor. By default (value null), the document
       * will be split on CRLFs as well as lone CRs and LFs, and a single LF will be used as line
       * separator in all output.
       *
       * @type {String}
       */
      lineSeparator: {
        type: String,
        observer: '_lineSeparatorChanged'
      },
      /**
       * The width of a tab character.
       * Defaults to 2.
       *
       * @type {Number}
       */
      tabSize: {
        type: Number,
        observer: '_tabSizeChanged'
      },
      /**
       * Whether to use the context-sensitive indentation that the mode provides (or just indent
       * the same as the line before).
       *
       * @type {Boolean}
       */
      smartIndent: {
        type: Boolean,
        observer: '_smartIndentChanged'
      },
      /**
       * Configures the key map to use. The default is "default", which is the only key map
       * defined in codemirror.js itself.
       *
       * @type {String}
       */
      keyMap: {
        type: String,
        observer: '_keyMapChanged'
      },
      /**
       * Whether CodeMirror should scroll or wrap for long lines. Defaults to false (scroll).
       *
       * @type {Boolean}
       */
      lineWrapping: {
        type: Boolean,
        observer: '_lineWrappingChanged'
      },
      /**
       * This disables editing of the editor content by the user. If the special value "nocursor"
       * is given (instead of simply true), focusing of the editor is also disallowed.
       *
       * @type {Boolean}
       */
      readOnly: {
        type: Boolean,
        observer: '_readOnlyChanged'
      },
      /**
       * Whether the cursor should be drawn when a selection is active.
       *
       * @type {Boolean}
       */
      showCursorWhenSelecting: {
        type: Boolean,
        observer: '_showCursorWhenSelectingChanged'
      },
      /**
       * When enabled, which is the default, doing copy or cut when there is no selection will
       * copy or cut the whole lines that have cursors on them.
       *
       * @type {Boolean}
       */
      lineWiseCopyCut: {
        type: Boolean,
        observer: '_lineWiseCopyCutChanged'
      },
      /**
       * The maximum number of undo levels that the editor stores. Note that this includes
       * selection change events. Defaults to 200.
       *
       * @type {Boolean}
       */
      undoDepth: {
        type: Number,
        observer: '_undoDepthChanged'
      },
      /**
       * The period of inactivity (in milliseconds) that will cause a new history event to be
       * started when typing or deleting. Defaults to 1250.
       *
       * @type {Number}
       */
      historyEventDelay: {
        type: Number,
        observer: '_historyEventDelayChanged'
      },
      /**
       * Can be used to make CodeMirror focus itself on initialization. Defaults to off.
       *
       * @type {Boolean}
       */
      autofocus: {
        type: Boolean,
        observer: '_autofocusChanged'
      },
      /**
       * An option for CodeMirror's gutters.
       * For example `['CodeMirror-lint-markers']`
       */
      gutters: {
        type: Array,
        observer: '_guttersChanged'
      },
      /**
       * Lint option. It should be a linter object used to lint the
       * value.
       *
       * This option works when `../codemirror/addon/lint.lint.js` is
       * imcluded into the document.
       */
      lint: {
        type: Object,
        observer: '_lintChanged'
      },
      /**
       * A reference to the CodeMirror instance.
       *
       * @type {Object}
       */
      editor: {
        type: Object,
        readOnly: true
      }
    };
  }
  /**
   * @constructor
   */
  constructor() {
    super();
    this._onChangeHandler = this._onChangeHandler.bind(this);
    this._onBeforeChangeHnalder = this._onBeforeChangeHnalder.bind(this);
  }

  ready() {
    super.ready();
    if (!this.value) {
      this.value = this.textContent.trim();
    }
    /* global CodeMirror */
    try {
      const editor = CodeMirror(this.$.wrapper, {
        value: this.value,
        mode: this.mode
      });
      this._setEditor(editor);
      afterNextRender(this, () => this._setPendingOptions());
    } catch (e) {
      console.warn('Unable to initialize CodeMirror.', e);
    }
  }
  /**
   * Sets options to an editor that has been set before the editor was created
   */
  _setPendingOptions() {
    if (!this._pendingOptions) {
      return;
    }
    this._pendingOptions.forEach((item) => {
      this.setOption(item.option, item.value);
      if (item.post) {
        try {
          item.post();
        } catch (e) {}
      }
    });
    this._pendingOptions = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.editor) {
      return;
    }
    this.editor.on('change', this._onChangeHandler);
    this.editor.on('beforeChange', this._onBeforeChangeHnalder);
    this.editor.refresh();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (!this.editor) {
      return;
    }
    this.editor.off('change', this._onChangeHandler);
    this.editor.off('beforeChange', this._onBeforeChangeHnalder);
  }
  /**
   * Refreshes the sate of the editor.
   */
  refresh() {
    if (!this.editor) {
      return;
    }
    this.editor.refresh();
  }
  /**
   * Focus cursor on an editor.
   */
  focus() {
    if (!this.editor) {
      return;
    }
    this.editor.focus();
  }
  /**
   * Set option on an editor.
   *
   * @param {String} option An option name to setOption
   * @param {Any} value A value to be set.
   */
  setOption(option, value) {
    if (!this.editor) {
      if (!this._pendingOptions) {
        this._pendingOptions = [];
      }
      this._pendingOptions.push({
        option: option,
        value: value
      });
      return;
    }
    this.editor.setOption(option, value);
  }
  /**
   * Handler for the `lint` property change.
   *
   * @param {Object} value Linter to use with the editor.
   */
  _lintChanged(value) {
    this.setOption('lint', value);
  }
  /**
   * Set an editor value when `value` property changed.
   * @param {String} value
   */
  _valueChanged(value) {
    if (!this.editor) {
      return;
    }

    if (this.editor.getValue() !== value && value !== undefined &&
      value !== null) {
      if (typeof value !== 'string') {
        value = String(value);
      }
      this.editor.setValue(value);
    } else if (value === undefined || value === null) {
      this.editor.setValue('');
    }
  }
  /**
   * Auto-called when mode has changed
   * @param {String} val
   */
  _modeChanged(val) {
    if (!val || (val.indexOf && val.indexOf('application/json') === 0)) {
      this.set('mode', {
        name: 'javascript',
        json: true
      });
      return;
    }
    let mode;
    let spec;
    let info;
    const m = /.+\.([^.]+)$/.exec(val);
    if (m) {
      info = CodeMirror.findModeByExtension(m[1]);
      if (info) {
        mode = info.mode;
        spec = info.mime;
      }
    } else if (/\//.test(val)) {
      info = CodeMirror.findModeByMIME(val);
      if (info) {
        mode = info.mode;
        spec = val;
      }
    } else {
      mode = spec = val;
    }
    if (!this.editor) {
      if (!this._pendingOptions) {
        this._pendingOptions = [];
      }
      this._pendingOptions.push({
        option: 'mode',
        value: mode,
        post: function() {
          CodeMirror.autoLoadMode(this.editor, mode);
        }.bind(this)
      });
      return;
    }
    if (!mode) {
      this.setOption('mode', null);
      return;
    }
    this.setOption('mode', spec);
    CodeMirror.autoLoadMode(this.editor, mode);
  }

  _onChangeHandler() {
    this.set('value', this.editor.getValue());
  }

  _onBeforeChangeHnalder(instance, changeObj) {
    const ev = new CustomEvent('before-change', {
      detail: {
        change: changeObj
      },
      cancelable: false,
      bubbles: false,
      composed: false
    });
    this.dispatchEvent(ev);
    if (ev.detail.change.canceled) {
      this.set('value', this.editor.getValue());
    }
  }

  _getValidity() {
    if (this.required && !this.value) {
      return false;
    }
    return true;
  }
  _smartIndentChanged(value) {
    this.setOption('smartIndent', value);
  }
  _readOnlyChanged(value) {
    this.setOption('readOnly', value);
  }
  _showCursorWhenSelectingChanged(value) {
    this.setOption('showCursorWhenSelecting', value);
  }
  _lineWiseCopyCutChanged(value) {
    this.setOption('lineWiseCopyCut', value);
  }
  _autofocusChanged(value) {
    this.setOption('autofocus', value);
  }
  _guttersChanged(value) {
    this.setOption('gutters', value);
  }
  _historyEventDelayChanged(value) {
    this.setOption('historyEventDelay', value);
  }
  _undoDepthChanged(value) {
    this.setOption('undoDepth', value);
  }
  _lineWrappingChanged(value) {
    this.setOption('lineWrapping', value);
  }
  _tabSizeChanged(value) {
    this.setOption('tabSize', value);
  }
  _lineSeparatorChanged(value) {
    this.setOption('lineSeparator', value);
  }
  _keyMapChanged(value) {
    this.setOption('keyMap', value);
  }
  /**
   * Fired before a change is applied, and its handler may choose to modify or
   * cancel the change.
   *
   * @event before-change
   * @param {Object} change It has `from`, `to`, and `text` properties, as with the `change`
   * event.
   *
   *    It also has a `cancel()` method, which can be called to cancel the change, and, if the
   *  change isn't coming from an undo or redo event, an `update(from, to, text)` method, which
   *  may be used to modify the change.
   */
}
window.customElements.define(CodeMirrorElement.is, CodeMirrorElement);
