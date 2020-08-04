/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./common/effect/actionfollowup.js":
/*!*****************************************!*\
  !*** ./common/effect/actionfollowup.js ***!
  \*****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GenerateQuery = __webpack_require__(/*! ./generatequery */ \"./common/effect/generatequery.js\")\r\n\r\nconst fetch_followup = action => fetch(`/action_followup?${GenerateQuery({\r\n  action: action.action, \r\n  function: action.followups[action.followups.length - 1].followup, \r\n  node_id: action.node_id, \r\n  label: action.followups[action.followups.length - 1].label\r\n})}`, {method: 'POST'})\r\n\r\nconst actionFollowup = (state, action, send) => {\r\n  fetch_followup(action)\r\n    .then(res => res.json())\r\n    .then(res => {\r\n      send({...action, type: 'action_followup_result', result: res.result, hostname: action.host, date: res.date})\r\n      if (action.followups && action.refresh && !res.result.length) { // TODO: maybe 0 results isn't always a good indication of needing to refresh?\r\n        if (action.followups.length === 1) {\r\n          send({\r\n            ...action,\r\n            refresh: false,\r\n            type: 'perform_action',\r\n            followup: action.followups[0],\r\n          })\r\n        }\r\n        else {\r\n          let action_result = state.action_results[action.host][action.action]\r\n          const followups = action.followups.slice(0, action.followups.length - 1)\r\n          for (const key of followups) {\r\n            action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]\r\n          }\r\n          send({\r\n            ...action,\r\n            refresh: false,\r\n            type: 'action_followup',\r\n            followups,\r\n            followup: action.followups[action.followups.length - 1]\r\n          })\r\n        }\r\n      }\r\n    })  \r\n\r\n}\r\n\r\nmodule.exports = actionFollowup\n\n//# sourceURL=webpack://front/./common/effect/actionfollowup.js?");

/***/ }),

/***/ "./common/effect/fetchscripts.js":
/*!***************************************!*\
  !*** ./common/effect/fetchscripts.js ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const fetchScripts = (send, type) => {\r\n  fetch(`/${type}`)\r\n  .then(res => res.json())\r\n  .then(res => send({type, [type]: res}))\r\n}\r\n\r\nmodule.exports = fetchScripts\n\n//# sourceURL=webpack://front/./common/effect/fetchscripts.js?");

/***/ }),

/***/ "./common/effect/generatequery.js":
/*!****************************************!*\
  !*** ./common/effect/generatequery.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const generateQuery = obj => Object.entries(obj).map(v => {\r\n  const value = Array.isArray(v[1]) ? `[${v[1]}]` : v[1]\r\n  return `${v[0]}=${value}`\r\n}).join('&')\r\n\r\nmodule.exports = generateQuery\n\n//# sourceURL=webpack://front/./common/effect/generatequery.js?");

/***/ }),

/***/ "./common/effect/index.js":
/*!********************************!*\
  !*** ./common/effect/index.js ***!
  \********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const ActionFollowup = __webpack_require__(/*! ./actionfollowup */ \"./common/effect/actionfollowup.js\")\r\nconst GenerateQuery = __webpack_require__(/*! ./generatequery */ \"./common/effect/generatequery.js\")\r\n\r\nconst effect = (state, action, send) => {\r\n  if (action.type == 'perform_action') fetch(`/actions?${GenerateQuery({action: action.action, node_id: action.node_id})}`, {method: 'POST'})\r\n    .then(res => res.json())\r\n    .then(res => send({...action, type: 'action_result', result: res.result, hostname: action.host, date: res.date}))\r\n  if (action.type == 'action_followup') ActionFollowup(state, action, send)\r\n}\r\n\r\nmodule.exports = effect\n\n//# sourceURL=webpack://front/./common/effect/index.js?");

/***/ }),

/***/ "./common/effect/loadnoderesults.js":
/*!******************************************!*\
  !*** ./common/effect/loadnoderesults.js ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GenerateQuery = __webpack_require__(/*! ./generatequery */ \"./common/effect/generatequery.js\")\r\n\r\nconst load_followup = (action, send, node, results, followups) => {\r\n  const row = results.find(v => v.node_id === node.node_id && v.action === action && v.function === followups[followups.length - 1].followup && v.label === followups[followups.length - 1].label)\r\n  if (!row) return\r\n  const result = JSON.parse(row.result)\r\n  send({\r\n    type: 'action_followup_result',\r\n    action,\r\n    result,\r\n    hostname: node.hostname,\r\n    date: row.date,\r\n    followups\r\n  })\r\n  send({\r\n    type: 'followup_foldout',\r\n    action,\r\n    hostname: node.hostname,\r\n    date: row.date,\r\n    followups,\r\n    value: false\r\n  })\r\n  result.forEach((r, i) => {\r\n    if (!r.followups) return\r\n    Object.values(r.followups).forEach(f => load_followup(action, send, node, results, [...followups, {label: r.label, followup: f.function}], ))\r\n  })\r\n}\r\n\r\nconst loadNodeResults = (nodes, send) => {\r\n  fetch(`/results?${GenerateQuery({nodes: nodes.map(v => v.node_id)})}`)\r\n  .then(res => res.json())\r\n  .then(res => {\r\n    res.filter(v => v.function === 'run').forEach(v => {\r\n      const node = nodes.find(n => n.node_id === v.node_id)\r\n      const result = JSON.parse(v.result)\r\n      send({\r\n        type: 'action_result',\r\n        action: v.action,\r\n        result,\r\n        hostname: node.hostname,\r\n        date: v.date\r\n      })\r\n      send({\r\n        type: 'result_foldout',\r\n        action: v.action,\r\n        result,\r\n        hostname: node.hostname,\r\n        value: false\r\n      })\r\n      result.forEach((r, i) => {\r\n        if (!r.followups) return\r\n        Object.values(r.followups).forEach(f => load_followup(v.action, send, node, res, [{label: r.label, followup: f.function}]))\r\n      })\r\n    })\r\n  })\r\n}\r\n\r\nmodule.exports = loadNodeResults\n\n//# sourceURL=webpack://front/./common/effect/loadnoderesults.js?");

/***/ }),

/***/ "./common/node_modules/snabbdom/h.js":
/*!*******************************************!*\
  !*** ./common/node_modules/snabbdom/h.js ***!
  \*******************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export h [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar vnode_1 = __webpack_require__(/*! ./vnode */ \"./common/node_modules/snabbdom/vnode.js\");\nvar is = __webpack_require__(/*! ./is */ \"./common/node_modules/snabbdom/is.js\");\nfunction addNS(data, children, sel) {\n    data.ns = 'http://www.w3.org/2000/svg';\n    if (sel !== 'foreignObject' && children !== undefined) {\n        for (var i = 0; i < children.length; ++i) {\n            var childData = children[i].data;\n            if (childData !== undefined) {\n                addNS(childData, children[i].children, children[i].sel);\n            }\n        }\n    }\n}\nfunction h(sel, b, c) {\n    var data = {}, children, text, i;\n    if (c !== undefined) {\n        data = b;\n        if (is.array(c)) {\n            children = c;\n        }\n        else if (is.primitive(c)) {\n            text = c;\n        }\n        else if (c && c.sel) {\n            children = [c];\n        }\n    }\n    else if (b !== undefined) {\n        if (is.array(b)) {\n            children = b;\n        }\n        else if (is.primitive(b)) {\n            text = b;\n        }\n        else if (b && b.sel) {\n            children = [b];\n        }\n        else {\n            data = b;\n        }\n    }\n    if (children !== undefined) {\n        for (i = 0; i < children.length; ++i) {\n            if (is.primitive(children[i]))\n                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);\n        }\n    }\n    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&\n        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {\n        addNS(data, children, sel);\n    }\n    return vnode_1.vnode(sel, data, children, text, undefined);\n}\nexports.h = h;\n;\nexports.default = h;\n//# sourceMappingURL=h.js.map\n\n//# sourceURL=webpack://front/./common/node_modules/snabbdom/h.js?");

/***/ }),

