/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../packages/fantastic-utils/defaultips.js":
/*!*********************************************************************!*\
  !*** F:/network viewer test/packages/fantastic-utils/defaultips.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const defaultIPs = [\r\n  '127.0.0.1',\r\n  '::1',\r\n  '0.0.0.0',\r\n  '::'\r\n]\r\n\r\nmodule.exports = defaultIPs\n\n//# sourceURL=webpack:///F:/network_viewer_test/packages/fantastic-utils/defaultips.js?");

/***/ }),

/***/ "../common/defaults/actionresults.js":
/*!*******************************************!*\
  !*** ../common/defaults/actionresults.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const actionResults = () => ({\r\n  data: {}, \r\n  foldouts: {}, \r\n  status: {},\r\n  date: {}\r\n})\r\n\r\nmodule.exports = actionResults\n\n//# sourceURL=webpack:///../common/defaults/actionresults.js?");

/***/ }),

/***/ "../common/effect/actionfollowup.js":
/*!******************************************!*\
  !*** ../common/effect/actionfollowup.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const fetch_followup = action => fetch(`/action_followup?action=${action.action}&function=${action.function}&node_id=${action.node_id}&key=${action.id}`, {method: 'POST', body: JSON.stringify(action.data)})\r\n\r\nconst actionFollowup = (state, action, send) => {\r\n  fetch_followup(action)\r\n    .then(res => res.json())\r\n    .then(res => send({...action, type: 'action_followup_result', result: res.result, hostname: action.host, date: res.date}))  \r\n    .then(() => {\r\n      if (!action.refresh) return\r\n      if (action.keys.length) {\r\n        let action_result = state.action_results.data[action.host][action.action]\r\n        for (let i = 0; i < action.keys.length - 1; i++) {\r\n          const keys = action.keys[i]\r\n          action_result = action_result[keys.id][keys.function]\r\n        }\r\n        const id = action.keys[action.keys.length - 1].id\r\n        const func = action.keys[action.keys.length - 1].function\r\n        action_result = action_result[id]\r\n        const result_value = action_result.value.find(v => v.click && v.click.function === func)\r\n        const prev_action = {\r\n          ...action,\r\n          keys: action.keys.slice(0, action.keys.length - 1),\r\n          function: func,\r\n          id,\r\n          data: result_value.click.data\r\n        }\r\n        send({type: 'action_followup', ...prev_action, refresh: false})\r\n      }\r\n      else send({...action, type: 'perform_action'})\r\n    })\r\n}\r\n\r\nmodule.exports = actionFollowup\n\n//# sourceURL=webpack:///../common/effect/actionfollowup.js?");

/***/ }),

/***/ "../common/effect/index.js":
/*!*********************************!*\
  !*** ../common/effect/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ActionFollowup = __webpack_require__(/*! ./actionfollowup */ \"../common/effect/actionfollowup.js\")\r\n\r\nconst effect = (state, action, send) => {\r\n  if (action.type == 'init') {\r\n    fetch('/actions')\r\n      .then(res => res.json())\r\n      .then(res => send({type: 'actions', actions: res}))\r\n  }\r\n  if (action.type == 'perform_action') fetch(`/actions?action=${action.action}&node_id=${action.node_id}`, {method: 'POST'})\r\n    .then(res => res.json())\r\n    .then(res => send({type: 'action_result', result: res.result, action: action.action, hostname: action.host, date: res.date}))\r\n  if (action.type == 'action_followup') ActionFollowup(state, action, send)\r\n}\r\n\r\nmodule.exports = effect\n\n//# sourceURL=webpack:///../common/effect/index.js?");

/***/ }),

/***/ "../common/effect/loadnoderesults.js":
/*!*******************************************!*\
  !*** ../common/effect/loadnoderesults.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const loadNodeResults = (node, send) => {\r\n  fetch(`/results?node_id=${node.node_id}`)\r\n    .then(res => res.json())\r\n    .then(res => {\r\n      const results = res.reduce((result, v) => {\r\n        if (!result[v.action]) result[v.action] = {}\r\n        if (!result[v.action][v.function]) result[v.action][v.function] = {}\r\n        result[v.action][v.function][v.key] = {...v, data: JSON.parse(v.data)}\r\n        return result\r\n      }, {})\r\n      Object.entries(results).map(r => {\r\n        const data = r[1].run.null.data\r\n        send({type: 'action_result', result: data, action: r[0], hostname: node.hostname, date: r[1].run.null.date})\r\n        const followup = (data, keys = []) => {\r\n          data.forEach(d => {\r\n            d.value.forEach(v => {\r\n              if (v.click && r[1][v.click.function] && r[1][v.click.function][d.id]) {\r\n                const result = r[1][v.click.function][d.id].data\r\n                send({\r\n                  type: 'action_followup_result', \r\n                  refresh: false, \r\n                  action: r[0],\r\n                  function: v.click.function,\r\n                  node_id: node.node_id,\r\n                  hostname: node.hostname,\r\n                  id: d.id,\r\n                  keys,\r\n                  result,\r\n                  date: r[1][v.click.function][d.id].date\r\n                })\r\n                followup(result, [...keys, {function: v.click.function, id: d.id}])\r\n              }\r\n            })\r\n          })\r\n        }\r\n        followup(data)\r\n      })\r\n    })\r\n}\r\n\r\nmodule.exports = loadNodeResults\n\n//# sourceURL=webpack:///../common/effect/loadnoderesults.js?");

/***/ }),

/***/ "../common/node_modules/snabbdom/h.js":
/*!********************************************!*\
  !*** ../common/node_modules/snabbdom/h.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar vnode_1 = __webpack_require__(/*! ./vnode */ \"../common/node_modules/snabbdom/vnode.js\");\nvar is = __webpack_require__(/*! ./is */ \"../common/node_modules/snabbdom/is.js\");\nfunction addNS(data, children, sel) {\n    data.ns = 'http://www.w3.org/2000/svg';\n    if (sel !== 'foreignObject' && children !== undefined) {\n        for (var i = 0; i < children.length; ++i) {\n            var childData = children[i].data;\n            if (childData !== undefined) {\n                addNS(childData, children[i].children, children[i].sel);\n            }\n        }\n    }\n}\nfunction h(sel, b, c) {\n    var data = {}, children, text, i;\n    if (c !== undefined) {\n        data = b;\n        if (is.array(c)) {\n            children = c;\n        }\n        else if (is.primitive(c)) {\n            text = c;\n        }\n        else if (c && c.sel) {\n            children = [c];\n        }\n    }\n    else if (b !== undefined) {\n        if (is.array(b)) {\n            children = b;\n        }\n        else if (is.primitive(b)) {\n            text = b;\n        }\n        else if (b && b.sel) {\n            children = [b];\n        }\n        else {\n            data = b;\n        }\n    }\n    if (children !== undefined) {\n        for (i = 0; i < children.length; ++i) {\n            if (is.primitive(children[i]))\n                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);\n        }\n    }\n    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&\n        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {\n        addNS(data, children, sel);\n    }\n    return vnode_1.vnode(sel, data, children, text, undefined);\n}\nexports.h = h;\n;\nexports.default = h;\n//# sourceMappingURL=h.js.map\n\n//# sourceURL=webpack:///../common/node_modules/snabbdom/h.js?");

/***/ }),

/***/ "../common/node_modules/snabbdom/is.js":
/*!*********************************************!*\
  !*** ../common/node_modules/snabbdom/is.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.array = Array.isArray;\nfunction primitive(s) {\n    return typeof s === 'string' || typeof s === 'number';\n}\nexports.primitive = primitive;\n//# sourceMappingURL=is.js.map\n\n//# sourceURL=webpack:///../common/node_modules/snabbdom/is.js?");

/***/ }),

