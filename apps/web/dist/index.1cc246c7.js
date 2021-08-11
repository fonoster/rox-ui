// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this,
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"hur8T":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "f2c9685dad4863d1";
module.bundle.HMR_BUNDLE_ID = "dd3671e61cc246c7"; // @flow
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets /*: {|[string]: boolean|} */ , acceptedAssets /*: {|[string]: boolean|} */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    // $FlowFixMe
    ws.onmessage = function(event /*: {data: string, ...} */ ) {
        checkedAssets = {
        } /*: {|[string]: boolean|} */ ;
        acceptedAssets = {
        } /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH
            );
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function(e) {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
        errorHTML += `\n      <div>\n        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">\n          🚨 ${diagnostic.message}\n        </div>\n        <pre>\n          ${stack}\n        </pre>\n        <div>\n          ${diagnostic.hints.map((hint)=>'<div>' + hint + '</div>'
        ).join('')}\n        </div>\n      </div>\n    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    link.getAttribute('href').split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"htFGz":[function(require,module,exports) {
var _bootstrap = require("./bootstrap");

},{"./bootstrap":"Xh8C6"}],"Xh8C6":[function(require,module,exports) {
var _bootstrap = require("./bootstrap");

},{"./bootstrap":"f1BnF"}],"f1BnF":[function(require,module,exports) {
var _eventBus = require("../services/event-bus");
var _fonos = require("../services/fonos");
var _roxanne = require("./Roxanne");
const accessKey = _fonos.PFAuthManager.getKeyFromScript();
const assistant = new _roxanne.Roxanne({
    accessKey,
    eventBus: _eventBus.eventBus
});
document.addEventListener('DOMContentLoaded', ()=>assistant.mount()
);

},{"../services/event-bus":"4PcGq","../services/fonos":"3nd3h","./Roxanne":"dJt3y"}],"4PcGq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _eventBus = require("./EventBus");
parcelHelpers.exportAll(_eventBus, exports);
var _eventName = require("./EventName");
parcelHelpers.exportAll(_eventName, exports);
var _events = require("./events");
parcelHelpers.exportAll(_events, exports);

},{"./EventBus":"lhEUC","./EventName":"dTg5Z","./events":"yP28d","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"lhEUC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EventBus", ()=>EventBus
);
parcelHelpers.export(exports, "eventBus", ()=>eventBus
);
var _data = require("../../data");
class EventBus {
    dispatch(event, detail) {
        this.manager?.dispatchEvent(new CustomEvent(event, {
            detail
        }));
    }
    subscribe(event, cb) {
        this.manager?.addEventListener(event, cb);
    }
    unsubscribe(event, cb) {
        this.manager?.removeEventListener(event, cb);
    }
    set setAssistant(manager) {
        if (!manager) throw new Error(_data.ERROR_MESSAGES.WIDGET_NO_LOADED);
        this.manager = manager;
        window.__PF_ASSISTANT_LOADED__ = true;
    }
    static get instance() {
        return this._instance ?? (this._instance = new EventBus());
    }
}
const eventBus = EventBus.instance;

},{"../../data":"djiGU","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"djiGU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _errorMessages = require("./errorMessages");
parcelHelpers.exportAll(_errorMessages, exports);
var _messages = require("./messages");
parcelHelpers.exportAll(_messages, exports);

},{"./errorMessages":"708kx","./messages":"fR5Xc","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"708kx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ERROR_MESSAGES", ()=>ERROR_MESSAGES
);
const ERROR_MESSAGES = {
    ID_MISSING: 'ID is missing from widget script',
    KEY_MISSING: 'Key is missing from widget',
    ASSISTANT_IS_LOADED: 'Oops! It seems that the assistant has loaded',
    WIDGET_NO_LOADED: 'The assistant was not found',
    SCREEN_NAME_REQUIRE: 'The "name" prop is required for each screen',
    NAVIGATE_NOT_IMPLEMENTED: 'Oops!, navigation has not been implemented',
    NAVIGATOR_CHILDREN: 'A <Navigator /> can only contain "<Screen />" as its direct children',
    NAVIGATOR_NO_CHILDREN: 'It seems that <Navigator /> has no children. You must add at least one child',
    OUTSIDE_OF_PROVIDER: "Couldn't find a context. Is your component outside a <Screen />?"
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"4N8i7":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"fR5Xc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MESSAGES", ()=>MESSAGES
);
const MESSAGES = {
    LAUNCHER_TITLE: 'Opens a widget where you can speak to a voice assistant',
    ASSISTANT_TITLE: 'Roxanne assistant'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"dTg5Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EventName", ()=>EventName
);
var EventName;
(function(EventName1) {
    EventName1["VISIBILITY"] = 'rox.assistant.visibility';
    EventName1["SPEECH_WAITING"] = 'rox.assistant.waiting';
    EventName1["SPEECH_START"] = 'rox.assistant.start';
    EventName1["SPEECH_STOP"] = 'rox.assistant.stop';
    EventName1["SPEECH_PAUSE"] = 'rox.assistant.pause';
    EventName1["SPEECH_RESUME"] = 'rox.assistant.resume';
    EventName1["SPEECH_INTENTS"] = 'rox.assistant.intents';
})(EventName || (EventName = {
}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"yP28d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _assistantEvents = require("./AssistantEvents");
parcelHelpers.exportAll(_assistantEvents, exports);
var _speechEvents = require("./SpeechEvents");
parcelHelpers.exportAll(_speechEvents, exports);

},{"./AssistantEvents":"gOfBG","./SpeechEvents":"8EruD","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"gOfBG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "visibilityEvent", ()=>visibilityEvent
);
var _eventName = require("../EventName");
var _event = require("./Event");
const visibilityEvent = new _event.AssistantEvent(_eventName.EventName.VISIBILITY);

},{"../EventName":"dTg5Z","./Event":"6XPui","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"6XPui":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Assistant Event
 *
 * @description An abstraction for dispatch events from the assistant to DOM.
 *
 * @author Fonoster
 */ parcelHelpers.export(exports, "AssistantEvent", ()=>AssistantEvent
);
var _eventBus = require("../EventBus");
class AssistantEvent {
    constructor(event){
        this.event = event;
    }
    /**
   * Dispatch event
   *
   * @description Trigger the event using the event bus from the current
   * context and accept a payload of the inherited type.
   */ dispatch(payload) {
        _eventBus.eventBus.dispatch(this.event, payload);
    }
    /**
   * Subscribe method
   *
   * @returns {Function} A function that removes the event listener in target's event
   * listener list with the same type, callback, and options.
   */ subscribe(cb) {
        _eventBus.eventBus.subscribe(this.event, cb);
        return ()=>_eventBus.eventBus.unsubscribe(this.event, cb)
        ;
    }
}

},{"../EventBus":"lhEUC","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"8EruD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "speechStartEvent", ()=>speechStartEvent
);
parcelHelpers.export(exports, "speechStopEvent", ()=>speechStopEvent
);
parcelHelpers.export(exports, "speechPauseEvent", ()=>speechPauseEvent
);
parcelHelpers.export(exports, "speechResumeEvent", ()=>speechResumeEvent
);
parcelHelpers.export(exports, "speechIntentsEvent", ()=>speechIntentsEvent
);
var _eventName = require("../EventName");
var _event = require("./Event");
const speechStartEvent = new _event.AssistantEvent(_eventName.EventName.SPEECH_START);
const speechStopEvent = new _event.AssistantEvent(_eventName.EventName.SPEECH_STOP);
const speechPauseEvent = new _event.AssistantEvent(_eventName.EventName.SPEECH_PAUSE);
const speechResumeEvent = new _event.AssistantEvent(_eventName.EventName.SPEECH_RESUME);
const speechIntentsEvent = new _event.AssistantEvent(_eventName.EventName.SPEECH_INTENTS);

},{"../EventName":"dTg5Z","./Event":"6XPui","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"3nd3h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pfauthManager = require("./PFAuthManager");
parcelHelpers.exportAll(_pfauthManager, exports);
var _speechAPI = require("./SpeechAPI");
parcelHelpers.exportAll(_speechAPI, exports);

},{"./PFAuthManager":"csnz4","./SpeechAPI":"18WHS","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"csnz4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// import { ErrorNotImplemented } from '../speech-recognition'
/**
 * PF Authentication Manager
 *
 * @description Verify that the client script has the corresponding
 * Fonoster identifier and access key.
 *
 * @author Fonoster
 */ parcelHelpers.export(exports, "PFAuthManager", ()=>PFAuthManager
);
var _config = require("../../config");
var _data = require("../../data");
class PFAuthManager {
    static getKeyFromScript(scriptId = `script#${_config.APP_CONFIG.SCRIPT_ID}`) {
        /**
     * Access key for development
     *
     * @throws If you don't use CI to build a production widget,
     * make sure you don't include this line.
     */ if (_config.__DEV__) return _config.PF_ACCESS_KEY // @patch-line
        ;
        const script = document.querySelector(scriptId);
        if (!script) throw new Error(_data.ERROR_MESSAGES.ID_MISSING);
        const key = new URL(script.getAttribute('src')).searchParams.get('key');
        if (!key) throw new Error(_data.ERROR_MESSAGES.KEY_MISSING);
        return key;
    }
    isAuthorized() {
    // throw new ErrorNotImplemented()
    }
}

},{"../../config":"8fM9J","../../data":"djiGU","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"8fM9J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("./constants");
parcelHelpers.exportAll(_constants, exports);

},{"./constants":"dJ3F9","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"dJ3F9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "APP_CONFIG", ()=>APP_CONFIG
);
parcelHelpers.export(exports, "PF_ACCESS_KEY", ()=>PF_ACCESS_KEY
);
parcelHelpers.export(exports, "__DEV__", ()=>__DEV__
);
parcelHelpers.export(exports, "STYLESHEET", ()=>STYLESHEET
);
var _appConfigJson = require("../../app.config.json");
var _appConfigJsonDefault = parcelHelpers.interopDefault(_appConfigJson);
const APP_CONFIG = {
    ASSISTANT_ID: '__rox_assistant__',
    SCRIPT_ID: 'rox-script',
    PUBLIC_URL: _appConfigJsonDefault.default.public_url
};
const PF_ACCESS_KEY = _appConfigJsonDefault.default.access_key;
const __DEV__ = true;
const STYLESHEET = `${APP_CONFIG.PUBLIC_URL}/styles.css`;

},{"../../app.config.json":"jG2Ur","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"jG2Ur":[function(require,module,exports) {
module.exports = JSON.parse("{\"api_url\":\"https://api.fonoster.net\",\"public_url\":\"http://localhost:3080\",\"access_key\":\"141303113-7fbWa28\"}");

},{}],"18WHS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "speechAPI", ()=>speechAPI
);
class SpeechAPI {
    async connect(accessKey) {
        // ...
        const isConnected = true;
        return {
            isConnected,
            accessKey
        };
    }
    async closeConnection() {
        // ...
        const isConnected = false;
        return isConnected;
    }
    onIntents(cb) {
        const intents = [
            {
                id: 'rox.intent.add',
                icon: 'https://fonoster.com/statics/icon.png',
                title: 'Test',
                description: 'Description...',
                transcript: 'Text...'
            }, 
        ];
        const error = {
            statusCode: 404,
            message: 'Oops!, I haven’t found anything'
        };
        // ...
        cb(intents, error);
    }
    onWaiting(cb) {
        // ...
        const isWait = true;
        cb(isWait);
    }
    recognizer(audio) {
        // ...
        console.log(audio);
    }
    static get instance() {
        return this._instance ?? (this._instance = new SpeechAPI());
    }
}
const speechAPI = SpeechAPI.instance;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"dJt3y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Roxanne Assistant
 *
 * @description The main class of the assistant with the responsibility of
 * centralizing the creation of the elements in DOM, adding styles, and
 * rendering a new app for the current client.
 *
 * @author Fonoster
 */ parcelHelpers.export(exports, "Roxanne", ()=>Roxanne
);
var _preact = require("preact");
var _compat = require("preact/compat");
var _config = require("../config");
var _data = require("../data");
const App = _compat.lazy(()=>require("80e958901cc02291")
);
/**
 * Debugging in development
 *
 * @throws If you don't use CI to build a production assistant,
 * make sure you don't include this package.
 */ if (_config.__DEV__) require("9bd81271e42999e8") // @patch-line