/***/ "./common/node_modules/snabbdom/is.js":
/*!********************************************!*\
  !*** ./common/node_modules/snabbdom/is.js ***!
  \********************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export array [provided] [no usage info] [missing usage info prevents renaming] */
/*! export primitive [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.array = Array.isArray;\nfunction primitive(s) {\n    return typeof s === 'string' || typeof s === 'number';\n}\nexports.primitive = primitive;\n//# sourceMappingURL=is.js.map\n\n//# sourceURL=webpack://front/./common/node_modules/snabbdom/is.js?");

/***/ }),

/***/ "./common/node_modules/snabbdom/vnode.js":
/*!***********************************************!*\
  !*** ./common/node_modules/snabbdom/vnode.js ***!
  \***********************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export vnode [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nfunction vnode(sel, data, children, text, elm) {\n    var key = data === undefined ? undefined : data.key;\n    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };\n}\nexports.vnode = vnode;\nexports.default = vnode;\n//# sourceMappingURL=vnode.js.map\n\n//# sourceURL=webpack://front/./common/node_modules/snabbdom/vnode.js?");

/***/ }),

/***/ "./common/update/actionfollowup.js":
/*!*****************************************!*\
  !*** ./common/update/actionfollowup.js ***!
  \*****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const actionFollowup = (state, action) => {\r\n  let action_result = state.action_results[action.host][action.action]\r\n  for (const key of action.followups) {\r\n    action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]\r\n  }\r\n  action_result.status = 'loading'\r\n  action_result.requests = (action_result.requests || 0) + 1 // track the number of requests we're waiting for relating to this followup\r\n}\r\n\r\nmodule.exports = actionFollowup\n\n//# sourceURL=webpack://front/./common/update/actionfollowup.js?");

/***/ }),

/***/ "./common/update/actionresult.js":
/*!***************************************!*\
  !*** ./common/update/actionresult.js ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const actionResult = (state, action) => {\r\n  if (Array.isArray(action.result) && !action.result.length) action.result = undefined\r\n  if (!state.action_results[action.hostname]) {\r\n    state.action_results[action.hostname] = {}\r\n  }\r\n  if (!state.action_results[action.hostname][action.action]) {\r\n    state.action_results[action.hostname][action.action] = {}\r\n  }\r\n  const action_result = state.action_results[action.hostname][action.action]\r\n  if (action.followup) {\r\n    action_result.result.find(v => v.label === action.followup.label).followups[action.followup.followup] = action.result.find(v => v.label === action.followup.label).followups[action.followup.followup]\r\n  }\r\n  else action_result.result = action.result\r\n  action_result.foldout = action.result ? true : undefined\r\n  action_result.status = 'loaded'\r\n  action_result.date = action.date\r\n}\r\n\r\nmodule.exports = actionResult\n\n//# sourceURL=webpack://front/./common/update/actionresult.js?");

/***/ }),

/***/ "./common/update/followupfoldout.js":
/*!******************************************!*\
  !*** ./common/update/followupfoldout.js ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const followupFoldout = (state, action) => {\r\n  let action_result = state.action_results[action.hostname][action.action]\r\n  for (const key of action.followups) {\r\n    action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]\r\n  }\r\n  action_result.foldout = action.value\r\n}\r\n\r\nmodule.exports = followupFoldout\n\n//# sourceURL=webpack://front/./common/update/followupfoldout.js?");

/***/ }),

/***/ "./common/update/followupresult.js":
/*!*****************************************!*\
  !*** ./common/update/followupresult.js ***!
  \*****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const followupResult = (state, action) => {\r\n  if (Array.isArray(action.result) && !action.result.length) action.result = undefined\r\n  let action_result = state.action_results[action.hostname][action.action]\r\n  for (const key of action.followups) {\r\n    action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]\r\n  }\r\n  if (action.followup) {\r\n    if (action.result) action_result.result.find(v => v.label === action.followup.label).followups[action.followup.followup] = action.result.find(v => v.label === action.followup.label).followups[action.followup.followup]\r\n  }\r\n  else action_result.result = action.result\r\n  action_result.foldout = true\r\n  action_result.requests && action_result.requests-- // we may not have any requests if we're loading the result from the history so we have to check it\r\n  if (!action_result.requests) action_result.status = 'loaded'\r\n  action_result.date = action.date\r\n}\r\n\r\nmodule.exports = followupResult\n\n//# sourceURL=webpack://front/./common/update/followupresult.js?");

/***/ }),

/***/ "./common/update/index.js":
/*!********************************!*\
  !*** ./common/update/index.js ***!
  \********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const PerformAction = __webpack_require__(/*! ./performaction */ \"./common/update/performaction.js\")\r\nconst ActionResult = __webpack_require__(/*! ./actionresult */ \"./common/update/actionresult.js\")\r\nconst ActionFollowup = __webpack_require__(/*! ./actionfollowup */ \"./common/update/actionfollowup.js\")\r\nconst FollowupFoldout = __webpack_require__(/*! ./followupfoldout */ \"./common/update/followupfoldout.js\")\r\nconst FollowupResult = __webpack_require__(/*! ./followupresult */ \"./common/update/followupresult.js\")\r\n\r\nconst update = (state, action) => {\r\n  if (action.type == 'actions') state.actions = action.actions\r\n  if (action.type == 'commands') state.commands = action.commands\r\n  if (action.type == 'quests') state.quests = action.quests\r\n  if (action.type == 'tests') state.tests = action.tests\r\n  if (action.type == 'perform_action') PerformAction(state, action)\r\n  if (action.type == 'action_result') ActionResult(state, action)\r\n  if (action.type == 'result_foldout') state.action_results[action.hostname][action.action].foldout = action.value\r\n  if (action.type == 'action_followup') ActionFollowup(state, action)\r\n  if (action.type == 'action_followup_result') FollowupResult(state, action)\r\n  if (action.type == 'followup_foldout') FollowupFoldout(state, action)\r\n\r\n  return state\r\n}\r\n\r\nmodule.exports = update\n\n//# sourceURL=webpack://front/./common/update/index.js?");

/***/ }),

/***/ "./common/update/performaction.js":
/*!****************************************!*\
  !*** ./common/update/performaction.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const performAction = (state, action) => {\r\n  if (!state.action_results[action.host]) {\r\n    state.action_results[action.host] = {}\r\n  }\r\n  if (!state.action_results[action.host][action.action]) {\r\n    state.action_results[action.host][action.action] = {}\r\n  }\r\n  state.action_results[action.host][action.action].status = 'loading'\r\n}\r\n\r\nmodule.exports = performAction\n\n//# sourceURL=webpack://front/./common/update/performaction.js?");

/***/ }),

/***/ "./common/util/datestring.js":
/*!***********************************!*\
  !*** ./common/util/datestring.js ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const unit_string = (amount, unit) => `${amount} ${unit}${amount === 1 ? '' : 's'}`\r\n\r\nconst dateString = minutes => {\r\n  minutes = Math.round(minutes)\r\n  if (minutes < 60) return unit_string(minutes, 'minute')\r\n  const hours = Math.floor(minutes / 60)\r\n  const minutes_remainder = minutes % 60\r\n  if (hours < 24) {\r\n    if (minutes_remainder) return `${unit_string(hours, 'hour')} and ${unit_string(minutes_remainder, 'minute')}`\r\n    return `${unit_string(hours, 'hour')}`\r\n  }\r\n  const days = Math.floor(hours / 24)\r\n  const hours_remainder = hours % 24\r\n  return `${unit_string(days, 'day')}${hours_remainder ? `, ${unit_string(hours_remainder, 'hour')}` : ''}${minutes_remainder ? `, ${unit_string(minutes_remainder, 'minute')}` : ''}`\r\n}\r\n\r\nmodule.exports = dateString\n\n//# sourceURL=webpack://front/./common/util/datestring.js?");

/***/ }),

/***/ "./common/util/hoststring.js":
/*!***********************************!*\
  !*** ./common/util/hoststring.js ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const hostString = host => {\r\n  if (host == 'local') return 'local host'\r\n  if (host == 'remote') return 'host with PowerShell remote access'\r\n}\r\n\r\nmodule.exports = hostString\n\n//# sourceURL=webpack://front/./common/util/hoststring.js?");

/***/ }),