/***/ "../common/node_modules/snabbdom/vnode.js":
/*!************************************************!*\
  !*** ../common/node_modules/snabbdom/vnode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction vnode(sel, data, children, text, elm) {\n    var key = data === undefined ? undefined : data.key;\n    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };\n}\nexports.vnode = vnode;\nexports.default = vnode;\n//# sourceMappingURL=vnode.js.map\n\n//# sourceURL=webpack:///../common/node_modules/snabbdom/vnode.js?");

/***/ }),

/***/ "../common/update/actionfollowup.js":
/*!******************************************!*\
  !*** ../common/update/actionfollowup.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const actionFollowup = (state, action) => {\r\n  let action_result = state.action_results.data[action.host][action.action]\r\n  for (const keys of action.keys) {\r\n    action_result = action_result[keys.id][keys.function]\r\n  }\r\n  action_result = action_result[action.id]\r\n  action_result.status[action.function] = 'loading'\r\n}\r\n\r\nmodule.exports = actionFollowup\n\n//# sourceURL=webpack:///../common/update/actionfollowup.js?");

/***/ }),

/***/ "../common/update/actionresult.js":
/*!****************************************!*\
  !*** ../common/update/actionresult.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const actionResult = (state, action) => {\r\n  if (!state.action_results.data[action.hostname]) {\r\n    state.action_results.data[action.hostname] = {}\r\n    state.action_results.foldouts[action.hostname] = {}\r\n    state.action_results.status[action.hostname] = {}\r\n    state.action_results.date[action.hostname] = {}\r\n  }\r\n  if (!state.action_results.data[action.hostname][action.action]) {\r\n    state.action_results.data[action.hostname][action.action] = {}\r\n    state.action_results.foldouts[action.hostname][action.action] = action.result.length ? true : undefined\r\n  }\r\n  state.action_results.status[action.hostname][action.action] = 'loaded'\r\n  state.action_results.date[action.hostname][action.action] = action.date\r\n  action.result.forEach(v => {\r\n    if (!state.action_results.data[action.hostname][action.action][v.id]) state.action_results.data[action.hostname][action.action][v.id] = {value: v.value, foldout: {}, status: {}, date: {}}\r\n    else state.action_results.data[action.hostname][action.action][v.id] = {...state.action_results.data[action.hostname][action.action][v.id], value: v.value}\r\n  })\r\n}\r\n\r\nmodule.exports = actionResult\n\n//# sourceURL=webpack:///../common/update/actionresult.js?");

/***/ }),

/***/ "../common/update/followupfoldout.js":
/*!*******************************************!*\
  !*** ../common/update/followupfoldout.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const followupFoldout = (state, action) => {\r\n  let action_result = state.action_results.data[action.hostname][action.action]\r\n  for (const keys of action.keys) {\r\n    action_result = action_result[keys.id][keys.function]\r\n  }\r\n  action_result = action_result[action.id]\r\n  action_result.foldout[action.function] = action.value\r\n}\r\n\r\nmodule.exports = followupFoldout\n\n//# sourceURL=webpack:///../common/update/followupfoldout.js?");

/***/ }),

/***/ "../common/update/followupresult.js":
/*!******************************************!*\
  !*** ../common/update/followupresult.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const followupResult = (state, action) => {\r\n  let action_result = state.action_results.data[action.hostname][action.action]\r\n  for (const keys of action.keys) {\r\n    action_result = action_result[keys.id][keys.function]\r\n  }\r\n  action_result = action_result[action.id]\r\n  action_result.foldout[action.function] = action.result.length ? true : undefined\r\n  action_result.status[action.function] = 'loaded'\r\n  action_result.date[action.function] = action.date\r\n  if (!action_result[action.function]) action_result[action.function] = {}\r\n  action_result = action_result[action.function]\r\n  action.result.forEach(v => {\r\n    if (!action_result[v.id]) action_result[v.id] = {value: v.value, foldout: {}, status: {}, date: {}}\r\n    else action_result[v.id].value = v.value\r\n  })\r\n}\r\n\r\nmodule.exports = followupResult\n\n//# sourceURL=webpack:///../common/update/followupresult.js?");

/***/ }),

/***/ "../common/update/index.js":
/*!*********************************!*\
  !*** ../common/update/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PerformAction = __webpack_require__(/*! ./performaction */ \"../common/update/performaction.js\")\r\nconst ActionResult = __webpack_require__(/*! ./actionresult */ \"../common/update/actionresult.js\")\r\nconst ActionFollowup = __webpack_require__(/*! ./actionfollowup */ \"../common/update/actionfollowup.js\")\r\nconst FollowupFoldout = __webpack_require__(/*! ./followupfoldout */ \"../common/update/followupfoldout.js\")\r\nconst FollowupResult = __webpack_require__(/*! ./followupresult */ \"../common/update/followupresult.js\")\r\n\r\nconst update = (state, action) => {\r\n  if (action.type == 'actions') state.actions = action.actions\r\n  if (action.type == 'perform_action') PerformAction(state, action)\r\n  if (action.type == 'action_result') ActionResult(state, action)\r\n  if (action.type == 'result_foldout') state.action_results.foldouts[action.hostname][action.action] = action.value\r\n  if (action.type == 'action_followup') ActionFollowup(state, action)\r\n  if (action.type == 'action_followup_result') FollowupResult(state, action)\r\n  if (action.type == 'followup_foldout') FollowupFoldout(state, action)\r\n\r\n  return state\r\n}\r\n\r\nmodule.exports = update\n\n//# sourceURL=webpack:///../common/update/index.js?");

/***/ }),

/***/ "../common/update/performaction.js":
/*!*****************************************!*\
  !*** ../common/update/performaction.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const performAction = (state, action) => {\r\n  state.action_results.status[action.host][action.action] = 'loading'\r\n}\r\n\r\nmodule.exports = performAction\n\n//# sourceURL=webpack:///../common/update/performaction.js?");

/***/ }),

/***/ "../common/util/datestring.js":
/*!************************************!*\
  !*** ../common/util/datestring.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const unit_string = (amount, unit) => `${amount} ${unit}${amount === 1 ? '' : 's'}`\r\n\r\nconst dateString = minutes => {\r\n  minutes = Math.round(minutes)\r\n  if (minutes < 60) return unit_string(minutes, 'minute')\r\n  const hours = Math.floor(minutes / 60)\r\n  const remainder = minutes % 60\r\n  if (remainder) return `${unit_string(hours, 'hour')} and ${unit_string(remainder, 'minute')}`\r\n  return `${unit_string(hours, 'hour')}`\r\n}\r\n\r\nmodule.exports = dateString\n\n//# sourceURL=webpack:///../common/util/datestring.js?");

/***/ }),

/***/ "../common/util/hoststring.js":
/*!************************************!*\
  !*** ../common/util/hoststring.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const hostString = host => {\r\n  if (host == 'local') return 'local host'\r\n  if (host == 'remote') return 'host with PowerShell remote access'\r\n}\r\n\r\nmodule.exports = hostString\n\n//# sourceURL=webpack:///../common/util/hoststring.js?");

/***/ }),

/***/ "../common/util/ipaddress.js":
/*!***********************************!*\
  !*** ../common/util/ipaddress.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const ipAddress = (ip, port) => `${(ip.includes(':') ? `[${ip}]` : ip)}:${port}`\r\n\r\nmodule.exports = ipAddress\n\n//# sourceURL=webpack:///../common/util/ipaddress.js?");

/***/ }),

