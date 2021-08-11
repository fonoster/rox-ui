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
})({"bkLlV":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "f2c9685dad4863d1";
module.bundle.HMR_BUNDLE_ID = "1c4fd5349db86c10"; // @flow
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

},{}],"7rnZj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "App", ()=>App
);
var _preact = require("preact");
var _hooks = require("preact/hooks");
var _eventBus = require("../services/event-bus");
var _box = require("../ui/components/box");
var _launcher = require("../ui/components/launcher");
var _router = require("../ui/router");
const App = ()=>{
    const [isOpen, setOpen] = _hooks.useState(false);
    const setVisibility = ()=>{
        setOpen((prevOpen)=>{
            _eventBus.visibilityEvent.dispatch({
                isOpen: !prevOpen
            });
            return !prevOpen;
        });
    };
    const params = {
        isOpen,
        setVisibility
    };
    return(/*#__PURE__*/ _preact.h(_preact.Fragment, {
        __source: {
            fileName: "apps/web/src/bootstrap/App.tsx",
            lineNumber: 30
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h(_box.BoxPortal, {
        ...params,
        __source: {
            fileName: "apps/web/src/bootstrap/App.tsx",
            lineNumber: 31
        },
        __self: undefined
    }, isOpen && /*#__PURE__*/ _preact.h(_router.Router, {
        __source: {
            fileName: "apps/web/src/bootstrap/App.tsx",
            lineNumber: 31
        },
        __self: undefined
    })), /*#__PURE__*/ _preact.h(_launcher.LauncherPortal, {
        ...params,
        __source: {
            fileName: "apps/web/src/bootstrap/App.tsx",
            lineNumber: 32
        },
        __self: undefined
    })));
};
exports.default = App;

},{"preact":"9MgUs","preact/hooks":"ltmSF","../services/event-bus":"4PcGq","../ui/components/box":"hrDmX","../ui/components/launcher":"3kEsA","../ui/router":"6NGGi","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"hrDmX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _boxPortal = require("./BoxPortal");
parcelHelpers.exportAll(_boxPortal, exports);

},{"./BoxPortal":"bMPhN","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"bMPhN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BoxPortal", ()=>BoxPortal
);
var _preact = require("preact");
var _assistantModuleScss = require("../../styles/portals/assistant.module.scss");
var _portal = require("../portal");
var _boxFooter = require("./BoxFooter");
var _boxHeader = require("./BoxHeader");
const BoxPortal = ({ isOpen , setVisibility , ...props })=>/*#__PURE__*/ _preact.h("div", {
        className: `${_assistantModuleScss['rox-assistant']} ${isOpen ? _assistantModuleScss['rox-assistant--open'] : ''}`,
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxPortal.tsx",
            lineNumber: 14
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h(_portal.Portal, {
        id: _assistantModuleScss['rox-assistant'],
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxPortal.tsx",
            lineNumber: 19
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("div", {
        className: "rox-assistant",
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxPortal.tsx",
            lineNumber: 20
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h(_boxHeader.BoxHeader, {
        setVisibility,
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxPortal.tsx",
            lineNumber: 21
        },
        __self: undefined
    }), /*#__PURE__*/ _preact.h("div", {
        className: "rox-assistant-content",
        ...props,
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxPortal.tsx",
            lineNumber: 22
        },
        __self: undefined
    }), /*#__PURE__*/ _preact.h(_boxFooter.BoxFooter, {
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxPortal.tsx",
            lineNumber: 23
        },
        __self: undefined
    }))))
;

},{"../../styles/portals/assistant.module.scss":"fzCXc","../portal":"6nyrY","./BoxFooter":"ihxPU","./BoxHeader":"78ux5","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"fzCXc":[function(require,module,exports) {
module.exports["rox-assistant"] = "_rox-assistant_b4e30f";
module.exports["rox-assistant--open"] = "_rox-assistant--open_b4e30f";
module.exports["loaded"] = "_loaded_b4e30f";

},{}],"6nyrY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _portal = require("./Portal");
parcelHelpers.exportAll(_portal, exports);

},{"./Portal":"20z1C","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"20z1C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Portal", ()=>Portal
);
var _preact = require("preact");
var _compat = require("preact/compat");
var _hooks = require("preact/hooks");
var _portalHead = require("./PortalHead");
const Portal = ({ children , ...props })=>{
    const [isMounted, setMounted] = _hooks.useState(false);
    const [ref, setRef] = _hooks.useState(null);
    const doc = ref?.contentDocument;
    const renderPortal = ()=>{
        if (!doc || !isMounted) return null;
        const head = _compat.createPortal(/*#__PURE__*/ _preact.h(_portalHead.PortalHead, {
            title: props.title,
            __source: {
                fileName: "apps/web/src/ui/components/portal/Portal.tsx",
                lineNumber: 19
            },
            __self: undefined
        }), doc?.head);
        const body = _compat.createPortal(children, doc?.body);
        return [
            head,
            body
        ];
    };
    return(/*#__PURE__*/ _preact.h("iframe", {
        tabIndex: 0,
        ...props,
        ref: setRef,
        onLoad: ()=>setMounted(true)
        ,
        __source: {
            fileName: "apps/web/src/ui/components/portal/Portal.tsx",
            lineNumber: 26
        },
        __self: undefined
    }, renderPortal()));
};

},{"preact/compat":"e240J","preact/hooks":"ltmSF","./PortalHead":"cX6mv","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"cX6mv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PortalHead", ()=>PortalHead
);
var _preact = require("preact");
var _config = require("../../../config");
var _data = require("../../../data");
const PortalHead = ({ title  })=>/*#__PURE__*/ _preact.h(_preact.Fragment, {
        __source: {
            fileName: "apps/web/src/ui/components/portal/PortalHead.tsx",
            lineNumber: 11
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("title", {
        __source: {
            fileName: "apps/web/src/ui/components/portal/PortalHead.tsx",
            lineNumber: 12
        },
        __self: undefined
    }, title ?? _data.MESSAGES.ASSISTANT_TITLE), /*#__PURE__*/ _preact.h("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no",
        __source: {
            fileName: "apps/web/src/ui/components/portal/PortalHead.tsx",
            lineNumber: 14
        },
        __self: undefined
    }), /*#__PURE__*/ _preact.h("meta", {
        name: "author",
        content: "Fonoster",
        __source: {
            fileName: "apps/web/src/ui/components/portal/PortalHead.tsx",
            lineNumber: 18
        },
        __self: undefined
    }), /*#__PURE__*/ _preact.h("meta", {
        name: "copyright",
        content: "Copyright (C) 2021 by Fonoster Inc. All Rights Reserved.",
        __source: {
            fileName: "apps/web/src/ui/components/portal/PortalHead.tsx",
            lineNumber: 19
        },
        __self: undefined
    }), /*#__PURE__*/ _preact.h("link", {
        rel: "stylesheet",
        href: _config.STYLESHEET,
        __source: {
            fileName: "apps/web/src/ui/components/portal/PortalHead.tsx",
            lineNumber: 24
        },
        __self: undefined
    }))
;

},{"preact":"9MgUs","../../../config":"8fM9J","../../../data":"djiGU","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"ihxPU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BoxFooter", ()=>BoxFooter
);
var _preact = require("preact");
const BoxFooter = ()=>/*#__PURE__*/ _preact.h("div", {
        className: "rox-assistant-footer",
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxFooter.tsx",
            lineNumber: 4
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("p", {
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxFooter.tsx",
            lineNumber: 5
        },
        __self: undefined
    }, "from ", /*#__PURE__*/ _preact.h("strong", {
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxFooter.tsx",
            lineNumber: 6
        },
        __self: undefined
    }, "Fonoster")))
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"78ux5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BoxHeader", ()=>BoxHeader
);
var _preact = require("preact");
var _data = require("../../../data");
var _svg = require("../svg");
const BoxHeader = ({ setVisibility  })=>/*#__PURE__*/ _preact.h("div", {
        className: "rox-assistant-header",
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxHeader.tsx",
            lineNumber: 8
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("h1", {
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxHeader.tsx",
            lineNumber: 9
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h(_svg.FonosterLogo, {
        bgColor: "#4746D4",
        color: "#fff",
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxHeader.tsx",
            lineNumber: 10
        },
        __self: undefined
    }), /*#__PURE__*/ _preact.h("span", {
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxHeader.tsx",
            lineNumber: 11
        },
        __self: undefined
    }, _data.MESSAGES.ASSISTANT_TITLE)), /*#__PURE__*/ _preact.h("div", {
        className: "rox-assistant-actions",
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxHeader.tsx",
            lineNumber: 13
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("button", {
        className: "close",
        onClick: setVisibility,
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxHeader.tsx",
            lineNumber: 14
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h(_svg.CloseIcon, {
        __source: {
            fileName: "apps/web/src/ui/components/box/BoxHeader.tsx",
            lineNumber: 15
        },
        __self: undefined
    }))))
;

},{"../../../data":"djiGU","../svg":"hUgBd","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"hUgBd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _close = require("./Close");
parcelHelpers.exportAll(_close, exports);
var _fonosterLogo = require("./FonosterLogo");
parcelHelpers.exportAll(_fonosterLogo, exports);

},{"./Close":"5A4G9","./FonosterLogo":"7ALJ3","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"5A4G9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CloseIcon", ()=>CloseIcon
);
var _preact = require("preact");
const CloseIcon = ({ color ='#565757'  })=>/*#__PURE__*/ _preact.h("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "11",
        height: "11",
        viewBox: "0 0 11 11",
        transform: "rotate(45)",
        __source: {
            fileName: "apps/web/src/ui/components/svg/Close.tsx",
            lineNumber: 6
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("g", {
        transform: "translate(4.5)",
        fill: color,
        stroke: color,
        strokeWidth: "1",
        __source: {
            fileName: "apps/web/src/ui/components/svg/Close.tsx",
            lineNumber: 13
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("rect", {
        width: "2",
        height: "11",
        stroke: "none",
        __source: {
            fileName: "apps/web/src/ui/components/svg/Close.tsx",
            lineNumber: 14
        },
        __self: undefined
    }), /*#__PURE__*/ _preact.h("rect", {
        x: "0.5",
        y: "0.5",
        width: "1",
        height: "10",
        fill: "none",
        __source: {
            fileName: "apps/web/src/ui/components/svg/Close.tsx",
            lineNumber: 15
        },
        __self: undefined
    })), /*#__PURE__*/ _preact.h("g", {
        transform: "translate(11 4.5) rotate(90)",
        fill: color,
        stroke: color,
        strokeWidth: "1",
        __source: {
            fileName: "apps/web/src/ui/components/svg/Close.tsx",
            lineNumber: 17
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("rect", {
        width: "2",
        height: "11",
        stroke: "none",
        __source: {
            fileName: "apps/web/src/ui/components/svg/Close.tsx",
            lineNumber: 23
        },
        __self: undefined
    }), /*#__PURE__*/ _preact.h("rect", {
        x: "0.5",
        y: "0.5",
        width: "1",
        height: "10",
        fill: "none",
        __source: {
            fileName: "apps/web/src/ui/components/svg/Close.tsx",
            lineNumber: 24
        },
        __self: undefined
    })))
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"7ALJ3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FonosterLogo", ()=>FonosterLogo
);
var _preact = require("preact");
const FonosterLogo = ({ color , bgColor  })=>/*#__PURE__*/ _preact.h("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24.041",
        height: "30.135",
        viewBox: "0 0 24.041 30.135",
        __source: {
            fileName: "apps/web/src/ui/components/svg/FonosterLogo.tsx",
            lineNumber: 6
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("g", {
        transform: "translate(-1214 -731)",
        __source: {
            fileName: "apps/web/src/ui/components/svg/FonosterLogo.tsx",
            lineNumber: 12
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("g", {
        transform: "translate(1214 731)",
        __source: {
            fileName: "apps/web/src/ui/components/svg/FonosterLogo.tsx",
            lineNumber: 13
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("path", {
        d: "M11.12,22.242v6.1l12.02-6.1Z",
        transform: "translate(0.899 1.798)",
        fill: bgColor ?? '#f5f5f5',
        __source: {
            fileName: "apps/web/src/ui/components/svg/FonosterLogo.tsx",
            lineNumber: 14
        },
        __self: undefined
    }), /*#__PURE__*/ _preact.h("path", {
        d: "M0,0H24.041V24.041H0Z",
        fill: bgColor ?? '#fff',
        __source: {
            fileName: "apps/web/src/ui/components/svg/FonosterLogo.tsx",
            lineNumber: 19
        },
        __self: undefined
    })), /*#__PURE__*/ _preact.h("path", {
        d: "M10.134,1.689A12.592,12.592,0,0,0,6.249,2.3V4.915a.851.851,0,0,1-.473.76A9.721,9.721,0,0,0,3.53,7.237a.829.829,0,0,1-.591.236.842.842,0,0,1-.6-.245L.245,5.134A.808.808,0,0,1,0,4.543a.842.842,0,0,1,.245-.6,14.37,14.37,0,0,1,19.778,0,.856.856,0,0,1,0,1.2L17.928,7.237a.842.842,0,0,1-.6.245.867.867,0,0,1-.591-.236,9.518,9.518,0,0,0-2.255-1.562.841.841,0,0,1-.473-.76V2.305A12.258,12.258,0,0,0,10.134,1.689Z",
        transform: "matrix(-0.602, -0.799, 0.799, -0.602, 1229.11, 754.051)",
        fill: color ?? '#4746d4',
        __source: {
            fileName: "apps/web/src/ui/components/svg/FonosterLogo.tsx",
            lineNumber: 21
        },
        __self: undefined
    })))
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"3kEsA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _launcherPortal = require("./LauncherPortal");
parcelHelpers.exportAll(_launcherPortal, exports);

},{"./LauncherPortal":"1BfwY","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"1BfwY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LauncherPortal", ()=>LauncherPortal
);
var _preact = require("preact");
var _data = require("../../../data");
var _launcherModuleScss = require("../../styles/portals/launcher.module.scss");
var _floatingButton = require("../floating-button");
var _portal = require("../portal");
var _svg = require("../svg");
const LauncherPortal = ({ isOpen , setVisibility  })=>/*#__PURE__*/ _preact.h("div", {
        className: _launcherModuleScss['rox-launcher'],
        __source: {
            fileName: "apps/web/src/ui/components/launcher/LauncherPortal.tsx",
            lineNumber: 11
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h(_portal.Portal, {
        id: _launcherModuleScss['rox-launcher'],
        title: _data.MESSAGES.LAUNCHER_TITLE,
        __source: {
            fileName: "apps/web/src/ui/components/launcher/LauncherPortal.tsx",
            lineNumber: 12
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h("div", {
        className: "button__container",
        __source: {
            fileName: "apps/web/src/ui/components/launcher/LauncherPortal.tsx",
            lineNumber: 13
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h(_floatingButton.FloatingButton, {
        onClick: setVisibility,
        disabled: isOpen,
        __source: {
            fileName: "apps/web/src/ui/components/launcher/LauncherPortal.tsx",
            lineNumber: 14
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h(_svg.FonosterLogo, {
        __source: {
            fileName: "apps/web/src/ui/components/launcher/LauncherPortal.tsx",
            lineNumber: 15
        },
        __self: undefined
    })))))
;

},{"../../../data":"djiGU","../../styles/portals/launcher.module.scss":"4BDvv","../floating-button":"byj8h","../portal":"6nyrY","../svg":"hUgBd","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"4BDvv":[function(require,module,exports) {
module.exports["rox-launcher"] = "_rox-launcher_08508b";
module.exports["loaded"] = "_loaded_08508b";

},{}],"byj8h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _floatingButton = require("./FloatingButton");
parcelHelpers.exportAll(_floatingButton, exports);

},{"./FloatingButton":"jUosA","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"jUosA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FloatingButton", ()=>FloatingButton
);
var _preact = require("preact");
const FloatingButton = (props)=>/*#__PURE__*/ _preact.h("button", {
        className: "button",
        type: "button",
        ...props,
        __source: {
            fileName: "apps/web/src/ui/components/floating-button/FloatingButton.tsx",
            lineNumber: 5
        },
        __self: undefined
    })
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"6NGGi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _router = require("./Router");
parcelHelpers.exportAll(_router, exports);

},{"./Router":"j0O6u","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"j0O6u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Router", ()=>Router
);
var _preact = require("preact");
var _navigation = require("../../providers/navigation");
var _speechRecognition = require("../screens/speech-recognition");
const Router = ()=>/*#__PURE__*/ _preact.h(_navigation.Navigator, {
        initialScreen: _navigation.SCREEN_NAMES.SPEECH,
        __source: {
            fileName: "apps/web/src/ui/router/Router.tsx",
            lineNumber: 7
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h(_navigation.Screen, {
        name: _navigation.SCREEN_NAMES.SPEECH,
        component: _speechRecognition.SpeechRecognitionScreen,
        __source: {
            fileName: "apps/web/src/ui/router/Router.tsx",
            lineNumber: 8
        },
        __self: undefined
    }))
;

},{"../../providers/navigation":"ahxKO","../screens/speech-recognition":"fHdFn","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"ahxKO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _navigator = require("./Navigator");
parcelHelpers.exportAll(_navigator, exports);
var _navigatorContext = require("./NavigatorContext");
parcelHelpers.exportAll(_navigatorContext, exports);
var _screen = require("./Screen");
parcelHelpers.exportAll(_screen, exports);
var _screenNames = require("./ScreenNames");
parcelHelpers.exportAll(_screenNames, exports);

},{"./Navigator":"hhAb0","./NavigatorContext":"9BzYJ","./Screen":"51hSN","./ScreenNames":"ktwJe","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"hhAb0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Navigator", ()=>Navigator1
);
var _preact = require("preact");
var _hooks = require("preact/hooks");
var _data = require("../../data");
var _navigatorContext = require("./NavigatorContext");
var _navigatorWarnings = require("./navigatorWarnings");
const Navigator1 = ({ initialScreen , children , ...props })=>{
    _navigatorWarnings.navigatorWarnings(children) // @patch-line
    ;
    const initialScreenRef = _hooks.useRef(initialScreen).current;
    const [currentScreen, navigate] = _hooks.useState(initialScreenRef);
    const context = _hooks.useMemo(()=>({
            currentScreen,
            navigate
        })
    , [
        currentScreen
    ]);
    const screen = _hooks.useMemo(()=>Array.isArray(children) ? children.find(({ props: props1  })=>props1?.name === currentScreen
        ) : children
    , [
        children
    ]);
    if (!screen) throw new Error(_data.ERROR_MESSAGES.NAVIGATOR_NO_CHILDREN);
    return(/*#__PURE__*/ _preact.h(_navigatorContext.NavigatorContext.Provider, {
        ...props,
        children: screen,
        value: context,
        __source: {
            fileName: "apps/web/src/providers/navigation/Navigator.tsx",
            lineNumber: 48
        },
        __self: undefined
    }));
};

},{"preact/hooks":"ltmSF","../../data":"djiGU","./NavigatorContext":"9BzYJ","./navigatorWarnings":"16pwF","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"9BzYJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NavigatorContext", ()=>NavigatorContext
);
var _preact = require("preact");
var _data = require("../../data");
const NavigatorContext = _preact.createContext({
    currentScreen: undefined,
    navigate () {
        throw new Error(_data.ERROR_MESSAGES.NAVIGATE_NOT_IMPLEMENTED);
    }
});

},{"preact":"9MgUs","../../data":"djiGU","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"16pwF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "navigatorWarnings", ()=>navigatorWarnings
);
var _compat = require("preact/compat");
var _compatDefault = parcelHelpers.interopDefault(_compat);
var _config = require("../../config");
var _data = require("../../data");
var _screen = require("./Screen");
const navigatorWarnings = (children)=>{
    if (!_config.__DEV__) return;
    /**
   * Validate Children
   *
   * @throws Don't allow the use of this component if your
   * children are not a screen component.
   */ const validateChildren = (child)=>{
        if (child?.type !== _screen.Screen) throw new Error(_data.ERROR_MESSAGES.NAVIGATOR_CHILDREN);
        if (!child.props?.name) throw new Error(_data.ERROR_MESSAGES.SCREEN_NAME_REQUIRE);
    };
    _compatDefault.default.Children.toArray(children).forEach(validateChildren);
};

},{"preact/compat":"e240J","../../config":"8fM9J","../../data":"djiGU","./Screen":"51hSN","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"51hSN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Screen", ()=>Screen1
);
var _preact = require("preact");
const Screen1 = ({ component: Component , ...props })=>/*#__PURE__*/ _preact.h(_preact.Fragment, {
        ...props,
        __source: {
            fileName: "apps/web/src/providers/navigation/Screen.tsx",
            lineNumber: 16
        },
        __self: undefined
    }, /*#__PURE__*/ _preact.h(Component, {
        __source: {
            fileName: "apps/web/src/providers/navigation/Screen.tsx",
            lineNumber: 17
        },
        __self: undefined
    }))
;

},{"preact":"9MgUs","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"ktwJe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SCREEN_NAMES", ()=>SCREEN_NAMES
);
var SCREEN_NAMES;
(function(SCREEN_NAMES1) {
    SCREEN_NAMES1["SPEECH"] = 'app.speech.recognition';
    SCREEN_NAMES1["PERMISSIONS"] = 'app.permissions';
    SCREEN_NAMES1["INTENTS"] = 'app.intents';
})(SCREEN_NAMES || (SCREEN_NAMES = {
}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"fHdFn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _speechRecognitionScreen = require("./SpeechRecognitionScreen");
parcelHelpers.exportAll(_speechRecognitionScreen, exports);

},{"./SpeechRecognitionScreen":"dYGbI","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"dYGbI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SpeechRecognitionScreen", ()=>SpeechRecognitionScreen
);
var _preact = require("preact");
var _hooks = require("preact/hooks");
var _speechRecognition = require("../../../services/speech-recognition");
const SpeechRecognitionScreen = ()=>{
    _hooks.useEffect(()=>{
        _speechRecognition.speechRecognition.start();
        return ()=>{
            _speechRecognition.speechRecognition?.stop();
        };
    }, []);
    return(/*#__PURE__*/ _preact.h("p", {
        __source: {
            fileName: "apps/web/src/ui/screens/speech-recognition/SpeechRecognitionScreen.tsx",
            lineNumber: 15
        },
        __self: undefined
    }, "Hello Speech"));
};

},{"preact/hooks":"ltmSF","../../../services/speech-recognition":"6kguY","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7","preact":"9MgUs"}],"6kguY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _speechRecognition = require("./SpeechRecognition");
parcelHelpers.exportAll(_speechRecognition, exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);

},{"./SpeechRecognition":"8SsGw","./types":"uLB85","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"8SsGw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "speechRecognition", ()=>speechRecognition
);
var _events = require("../event-bus/events");
var _fonos = require("../fonos");
class SpeechRecognition {
    /**
   * Start Recognition
   *
   * @description Starts the speech recognition service listening to incoming audio
   * with intent to recognize grammars associated with the current SpeechRecognition.
   */ async start() {
        const isConnected = await _fonos.speechAPI.connect('1234');
        if (!isConnected) throw new Error('...');
    }
    /**
   * Adds a listener for intent responses from the API.
   */ onIntents(cb) {
        _fonos.speechAPI.onIntents((intents, error)=>{
            /**
       * @todo Consult with Pedro Sanders if exposing the results of the API
       * in an event generates business conflicts for Fonoster.
       */ _events.speechIntentsEvent.dispatch({
                intents,
                error
            });
            cb(intents, error);
        });
    }
    /**
   * Adds a listener for waiting event from the API.
   */ onWaiting(cb) {
        _fonos.speechAPI.onWaiting(cb);
    }
    /**
   * Stop recognition
   *
   * @description Stops the speech recognition service from listening to incoming audio.
   */ async stop() {
        await _fonos.speechAPI.closeConnection();
    }
    /**
   * Pause recognition
   *
   * @description Pause audio received temporarily from the microphone.
   */ pause() {
    }
    /**
   * Resume
   *
   * @description Resume recognition audio after "pause()" was called.
   */ resume() {
    }
    static get instance() {
        return this._instance ?? (this._instance = new SpeechRecognition());
    }
}
const speechRecognition = SpeechRecognition.instance;

},{"../event-bus/events":"yP28d","../fonos":"3nd3h","@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}],"uLB85":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4N8i7"}]},["bkLlV"], null, "parcelRequirecdaa")