/***/ "./common/util/ipaddress.js":
/*!**********************************!*\
  !*** ./common/util/ipaddress.js ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const ipAddress = (ip, port) => `${(ip.includes(':') ? `[${ip}]` : ip)}:${port}`\r\n\r\nmodule.exports = ipAddress\n\n//# sourceURL=webpack://front/./common/util/ipaddress.js?");

/***/ }),

/***/ "./common/util/timeago.js":
/*!********************************!*\
  !*** ./common/util/timeago.js ***!
  \********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const DateString = __webpack_require__(/*! ./datestring */ \"./common/util/datestring.js\")\r\n\r\nconst timeAgo = date => {\r\n  const diff = Date.now() - date\r\n  if (diff < 60000) return 'just now'\r\n  return `${DateString(diff / 1000 / 60)} ago`\r\n}\r\n\r\nmodule.exports = timeAgo\n\n//# sourceURL=webpack://front/./common/util/timeago.js?");

/***/ }),

/***/ "./common/view/actions/index.js":
/*!**************************************!*\
  !*** ./common/view/actions/index.js ***!
  \**************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/h.js\").default\r\nconst HostString = __webpack_require__(/*! ../../util/hoststring */ \"./common/util/hoststring.js\")\r\nconst Result = __webpack_require__(/*! ./result */ \"./common/view/actions/result.js\")\r\nconst TimeAgo = __webpack_require__(/*! ../../util/timeago */ \"./common/util/timeago.js\")\r\n\r\nconst actions = (state, send, node) => {\r\n  if (!state.actions) return\r\n  const actions = Object.entries(state.actions).filter(v => v[1].hosts.includes('none') || v[1].hosts.includes(node.access)) \r\n  return H('div.scroll_container',\r\n    H('div.scroll spaced', !actions.length ? H('div.scroll_item', 'No actions compatible with this host') : actions.map(v => {\r\n      const loading = state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] && state.action_results[node.hostname][v[0]].status === 'loading'\r\n      return H('div.scroll_item spaced', [\r\n        H('div.item', [\r\n          H('h3', v[1].name),\r\n          H('div.button', \r\n            { \r\n              on: loading ? undefined : {click: [send, {type: 'perform_action', action: v[0], node_id: node.node_id, host: node.hostname}]},\r\n              class: {loading}\r\n            }, \r\n            loading ? 'Running...' : 'Run')\r\n        ]),\r\n        H('pre', v[1].commands.run),\r\n        v[1].description ? v[1].description : undefined,\r\n        H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`]),\r\n        state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] && state.action_results[node.hostname][v[0]].result ? H('div.results', [\r\n          H('div.followup', [\r\n            `Results from ${TimeAgo(state.action_results[node.hostname][v[0]].date)}`, \r\n            H(`div.foldout fas fa-${state.action_results[node.hostname][v[0]].foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {\r\n              on: {click: [send, {type: 'result_foldout', action: v[0], hostname: node.hostname, value: !state.action_results[node.hostname][v[0]].foldout}]}\r\n            })\r\n          ]),\r\n          ...(state.action_results[node.hostname][v[0]].foldout ? state.action_results[node.hostname][v[0]].result\r\n            .map((r, i) => Result(state, v[0], r, i, node.node_id, node.hostname, loading, send)) : [])\r\n        ]) : undefined\r\n      ])\r\n    }))\r\n  )\r\n}\r\n\r\nmodule.exports = actions\n\n//# sourceURL=webpack://front/./common/view/actions/index.js?");

/***/ }),

/***/ "./common/view/actions/result.js":
/*!***************************************!*\
  !*** ./common/view/actions/result.js ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/h.js\").default\r\nconst TimeAgo = __webpack_require__(/*! ../../util/timeago */ \"./common/util/timeago.js\")\r\nconst FormatString = __webpack_require__(/*! fantastic-utils/formatstring */ \"../packages/fantastic-utils/formatstring.js\")\r\n\r\nconst format_value = value => {\r\n  if (typeof value === 'object') {\r\n    if (value.date) return TimeAgo(value.date)\r\n  }\r\n  return `${value}`\r\n}\r\n\r\nconst result = (state, action, action_result, index, node_id, host, loading, send, followups = []) => H('div.result', [\r\n  action_result.label ? H('h4', action_result.label) : undefined,\r\n  ...(action_result.result ? action_result.result.map(v => H('div.item', format_value(v))) : []),\r\n  ...(action_result.followups ? Object.values(action_result.followups).map(v => {\r\n    const followup_label = v.label || (typeof v.enabled == 'boolean' && (v.enabled ? 'Enabled' : 'Disabled')) || state.actions[action].names[v.function]\r\n    if (v.not_permitted) return H('div.item', followup_label)\r\n    const loading_followup = loading || v.status === 'loading'\r\n    const disabled = !loading_followup && typeof v.enabled !== 'undefined' && !v.enabled\r\n    return [\r\n      H('div.button', \r\n        {\r\n          on: loading_followup ? {} : {\r\n            click: [\r\n              send, \r\n              {\r\n                type: 'action_followup', \r\n                action,\r\n                node_id,\r\n                host,\r\n                followups: [...followups, {index, followup: v.function, label: action_result.label}],\r\n                refresh: true,\r\n                date: Date.now()\r\n              }\r\n            ]\r\n          },\r\n          class: {loading: loading_followup, disabled}\r\n        }, \r\n        (loading_followup && 'Running...') || followup_label\r\n      ),\r\n      H('pre', FormatString(state.actions[action].commands[v.function], v.data))//format_command(state.actions[action].commands[v.function], v.data))\r\n    ]\r\n  }).flat() : []),\r\n  ...(action_result.followups ? Object.values(action_result.followups)\r\n  .filter(v => v.result)\r\n  .map(v => {\r\n    return H('div', [\r\n      H('div.result_time', [\r\n        H('h4', v.label || (typeof v.enabled == 'boolean' && (v.enabled ? 'Enable' : 'Disable')) || state.actions[action].names[v.function]),\r\n        H('div.time', [\r\n          ` Results from ${TimeAgo(v.date)}`, \r\n          H(`div.foldout fas fa-${v.foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {\r\n            on: {click: [send, {\r\n              type: 'followup_foldout',\r\n              action,\r\n              node_id,\r\n              hostname: host,\r\n              followups: [...followups, {index, followup: v.function, label: action_result.label}],\r\n              value: !v.foldout\r\n            }]}\r\n          })\r\n        ])\r\n      ]),\r\n      ...(v.foldout ? v.result.map((r, i) => \r\n        result(state, action, r, i, node_id, host, loading || v.status === 'loading', send, [...followups, {index, followup: v.function, label: action_result.label}])\r\n      ) : [])\r\n    ])\r\n  }).flat() : [])\r\n])\r\n\r\n\r\nmodule.exports = result\n\n//# sourceURL=webpack://front/./common/view/actions/result.js?");

/***/ }),

/***/ "./common/view/connections.js":
/*!************************************!*\
  !*** ./common/view/connections.js ***!
  \************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/h.js\").default\r\nconst IPAddress = __webpack_require__(/*! ../util/ipaddress */ \"./common/util/ipaddress.js\")\r\n\r\nconst connections = (connections, label) => \r\n  [\r\n    H('h4', [label || 'Connections', ` (${connections.length}):`].flat()),\r\n    connections.length ? H('div.scroll', connections.map(v => H('div.scroll_item', [\r\n      H('div.item', `Local address: ${IPAddress(v.local_address, v.local_port)}`),\r\n      H('div.item', `Remote address: ${IPAddress(v.remote_address, v.remote_port)}`),\r\n      H('div.item', `Process: ${v.process.name}`),\r\n      H('div.item', `State: ${v.state.replace('_', ' ')}`)\r\n    ]))) : undefined\r\n  ]\r\n\r\n\r\nmodule.exports = connections\n\n//# sourceURL=webpack://front/./common/view/connections.js?");