/***/ "../common/util/timeago.js":
/*!*********************************!*\
  !*** ../common/util/timeago.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DateString = __webpack_require__(/*! ./datestring */ \"../common/util/datestring.js\")\r\n\r\nconst timeAgo = date => {\r\n  const diff = Date.now() - date\r\n  if (diff < 60000) return 'just now'\r\n  return `${DateString(diff / 1000 / 60)} ago`\r\n}\r\n\r\nmodule.exports = timeAgo\n\n//# sourceURL=webpack:///../common/util/timeago.js?");

/***/ }),

/***/ "../common/view/actions/index.js":
/*!***************************************!*\
  !*** ../common/view/actions/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"../common/node_modules/snabbdom/h.js\").default\r\nconst HostString = __webpack_require__(/*! ../../util/hoststring */ \"../common/util/hoststring.js\")\r\nconst Result = __webpack_require__(/*! ./result */ \"../common/view/actions/result.js\")\r\nconst TimeAgo = __webpack_require__(/*! ../../util/timeago */ \"../common/util/timeago.js\")\r\n\r\nconst actions = (state, send, node) => {\r\n  if (!state.actions) return\r\n  const actions = Object.entries(state.actions).filter(v => v[1].hosts.includes('none') || v[1].hosts.includes(node.access)) \r\n  return H('div.selection_panel', \r\n    H('div.scroll_container.section',\r\n      H('div.scroll', !actions.length ? H('div.scroll_item', 'No actions compatible with this host') : actions.map(v => {\r\n        const loading = state.action_results.status[node.hostname] && state.action_results.status[node.hostname][v[0]] === 'loading'\r\n        return H('div.scroll_item', [\r\n          H('div.item', [\r\n            H('div.subtitle', v[1].name),\r\n            H('div.button', \r\n              { \r\n                on: loading ? undefined : {click: [send, {type: 'perform_action', action: v[0], node_id: node.node_id, host: node.hostname}]},\r\n                class: {loading}\r\n              }, \r\n              loading ? 'Running...' : 'Run')\r\n          ]),\r\n          v[1].description ? H('div.item', v[1].description) : undefined,\r\n          H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`]),\r\n          state.action_results.data[node.hostname] && state.action_results.data[node.hostname][v[0]] ? H('div.results', [\r\n            H('div.followup', [\r\n              H('div.subtitle', `Results from ${TimeAgo(state.action_results.date[node.hostname][v[0]])}`), \r\n              H('div.foldout', {\r\n                on: {click: [send, {type: 'result_foldout', action: v[0], hostname: node.hostname, value: !state.action_results.foldouts[node.hostname][v[0]]}]},\r\n                class: {disabled: !state.action_results.foldouts[node.hostname][v[0]]}\r\n              })\r\n            ]),\r\n            ...(state.action_results.foldouts[node.hostname][v[0]] ? Object.entries(state.action_results.data[node.hostname][v[0]])\r\n              .map(r => Result(v[0], {key: r[0], value: r[1]}, node.node_id, node.hostname, loading, send)) : [])\r\n          ]) : undefined\r\n        ])\r\n      }))\r\n    )\r\n  )\r\n}\r\n\r\nmodule.exports = actions\n\n//# sourceURL=webpack:///../common/view/actions/index.js?");

/***/ }),

/***/ "../common/view/actions/result.js":
/*!****************************************!*\
  !*** ../common/view/actions/result.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"../common/node_modules/snabbdom/h.js\").default\r\nconst TimeAgo = __webpack_require__(/*! ../../util/timeago */ \"../common/util/timeago.js\")\r\n\r\nconst display = (action, line, foldout, status, node_id, host, send, id, keys) => {\r\n\r\n  if (typeof(line) === 'object') {\r\n    if (line.type == 'button') {\r\n      const loading = status === true || status[line.click.function] === 'loading'\r\n      return H('div.followup', [\r\n        H('div.button', \r\n        {\r\n          on: loading ? undefined : { click: [send, {\r\n            type: 'action_followup', \r\n            action,\r\n            function: line.click.function,\r\n            data: line.click.data,\r\n            node_id,\r\n            host,\r\n            id,\r\n            keys,\r\n            refresh: true,\r\n            date: Date.now()\r\n          }]},\r\n          class: {...line.class, loading}\r\n        },\r\n        loading ? 'Running...' : line.text),\r\n        typeof foldout[line.click.function] === 'boolean' ? H('div.foldout', {\r\n          on: {click: [send, {\r\n            type: 'followup_foldout',\r\n            action,\r\n            function: line.click.function,\r\n            hostname: host,\r\n            id,\r\n            keys,\r\n            value: !foldout[line.click.function]\r\n          }]},\r\n          class: { disabled: !foldout[line.click.function]}\r\n        }) : undefined\r\n      ])\r\n    }\r\n    if (line.type == 'header') {\r\n      return H('div.result_header', line.text)\r\n    }\r\n    if (line.type == 'date') {\r\n      return H('div.text', `${TimeAgo(line.date)}`)\r\n    }\r\n  }\r\n  return H('div.text', line)\r\n}\r\n\r\nconst result = (action, action_result, node_id, host, loading, send, keys = []) => H('div.result', Object.entries(action_result.value).map((v, i, arr) => {\r\n    if (v[0] === 'foldout') return  \r\n    if (v[0] === 'value') return H('div.item', v[1].map(v => display(action, v, action_result.value.foldout, loading || action_result.value.status, node_id, host, send, action_result.key, keys)))\r\n    return action_result.value.foldout[v[0]] ? \r\n      H('div', [\r\n        H('div.result_time', [\r\n          H('div.result_header', action_result.value.value.find(r => r.click && r.click.function === v[0]).text),\r\n          H('div.time', ` Results from ${TimeAgo(action_result.value.date[v[0]])}`)\r\n        ]),\r\n        ...Object.entries(v[1])\r\n        .map(r => result(action, {key: r[0], value: r[1]}, node_id, host, loading || action_result.value.status[v[0]] === 'loading', send, [...keys, {function: v[0], id: action_result.key}]))\r\n      ]) :\r\n      undefined\r\n  }).flat()\r\n)\r\n\r\n\r\nmodule.exports = result\n\n//# sourceURL=webpack:///../common/view/actions/result.js?");

/***/ }),

/***/ "../common/view/connections.js":
/*!*************************************!*\
  !*** ../common/view/connections.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"../common/node_modules/snabbdom/h.js\").default\r\nconst IPAddress = __webpack_require__(/*! ../util/ipaddress */ \"../common/util/ipaddress.js\")\r\n\r\nconst connections = (connections, label) => \r\n  H('div.scroll_container.section', [\r\n    H('div.subtitle', [label || 'Connections', ` (${connections.length}):`].flat()),\r\n    connections.length ? H('div.scroll', connections.map(v => H('div.scroll_item', [\r\n      H('div.item', `Local address: ${IPAddress(v.local_address, v.local_port)}`),\r\n      H('div.item', `Remote address: ${IPAddress(v.remote_address, v.remote_port)}`),\r\n      H('div.item', `Process: ${v.process.name}`),\r\n      H('div.item', `State: ${v.state.replace('_', ' ')}`)\r\n    ]))) : undefined\r\n  ])\r\n\r\n\r\nmodule.exports = connections\n\n//# sourceURL=webpack:///../common/view/connections.js?");

/***/ }),

/***/ "../common/view/info/index.js":
/*!************************************!*\
  !*** ../common/view/info/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"../common/node_modules/snabbdom/h.js\").default\r\nconst NodeTop = __webpack_require__(/*! ./nodetop */ \"../common/view/info/nodetop.js\")\r\nconst Connections = __webpack_require__(/*! ../connections */ \"../common/view/connections.js\")\r\n\r\nconst info = (state, send, node) => H('div.selection_panel', [\r\n    NodeTop(node),\r\n    Connections(node.connections)\r\n  ])\r\n\r\nmodule.exports = info\n\n//# sourceURL=webpack:///../common/view/info/index.js?");