;
class Roxanne {
    constructor(deps){
        this.deps = deps;
        /**
   * Assistant is loaded
   *
   * @description Verify that no previous instance of the assistant was created
   * or that there is an element in the DOM with the same ID.
   */ this.assistantIsLoaded = (id)=>{
            const assistant = document.getElementById(id);
            const isAssistant = Boolean(assistant ?? window.__PF_ASSISTANT_LOADED__);
            return isAssistant;
        };
    }
    /**
   * Initialize Assistant
   *
   * @description Render a new app and set events manager
   */ mount() {
        const assistant = this.renderAssistant();
        this.deps.eventBus.setAssistant = assistant;
    }
    get app() {
        const appProps = {
            accessKey: this.deps.accessKey
        };
        return(/*#__PURE__*/ _preact.h(_compat.Suspense, {
            fallback: /*#__PURE__*/ _preact.h("div", null),
            __source: {
                fileName: "apps/web/src/bootstrap/Roxanne.tsx",
                lineNumber: 52
            },
            __self: this
        }, /*#__PURE__*/ _preact.h(App, {
            ...appProps,
            __source: {
                fileName: "apps/web/src/bootstrap/Roxanne.tsx",
                lineNumber: 53
            },
            __self: this
        })));
    }
    /**
   * Render Assistant App
   *
   * @description Create a new element in the DOM to load the instance.
   */ renderAssistant(id = _config.APP_CONFIG.ASSISTANT_ID) {
        const assistant = document.createElement('div');
        assistant.id = id;
        if (this.assistantIsLoaded(assistant.id)) throw new Error(_data.ERROR_MESSAGES.ASSISTANT_IS_LOADED);
        document.body.appendChild(assistant);
        _preact.render(this.app, assistant);
        return assistant;
    }
}

},{"preact":"9MgUs","preact/compat":"e240J","../config":"8fM9J","../data":"djiGU","80e958901cc02291":"9hPNm","9bd81271e42999e8":"lrnyi","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"9MgUs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "render", ()=>S
);
parcelHelpers.export(exports, "hydrate", ()=>q
);
parcelHelpers.export(exports, "createElement", ()=>v
);
parcelHelpers.export(exports, "h", ()=>v
);
parcelHelpers.export(exports, "Fragment", ()=>d
);
parcelHelpers.export(exports, "createRef", ()=>p
);
parcelHelpers.export(exports, "isValidElement", ()=>i
);
parcelHelpers.export(exports, "Component", ()=>_
);
parcelHelpers.export(exports, "cloneElement", ()=>B
);
parcelHelpers.export(exports, "createContext", ()=>D
);
parcelHelpers.export(exports, "toChildArray", ()=>A
);
parcelHelpers.export(exports, "options", ()=>l
);
var n, l, u, i, t, o, r, f, e = {
}, c = [], s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function a(n1, l1) {
    for(var u1 in l1)n1[u1] = l1[u1];
    return n1;
}
function h(n1) {
    var l1 = n1.parentNode;
    l1 && l1.removeChild(n1);
}
function v(l1, u1, i1) {
    var t1, o1, r1, f1 = {
    };
    for(r1 in u1)"key" == r1 ? t1 = u1[r1] : "ref" == r1 ? o1 = u1[r1] : f1[r1] = u1[r1];
    if (arguments.length > 2 && (f1.children = arguments.length > 3 ? n.call(arguments, 2) : i1), "function" == typeof l1 && null != l1.defaultProps) for(r1 in l1.defaultProps)(void 0) === f1[r1] && (f1[r1] = l1.defaultProps[r1]);
    return y(l1, f1, t1, o1, null);
}
function y(n1, i1, t1, o1, r1) {
    var f1 = {
        type: n1,
        props: i1,
        key: t1,
        ref: o1,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == r1 ? ++u : r1
    };
    return null != l.vnode && l.vnode(f1), f1;
}
function p() {
    return {
        current: null
    };
}
function d(n1) {
    return n1.children;
}
function _(n1, l1) {
    this.props = n1, this.context = l1;
}
function k(n1, l1) {
    if (null == l1) return n1.__ ? k(n1.__, n1.__.__k.indexOf(n1) + 1) : null;
    for(var u1; l1 < n1.__k.length; l1++)if (null != (u1 = n1.__k[l1]) && null != u1.__e) return u1.__e;
    return "function" == typeof n1.type ? k(n1) : null;
}
function b(n1) {
    var l1, u1;
    if (null != (n1 = n1.__) && null != n1.__c) {
        for(n1.__e = n1.__c.base = null, l1 = 0; l1 < n1.__k.length; l1++)if (null != (u1 = n1.__k[l1]) && null != u1.__e) {
            n1.__e = n1.__c.base = u1.__e;
            break;
        }
        return b(n1);
    }
}
function m(n1) {
    (!n1.__d && (n1.__d = !0) && t.push(n1) && !g.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(g);
}
function g() {
    for(var n1; g.__r = t.length;)n1 = t.sort(function(n2, l1) {
        return n2.__v.__b - l1.__v.__b;
    }), t = [], n1.some(function(n2) {
        var l1, u1, i1, t1, o1, r1;
        n2.__d && (o1 = (t1 = (l1 = n2).__v).__e, (r1 = l1.__P) && (u1 = [], (i1 = a({
        }, t1)).__v = t1.__v + 1, j(r1, t1, i1, l1.__n, (void 0) !== r1.ownerSVGElement, null != t1.__h ? [
            o1
        ] : null, u1, null == o1 ? k(t1) : o1, t1.__h), z(u1, t1), t1.__e != o1 && b(t1)));
    });
}
function w(n1, l1, u1, i1, t1, o1, r1, f1, s1, a1) {
    var h1, v1, p1, _1, b1, m1, g1, w1 = i1 && i1.__k || c, A = w1.length;
    for(u1.__k = [], h1 = 0; h1 < l1.length; h1++)if (null != (_1 = u1.__k[h1] = null == (_1 = l1[h1]) || "boolean" == typeof _1 ? null : "string" == typeof _1 || "number" == typeof _1 || "bigint" == typeof _1 ? y(null, _1, null, null, _1) : Array.isArray(_1) ? y(d, {
        children: _1
    }, null, null, null) : _1.__b > 0 ? y(_1.type, _1.props, _1.key, null, _1.__v) : _1)) {
        if (_1.__ = u1, _1.__b = u1.__b + 1, null === (p1 = w1[h1]) || p1 && _1.key == p1.key && _1.type === p1.type) w1[h1] = void 0;
        else for(v1 = 0; v1 < A; v1++){
            if ((p1 = w1[v1]) && _1.key == p1.key && _1.type === p1.type) {
                w1[v1] = void 0;
                break;
            }
            p1 = null;
        }
        j(n1, _1, p1 = p1 || e, t1, o1, r1, f1, s1, a1), b1 = _1.__e, (v1 = _1.ref) && p1.ref != v1 && (g1 || (g1 = []), p1.ref && g1.push(p1.ref, null, _1), g1.push(v1, _1.__c || b1, _1)), null != b1 ? (null == m1 && (m1 = b1), "function" == typeof _1.type && null != _1.__k && _1.__k === p1.__k ? _1.__d = s1 = x(_1, s1, n1) : s1 = P(n1, _1, p1, w1, b1, s1), a1 || "option" !== u1.type ? "function" == typeof u1.type && (u1.__d = s1) : n1.value = "") : s1 && p1.__e == s1 && s1.parentNode != n1 && (s1 = k(p1));
    }
    for(u1.__e = m1, h1 = A; h1--;)null != w1[h1] && ("function" == typeof u1.type && null != w1[h1].__e && w1[h1].__e == u1.__d && (u1.__d = k(i1, h1 + 1)), N(w1[h1], w1[h1]));
    if (g1) for(h1 = 0; h1 < g1.length; h1++)M(g1[h1], g1[++h1], g1[++h1]);
}
function x(n1, l1, u1) {
    var i1, t1;
    for(i1 = 0; i1 < n1.__k.length; i1++)(t1 = n1.__k[i1]) && (t1.__ = n1, l1 = "function" == typeof t1.type ? x(t1, l1, u1) : P(u1, t1, t1, n1.__k, t1.__e, l1));
    return l1;
}
function A(n1, l1) {
    return l1 = l1 || [], null == n1 || "boolean" == typeof n1 || (Array.isArray(n1) ? n1.some(function(n2) {
        A(n2, l1);
    }) : l1.push(n1)), l1;
}
function P(n1, l1, u1, i1, t1, o1) {
    var r1, f1, e1;
    if ((void 0) !== l1.__d) r1 = l1.__d, l1.__d = void 0;
    else if (null == u1 || t1 != o1 || null == t1.parentNode) n: if (null == o1 || o1.parentNode !== n1) n1.appendChild(t1), r1 = null;
    else {
        for(f1 = o1, e1 = 0; (f1 = f1.nextSibling) && e1 < i1.length; e1 += 2)if (f1 == t1) break n;
        n1.insertBefore(t1, o1), r1 = o1;
    }
    return (void 0) !== r1 ? r1 : t1.nextSibling;
}
function C(n1, l1, u1, i1, t1) {
    var o1;
    for(o1 in u1)"children" === o1 || "key" === o1 || o1 in l1 || H(n1, o1, null, u1[o1], i1);
    for(o1 in l1)t1 && "function" != typeof l1[o1] || "children" === o1 || "key" === o1 || "value" === o1 || "checked" === o1 || u1[o1] === l1[o1] || H(n1, o1, l1[o1], u1[o1], i1);
}
function $(n1, l1, u1) {
    "-" === l1[0] ? n1.setProperty(l1, u1) : n1[l1] = null == u1 ? "" : "number" != typeof u1 || s.test(l1) ? u1 : u1 + "px";
}
function H(n1, l1, u1, i1, t1) {
    var o1;
    n: if ("style" === l1) {
        if ("string" == typeof u1) n1.style.cssText = u1;
        else {
            if ("string" == typeof i1 && (n1.style.cssText = i1 = ""), i1) for(l1 in i1)u1 && l1 in u1 || $(n1.style, l1, "");
            if (u1) for(l1 in u1)i1 && u1[l1] === i1[l1] || $(n1.style, l1, u1[l1]);
        }
    } else if ("o" === l1[0] && "n" === l1[1]) o1 = l1 !== (l1 = l1.replace(/Capture$/, "")), l1 = l1.toLowerCase() in n1 ? l1.toLowerCase().slice(2) : l1.slice(2), n1.l || (n1.l = {
    }), n1.l[l1 + o1] = u1, u1 ? i1 || n1.addEventListener(l1, o1 ? T : I, o1) : n1.removeEventListener(l1, o1 ? T : I, o1);
    else if ("dangerouslySetInnerHTML" !== l1) {
        if (t1) l1 = l1.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if ("href" !== l1 && "list" !== l1 && "form" !== l1 && "tabIndex" !== l1 && "download" !== l1 && l1 in n1) try {
            n1[l1] = null == u1 ? "" : u1;
            break n;
        } catch (n2) {
        }
        "function" == typeof u1 || (null != u1 && (!1 !== u1 || "a" === l1[0] && "r" === l1[1]) ? n1.setAttribute(l1, u1) : n1.removeAttribute(l1));
    }
}
function I(n1) {
    this.l[n1.type + !1](l.event ? l.event(n1) : n1);
}
function T(n1) {
    this.l[n1.type + !0](l.event ? l.event(n1) : n1);
}
function j(n1, u1, i1, t1, o1, r1, f1, e1, c1) {
    var s1, h1, v1, y1, p1, k1, b1, m1, g1, x1, A1, P1 = u1.type;
    if ((void 0) !== u1.constructor) return null;
    null != i1.__h && (c1 = i1.__h, e1 = u1.__e = i1.__e, u1.__h = null, r1 = [
        e1
    ]), (s1 = l.__b) && s1(u1);
    try {
        n: if ("function" == typeof P1) {
            if (m1 = u1.props, g1 = (s1 = P1.contextType) && t1[s1.__c], x1 = s1 ? g1 ? g1.props.value : s1.__ : t1, i1.__c ? b1 = (h1 = u1.__c = i1.__c).__ = h1.__E : ("prototype" in P1 && P1.prototype.render ? u1.__c = h1 = new P1(m1, x1) : (u1.__c = h1 = new _(m1, x1), h1.constructor = P1, h1.render = O), g1 && g1.sub(h1), h1.props = m1, h1.state || (h1.state = {
            }), h1.context = x1, h1.__n = t1, v1 = h1.__d = !0, h1.__h = []), null == h1.__s && (h1.__s = h1.state), null != P1.getDerivedStateFromProps && (h1.__s == h1.state && (h1.__s = a({
            }, h1.__s)), a(h1.__s, P1.getDerivedStateFromProps(m1, h1.__s))), y1 = h1.props, p1 = h1.state, v1) null == P1.getDerivedStateFromProps && null != h1.componentWillMount && h1.componentWillMount(), null != h1.componentDidMount && h1.__h.push(h1.componentDidMount);
            else {
                if (null == P1.getDerivedStateFromProps && m1 !== y1 && null != h1.componentWillReceiveProps && h1.componentWillReceiveProps(m1, x1), !h1.__e && null != h1.shouldComponentUpdate && !1 === h1.shouldComponentUpdate(m1, h1.__s, x1) || u1.__v === i1.__v) {
                    h1.props = m1, h1.state = h1.__s, u1.__v !== i1.__v && (h1.__d = !1), h1.__v = u1, u1.__e = i1.__e, u1.__k = i1.__k, u1.__k.forEach(function(n2) {
                        n2 && (n2.__ = u1);
                    }), h1.__h.length && f1.push(h1);
                    break n;
                }
                null != h1.componentWillUpdate && h1.componentWillUpdate(m1, h1.__s, x1), null != h1.componentDidUpdate && h1.__h.push(function() {
                    h1.componentDidUpdate(y1, p1, k1);
                });
            }
            h1.context = x1, h1.props = m1, h1.state = h1.__s, (s1 = l.__r) && s1(u1), h1.__d = !1, h1.__v = u1, h1.__P = n1, s1 = h1.render(h1.props, h1.state, h1.context), h1.state = h1.__s, null != h1.getChildContext && (t1 = a(a({
            }, t1), h1.getChildContext())), v1 || null == h1.getSnapshotBeforeUpdate || (k1 = h1.getSnapshotBeforeUpdate(y1, p1)), A1 = null != s1 && s1.type === d && null == s1.key ? s1.props.children : s1, w(n1, Array.isArray(A1) ? A1 : [
                A1
            ], u1, i1, t1, o1, r1, f1, e1, c1), h1.base = u1.__e, u1.__h = null, h1.__h.length && f1.push(h1), b1 && (h1.__E = h1.__ = null), h1.__e = !1;
        } else null == r1 && u1.__v === i1.__v ? (u1.__k = i1.__k, u1.__e = i1.__e) : u1.__e = L(i1.__e, u1, i1, t1, o1, r1, f1, c1);
        (s1 = l.diffed) && s1(u1);
    } catch (n2) {
        u1.__v = null, (c1 || null != r1) && (u1.__e = e1, u1.__h = !!c1, r1[r1.indexOf(e1)] = null), l.__e(n2, u1, i1);
    }
}
function z(n1, u1) {
    l.__c && l.__c(u1, n1), n1.some(function(u2) {
        try {
            n1 = u2.__h, u2.__h = [], n1.some(function(n2) {
                n2.call(u2);
            });
        } catch (n2) {
            l.__e(n2, u2.__v);
        }
    });
}
function L(l1, u1, i1, t1, o1, r1, f1, c1) {
    var s1, a1, v1, y1 = i1.props, p1 = u1.props, d1 = u1.type, _1 = 0;
    if ("svg" === d1 && (o1 = !0), null != r1) for(; _1 < r1.length; _1++)if ((s1 = r1[_1]) && (s1 === l1 || (d1 ? s1.localName == d1 : 3 == s1.nodeType))) {
        l1 = s1, r1[_1] = null;
        break;
    }
    if (null == l1) {
        if (null === d1) return document.createTextNode(p1);
        l1 = o1 ? document.createElementNS("http://www.w3.org/2000/svg", d1) : document.createElement(d1, p1.is && p1), r1 = null, c1 = !1;
    }
    if (null === d1) y1 === p1 || c1 && l1.data === p1 || (l1.data = p1);
    else {
        if (r1 = r1 && n.call(l1.childNodes), a1 = (y1 = i1.props || e).dangerouslySetInnerHTML, v1 = p1.dangerouslySetInnerHTML, !c1) {
            if (null != r1) for(y1 = {
            }, _1 = 0; _1 < l1.attributes.length; _1++)y1[l1.attributes[_1].name] = l1.attributes[_1].value;
            (v1 || a1) && (v1 && (a1 && v1.__html == a1.__html || v1.__html === l1.innerHTML) || (l1.innerHTML = v1 && v1.__html || ""));
        }
        if (C(l1, p1, y1, o1, c1), v1) u1.__k = [];
        else if (_1 = u1.props.children, w(l1, Array.isArray(_1) ? _1 : [
            _1
        ], u1, i1, t1, o1 && "foreignObject" !== d1, r1, f1, r1 ? r1[0] : i1.__k && k(i1, 0), c1), null != r1) for(_1 = r1.length; _1--;)null != r1[_1] && h(r1[_1]);
        c1 || ("value" in p1 && (void 0) !== (_1 = p1.value) && (_1 !== l1.value || "progress" === d1 && !_1) && H(l1, "value", _1, y1.value, !1), "checked" in p1 && (void 0) !== (_1 = p1.checked) && _1 !== l1.checked && H(l1, "checked", _1, y1.checked, !1));
    }
    return l1;
}
function M(n1, u1, i1) {
    try {
        "function" == typeof n1 ? n1(u1) : n1.current = u1;
    } catch (n2) {
        l.__e(n2, i1);
    }
}
function N(n1, u1, i1) {
    var t1, o1;
    if (l.unmount && l.unmount(n1), (t1 = n1.ref) && (t1.current && t1.current !== n1.__e || M(t1, null, u1)), null != (t1 = n1.__c)) {
        if (t1.componentWillUnmount) try {
            t1.componentWillUnmount();
        } catch (n2) {
            l.__e(n2, u1);
        }
        t1.base = t1.__P = null;
    }
    if (t1 = n1.__k) for(o1 = 0; o1 < t1.length; o1++)t1[o1] && N(t1[o1], u1, "function" != typeof n1.type);
    i1 || null == n1.__e || h(n1.__e), n1.__e = n1.__d = void 0;
}
function O(n1, l1, u1) {
    return this.constructor(n1, u1);
}
function S(u1, i1, t1) {
    var o1, r1, f1;
    l.__ && l.__(u1, i1), r1 = (o1 = "function" == typeof t1) ? null : t1 && t1.__k || i1.__k, f1 = [], j(i1, u1 = (!o1 && t1 || i1).__k = v(d, null, [
        u1
    ]), r1 || e, e, (void 0) !== i1.ownerSVGElement, !o1 && t1 ? [
        t1
    ] : r1 ? null : i1.firstChild ? n.call(i1.childNodes) : null, f1, !o1 && t1 ? t1 : r1 ? r1.__e : i1.firstChild, o1), z(f1, u1);
}
function q(n1, l1) {
    S(n1, l1, q);
}
function B(l1, u1, i1) {
    var t1, o1, r1, f1 = a({
    }, l1.props);
    for(r1 in u1)"key" == r1 ? t1 = u1[r1] : "ref" == r1 ? o1 = u1[r1] : f1[r1] = u1[r1];
    return arguments.length > 2 && (f1.children = arguments.length > 3 ? n.call(arguments, 2) : i1), y(l1.type, f1, t1 || l1.key, o1 || l1.ref, null);
}
function D(n1, l1) {
    var u1 = {
        __c: l1 = "__cC" + f++,
        __: n1,
        Consumer: function(n2, l2) {
            return n2.children(l2);
        },
        Provider: function(n2) {
            var u2, i1;
            return this.getChildContext || (u2 = [], (i1 = {
            })[l1] = this, this.getChildContext = function() {
                return i1;
            }, this.shouldComponentUpdate = function(n3) {
                this.props.value !== n3.value && u2.some(m);
            }, this.sub = function(n3) {
                u2.push(n3);
                var l2 = n3.componentWillUnmount;
                n3.componentWillUnmount = function() {
                    u2.splice(u2.indexOf(n3), 1), l2 && l2.call(n3);
                };
            }), n2.children;
        }
    };
    return u1.Provider.__ = u1.Consumer.contextType = u1;
}
n = c.slice, l = {
    __e: function(n1, l1) {
        for(var u1, i1, t1; l1 = l1.__;)if ((u1 = l1.__c) && !u1.__) try {
            if ((i1 = u1.constructor) && null != i1.getDerivedStateFromError && (u1.setState(i1.getDerivedStateFromError(n1)), t1 = u1.__d), null != u1.componentDidCatch && (u1.componentDidCatch(n1), t1 = u1.__d), t1) return u1.__E = u1;
        } catch (l2) {
            n1 = l2;
        }
        throw n1;
    }
}, u = 0, i = function(n1) {
    return null != n1 && (void 0) === n1.constructor;
}, _.prototype.setState = function(n1, l1) {
    var u1;
    u1 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = a({
    }, this.state), "function" == typeof n1 && (n1 = n1(a({
    }, u1), this.props)), n1 && a(u1, n1), null != n1 && this.__v && (l1 && this.__h.push(l1), m(this));
}, _.prototype.forceUpdate = function(n1) {
    this.__v && (this.__e = !0, n1 && this.__h.push(n1), m(this));
}, _.prototype.render = d, t = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"e240J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createElement", ()=>_preact.createElement
);
parcelHelpers.export(exports, "createContext", ()=>_preact.createContext
);
parcelHelpers.export(exports, "createRef", ()=>_preact.createRef
);
parcelHelpers.export(exports, "Fragment", ()=>_preact.Fragment
);
parcelHelpers.export(exports, "Component", ()=>_preact.Component
);
parcelHelpers.export(exports, "version", ()=>X
);
parcelHelpers.export(exports, "Children", ()=>k
);
parcelHelpers.export(exports, "render", ()=>z
);
parcelHelpers.export(exports, "hydrate", ()=>B
);
parcelHelpers.export(exports, "unmountComponentAtNode", ()=>rn
);
parcelHelpers.export(exports, "createPortal", ()=>W
);
parcelHelpers.export(exports, "createFactory", ()=>nn
);
parcelHelpers.export(exports, "cloneElement", ()=>en
);
parcelHelpers.export(exports, "isValidElement", ()=>tn
);
parcelHelpers.export(exports, "findDOMNode", ()=>un
);
parcelHelpers.export(exports, "PureComponent", ()=>E
);
parcelHelpers.export(exports, "memo", ()=>g
);
parcelHelpers.export(exports, "forwardRef", ()=>x
);
parcelHelpers.export(exports, "flushSync", ()=>ln
);
parcelHelpers.export(exports, "unstable_batchedUpdates", ()=>on
);
parcelHelpers.export(exports, "StrictMode", ()=>fn
);
parcelHelpers.export(exports, "Suspense", ()=>L
);
parcelHelpers.export(exports, "SuspenseList", ()=>M
);
parcelHelpers.export(exports, "lazy", ()=>F
);
parcelHelpers.export(exports, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", ()=>Q
);
var _hooks = require("preact/hooks");
var _preact = require("preact");
parcelHelpers.exportAll(_hooks, exports);
function S(n, t) {
    for(var e in t)n[e] = t[e];
    return n;
}
function C(n, t) {
    for(var e in n)if ("__source" !== e && !(e in t)) return !0;
    for(var r in t)if ("__source" !== r && n[r] !== t[r]) return !0;
    return !1;
}
function E(n) {
    this.props = n;
}
function g(n, t) {
    function e(n1) {
        var e1 = this.props.ref, r = e1 == n1.ref;
        return !r && e1 && (e1.call ? e1(null) : e1.current = null), t ? !t(this.props, n1) || !r : C(this.props, n1);
    }
    function r(t1) {
        return this.shouldComponentUpdate = e, _preact.createElement(n, t1);
    }
    return r.displayName = "Memo(" + (n.displayName || n.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
}
(E.prototype = new _preact.Component).isPureReactComponent = !0, E.prototype.shouldComponentUpdate = function(n, t) {
    return C(this.props, n) || C(this.state, t);
};
var w = _preact.options.__b;
_preact.options.__b = function(n) {
    n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), w && w(n);
};
var R = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function x(n) {
    function t(t1, e) {
        var r = S({
        }, t1);
        return delete r.ref, n(r, (e = t1.ref || e) && ("object" != typeof e || "current" in e) ? e : null);
    }
    return t.$$typeof = R, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}