/***/ }),

/***/ "./common/view/info/index.js":
/*!***********************************!*\
  !*** ./common/view/info/index.js ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/h.js\").default\r\nconst NodeTop = __webpack_require__(/*! ./nodetop */ \"./common/view/info/nodetop.js\")\r\nconst Connections = __webpack_require__(/*! ../connections */ \"./common/view/connections.js\")\r\n\r\nconst info = (state, send, node) => H('div.scroll_container', [\r\n    NodeTop(node),\r\n    ...Connections(node.connections)\r\n  ])\r\n\r\nmodule.exports = info\n\n//# sourceURL=webpack://front/./common/view/info/index.js?");

/***/ }),

/***/ "./common/view/info/nodetop.js":
/*!*************************************!*\
  !*** ./common/view/info/nodetop.js ***!
  \*************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/h.js\").default\r\nconst DefaultIPs = __webpack_require__(/*! fantastic-utils/defaultips */ \"../packages/fantastic-utils/defaultips.js\")\r\n\r\nconst node_type = node => {\r\n  if (!node.important) return 'Host outside my network'\r\n  if (node.access === 'local') return 'Local host'\r\n  if (node.access === 'remote') return 'Remote host with PowerShell access configured'\r\n  return 'Host on my network without remote access'\r\n}\r\n\r\nconst nodeTop = node => \r\n  H('div.section', [\r\n    H('h3', node_type(node)),\r\n    node.hostname || node.os ? H('div', [\r\n      node.hostname ? H('div.item', `Hostname: ${node.hostname}`) : undefined,\r\n      node.os ? H('div.item', `Operating System: ${node.os}`) : undefined\r\n    ]) : undefined,\r\n    node.macs && node.macs.length ? H('div', [\r\n      H('h4', 'MAC Addresses:'),\r\n      ...node.macs.map(v => H('div.item', `${v.mac} (${v.vendor})`))\r\n    ]) : undefined,\r\n    H('div', [\r\n      H('h4', 'IP Addresses:'),\r\n      ...node.ips.map(v => DefaultIPs.includes(v) ? undefined : H('div.item', v))\r\n    ])\r\n  ])\r\n\r\nmodule.exports = nodeTop\n\n//# sourceURL=webpack://front/./common/view/info/nodetop.js?");

/***/ }),

/***/ "./node_viewer/effect/index.js":
/*!*************************************!*\
  !*** ./node_viewer/effect/index.js ***!
  \*************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Common = __webpack_require__(/*! ../../common/effect */ \"./common/effect/index.js\")\r\nconst LoadNodeResults = __webpack_require__(/*! ../../common/effect/loadnoderesults */ \"./common/effect/loadnoderesults.js\")\r\nconst FetchScripts = __webpack_require__(/*! ../../common/effect/fetchscripts */ \"./common/effect/fetchscripts.js\")\r\n\r\nconst effect = (state, action, send) => {\r\n  Common(state, action, send)\r\n  if (action.type == 'init') FetchScripts(send, 'actions')\r\n  if (action.type == 'node_data') LoadNodeResults([action.data], send)\r\n}\r\n\r\nmodule.exports = effect\n\n//# sourceURL=webpack://front/./node_viewer/effect/index.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/es/h.js":