/***/ }),

/***/ "../common/view/info/nodetop.js":
/*!**************************************!*\
  !*** ../common/view/info/nodetop.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"../common/node_modules/snabbdom/h.js\").default\r\nconst DefaultIPs = __webpack_require__(/*! fantastic-utils/defaultips */ \"../../packages/fantastic-utils/defaultips.js\")\r\n\r\nconst node_type = node => {\r\n  if (!node.important) return 'Host outside my network'\r\n  if (node.access === 'local') return 'Local host'\r\n  if (node.access === 'remote') return 'Remote host with PowerShell access configured'\r\n  return 'Host on my network without remote access'\r\n}\r\n\r\nconst nodeTop = node => \r\n  H('div.section', [\r\n    H('div.subtitle', node_type(node)),\r\n    node.hostname ? H('div.item', `Hostname: ${node.hostname}`) : undefined,\r\n    node.os ? H('div.item', `Operating System: ${node.os}`) : undefined,\r\n    node.macs && node.macs.length ? H('div.subtitle', 'MAC Addresses:') : undefined,\r\n    ...node.macs.map(v => H('div.item', `${v.mac} (${v.vendor})`)),\r\n    H('div.subtitle', 'IP Addresses:'),\r\n    ...node.ips.map(v => DefaultIPs.includes(v) ? undefined : H('div.item', v))\r\n  ])\r\n\r\nmodule.exports = nodeTop\n\n//# sourceURL=webpack:///../common/view/info/nodetop.js?");

/***/ }),

/***/ "./effect/index.js":
/*!*************************!*\
  !*** ./effect/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Common = __webpack_require__(/*! ../../common/effect */ \"../common/effect/index.js\")\r\nconst LoadNodeResults = __webpack_require__(/*! ../../common/effect/loadnoderesults */ \"../common/effect/loadnoderesults.js\")\r\n\r\nconst effect = (state, action, send) => {\r\n  Common(state, action, send)\r\n  if (action.type == 'node_data') LoadNodeResults(action.data, send)\r\n}\r\n\r\nmodule.exports = effect\n\n//# sourceURL=webpack:///./effect/index.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ToVNode = __webpack_require__(/*! snabbdom/tovnode */ \"./node_modules/snabbdom/tovnode.js\").default\r\nconst Snabbdom = __webpack_require__(/*! snabbdom */ \"./node_modules/snabbdom/es/snabbdom.js\")\r\nconst Update = __webpack_require__(/*! ./update */ \"./update/index.js\")\r\nconst View = __webpack_require__(/*! ./view */ \"./view/index.js\")\r\nconst Effect = __webpack_require__(/*! ./effect */ \"./effect/index.js\")\r\nconst ActionResults = __webpack_require__(/*! ../common/defaults/actionresults */ \"../common/defaults/actionresults.js\")\r\n\r\nconst patch = Snabbdom.init([\r\n  __webpack_require__(/*! snabbdom/modules/class */ \"./node_modules/snabbdom/modules/class.js\").default,\r\n  __webpack_require__(/*! snabbdom/modules/attributes */ \"./node_modules/snabbdom/modules/attributes.js\").default,\r\n  __webpack_require__(/*! snabbdom/modules/style */ \"./node_modules/snabbdom/modules/style.js\").default,\r\n  __webpack_require__(/*! snabbdom/modules/eventlisteners */ \"./node_modules/snabbdom/modules/eventlisteners.js\").default, ])\r\n\r\nlet state = { \r\n  action_results: ActionResults(),\r\n}\r\nlet vdom = ToVNode(document.body)\r\n\r\nconst send = action=> {\r\n  state = Update(state, action)\r\n  vdom = patch(vdom, View(state, send))\r\n  Effect(state,action,send) \r\n}\r\n  \r\nsend({type:'init'})\r\n\r\nwindow.state = state\r\nwindow.send = send\n\n//# sourceURL=webpack:///./main.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/h.js":
/*!***************************************!*\
  !*** ./node_modules/snabbdom/es/h.js ***!
  \***************************************/
/*! exports provided: h, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"h\", function() { return h; });\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ \"./node_modules/snabbdom/es/vnode.js\");\n/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ \"./node_modules/snabbdom/es/is.js\");\n\n\nfunction addNS(data, children, sel) {\n    data.ns = 'http://www.w3.org/2000/svg';\n    if (sel !== 'foreignObject' && children !== undefined) {\n        for (var i = 0; i < children.length; ++i) {\n            var childData = children[i].data;\n            if (childData !== undefined) {\n                addNS(childData, children[i].children, children[i].sel);\n            }\n        }\n    }\n}\nfunction h(sel, b, c) {\n    var data = {}, children, text, i;\n    if (c !== undefined) {\n        data = b;\n        if (_is__WEBPACK_IMPORTED_MODULE_1__[\"array\"](c)) {\n            children = c;\n        }\n        else if (_is__WEBPACK_IMPORTED_MODULE_1__[\"primitive\"](c)) {\n            text = c;\n        }\n        else if (c && c.sel) {\n            children = [c];\n        }\n    }\n    else if (b !== undefined) {\n        if (_is__WEBPACK_IMPORTED_MODULE_1__[\"array\"](b)) {\n            children = b;\n        }\n        else if (_is__WEBPACK_IMPORTED_MODULE_1__[\"primitive\"](b)) {\n            text = b;\n        }\n        else if (b && b.sel) {\n            children = [b];\n        }\n        else {\n            data = b;\n        }\n    }\n    if (children !== undefined) {\n        for (i = 0; i < children.length; ++i) {\n            if (_is__WEBPACK_IMPORTED_MODULE_1__[\"primitive\"](children[i]))\n                children[i] = Object(_vnode__WEBPACK_IMPORTED_MODULE_0__[\"vnode\"])(undefined, undefined, undefined, children[i], undefined);\n        }\n    }\n    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&\n        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {\n        addNS(data, children, sel);\n    }\n    return Object(_vnode__WEBPACK_IMPORTED_MODULE_0__[\"vnode\"])(sel, data, children, text, undefined);\n}\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (h);\n//# sourceMappingURL=h.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/h.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/htmldomapi.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/es/htmldomapi.js ***!
  \************************************************/
/*! exports provided: htmlDomApi, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"htmlDomApi\", function() { return htmlDomApi; });\nfunction createElement(tagName) {\n    return document.createElement(tagName);\n}\nfunction createElementNS(namespaceURI, qualifiedName) {\n    return document.createElementNS(namespaceURI, qualifiedName);\n}\nfunction createTextNode(text) {\n    return document.createTextNode(text);\n}\nfunction createComment(text) {\n    return document.createComment(text);\n}\nfunction insertBefore(parentNode, newNode, referenceNode) {\n    parentNode.insertBefore(newNode, referenceNode);\n}\nfunction removeChild(node, child) {\n    node.removeChild(child);\n}\nfunction appendChild(node, child) {\n    node.appendChild(child);\n}\nfunction parentNode(node) {\n    return node.parentNode;\n}\nfunction nextSibling(node) {\n    return node.nextSibling;\n}\nfunction tagName(elm) {\n    return elm.tagName;\n}\nfunction setTextContent(node, text) {\n    node.textContent = text;\n}\nfunction getTextContent(node) {\n    return node.textContent;\n}\nfunction isElement(node) {\n    return node.nodeType === 1;\n}\nfunction isText(node) {\n    return node.nodeType === 3;\n}\nfunction isComment(node) {\n    return node.nodeType === 8;\n}\nvar htmlDomApi = {\n    createElement: createElement,\n    createElementNS: createElementNS,\n    createTextNode: createTextNode,\n    createComment: createComment,\n    insertBefore: insertBefore,\n    removeChild: removeChild,\n    appendChild: appendChild,\n    parentNode: parentNode,\n    nextSibling: nextSibling,\n    tagName: tagName,\n    setTextContent: setTextContent,\n    getTextContent: getTextContent,\n    isElement: isElement,\n    isText: isText,\n    isComment: isComment,\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (htmlDomApi);\n//# sourceMappingURL=htmldomapi.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/htmldomapi.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/is.js":
/*!****************************************!*\
  !*** ./node_modules/snabbdom/es/is.js ***!
  \****************************************/