var N = function(n, t) {
    return null == n ? null : _preact.toChildArray(_preact.toChildArray(n).map(t));
}, k = {
    map: N,
    forEach: N,
    count: function(n) {
        return n ? _preact.toChildArray(n).length : 0;
    },
    only: function(n) {
        var t = _preact.toChildArray(n);
        if (1 !== t.length) throw "Children.only";
        return t[0];
    },
    toArray: _preact.toChildArray
}, A = _preact.options.__e;
_preact.options.__e = function(n, t, e) {
    if (n.then) for(var r, u = t; u = u.__;)if ((r = u.__c) && r.__c) return null == t.__e && (t.__e = e.__e, t.__k = e.__k), r.__c(n, t);
    A(n, t, e);
};
var O = _preact.options.unmount;
function L() {
    this.__u = 0, this.t = null, this.__b = null;
}
function U(n) {
    var t = n.__.__c;
    return t && t.__e && t.__e(n);
}
function F(n) {
    var t, e, r;
    function u(u1) {
        if (t || (t = n()).then(function(n1) {
            e = n1.default || n1;
        }, function(n1) {
            r = n1;
        }), r) throw r;
        if (!e) throw t;
        return _preact.createElement(e, u1);
    }
    return u.displayName = "Lazy", u.__f = !0, u;
}
function M() {
    this.u = null, this.o = null;
}
_preact.options.unmount = function(n) {
    var t = n.__c;
    t && t.__R && t.__R(), t && !0 === n.__h && (n.type = null), O && O(n);
}, (L.prototype = new _preact.Component).__c = function(n, t) {
    var e = t.__c, r = this;
    null == r.t && (r.t = []), r.t.push(e);
    var u = U(r.__v), o = !1, i = function() {
        o || (o = !0, e.__R = null, u ? u(l) : l());
    };
    e.__R = i;
    var l = function() {
        if (!--r.__u) {
            if (r.state.__e) {
                var n1 = r.state.__e;
                r.__v.__k[0] = (function n2(t1, e1, r1) {
                    return t1 && (t1.__v = null, t1.__k = t1.__k && t1.__k.map(function(t2) {
                        return n2(t2, e1, r1);
                    }), t1.__c && t1.__c.__P === e1 && (t1.__e && r1.insertBefore(t1.__e, t1.__d), t1.__c.__e = !0, t1.__c.__P = r1)), t1;
                })(n1, n1.__c.__P, n1.__c.__O);
            }
            var t1;
            for(r.setState({
                __e: r.__b = null
            }); t1 = r.t.pop();)t1.forceUpdate();
        }
    }, f = !0 === t.__h;
    (r.__u++) || f || r.setState({
        __e: r.__b = r.__v.__k[0]
    }), n.then(i, i);
}, L.prototype.componentWillUnmount = function() {
    this.t = [];
}, L.prototype.render = function(n2, t2) {
    if (this.__b) {
        if (this.__v.__k) {
            var e = document.createElement("div"), r = this.__v.__k[0].__c;
            this.__v.__k[0] = (function n3(t3, e1, r1) {
                return t3 && (t3.__c && t3.__c.__H && (t3.__c.__H.__.forEach(function(n4) {
                    "function" == typeof n4.__c && n4.__c();
                }), t3.__c.__H = null), null != (t3 = S({
                }, t3)).__c && (t3.__c.__P === r1 && (t3.__c.__P = e1), t3.__c = null), t3.__k = t3.__k && t3.__k.map(function(t4) {
                    return n3(t4, e1, r1);
                })), t3;
            })(this.__b, e, r.__O = r.__P);
        }
        this.__b = null;
    }
    var u = t2.__e && _preact.createElement(_preact.Fragment, null, n2.fallback);
    return u && (u.__h = null), [
        _preact.createElement(_preact.Fragment, null, t2.__e ? null : n2.children),
        u
    ];
};
var T = function(n2, t2, e) {
    if ((++e[1]) === e[0] && n2.o.delete(t2), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.o.size)) for(e = n2.u; e;){
        for(; e.length > 3;)e.pop()();
        if (e[1] < e[0]) break;
        n2.u = e = e[2];
    }
};
function D(n2) {
    return this.getChildContext = function() {
        return n2.context;
    }, n2.children;
}
function I(n2) {
    var t2 = this, e = n2.i;
    t2.componentWillUnmount = function() {
        _preact.render(null, t2.l), t2.l = null, t2.i = null;
    }, t2.i && t2.i !== e && t2.componentWillUnmount(), n2.__v ? (t2.l || (t2.i = e, t2.l = {
        nodeType: 1,
        parentNode: e,
        childNodes: [],
        appendChild: function(n3) {
            this.childNodes.push(n3), t2.i.appendChild(n3);
        },
        insertBefore: function(n3, e1) {
            this.childNodes.push(n3), t2.i.appendChild(n3);
        },
        removeChild: function(n3) {
            this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), t2.i.removeChild(n3);
        }
    }), _preact.render(_preact.createElement(D, {
        context: t2.context
    }, n2.__v), t2.l)) : t2.l && t2.componentWillUnmount();
}
function W(n2, t2) {
    return _preact.createElement(I, {
        __v: n2,
        i: t2
    });
}
(M.prototype = new _preact.Component).__e = function(n2) {
    var t2 = this, e = U(t2.__v), r = t2.o.get(n2);
    return r[0]++, function(u) {
        var o = function() {
            t2.props.revealOrder ? (r.push(u), T(t2, n2, r)) : u();
        };
        e ? e(o) : o();
    };
}, M.prototype.render = function(n2) {
    this.u = null, this.o = new Map;
    var t2 = _preact.toChildArray(n2.children);
    n2.revealOrder && "b" === n2.revealOrder[0] && t2.reverse();
    for(var e = t2.length; e--;)this.o.set(t2[e], this.u = [
        1,
        0,
        this.u
    ]);
    return n2.children;
}, M.prototype.componentDidUpdate = M.prototype.componentDidMount = function() {
    var n2 = this;
    this.o.forEach(function(t2, e) {
        T(n2, e, t2);
    });
};
var j = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, P = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, V = function(n2) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n2);
};
function z(n2, t2, e) {
    return null == t2.__k && (t2.textContent = ""), _preact.render(n2, t2), "function" == typeof e && e(), n2 ? n2.__c : null;
}
function B(n2, t2, e) {
    return _preact.hydrate(n2, t2), "function" == typeof e && e(), n2 ? n2.__c : null;
}
_preact.Component.prototype.isReactComponent = {
}, [
    "componentWillMount",
    "componentWillReceiveProps",
    "componentWillUpdate"
].forEach(function(n2) {
    Object.defineProperty(_preact.Component.prototype, n2, {
        configurable: !0,
        get: function() {
            return this["UNSAFE_" + n2];
        },
        set: function(t2) {
            Object.defineProperty(this, n2, {
                configurable: !0,
                writable: !0,
                value: t2
            });
        }
    });
});
var H = _preact.options.event;
function Z() {
}
function Y() {
    return this.cancelBubble;
}
function $() {
    return this.defaultPrevented;
}
_preact.options.event = function(n2) {
    return H && (n2 = H(n2)), n2.persist = Z, n2.isPropagationStopped = Y, n2.isDefaultPrevented = $, n2.nativeEvent = n2;
};
var q, G = {
    configurable: !0,
    get: function() {
        return this.class;
    }
}, J = _preact.options.vnode;
_preact.options.vnode = function(n2) {
    var t2 = n2.type, e = n2.props, r = e;
    if ("string" == typeof t2) {
        for(var u in r = {
        }, e){
            var o = e[u];
            "value" === u && "defaultValue" in e && null == o || ("defaultValue" === u && "value" in e && null == e.value ? u = "value" : "download" === u && !0 === o ? o = "" : /ondoubleclick/i.test(u) ? u = "ondblclick" : /^onchange(textarea|input)/i.test(u + t2) && !V(e.type) ? u = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(u) ? u = u.toLowerCase() : P.test(u) ? u = u.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === o && (o = void 0), r[u] = o);
        }
        "select" == t2 && r.multiple && Array.isArray(r.value) && (r.value = _preact.toChildArray(e.children).forEach(function(n3) {
            n3.props.selected = -1 != r.value.indexOf(n3.props.value);
        })), "select" == t2 && null != r.defaultValue && (r.value = _preact.toChildArray(e.children).forEach(function(n3) {
            n3.props.selected = r.multiple ? -1 != r.defaultValue.indexOf(n3.props.value) : r.defaultValue == n3.props.value;
        })), n2.props = r;
    }
    t2 && e.class != e.className && (G.enumerable = "className" in e, null != e.className && (r.class = e.className), Object.defineProperty(r, "className", G)), n2.$$typeof = j, J && J(n2);
};
var K = _preact.options.__r;
_preact.options.__r = function(n2) {
    K && K(n2), q = n2.__c;
};
var Q = {
    ReactCurrentDispatcher: {
        current: {
            readContext: function(n2) {
                return q.__n[n2.__c].props.value;
            }
        }
    }
}, X = "17.0.2";
function nn(n2) {
    return _preact.createElement.bind(null, n2);
}
function tn(n2) {
    return !!n2 && n2.$$typeof === j;
}
function en(n2) {
    return tn(n2) ? _preact.cloneElement.apply(null, arguments) : n2;
}
function rn(n2) {
    return !!n2.__k && (_preact.render(null, n2), !0);
}
function un(n2) {
    return n2 && (n2.base || 1 === n2.nodeType && n2) || null;
}
var on = function(n2, t2) {
    return n2(t2);
}, ln = function(n2, t2) {
    return n2(t2);
}, fn = _preact.Fragment;
exports.default = {
    useState: _hooks.useState,
    useReducer: _hooks.useReducer,
    useEffect: _hooks.useEffect,
    useLayoutEffect: _hooks.useLayoutEffect,
    useRef: _hooks.useRef,
    useImperativeHandle: _hooks.useImperativeHandle,
    useMemo: _hooks.useMemo,
    useCallback: _hooks.useCallback,
    useContext: _hooks.useContext,
    useDebugValue: _hooks.useDebugValue,
    version: "17.0.2",
    Children: k,
    render: z,
    hydrate: B,
    unmountComponentAtNode: rn,
    createPortal: W,
    createElement: _preact.createElement,
    createContext: _preact.createContext,
    createFactory: nn,
    cloneElement: en,
    createRef: _preact.createRef,
    Fragment: _preact.Fragment,
    isValidElement: tn,
    findDOMNode: un,
    Component: _preact.Component,
    PureComponent: E,
    memo: g,
    forwardRef: x,
    flushSync: ln,
    unstable_batchedUpdates: on,
    StrictMode: _preact.Fragment,
    Suspense: L,
    SuspenseList: M,
    lazy: F,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Q
};

},{"preact/hooks":"ltmSF","preact":"9MgUs","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"ltmSF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useState", ()=>l
);
parcelHelpers.export(exports, "useReducer", ()=>p
);
parcelHelpers.export(exports, "useEffect", ()=>y
);
parcelHelpers.export(exports, "useLayoutEffect", ()=>h
);
parcelHelpers.export(exports, "useRef", ()=>s
);
parcelHelpers.export(exports, "useImperativeHandle", ()=>_
);
parcelHelpers.export(exports, "useMemo", ()=>d
);
parcelHelpers.export(exports, "useCallback", ()=>A
);
parcelHelpers.export(exports, "useContext", ()=>F
);
parcelHelpers.export(exports, "useDebugValue", ()=>T
);
parcelHelpers.export(exports, "useErrorBoundary", ()=>q
);
var _preact = require("preact");
var t, u, r1, o = 0, i = [], c = _preact.options.__b, f = _preact.options.__r, e = _preact.options.diffed, a = _preact.options.__c, v = _preact.options.unmount;
function m(t1, r1) {
    _preact.options.__h && _preact.options.__h(u, t1, o || r1), o = 0;
    var i1 = u.__H || (u.__H = {
        __: [],
        __h: []
    });
    return t1 >= i1.__.length && i1.__.push({
    }), i1.__[t1];
}
function l(n) {
    return o = 1, p(w, n);
}
function p(n, r1, o1) {
    var i1 = m(t++, 2);
    return i1.t = n, i1.__c || (i1.__ = [
        o1 ? o1(r1) : w(void 0, r1),
        function(n1) {
            var t1 = i1.t(i1.__[0], n1);
            i1.__[0] !== t1 && (i1.__ = [
                t1,
                i1.__[1]
            ], i1.__c.setState({
            }));
        }
    ], i1.__c = u), i1.__;
}
function y(r1, o1) {
    var i1 = m(t++, 3);
    !_preact.options.__s && k(i1.__H, o1) && (i1.__ = r1, i1.__H = o1, u.__H.__h.push(i1));
}
function h(r1, o1) {
    var i1 = m(t++, 4);
    !_preact.options.__s && k(i1.__H, o1) && (i1.__ = r1, i1.__H = o1, u.__h.push(i1));
}
function s(n) {
    return o = 5, d(function() {
        return {
            current: n
        };
    }, []);
}
function _(n, t1, u1) {
    o = 6, h(function() {
        "function" == typeof n ? n(t1()) : n && (n.current = t1());
    }, null == u1 ? u1 : u1.concat(n));
}
function d(n, u1) {
    var r1 = m(t++, 7);
    return k(r1.__H, u1) && (r1.__ = n(), r1.__H = u1, r1.__h = n), r1.__;
}
function A(n, t1) {
    return o = 8, d(function() {
        return n;
    }, t1);
}
function F(n) {
    var r1 = u.context[n.__c], o1 = m(t++, 9);
    return o1.c = n, r1 ? (null == o1.__ && (o1.__ = !0, r1.sub(u)), r1.props.value) : n.__;
}
function T(t1, u1) {
    _preact.options.useDebugValue && _preact.options.useDebugValue(u1 ? u1(t1) : t1);
}
function q(n) {
    var r1 = m(t++, 10), o1 = l();
    return r1.__ = n, u.componentDidCatch || (u.componentDidCatch = function(n1) {
        r1.__ && r1.__(n1), o1[1](n1);
    }), [
        o1[0],
        function() {
            o1[1](void 0);
        }
    ];
}
function x() {
    i.forEach(function(t1) {
        if (t1.__P) try {
            t1.__H.__h.forEach(g), t1.__H.__h.forEach(j), t1.__H.__h = [];
        } catch (u1) {
            t1.__H.__h = [], _preact.options.__e(u1, t1.__v);
        }
    }), i = [];
}
_preact.options.__b = function(n) {
    u = null, c && c(n);
}, _preact.options.__r = function(n) {
    f && f(n), t = 0;
    var r1 = (u = n.__c).__H;
    r1 && (r1.__h.forEach(g), r1.__h.forEach(j), r1.__h = []);
}, _preact.options.diffed = function(t1) {
    e && e(t1);
    var o1 = t1.__c;
    o1 && o1.__H && o1.__H.__h.length && (1 !== i.push(o1) && r1 === _preact.options.requestAnimationFrame || ((r1 = _preact.options.requestAnimationFrame) || function(n) {
        var t2, u1 = function() {
            clearTimeout(r2), b && cancelAnimationFrame(t2), setTimeout(n);
        }, r2 = setTimeout(u1, 100);
        b && (t2 = requestAnimationFrame(u1));
    })(x)), u = void 0;
}, _preact.options.__c = function(t1, u1) {
    u1.some(function(t2) {
        try {
            t2.__h.forEach(g), t2.__h = t2.__h.filter(function(n) {
                return !n.__ || j(n);
            });
        } catch (r2) {
            u1.some(function(n) {
                n.__h && (n.__h = []);
            }), u1 = [], _preact.options.__e(r2, t2.__v);
        }
    }), a && a(t1, u1);
}, _preact.options.unmount = function(t1) {
    v && v(t1);
    var u1 = t1.__c;
    if (u1 && u1.__H) try {
        u1.__H.__.forEach(g);
    } catch (t2) {
        _preact.options.__e(t2, u1.__v);
    }
};
var b = "function" == typeof requestAnimationFrame;
function g(n) {
    var t1 = u;
    "function" == typeof n.__c && n.__c(), u = t1;
}
function j(n) {
    var t1 = u;
    n.__c = n.__(), u = t1;
}
function k(n, t1) {
    return !n || n.length !== t1.length || t1.some(function(t2, u1) {
        return t2 !== n[u1];
    });
}
function w(n, t1) {
    return "function" == typeof t1 ? t1(n) : t1;
}

},{"preact":"9MgUs","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"9hPNm":[function(require,module,exports) {
module.exports = Promise.all([
    require("./loaders/browser/css-loader")(require('./bundle-url').getBundleURL() + "App.6bf7e76c.css").catch((err)=>{
        delete module.bundle.cache[module.id];
        throw err;
    }),
    require("./loaders/browser/js-loader")(require('./bundle-url').getBundleURL() + "App.9db86c10.js").catch((err)=>{
        delete module.bundle.cache[module.id];
        throw err;
    })
]).then(()=>module.bundle.root('7rnZj')
);

},{"./loaders/browser/css-loader":"5DsmD","./bundle-url":"CPl0u","./loaders/browser/js-loader":"dBxKK"}],"5DsmD":[function(require,module,exports) {
const cacheLoader = require('../../cacheLoader');
module.exports = cacheLoader(function loadCSSBundle(bundle) {
    return new Promise(function(resolve, reject) {
        // Don't insert the same link element twice (e.g. if it was already in the HTML)
        let existingLinks = document.getElementsByTagName('link');
        let isCurrentBundle = function(link) {
            return link.href === bundle && link.rel.indexOf('stylesheet') > -1;
        };
        if ([].concat(existingLinks).some(isCurrentBundle)) {
            resolve();
            return;
        }
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = bundle;
        link.onerror = function(e) {
            link.onerror = link.onload = null;
            link.remove();
            reject(e);
        };
        link.onload = function() {
            link.onerror = link.onload = null;
            resolve();
        };
        document.getElementsByTagName('head')[0].appendChild(link);
    });
});

},{"../../cacheLoader":"4lPz2"}],"4lPz2":[function(require,module,exports) {
"use strict";
let cachedBundles = {
};
let cachedPreloads = {
};
let cachedPrefetches = {
};
function getCache(type) {
    switch(type){
        case 'preload':
            return cachedPreloads;
        case 'prefetch':
            return cachedPrefetches;
        default:
            return cachedBundles;
    }
}
module.exports = function(loader, type) {
    return function(bundle) {
        let cache = getCache(type);
        if (cache[bundle]) return cache[bundle];
        return cache[bundle] = loader.apply(null, arguments).catch(function(e) {
            delete cache[bundle];
            throw e;
        });
    };
};

},{}],"CPl0u":[function(require,module,exports) {
"use strict";
/* globals document:readonly */ var bundleURL = null;
function getBundleURLCached() {
    if (!bundleURL) bundleURL = getBundleURL();
    return bundleURL;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (matches) return getBaseURL(matches[0]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"dBxKK":[function(require,module,exports) {
const cacheLoader = require('../../cacheLoader');
module.exports = cacheLoader(function loadJSBundle(bundle) {
    return new Promise(function(resolve, reject) {
        // Don't insert the same script twice (e.g. if it was already in the HTML)
        let existingScripts = document.getElementsByTagName('script');
        let isCurrentBundle = function(script) {
            return script.src === bundle;
        };
        if ([].concat(existingScripts).some(isCurrentBundle)) {
            resolve();
            return;
        }
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.src = bundle;
        script.onerror = function(e) {
            script.onerror = script.onload = null;
            script.remove();
            reject(e);
        };
        script.onload = function() {
            script.onerror = script.onload = null;
            resolve();
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    });
});

},{"../../cacheLoader":"4lPz2"}],"lrnyi":[function(require,module,exports) {
module.exports = require("./loaders/browser/js-loader")(require('./bundle-url').getBundleURL() + "debug.module.82ab1f34.js").catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root('kI1oa')
);

},{"./loaders/browser/js-loader":"dBxKK","./bundle-url":"CPl0u"}]},["hur8T","htFGz"], "htFGz", "parcelRequirecdaa")