/*!***************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/es/h.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export h [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"h\": () => /* binding */ h,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ \"./node_viewer/node_modules/snabbdom/es/vnode.js\");\n/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ \"./node_viewer/node_modules/snabbdom/es/is.js\");\n\n\nfunction addNS(data, children, sel) {\n    data.ns = 'http://www.w3.org/2000/svg';\n    if (sel !== 'foreignObject' && children !== undefined) {\n        for (var i = 0; i < children.length; ++i) {\n            var childData = children[i].data;\n            if (childData !== undefined) {\n                addNS(childData, children[i].children, children[i].sel);\n            }\n        }\n    }\n}\nfunction h(sel, b, c) {\n    var data = {}, children, text, i;\n    if (c !== undefined) {\n        data = b;\n        if (_is__WEBPACK_IMPORTED_MODULE_1__.array(c)) {\n            children = c;\n        }\n        else if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(c)) {\n            text = c;\n        }\n        else if (c && c.sel) {\n            children = [c];\n        }\n    }\n    else if (b !== undefined) {\n        if (_is__WEBPACK_IMPORTED_MODULE_1__.array(b)) {\n            children = b;\n        }\n        else if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(b)) {\n            text = b;\n        }\n        else if (b && b.sel) {\n            children = [b];\n        }\n        else {\n            data = b;\n        }\n    }\n    if (children !== undefined) {\n        for (i = 0; i < children.length; ++i) {\n            if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(children[i]))\n                children[i] = (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.vnode)(undefined, undefined, undefined, children[i], undefined);\n        }\n    }\n    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&\n        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {\n        addNS(data, children, sel);\n    }\n    return (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.vnode)(sel, data, children, text, undefined);\n}\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (h);\n//# sourceMappingURL=h.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/es/h.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/es/htmldomapi.js":
/*!************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/es/htmldomapi.js ***!
  \************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export htmlDomApi [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"htmlDomApi\": () => /* binding */ htmlDomApi,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nfunction createElement(tagName) {\n    return document.createElement(tagName);\n}\nfunction createElementNS(namespaceURI, qualifiedName) {\n    return document.createElementNS(namespaceURI, qualifiedName);\n}\nfunction createTextNode(text) {\n    return document.createTextNode(text);\n}\nfunction createComment(text) {\n    return document.createComment(text);\n}\nfunction insertBefore(parentNode, newNode, referenceNode) {\n    parentNode.insertBefore(newNode, referenceNode);\n}\nfunction removeChild(node, child) {\n    node.removeChild(child);\n}\nfunction appendChild(node, child) {\n    node.appendChild(child);\n}\nfunction parentNode(node) {\n    return node.parentNode;\n}\nfunction nextSibling(node) {\n    return node.nextSibling;\n}\nfunction tagName(elm) {\n    return elm.tagName;\n}\nfunction setTextContent(node, text) {\n    node.textContent = text;\n}\nfunction getTextContent(node) {\n    return node.textContent;\n}\nfunction isElement(node) {\n    return node.nodeType === 1;\n}\nfunction isText(node) {\n    return node.nodeType === 3;\n}\nfunction isComment(node) {\n    return node.nodeType === 8;\n}\nvar htmlDomApi = {\n    createElement: createElement,\n    createElementNS: createElementNS,\n    createTextNode: createTextNode,\n    createComment: createComment,\n    insertBefore: insertBefore,\n    removeChild: removeChild,\n    appendChild: appendChild,\n    parentNode: parentNode,\n    nextSibling: nextSibling,\n    tagName: tagName,\n    setTextContent: setTextContent,\n    getTextContent: getTextContent,\n    isElement: isElement,\n    isText: isText,\n    isComment: isComment,\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (htmlDomApi);\n//# sourceMappingURL=htmldomapi.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/es/htmldomapi.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/es/is.js":
/*!****************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/es/is.js ***!
  \****************************************************/
/*! namespace exports */
/*! export array [provided] [no usage info] [missing usage info prevents renaming] */
/*! export primitive [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"array\": () => /* binding */ array,\n/* harmony export */   \"primitive\": () => /* binding */ primitive\n/* harmony export */ });\nvar array = Array.isArray;\nfunction primitive(s) {\n    return typeof s === 'string' || typeof s === 'number';\n}\n//# sourceMappingURL=is.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/es/is.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/es/snabbdom.js":
/*!**********************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/es/snabbdom.js ***!
  \**********************************************************/
/*! namespace exports */
/*! export h [provided] [no usage info] [missing usage info prevents renaming] */
/*! export init [provided] [no usage info] [missing usage info prevents renaming] */
/*! export thunk [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"h\": () => /* reexport safe */ _h__WEBPACK_IMPORTED_MODULE_3__.h,\n/* harmony export */   \"thunk\": () => /* reexport safe */ _thunk__WEBPACK_IMPORTED_MODULE_4__.thunk,\n/* harmony export */   \"init\": () => /* binding */ init\n/* harmony export */ });\n/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ \"./node_viewer/node_modules/snabbdom/es/vnode.js\");\n/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ \"./node_viewer/node_modules/snabbdom/es/is.js\");\n/* harmony import */ var _htmldomapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./htmldomapi */ \"./node_viewer/node_modules/snabbdom/es/htmldomapi.js\");\n/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./h */ \"./node_viewer/node_modules/snabbdom/es/h.js\");\n/* harmony import */ var _thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./thunk */ \"./node_viewer/node_modules/snabbdom/es/thunk.js\");\n\n\n\nfunction isUndef(s) { return s === undefined; }\nfunction isDef(s) { return s !== undefined; }\nvar emptyNode = (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.default)('', {}, [], undefined, undefined);\nfunction sameVnode(vnode1, vnode2) {\n    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;\n}\nfunction isVnode(vnode) {\n    return vnode.sel !== undefined;\n}\nfunction createKeyToOldIdx(children, beginIdx, endIdx) {\n    var i, map = {}, key, ch;\n    for (i = beginIdx; i <= endIdx; ++i) {\n        ch = children[i];\n        if (ch != null) {\n            key = ch.key;\n            if (key !== undefined)\n                map[key] = i;\n        }\n    }\n    return map;\n}\nvar hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];\n\n\nfunction init(modules, domApi) {\n    var i, j, cbs = {};\n    var api = domApi !== undefined ? domApi : _htmldomapi__WEBPACK_IMPORTED_MODULE_2__.default;\n    for (i = 0; i < hooks.length; ++i) {\n        cbs[hooks[i]] = [];\n        for (j = 0; j < modules.length; ++j) {\n            var hook = modules[j][hooks[i]];\n            if (hook !== undefined) {\n                cbs[hooks[i]].push(hook);\n            }\n        }\n    }\n    function emptyNodeAt(elm) {\n        var id = elm.id ? '#' + elm.id : '';\n        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';\n        return (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.default)(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);\n    }\n    function createRmCb(childElm, listeners) {\n        return function rmCb() {\n            if (--listeners === 0) {\n                var parent_1 = api.parentNode(childElm);\n                api.removeChild(parent_1, childElm);\n            }\n        };\n    }\n    function createElm(vnode, insertedVnodeQueue) {\n        var i, data = vnode.data;\n        if (data !== undefined) {\n            if (isDef(i = data.hook) && isDef(i = i.init)) {\n                i(vnode);\n                data = vnode.data;\n            }\n        }\n        var children = vnode.children, sel = vnode.sel;\n        if (sel === '!') {\n            if (isUndef(vnode.text)) {\n                vnode.text = '';\n            }\n            vnode.elm = api.createComment(vnode.text);\n        }\n        else if (sel !== undefined) {\n            // Parse selector\n            var hashIdx = sel.indexOf('#');\n            var dotIdx = sel.indexOf('.', hashIdx);\n            var hash = hashIdx > 0 ? hashIdx : sel.length;\n            var dot = dotIdx > 0 ? dotIdx : sel.length;\n            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;\n            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)\n                : api.createElement(tag);\n            if (hash < dot)\n                elm.setAttribute('id', sel.slice(hash + 1, dot));\n            if (dotIdx > 0)\n                elm.setAttribute('class', sel.slice(dot + 1).replace(/\\./g, ' '));\n            for (i = 0; i < cbs.create.length; ++i)\n                cbs.create[i](emptyNode, vnode);\n            if (_is__WEBPACK_IMPORTED_MODULE_1__.array(children)) {\n                for (i = 0; i < children.length; ++i) {\n                    var ch = children[i];\n                    if (ch != null) {\n                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));\n                    }\n                }\n            }\n            else if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(vnode.text)) {\n                api.appendChild(elm, api.createTextNode(vnode.text));\n            }\n            i = vnode.data.hook; // Reuse variable\n            if (isDef(i)) {\n                if (i.create)\n                    i.create(emptyNode, vnode);\n                if (i.insert)\n                    insertedVnodeQueue.push(vnode);\n            }\n        }\n        else {\n            vnode.elm = api.createTextNode(vnode.text);\n        }\n        return vnode.elm;\n    }\n    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {\n        for (; startIdx <= endIdx; ++startIdx) {\n            var ch = vnodes[startIdx];\n            if (ch != null) {\n                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);\n            }\n        }\n    }\n    function invokeDestroyHook(vnode) {\n        var i, j, data = vnode.data;\n        if (data !== undefined) {\n            if (isDef(i = data.hook) && isDef(i = i.destroy))\n                i(vnode);\n            for (i = 0; i < cbs.destroy.length; ++i)\n                cbs.destroy[i](vnode);\n            if (vnode.children !== undefined) {\n                for (j = 0; j < vnode.children.length; ++j) {\n                    i = vnode.children[j];\n                    if (i != null && typeof i !== \"string\") {\n                        invokeDestroyHook(i);\n                    }\n                }\n            }\n        }\n    }\n    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {\n        for (; startIdx <= endIdx; ++startIdx) {\n            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];\n            if (ch != null) {\n                if (isDef(ch.sel)) {\n                    invokeDestroyHook(ch);\n                    listeners = cbs.remove.length + 1;\n                    rm = createRmCb(ch.elm, listeners);\n                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)\n                        cbs.remove[i_1](ch, rm);\n                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {\n                        i_1(ch, rm);\n                    }\n                    else {\n                        rm();\n                    }\n                }\n                else { // Text node\n                    api.removeChild(parentElm, ch.elm);\n                }\n            }\n        }\n    }\n    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {\n        var oldStartIdx = 0, newStartIdx = 0;\n        var oldEndIdx = oldCh.length - 1;\n        var oldStartVnode = oldCh[0];\n        var oldEndVnode = oldCh[oldEndIdx];\n        var newEndIdx = newCh.length - 1;\n        var newStartVnode = newCh[0];\n        var newEndVnode = newCh[newEndIdx];\n        var oldKeyToIdx;\n        var idxInOld;\n        var elmToMove;\n        var before;\n        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {\n            if (oldStartVnode == null) {\n                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left\n            }\n            else if (oldEndVnode == null) {\n                oldEndVnode = oldCh[--oldEndIdx];\n            }\n            else if (newStartVnode == null) {\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else if (newEndVnode == null) {\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldStartVnode, newStartVnode)) {\n                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);\n                oldStartVnode = oldCh[++oldStartIdx];\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else if (sameVnode(oldEndVnode, newEndVnode)) {\n                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);\n                oldEndVnode = oldCh[--oldEndIdx];\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right\n                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);\n                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));\n                oldStartVnode = oldCh[++oldStartIdx];\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left\n                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);\n                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);\n                oldEndVnode = oldCh[--oldEndIdx];\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else {\n                if (oldKeyToIdx === undefined) {\n                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);\n                }\n                idxInOld = oldKeyToIdx[newStartVnode.key];\n                if (isUndef(idxInOld)) { // New element\n                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);\n                    newStartVnode = newCh[++newStartIdx];\n                }\n                else {\n                    elmToMove = oldCh[idxInOld];\n                    if (elmToMove.sel !== newStartVnode.sel) {\n                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);\n                    }\n                    else {\n                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);\n                        oldCh[idxInOld] = undefined;\n                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);\n                    }\n                    newStartVnode = newCh[++newStartIdx];\n                }\n            }\n        }\n        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {\n            if (oldStartIdx > oldEndIdx) {\n                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;\n                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);\n            }\n            else {\n                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);\n            }\n        }\n    }\n    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {\n        var i, hook;\n        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {\n            i(oldVnode, vnode);\n        }\n        var elm = vnode.elm = oldVnode.elm;\n        var oldCh = oldVnode.children;\n        var ch = vnode.children;\n        if (oldVnode === vnode)\n            return;\n        if (vnode.data !== undefined) {\n            for (i = 0; i < cbs.update.length; ++i)\n                cbs.update[i](oldVnode, vnode);\n            i = vnode.data.hook;\n            if (isDef(i) && isDef(i = i.update))\n                i(oldVnode, vnode);\n        }\n        if (isUndef(vnode.text)) {\n            if (isDef(oldCh) && isDef(ch)) {\n                if (oldCh !== ch)\n                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);\n            }\n            else if (isDef(ch)) {\n                if (isDef(oldVnode.text))\n                    api.setTextContent(elm, '');\n                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);\n            }\n            else if (isDef(oldCh)) {\n                removeVnodes(elm, oldCh, 0, oldCh.length - 1);\n            }\n            else if (isDef(oldVnode.text)) {\n                api.setTextContent(elm, '');\n            }\n        }\n        else if (oldVnode.text !== vnode.text) {\n            if (isDef(oldCh)) {\n                removeVnodes(elm, oldCh, 0, oldCh.length - 1);\n            }\n            api.setTextContent(elm, vnode.text);\n        }\n        if (isDef(hook) && isDef(i = hook.postpatch)) {\n            i(oldVnode, vnode);\n        }\n    }\n    return function patch(oldVnode, vnode) {\n        var i, elm, parent;\n        var insertedVnodeQueue = [];\n        for (i = 0; i < cbs.pre.length; ++i)\n            cbs.pre[i]();\n        if (!isVnode(oldVnode)) {\n            oldVnode = emptyNodeAt(oldVnode);\n        }\n        if (sameVnode(oldVnode, vnode)) {\n            patchVnode(oldVnode, vnode, insertedVnodeQueue);\n        }\n        else {\n            elm = oldVnode.elm;\n            parent = api.parentNode(elm);\n            createElm(vnode, insertedVnodeQueue);\n            if (parent !== null) {\n                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));\n                removeVnodes(parent, [oldVnode], 0, 0);\n            }\n        }\n        for (i = 0; i < insertedVnodeQueue.length; ++i) {\n            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);\n        }\n        for (i = 0; i < cbs.post.length; ++i)\n            cbs.post[i]();\n        return vnode;\n    };\n}\n//# sourceMappingURL=snabbdom.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/es/snabbdom.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/es/thunk.js":
/*!*******************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/es/thunk.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export thunk [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"thunk\": () => /* binding */ thunk,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./h */ \"./node_viewer/node_modules/snabbdom/es/h.js\");\n\nfunction copyToThunk(vnode, thunk) {\n    thunk.elm = vnode.elm;\n    vnode.data.fn = thunk.data.fn;\n    vnode.data.args = thunk.data.args;\n    thunk.data = vnode.data;\n    thunk.children = vnode.children;\n    thunk.text = vnode.text;\n    thunk.elm = vnode.elm;\n}\nfunction init(thunk) {\n    var cur = thunk.data;\n    var vnode = cur.fn.apply(undefined, cur.args);\n    copyToThunk(vnode, thunk);\n}\nfunction prepatch(oldVnode, thunk) {\n    var i, old = oldVnode.data, cur = thunk.data;\n    var oldArgs = old.args, args = cur.args;\n    if (old.fn !== cur.fn || oldArgs.length !== args.length) {\n        copyToThunk(cur.fn.apply(undefined, args), thunk);\n        return;\n    }\n    for (i = 0; i < args.length; ++i) {\n        if (oldArgs[i] !== args[i]) {\n            copyToThunk(cur.fn.apply(undefined, args), thunk);\n            return;\n        }\n    }\n    copyToThunk(oldVnode, thunk);\n}\nvar thunk = function thunk(sel, key, fn, args) {\n    if (args === undefined) {\n        args = fn;\n        fn = key;\n        key = undefined;\n    }\n    return (0,_h__WEBPACK_IMPORTED_MODULE_0__.h)(sel, {\n        key: key,\n        hook: { init: init, prepatch: prepatch },\n        fn: fn,\n        args: args\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thunk);\n//# sourceMappingURL=thunk.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/es/thunk.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/es/vnode.js":
/*!*******************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/es/vnode.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export vnode [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"vnode\": () => /* binding */ vnode,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nfunction vnode(sel, data, children, text, elm) {\n    var key = data === undefined ? undefined : data.key;\n    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (vnode);\n//# sourceMappingURL=vnode.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/es/vnode.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/h.js":
/*!************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/h.js ***!
  \************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export h [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar vnode_1 = __webpack_require__(/*! ./vnode */ \"./node_viewer/node_modules/snabbdom/vnode.js\");\nvar is = __webpack_require__(/*! ./is */ \"./node_viewer/node_modules/snabbdom/is.js\");\nfunction addNS(data, children, sel) {\n    data.ns = 'http://www.w3.org/2000/svg';\n    if (sel !== 'foreignObject' && children !== undefined) {\n        for (var i = 0; i < children.length; ++i) {\n            var childData = children[i].data;\n            if (childData !== undefined) {\n                addNS(childData, children[i].children, children[i].sel);\n            }\n        }\n    }\n}\nfunction h(sel, b, c) {\n    var data = {}, children, text, i;\n    if (c !== undefined) {\n        data = b;\n        if (is.array(c)) {\n            children = c;\n        }\n        else if (is.primitive(c)) {\n            text = c;\n        }\n        else if (c && c.sel) {\n            children = [c];\n        }\n    }\n    else if (b !== undefined) {\n        if (is.array(b)) {\n            children = b;\n        }\n        else if (is.primitive(b)) {\n            text = b;\n        }\n        else if (b && b.sel) {\n            children = [b];\n        }\n        else {\n            data = b;\n        }\n    }\n    if (children !== undefined) {\n        for (i = 0; i < children.length; ++i) {\n            if (is.primitive(children[i]))\n                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);\n        }\n    }\n    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&\n        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {\n        addNS(data, children, sel);\n    }\n    return vnode_1.vnode(sel, data, children, text, undefined);\n}\nexports.h = h;\n;\nexports.default = h;\n//# sourceMappingURL=h.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/h.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/htmldomapi.js":
/*!*********************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/htmldomapi.js ***!
  \*********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nfunction createElement(tagName) {\n    return document.createElement(tagName);\n}\nfunction createElementNS(namespaceURI, qualifiedName) {\n    return document.createElementNS(namespaceURI, qualifiedName);\n}\nfunction createTextNode(text) {\n    return document.createTextNode(text);\n}\nfunction createComment(text) {\n    return document.createComment(text);\n}\nfunction insertBefore(parentNode, newNode, referenceNode) {\n    parentNode.insertBefore(newNode, referenceNode);\n}\nfunction removeChild(node, child) {\n    node.removeChild(child);\n}\nfunction appendChild(node, child) {\n    node.appendChild(child);\n}\nfunction parentNode(node) {\n    return node.parentNode;\n}\nfunction nextSibling(node) {\n    return node.nextSibling;\n}\nfunction tagName(elm) {\n    return elm.tagName;\n}\nfunction setTextContent(node, text) {\n    node.textContent = text;\n}\nfunction getTextContent(node) {\n    return node.textContent;\n}\nfunction isElement(node) {\n    return node.nodeType === 1;\n}\nfunction isText(node) {\n    return node.nodeType === 3;\n}\nfunction isComment(node) {\n    return node.nodeType === 8;\n}\nexports.htmlDomApi = {\n    createElement: createElement,\n    createElementNS: createElementNS,\n    createTextNode: createTextNode,\n    createComment: createComment,\n    insertBefore: insertBefore,\n    removeChild: removeChild,\n    appendChild: appendChild,\n    parentNode: parentNode,\n    nextSibling: nextSibling,\n    tagName: tagName,\n    setTextContent: setTextContent,\n    getTextContent: getTextContent,\n    isElement: isElement,\n    isText: isText,\n    isComment: isComment,\n};\nexports.default = exports.htmlDomApi;\n//# sourceMappingURL=htmldomapi.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/htmldomapi.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/is.js":
/*!*************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/is.js ***!
  \*************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export array [provided] [no usage info] [missing usage info prevents renaming] */
/*! export primitive [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.array = Array.isArray;\nfunction primitive(s) {\n    return typeof s === 'string' || typeof s === 'number';\n}\nexports.primitive = primitive;\n//# sourceMappingURL=is.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/is.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/modules/attributes.js":
/*!*****************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/modules/attributes.js ***!
  \*****************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar xlinkNS = 'http://www.w3.org/1999/xlink';\nvar xmlNS = 'http://www.w3.org/XML/1998/namespace';\nvar colonChar = 58;\nvar xChar = 120;\nfunction updateAttrs(oldVnode, vnode) {\n    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;\n    if (!oldAttrs && !attrs)\n        return;\n    if (oldAttrs === attrs)\n        return;\n    oldAttrs = oldAttrs || {};\n    attrs = attrs || {};\n    // update modified attributes, add new attributes\n    for (key in attrs) {\n        var cur = attrs[key];\n        var old = oldAttrs[key];\n        if (old !== cur) {\n            if (cur === true) {\n                elm.setAttribute(key, \"\");\n            }\n            else if (cur === false) {\n                elm.removeAttribute(key);\n            }\n            else {\n                if (key.charCodeAt(0) !== xChar) {\n                    elm.setAttribute(key, cur);\n                }\n                else if (key.charCodeAt(3) === colonChar) {\n                    // Assume xml namespace\n                    elm.setAttributeNS(xmlNS, key, cur);\n                }\n                else if (key.charCodeAt(5) === colonChar) {\n                    // Assume xlink namespace\n                    elm.setAttributeNS(xlinkNS, key, cur);\n                }\n                else {\n                    elm.setAttribute(key, cur);\n                }\n            }\n        }\n    }\n    // remove removed attributes\n    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)\n    // the other option is to remove all attributes with value == undefined\n    for (key in oldAttrs) {\n        if (!(key in attrs)) {\n            elm.removeAttribute(key);\n        }\n    }\n}\nexports.attributesModule = { create: updateAttrs, update: updateAttrs };\nexports.default = exports.attributesModule;\n//# sourceMappingURL=attributes.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/modules/attributes.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/modules/class.js":
/*!************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/modules/class.js ***!
  \************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nfunction updateClass(oldVnode, vnode) {\n    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;\n    if (!oldClass && !klass)\n        return;\n    if (oldClass === klass)\n        return;\n    oldClass = oldClass || {};\n    klass = klass || {};\n    for (name in oldClass) {\n        if (!klass[name]) {\n            elm.classList.remove(name);\n        }\n    }\n    for (name in klass) {\n        cur = klass[name];\n        if (cur !== oldClass[name]) {\n            elm.classList[cur ? 'add' : 'remove'](name);\n        }\n    }\n}\nexports.classModule = { create: updateClass, update: updateClass };\nexports.default = exports.classModule;\n//# sourceMappingURL=class.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/modules/class.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/modules/eventlisteners.js":
/*!*********************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/modules/eventlisteners.js ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nfunction invokeHandler(handler, vnode, event) {\n    if (typeof handler === \"function\") {\n        // call function handler\n        handler.call(vnode, event, vnode);\n    }\n    else if (typeof handler === \"object\") {\n        // call handler with arguments\n        if (typeof handler[0] === \"function\") {\n            // special case for single argument for performance\n            if (handler.length === 2) {\n                handler[0].call(vnode, handler[1], event, vnode);\n            }\n            else {\n                var args = handler.slice(1);\n                args.push(event);\n                args.push(vnode);\n                handler[0].apply(vnode, args);\n            }\n        }\n        else {\n            // call multiple handlers\n            for (var i = 0; i < handler.length; i++) {\n                invokeHandler(handler[i], vnode, event);\n            }\n        }\n    }\n}\nfunction handleEvent(event, vnode) {\n    var name = event.type, on = vnode.data.on;\n    // call event handler(s) if exists\n    if (on && on[name]) {\n        invokeHandler(on[name], vnode, event);\n    }\n}\nfunction createListener() {\n    return function handler(event) {\n        handleEvent(event, handler.vnode);\n    };\n}\nfunction updateEventListeners(oldVnode, vnode) {\n    var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;\n    // optimization for reused immutable handlers\n    if (oldOn === on) {\n        return;\n    }\n    // remove existing listeners which no longer used\n    if (oldOn && oldListener) {\n        // if element changed or deleted we remove all existing listeners unconditionally\n        if (!on) {\n            for (name in oldOn) {\n                // remove listener if element was changed or existing listeners removed\n                oldElm.removeEventListener(name, oldListener, false);\n            }\n        }\n        else {\n            for (name in oldOn) {\n                // remove listener if existing listener removed\n                if (!on[name]) {\n                    oldElm.removeEventListener(name, oldListener, false);\n                }\n            }\n        }\n    }\n    // add new listeners which has not already attached\n    if (on) {\n        // reuse existing listener or create new\n        var listener = vnode.listener = oldVnode.listener || createListener();\n        // update vnode for listener\n        listener.vnode = vnode;\n        // if element changed or added we add all needed listeners unconditionally\n        if (!oldOn) {\n            for (name in on) {\n                // add listener if element was changed or new listeners added\n                elm.addEventListener(name, listener, false);\n            }\n        }\n        else {\n            for (name in on) {\n                // add listener if new listener added\n                if (!oldOn[name]) {\n                    elm.addEventListener(name, listener, false);\n                }\n            }\n        }\n    }\n}\nexports.eventListenersModule = {\n    create: updateEventListeners,\n    update: updateEventListeners,\n    destroy: updateEventListeners\n};\nexports.default = exports.eventListenersModule;\n//# sourceMappingURL=eventlisteners.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/modules/eventlisteners.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/modules/style.js":
/*!************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/modules/style.js ***!
  \************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n// Bindig `requestAnimationFrame` like this fixes a bug in IE/Edge. See #360 and #409.\nvar raf = (typeof window !== 'undefined' && (window.requestAnimationFrame).bind(window)) || setTimeout;\nvar nextFrame = function (fn) { raf(function () { raf(fn); }); };\nvar reflowForced = false;\nfunction setNextFrame(obj, prop, val) {\n    nextFrame(function () { obj[prop] = val; });\n}\nfunction updateStyle(oldVnode, vnode) {\n    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;\n    if (!oldStyle && !style)\n        return;\n    if (oldStyle === style)\n        return;\n    oldStyle = oldStyle || {};\n    style = style || {};\n    var oldHasDel = 'delayed' in oldStyle;\n    for (name in oldStyle) {\n        if (!style[name]) {\n            if (name[0] === '-' && name[1] === '-') {\n                elm.style.removeProperty(name);\n            }\n            else {\n                elm.style[name] = '';\n            }\n        }\n    }\n    for (name in style) {\n        cur = style[name];\n        if (name === 'delayed' && style.delayed) {\n            for (var name2 in style.delayed) {\n                cur = style.delayed[name2];\n                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {\n                    setNextFrame(elm.style, name2, cur);\n                }\n            }\n        }\n        else if (name !== 'remove' && cur !== oldStyle[name]) {\n            if (name[0] === '-' && name[1] === '-') {\n                elm.style.setProperty(name, cur);\n            }\n            else {\n                elm.style[name] = cur;\n            }\n        }\n    }\n}\nfunction applyDestroyStyle(vnode) {\n    var style, name, elm = vnode.elm, s = vnode.data.style;\n    if (!s || !(style = s.destroy))\n        return;\n    for (name in style) {\n        elm.style[name] = style[name];\n    }\n}\nfunction applyRemoveStyle(vnode, rm) {\n    var s = vnode.data.style;\n    if (!s || !s.remove) {\n        rm();\n        return;\n    }\n    if (!reflowForced) {\n        vnode.elm.offsetLeft;\n        reflowForced = true;\n    }\n    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];\n    for (name in style) {\n        applied.push(name);\n        elm.style[name] = style[name];\n    }\n    compStyle = getComputedStyle(elm);\n    var props = compStyle['transition-property'].split(', ');\n    for (; i < props.length; ++i) {\n        if (applied.indexOf(props[i]) !== -1)\n            amount++;\n    }\n    elm.addEventListener('transitionend', function (ev) {\n        if (ev.target === elm)\n            --amount;\n        if (amount === 0)\n            rm();\n    });\n}\nfunction forceReflow() {\n    reflowForced = false;\n}\nexports.styleModule = {\n    pre: forceReflow,\n    create: updateStyle,\n    update: updateStyle,\n    destroy: applyDestroyStyle,\n    remove: applyRemoveStyle\n};\nexports.default = exports.styleModule;\n//# sourceMappingURL=style.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/modules/style.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/tovnode.js":
/*!******************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/tovnode.js ***!
  \******************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export toVNode [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar vnode_1 = __webpack_require__(/*! ./vnode */ \"./node_viewer/node_modules/snabbdom/vnode.js\");\nvar htmldomapi_1 = __webpack_require__(/*! ./htmldomapi */ \"./node_viewer/node_modules/snabbdom/htmldomapi.js\");\nfunction toVNode(node, domApi) {\n    var api = domApi !== undefined ? domApi : htmldomapi_1.default;\n    var text;\n    if (api.isElement(node)) {\n        var id = node.id ? '#' + node.id : '';\n        var cn = node.getAttribute('class');\n        var c = cn ? '.' + cn.split(' ').join('.') : '';\n        var sel = api.tagName(node).toLowerCase() + id + c;\n        var attrs = {};\n        var children = [];\n        var name_1;\n        var i = void 0, n = void 0;\n        var elmAttrs = node.attributes;\n        var elmChildren = node.childNodes;\n        for (i = 0, n = elmAttrs.length; i < n; i++) {\n            name_1 = elmAttrs[i].nodeName;\n            if (name_1 !== 'id' && name_1 !== 'class') {\n                attrs[name_1] = elmAttrs[i].nodeValue;\n            }\n        }\n        for (i = 0, n = elmChildren.length; i < n; i++) {\n            children.push(toVNode(elmChildren[i], domApi));\n        }\n        return vnode_1.default(sel, { attrs: attrs }, children, undefined, node);\n    }\n    else if (api.isText(node)) {\n        text = api.getTextContent(node);\n        return vnode_1.default(undefined, undefined, undefined, text, node);\n    }\n    else if (api.isComment(node)) {\n        text = api.getTextContent(node);\n        return vnode_1.default('!', {}, [], text, node);\n    }\n    else {\n        return vnode_1.default('', {}, [], undefined, node);\n    }\n}\nexports.toVNode = toVNode;\nexports.default = toVNode;\n//# sourceMappingURL=tovnode.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/tovnode.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/vnode.js":
/*!****************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/vnode.js ***!
  \****************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export vnode [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nfunction vnode(sel, data, children, text, elm) {\n    var key = data === undefined ? undefined : data.key;\n    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };\n}\nexports.vnode = vnode;\nexports.default = vnode;\n//# sourceMappingURL=vnode.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/vnode.js?");

/***/ }),