/*! exports provided: array, primitive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"array\", function() { return array; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"primitive\", function() { return primitive; });\nvar array = Array.isArray;\nfunction primitive(s) {\n    return typeof s === 'string' || typeof s === 'number';\n}\n//# sourceMappingURL=is.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/is.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/snabbdom.js":
/*!**********************************************!*\
  !*** ./node_modules/snabbdom/es/snabbdom.js ***!
  \**********************************************/
/*! exports provided: h, thunk, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ \"./node_modules/snabbdom/es/vnode.js\");\n/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ \"./node_modules/snabbdom/es/is.js\");\n/* harmony import */ var _htmldomapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./htmldomapi */ \"./node_modules/snabbdom/es/htmldomapi.js\");\n/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./h */ \"./node_modules/snabbdom/es/h.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"h\", function() { return _h__WEBPACK_IMPORTED_MODULE_3__[\"h\"]; });\n\n/* harmony import */ var _thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./thunk */ \"./node_modules/snabbdom/es/thunk.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"thunk\", function() { return _thunk__WEBPACK_IMPORTED_MODULE_4__[\"thunk\"]; });\n\n\n\n\nfunction isUndef(s) { return s === undefined; }\nfunction isDef(s) { return s !== undefined; }\nvar emptyNode = Object(_vnode__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('', {}, [], undefined, undefined);\nfunction sameVnode(vnode1, vnode2) {\n    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;\n}\nfunction isVnode(vnode) {\n    return vnode.sel !== undefined;\n}\nfunction createKeyToOldIdx(children, beginIdx, endIdx) {\n    var i, map = {}, key, ch;\n    for (i = beginIdx; i <= endIdx; ++i) {\n        ch = children[i];\n        if (ch != null) {\n            key = ch.key;\n            if (key !== undefined)\n                map[key] = i;\n        }\n    }\n    return map;\n}\nvar hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];\n\n\nfunction init(modules, domApi) {\n    var i, j, cbs = {};\n    var api = domApi !== undefined ? domApi : _htmldomapi__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n    for (i = 0; i < hooks.length; ++i) {\n        cbs[hooks[i]] = [];\n        for (j = 0; j < modules.length; ++j) {\n            var hook = modules[j][hooks[i]];\n            if (hook !== undefined) {\n                cbs[hooks[i]].push(hook);\n            }\n        }\n    }\n    function emptyNodeAt(elm) {\n        var id = elm.id ? '#' + elm.id : '';\n        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';\n        return Object(_vnode__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);\n    }\n    function createRmCb(childElm, listeners) {\n        return function rmCb() {\n            if (--listeners === 0) {\n                var parent_1 = api.parentNode(childElm);\n                api.removeChild(parent_1, childElm);\n            }\n        };\n    }\n    function createElm(vnode, insertedVnodeQueue) {\n        var i, data = vnode.data;\n        if (data !== undefined) {\n            if (isDef(i = data.hook) && isDef(i = i.init)) {\n                i(vnode);\n                data = vnode.data;\n            }\n        }\n        var children = vnode.children, sel = vnode.sel;\n        if (sel === '!') {\n            if (isUndef(vnode.text)) {\n                vnode.text = '';\n            }\n            vnode.elm = api.createComment(vnode.text);\n        }\n        else if (sel !== undefined) {\n            // Parse selector\n            var hashIdx = sel.indexOf('#');\n            var dotIdx = sel.indexOf('.', hashIdx);\n            var hash = hashIdx > 0 ? hashIdx : sel.length;\n            var dot = dotIdx > 0 ? dotIdx : sel.length;\n            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;\n            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)\n                : api.createElement(tag);\n            if (hash < dot)\n                elm.setAttribute('id', sel.slice(hash + 1, dot));\n            if (dotIdx > 0)\n                elm.setAttribute('class', sel.slice(dot + 1).replace(/\\./g, ' '));\n            for (i = 0; i < cbs.create.length; ++i)\n                cbs.create[i](emptyNode, vnode);\n            if (_is__WEBPACK_IMPORTED_MODULE_1__[\"array\"](children)) {\n                for (i = 0; i < children.length; ++i) {\n                    var ch = children[i];\n                    if (ch != null) {\n                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));\n                    }\n                }\n            }\n            else if (_is__WEBPACK_IMPORTED_MODULE_1__[\"primitive\"](vnode.text)) {\n                api.appendChild(elm, api.createTextNode(vnode.text));\n            }\n            i = vnode.data.hook; // Reuse variable\n            if (isDef(i)) {\n                if (i.create)\n                    i.create(emptyNode, vnode);\n                if (i.insert)\n                    insertedVnodeQueue.push(vnode);\n            }\n        }\n        else {\n            vnode.elm = api.createTextNode(vnode.text);\n        }\n        return vnode.elm;\n    }\n    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {\n        for (; startIdx <= endIdx; ++startIdx) {\n            var ch = vnodes[startIdx];\n            if (ch != null) {\n                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);\n            }\n        }\n    }\n    function invokeDestroyHook(vnode) {\n        var i, j, data = vnode.data;\n        if (data !== undefined) {\n            if (isDef(i = data.hook) && isDef(i = i.destroy))\n                i(vnode);\n            for (i = 0; i < cbs.destroy.length; ++i)\n                cbs.destroy[i](vnode);\n            if (vnode.children !== undefined) {\n                for (j = 0; j < vnode.children.length; ++j) {\n                    i = vnode.children[j];\n                    if (i != null && typeof i !== \"string\") {\n                        invokeDestroyHook(i);\n                    }\n                }\n            }\n        }\n    }\n    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {\n        for (; startIdx <= endIdx; ++startIdx) {\n            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];\n            if (ch != null) {\n                if (isDef(ch.sel)) {\n                    invokeDestroyHook(ch);\n                    listeners = cbs.remove.length + 1;\n                    rm = createRmCb(ch.elm, listeners);\n                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)\n                        cbs.remove[i_1](ch, rm);\n                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {\n                        i_1(ch, rm);\n                    }\n                    else {\n                        rm();\n                    }\n                }\n                else { // Text node\n                    api.removeChild(parentElm, ch.elm);\n                }\n            }\n        }\n    }\n    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {\n        var oldStartIdx = 0, newStartIdx = 0;\n        var oldEndIdx = oldCh.length - 1;\n        var oldStartVnode = oldCh[0];\n        var oldEndVnode = oldCh[oldEndIdx];\n        var newEndIdx = newCh.length - 1;\n        var newStartVnode = newCh[0];\n        var newEndVnode = newCh[newEndIdx];\n        var oldKeyToIdx;\n        var idxInOld;\n        var elmToMove;\n        var before;\n        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {\n            if (oldStartVnode == null) {\n                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left\n            }\n            else if (oldEndVnode == null) {\n                oldEndVnode = oldCh[--oldEndIdx];\n            }\n            else if (newStartVnode == null) {\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else if (newEndVnode == null) {\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldStartVnode, newStartVnode)) {\n                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);\n                oldStartVnode = oldCh[++oldStartIdx];\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else if (sameVnode(oldEndVnode, newEndVnode)) {\n                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);\n                oldEndVnode = oldCh[--oldEndIdx];\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right\n                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);\n                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));\n                oldStartVnode = oldCh[++oldStartIdx];\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left\n                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);\n                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);\n                oldEndVnode = oldCh[--oldEndIdx];\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else {\n                if (oldKeyToIdx === undefined) {\n                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);\n                }\n                idxInOld = oldKeyToIdx[newStartVnode.key];\n                if (isUndef(idxInOld)) { // New element\n                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);\n                    newStartVnode = newCh[++newStartIdx];\n                }\n                else {\n                    elmToMove = oldCh[idxInOld];\n                    if (elmToMove.sel !== newStartVnode.sel) {\n                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);\n                    }\n                    else {\n                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);\n                        oldCh[idxInOld] = undefined;\n                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);\n                    }\n                    newStartVnode = newCh[++newStartIdx];\n                }\n            }\n        }\n        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {\n            if (oldStartIdx > oldEndIdx) {\n                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;\n                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);\n            }\n            else {\n                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);\n            }\n        }\n    }\n    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {\n        var i, hook;\n        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {\n            i(oldVnode, vnode);\n        }\n        var elm = vnode.elm = oldVnode.elm;\n        var oldCh = oldVnode.children;\n        var ch = vnode.children;\n        if (oldVnode === vnode)\n            return;\n        if (vnode.data !== undefined) {\n            for (i = 0; i < cbs.update.length; ++i)\n                cbs.update[i](oldVnode, vnode);\n            i = vnode.data.hook;\n            if (isDef(i) && isDef(i = i.update))\n                i(oldVnode, vnode);\n        }\n        if (isUndef(vnode.text)) {\n            if (isDef(oldCh) && isDef(ch)) {\n                if (oldCh !== ch)\n                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);\n            }\n            else if (isDef(ch)) {\n                if (isDef(oldVnode.text))\n                    api.setTextContent(elm, '');\n                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);\n            }\n            else if (isDef(oldCh)) {\n                removeVnodes(elm, oldCh, 0, oldCh.length - 1);\n            }\n            else if (isDef(oldVnode.text)) {\n                api.setTextContent(elm, '');\n            }\n        }\n        else if (oldVnode.text !== vnode.text) {\n            if (isDef(oldCh)) {\n                removeVnodes(elm, oldCh, 0, oldCh.length - 1);\n            }\n            api.setTextContent(elm, vnode.text);\n        }\n        if (isDef(hook) && isDef(i = hook.postpatch)) {\n            i(oldVnode, vnode);\n        }\n    }\n    return function patch(oldVnode, vnode) {\n        var i, elm, parent;\n        var insertedVnodeQueue = [];\n        for (i = 0; i < cbs.pre.length; ++i)\n            cbs.pre[i]();\n        if (!isVnode(oldVnode)) {\n            oldVnode = emptyNodeAt(oldVnode);\n        }\n        if (sameVnode(oldVnode, vnode)) {\n            patchVnode(oldVnode, vnode, insertedVnodeQueue);\n        }\n        else {\n            elm = oldVnode.elm;\n            parent = api.parentNode(elm);\n            createElm(vnode, insertedVnodeQueue);\n            if (parent !== null) {\n                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));\n                removeVnodes(parent, [oldVnode], 0, 0);\n            }\n        }\n        for (i = 0; i < insertedVnodeQueue.length; ++i) {\n            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);\n        }\n        for (i = 0; i < cbs.post.length; ++i)\n            cbs.post[i]();\n        return vnode;\n    };\n}\n//# sourceMappingURL=snabbdom.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/snabbdom.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/thunk.js":
/*!*******************************************!*\
  !*** ./node_modules/snabbdom/es/thunk.js ***!
  \*******************************************/
/*! exports provided: thunk, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"thunk\", function() { return thunk; });\n/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./h */ \"./node_modules/snabbdom/es/h.js\");\n\nfunction copyToThunk(vnode, thunk) {\n    thunk.elm = vnode.elm;\n    vnode.data.fn = thunk.data.fn;\n    vnode.data.args = thunk.data.args;\n    thunk.data = vnode.data;\n    thunk.children = vnode.children;\n    thunk.text = vnode.text;\n    thunk.elm = vnode.elm;\n}\nfunction init(thunk) {\n    var cur = thunk.data;\n    var vnode = cur.fn.apply(undefined, cur.args);\n    copyToThunk(vnode, thunk);\n}\nfunction prepatch(oldVnode, thunk) {\n    var i, old = oldVnode.data, cur = thunk.data;\n    var oldArgs = old.args, args = cur.args;\n    if (old.fn !== cur.fn || oldArgs.length !== args.length) {\n        copyToThunk(cur.fn.apply(undefined, args), thunk);\n        return;\n    }\n    for (i = 0; i < args.length; ++i) {\n        if (oldArgs[i] !== args[i]) {\n            copyToThunk(cur.fn.apply(undefined, args), thunk);\n            return;\n        }\n    }\n    copyToThunk(oldVnode, thunk);\n}\nvar thunk = function thunk(sel, key, fn, args) {\n    if (args === undefined) {\n        args = fn;\n        fn = key;\n        key = undefined;\n    }\n    return Object(_h__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(sel, {\n        key: key,\n        hook: { init: init, prepatch: prepatch },\n        fn: fn,\n        args: args\n    });\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (thunk);\n//# sourceMappingURL=thunk.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/thunk.js?");

/***/ }),

/***/ "./node_modules/snabbdom/es/vnode.js":
/*!*******************************************!*\
  !*** ./node_modules/snabbdom/es/vnode.js ***!
  \*******************************************/
/*! exports provided: vnode, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vnode\", function() { return vnode; });\nfunction vnode(sel, data, children, text, elm) {\n    var key = data === undefined ? undefined : data.key;\n    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (vnode);\n//# sourceMappingURL=vnode.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/es/vnode.js?");

/***/ }),

/***/ "./node_modules/snabbdom/h.js":
/*!************************************!*\
  !*** ./node_modules/snabbdom/h.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar vnode_1 = __webpack_require__(/*! ./vnode */ \"./node_modules/snabbdom/vnode.js\");\nvar is = __webpack_require__(/*! ./is */ \"./node_modules/snabbdom/is.js\");\nfunction addNS(data, children, sel) {\n    data.ns = 'http://www.w3.org/2000/svg';\n    if (sel !== 'foreignObject' && children !== undefined) {\n        for (var i = 0; i < children.length; ++i) {\n            var childData = children[i].data;\n            if (childData !== undefined) {\n                addNS(childData, children[i].children, children[i].sel);\n            }\n        }\n    }\n}\nfunction h(sel, b, c) {\n    var data = {}, children, text, i;\n    if (c !== undefined) {\n        data = b;\n        if (is.array(c)) {\n            children = c;\n        }\n        else if (is.primitive(c)) {\n            text = c;\n        }\n        else if (c && c.sel) {\n            children = [c];\n        }\n    }\n    else if (b !== undefined) {\n        if (is.array(b)) {\n            children = b;\n        }\n        else if (is.primitive(b)) {\n            text = b;\n        }\n        else if (b && b.sel) {\n            children = [b];\n        }\n        else {\n            data = b;\n        }\n    }\n    if (children !== undefined) {\n        for (i = 0; i < children.length; ++i) {\n            if (is.primitive(children[i]))\n                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);\n        }\n    }\n    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&\n        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {\n        addNS(data, children, sel);\n    }\n    return vnode_1.vnode(sel, data, children, text, undefined);\n}\nexports.h = h;\n;\nexports.default = h;\n//# sourceMappingURL=h.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/h.js?");