/***/ "./node_viewer/update/index.js":
/*!*************************************!*\
  !*** ./node_viewer/update/index.js ***!
  \*************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Common = __webpack_require__(/*! ../../common/update */ \"./common/update/index.js\")\r\n\r\nconst update = (state, action) => {\r\n  if (action.type == 'node_data') state.node_data = action.data\r\n  state = Common(state, action)\r\n  return state\r\n}\r\n\r\nmodule.exports = update\n\n//# sourceURL=webpack://front/./node_viewer/update/index.js?");

/***/ }),

/***/ "./node_viewer/view/index.js":
/*!***********************************!*\
  !*** ./node_viewer/view/index.js ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const H = __webpack_require__(/*! snabbdom/h */ \"./node_viewer/node_modules/snabbdom/h.js\").default\r\nconst Info = __webpack_require__(/*! ../../common/view/info */ \"./common/view/info/index.js\")\r\nconst Actions = __webpack_require__(/*! ../../common/view/actions */ \"./common/view/actions/index.js\")\r\n\r\nconst view = (state, send) => \r\n  H('body', H('div#container', state.node_data ? [\r\n    H('div.column', [\r\n      H('div.title', 'Info'),\r\n      Info(state, send, state.node_data)\r\n    ]),\r\n    H('div.column', [\r\n      H('div.title', 'Actions'),\r\n      Actions(state, send, state.node_data)\r\n    ])\r\n  ] : H('div.title', 'Loading data...')))\r\n\r\nmodule.exports = view\n\n//# sourceURL=webpack://front/./node_viewer/view/index.js?");