/***/ }),

/***/ "./node_modules/snabbdom/htmldomapi.js":
/*!*********************************************!*\
  !*** ./node_modules/snabbdom/htmldomapi.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction createElement(tagName) {\n    return document.createElement(tagName);\n}\nfunction createElementNS(namespaceURI, qualifiedName) {\n    return document.createElementNS(namespaceURI, qualifiedName);\n}\nfunction createTextNode(text) {\n    return document.createTextNode(text);\n}\nfunction createComment(text) {\n    return document.createComment(text);\n}\nfunction insertBefore(parentNode, newNode, referenceNode) {\n    parentNode.insertBefore(newNode, referenceNode);\n}\nfunction removeChild(node, child) {\n    node.removeChild(child);\n}\nfunction appendChild(node, child) {\n    node.appendChild(child);\n}\nfunction parentNode(node) {\n    return node.parentNode;\n}\nfunction nextSibling(node) {\n    return node.nextSibling;\n}\nfunction tagName(elm) {\n    return elm.tagName;\n}\nfunction setTextContent(node, text) {\n    node.textContent = text;\n}\nfunction getTextContent(node) {\n    return node.textContent;\n}\nfunction isElement(node) {\n    return node.nodeType === 1;\n}\nfunction isText(node) {\n    return node.nodeType === 3;\n}\nfunction isComment(node) {\n    return node.nodeType === 8;\n}\nexports.htmlDomApi = {\n    createElement: createElement,\n    createElementNS: createElementNS,\n    createTextNode: createTextNode,\n    createComment: createComment,\n    insertBefore: insertBefore,\n    removeChild: removeChild,\n    appendChild: appendChild,\n    parentNode: parentNode,\n    nextSibling: nextSibling,\n    tagName: tagName,\n    setTextContent: setTextContent,\n    getTextContent: getTextContent,\n    isElement: isElement,\n    isText: isText,\n    isComment: isComment,\n};\nexports.default = exports.htmlDomApi;\n//# sourceMappingURL=htmldomapi.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/htmldomapi.js?");

/***/ }),

/***/ "./node_modules/snabbdom/is.js":
/*!*************************************!*\
  !*** ./node_modules/snabbdom/is.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.array = Array.isArray;\nfunction primitive(s) {\n    return typeof s === 'string' || typeof s === 'number';\n}\nexports.primitive = primitive;\n//# sourceMappingURL=is.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/is.js?");

/***/ }),

/***/ "./node_modules/snabbdom/modules/attributes.js":
/*!*****************************************************!*\
  !*** ./node_modules/snabbdom/modules/attributes.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar xlinkNS = 'http://www.w3.org/1999/xlink';\nvar xmlNS = 'http://www.w3.org/XML/1998/namespace';\nvar colonChar = 58;\nvar xChar = 120;\nfunction updateAttrs(oldVnode, vnode) {\n    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;\n    if (!oldAttrs && !attrs)\n        return;\n    if (oldAttrs === attrs)\n        return;\n    oldAttrs = oldAttrs || {};\n    attrs = attrs || {};\n    // update modified attributes, add new attributes\n    for (key in attrs) {\n        var cur = attrs[key];\n        var old = oldAttrs[key];\n        if (old !== cur) {\n            if (cur === true) {\n                elm.setAttribute(key, \"\");\n            }\n            else if (cur === false) {\n                elm.removeAttribute(key);\n            }\n            else {\n                if (key.charCodeAt(0) !== xChar) {\n                    elm.setAttribute(key, cur);\n                }\n                else if (key.charCodeAt(3) === colonChar) {\n                    // Assume xml namespace\n                    elm.setAttributeNS(xmlNS, key, cur);\n                }\n                else if (key.charCodeAt(5) === colonChar) {\n                    // Assume xlink namespace\n                    elm.setAttributeNS(xlinkNS, key, cur);\n                }\n                else {\n                    elm.setAttribute(key, cur);\n                }\n            }\n        }\n    }\n    // remove removed attributes\n    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)\n    // the other option is to remove all attributes with value == undefined\n    for (key in oldAttrs) {\n        if (!(key in attrs)) {\n            elm.removeAttribute(key);\n        }\n    }\n}\nexports.attributesModule = { create: updateAttrs, update: updateAttrs };\nexports.default = exports.attributesModule;\n//# sourceMappingURL=attributes.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/modules/attributes.js?");

/***/ }),

/***/ "./node_modules/snabbdom/modules/class.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/modules/class.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction updateClass(oldVnode, vnode) {\n    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;\n    if (!oldClass && !klass)\n        return;\n    if (oldClass === klass)\n        return;\n    oldClass = oldClass || {};\n    klass = klass || {};\n    for (name in oldClass) {\n        if (!klass[name]) {\n            elm.classList.remove(name);\n        }\n    }\n    for (name in klass) {\n        cur = klass[name];\n        if (cur !== oldClass[name]) {\n            elm.classList[cur ? 'add' : 'remove'](name);\n        }\n    }\n}\nexports.classModule = { create: updateClass, update: updateClass };\nexports.default = exports.classModule;\n//# sourceMappingURL=class.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/modules/class.js?");

/***/ }),

/***/ "./node_modules/snabbdom/modules/eventlisteners.js":
/*!*********************************************************!*\
  !*** ./node_modules/snabbdom/modules/eventlisteners.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction invokeHandler(handler, vnode, event) {\n    if (typeof handler === \"function\") {\n        // call function handler\n        handler.call(vnode, event, vnode);\n    }\n    else if (typeof handler === \"object\") {\n        // call handler with arguments\n        if (typeof handler[0] === \"function\") {\n            // special case for single argument for performance\n            if (handler.length === 2) {\n                handler[0].call(vnode, handler[1], event, vnode);\n            }\n            else {\n                var args = handler.slice(1);\n                args.push(event);\n                args.push(vnode);\n                handler[0].apply(vnode, args);\n            }\n        }\n        else {\n            // call multiple handlers\n            for (var i = 0; i < handler.length; i++) {\n                invokeHandler(handler[i], vnode, event);\n            }\n        }\n    }\n}\nfunction handleEvent(event, vnode) {\n    var name = event.type, on = vnode.data.on;\n    // call event handler(s) if exists\n    if (on && on[name]) {\n        invokeHandler(on[name], vnode, event);\n    }\n}\nfunction createListener() {\n    return function handler(event) {\n        handleEvent(event, handler.vnode);\n    };\n}\nfunction updateEventListeners(oldVnode, vnode) {\n    var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;\n    // optimization for reused immutable handlers\n    if (oldOn === on) {\n        return;\n    }\n    // remove existing listeners which no longer used\n    if (oldOn && oldListener) {\n        // if element changed or deleted we remove all existing listeners unconditionally\n        if (!on) {\n            for (name in oldOn) {\n                // remove listener if element was changed or existing listeners removed\n                oldElm.removeEventListener(name, oldListener, false);\n            }\n        }\n        else {\n            for (name in oldOn) {\n                // remove listener if existing listener removed\n                if (!on[name]) {\n                    oldElm.removeEventListener(name, oldListener, false);\n                }\n            }\n        }\n    }\n    // add new listeners which has not already attached\n    if (on) {\n        // reuse existing listener or create new\n        var listener = vnode.listener = oldVnode.listener || createListener();\n        // update vnode for listener\n        listener.vnode = vnode;\n        // if element changed or added we add all needed listeners unconditionally\n        if (!oldOn) {\n            for (name in on) {\n                // add listener if element was changed or new listeners added\n                elm.addEventListener(name, listener, false);\n            }\n        }\n        else {\n            for (name in on) {\n                // add listener if new listener added\n                if (!oldOn[name]) {\n                    elm.addEventListener(name, listener, false);\n                }\n            }\n        }\n    }\n}\nexports.eventListenersModule = {\n    create: updateEventListeners,\n    update: updateEventListeners,\n    destroy: updateEventListeners\n};\nexports.default = exports.eventListenersModule;\n//# sourceMappingURL=eventlisteners.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/modules/eventlisteners.js?");

/***/ }),