/***/ }),

/***/ "../packages/fantastic-utils/defaultips.js":
/*!*************************************************!*\
  !*** ../packages/fantastic-utils/defaultips.js ***!
  \*************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const defaultIPs = [\r\n  '127.0.0.1',\r\n  '::1',\r\n  '0.0.0.0',\r\n  '::'\r\n]\r\n\r\nmodule.exports = defaultIPs\n\n//# sourceURL=webpack://front/../packages/fantastic-utils/defaultips.js?");

/***/ }),

/***/ "../packages/fantastic-utils/formatstring.js":
/*!***************************************************!*\
  !*** ../packages/fantastic-utils/formatstring.js ***!
  \***************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("/**\r\n * Replace placeholders in the '$key' format with corresponding values from the parameters object\r\n * @param {string} string \r\n * @param {} parameters \r\n */\r\nconst formatString = (string, parameters) => {\r\n  Object.entries(parameters).forEach(v => {\r\n     // regex escape magic I found to preserve special characters when searching and replacing the key\r\n     // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions\r\n    const key_regex = new RegExp(`$${v[0]}`.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&', 'g'))\r\n    // TODO sanitize v[1] value to prevent injection\r\n    let sanitized_value\r\n    if (typeof v[1] == 'undefined') return\r\n    if (typeof v[1] == 'number') sanitized_value = `${v[1]}`\r\n    if (typeof v[1] == 'string') sanitized_value = `\"${v[1]}\"`\r\n    if (typeof v[1] == 'boolean') sanitized_value = v[1] ? 'True' : 'False'\r\n    string = string.replace(key_regex, sanitized_value)\r\n  }) \r\n  return string\r\n}\r\n\r\nmodule.exports = formatString\n\n//# sourceURL=webpack://front/../packages/fantastic-utils/formatstring.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
/*!*****************************!*\
  !*** ./node_viewer/main.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
eval("const ToVNode = __webpack_require__(/*! snabbdom/tovnode */ \"./node_viewer/node_modules/snabbdom/tovnode.js\").default\r\nconst Snabbdom = __webpack_require__(/*! snabbdom */ \"./node_viewer/node_modules/snabbdom/es/snabbdom.js\")\r\nconst Update = __webpack_require__(/*! ./update */ \"./node_viewer/update/index.js\")\r\nconst View = __webpack_require__(/*! ./view */ \"./node_viewer/view/index.js\")\r\nconst Effect = __webpack_require__(/*! ./effect */ \"./node_viewer/effect/index.js\")\r\n\r\nconst patch = Snabbdom.init([\r\n  __webpack_require__(/*! snabbdom/modules/class */ \"./node_viewer/node_modules/snabbdom/modules/class.js\").default,\r\n  __webpack_require__(/*! snabbdom/modules/attributes */ \"./node_viewer/node_modules/snabbdom/modules/attributes.js\").default,\r\n  __webpack_require__(/*! snabbdom/modules/style */ \"./node_viewer/node_modules/snabbdom/modules/style.js\").default,\r\n  __webpack_require__(/*! snabbdom/modules/eventlisteners */ \"./node_viewer/node_modules/snabbdom/modules/eventlisteners.js\").default, ])\r\n\r\nlet state = { \r\n  action_results: {},\r\n}\r\nlet vdom = ToVNode(document.body)\r\n\r\nconst send = action=> {\r\n  state = Update(state, action)\r\n  vdom = patch(vdom, View(state, send))\r\n  Effect(state,action,send) \r\n}\r\n  \r\nsend({type:'init'})\r\n\r\nwindow.state = state\r\nwindow.send = send\n\n//# sourceURL=webpack://front/./node_viewer/main.js?");
})();

/******/ })()
;