/***/ "./node_modules/snabbdom/modules/style.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/modules/style.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// Bindig `requestAnimationFrame` like this fixes a bug in IE/Edge. See #360 and #409.\nvar raf = (typeof window !== 'undefined' && (window.requestAnimationFrame).bind(window)) || setTimeout;\nvar nextFrame = function (fn) { raf(function () { raf(fn); }); };\nvar reflowForced = false;\nfunction setNextFrame(obj, prop, val) {\n    nextFrame(function () { obj[prop] = val; });\n}\nfunction updateStyle(oldVnode, vnode) {\n    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;\n    if (!oldStyle && !style)\n        return;\n    if (oldStyle === style)\n        return;\n    oldStyle = oldStyle || {};\n    style = style || {};\n    var oldHasDel = 'delayed' in oldStyle;\n    for (name in oldStyle) {\n        if (!style[name]) {\n            if (name[0] === '-' && name[1] === '-') {\n                elm.style.removeProperty(name);\n            }\n            else {\n                elm.style[name] = '';\n            }\n        }\n    }\n    for (name in style) {\n        cur = style[name];\n        if (name === 'delayed' && style.delayed) {\n            for (var name2 in style.delayed) {\n                cur = style.delayed[name2];\n                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {\n                    setNextFrame(elm.style, name2, cur);\n                }\n            }\n        }\n        else if (name !== 'remove' && cur !== oldStyle[name]) {\n            if (name[0] === '-' && name[1] === '-') {\n                elm.style.setProperty(name, cur);\n            }\n            else {\n                elm.style[name] = cur;\n            }\n        }\n    }\n}\nfunction applyDestroyStyle(vnode) {\n    var style, name, elm = vnode.elm, s = vnode.data.style;\n    if (!s || !(style = s.destroy))\n        return;\n    for (name in style) {\n        elm.style[name] = style[name];\n    }\n}\nfunction applyRemoveStyle(vnode, rm) {\n    var s = vnode.data.style;\n    if (!s || !s.remove) {\n        rm();\n        return;\n    }\n    if (!reflowForced) {\n        vnode.elm.offsetLeft;\n        reflowForced = true;\n    }\n    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];\n    for (name in style) {\n        applied.push(name);\n        elm.style[name] = style[name];\n    }\n    compStyle = getComputedStyle(elm);\n    var props = compStyle['transition-property'].split(', ');\n    for (; i < props.length; ++i) {\n        if (applied.indexOf(props[i]) !== -1)\n            amount++;\n    }\n    elm.addEventListener('transitionend', function (ev) {\n        if (ev.target === elm)\n            --amount;\n        if (amount === 0)\n            rm();\n    });\n}\nfunction forceReflow() {\n    reflowForced = false;\n}\nexports.styleModule = {\n    pre: forceReflow,\n    create: updateStyle,\n    update: updateStyle,\n    destroy: applyDestroyStyle,\n    remove: applyRemoveStyle\n};\nexports.default = exports.styleModule;\n//# sourceMappingURL=style.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/modules/style.js?");

/***/ }),

/***/ "./node_modules/snabbdom/tovnode.js":
/*!******************************************!*\
  !*** ./node_modules/snabbdom/tovnode.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar vnode_1 = __webpack_require__(/*! ./vnode */ \"./node_modules/snabbdom/vnode.js\");\nvar htmldomapi_1 = __webpack_require__(/*! ./htmldomapi */ \"./node_modules/snabbdom/htmldomapi.js\");\nfunction toVNode(node, domApi) {\n    var api = domApi !== undefined ? domApi : htmldomapi_1.default;\n    var text;\n    if (api.isElement(node)) {\n        var id = node.id ? '#' + node.id : '';\n        var cn = node.getAttribute('class');\n        var c = cn ? '.' + cn.split(' ').join('.') : '';\n        var sel = api.tagName(node).toLowerCase() + id + c;\n        var attrs = {};\n        var children = [];\n        var name_1;\n        var i = void 0, n = void 0;\n        var elmAttrs = node.attributes;\n        var elmChildren = node.childNodes;\n        for (i = 0, n = elmAttrs.length; i < n; i++) {\n            name_1 = elmAttrs[i].nodeName;\n            if (name_1 !== 'id' && name_1 !== 'class') {\n                attrs[name_1] = elmAttrs[i].nodeValue;\n            }\n        }\n        for (i = 0, n = elmChildren.length; i < n; i++) {\n            children.push(toVNode(elmChildren[i], domApi));\n        }\n        return vnode_1.default(sel, { attrs: attrs }, children, undefined, node);\n    }\n    else if (api.isText(node)) {\n        text = api.getTextContent(node);\n        return vnode_1.default(undefined, undefined, undefined, text, node);\n    }\n    else if (api.isComment(node)) {\n        text = api.getTextContent(node);\n        return vnode_1.default('!', {}, [], text, node);\n    }\n    else {\n        return vnode_1.default('', {}, [], undefined, node);\n    }\n}\nexports.toVNode = toVNode;\nexports.default = toVNode;\n//# sourceMappingURL=tovnode.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/tovnode.js?");

/***/ }),

/***/ "./node_modules/snabbdom/vnode.js":
/*!****************************************!*\
  !*** ./node_modules/snabbdom/vnode.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction vnode(sel, data, children, text, elm) {\n    var key = data === undefined ? undefined : data.key;\n    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };\n}\nexports.vnode = vnode;\nexports.default = vnode;\n//# sourceMappingURL=vnode.js.map\n\n//# sourceURL=webpack:///./node_modules/snabbdom/vnode.js?");

/***/ }),

/***/ "./update/index.js":
/*!*************************!*\
  !*** ./update/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Common = __webpack_require__(/*! ../../common/update */ \"../common/update/index.js\")\r\n\r\nconst update = (state, action) => {\r\n  if (action.type == 'node_data') state.node_data = action.data\r\n  state = Common(state, action)\r\n  return state\r\n}\r\n\r\nmodule.exports = update\n\n//# sourceURL=webpack:///./update/index.js?");

/***/ }),

/***/ "./view/index.js":
/*!***********************!*\
  !*** ./view/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"./node_modules/snabbdom/h.js\").default\r\nconst Info = __webpack_require__(/*! ../../common/view/info */ \"../common/view/info/index.js\")\r\nconst Actions = __webpack_require__(/*! ../../common/view/actions */ \"../common/view/actions/index.js\")\r\n\r\nconst view = (state, send) => \r\n  H('body', H('div#container', state.node_data ? [\r\n    H('div.column', [\r\n      H('div.title', 'Info'),\r\n      Info(state, send, state.node_data)\r\n    ]),\r\n    H('div.column', [\r\n      H('div.title', 'Actions'),\r\n      Actions(state, send, state.node_data)\r\n    ])\r\n  ] : H('div.title', 'Loading data...')))\r\n\r\nmodule.exports = view\n\n//# sourceURL=webpack:///./view/index.js?");

/***/ })

/******/ });