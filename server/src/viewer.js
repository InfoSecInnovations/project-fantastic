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
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _generatequery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generatequery */ \"./common/effect/generatequery.js\");\n\r\n\r\nconst fetch_followup = action => fetch(`/action_followup?${(0,_generatequery__WEBPACK_IMPORTED_MODULE_0__.default)({\r\n  action: action.action, \r\n  function: action.followups[action.followups.length - 1].followup, \r\n  node_id: action.node_id, \r\n  label: action.followups[action.followups.length - 1].label\r\n})}`, {method: 'POST'})\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action, send) => {\r\n  fetch_followup(action)\r\n  .then(res => res.json())\r\n  .then(res => {\r\n    send({...action, type: 'action_followup_result', result: res.result, hostname: action.host, date: res.date})\r\n    if (action.followups && action.refresh && !res.result.length) { // TODO: maybe 0 results isn't always a good indication of needing to refresh?\r\n      if (action.followups.length === 1) {\r\n        send({\r\n          ...action,\r\n          refresh: false,\r\n          type: 'perform_action',\r\n          followup: action.followups[0],\r\n        })\r\n      }\r\n      else {\r\n        let action_result = state.action_results[action.host][action.action]\r\n        const followups = action.followups.slice(0, action.followups.length - 1)\r\n        for (const key of followups) {\r\n          action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]\r\n        }\r\n        send({\r\n          ...action,\r\n          refresh: false,\r\n          type: 'action_followup',\r\n          followups,\r\n          followup: action.followups[action.followups.length - 1]\r\n        })\r\n      }\r\n    }\r\n  })\r\n});\n\n//# sourceURL=webpack://front/./common/effect/actionfollowup.js?");

/***/ }),

/***/ "./common/effect/fetchscripts.js":
/*!***************************************!*\
  !*** ./common/effect/fetchscripts.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((send, type) => {\r\n  fetch(`/${type}`)\r\n  .then(res => res.json())\r\n  .then(res => send({type, [type]: res}))\r\n});\n\n//# sourceURL=webpack://front/./common/effect/fetchscripts.js?");

/***/ }),

/***/ "./common/effect/generatequery.js":
/*!****************************************!*\
  !*** ./common/effect/generatequery.js ***!
  \****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (obj => Object.entries(obj).map(v => {\r\n  const value = Array.isArray(v[1]) ? `[${v[1]}]` : v[1]\r\n  return `${v[0]}=${value}`\r\n}).join('&'));\n\n//# sourceURL=webpack://front/./common/effect/generatequery.js?");

/***/ }),

/***/ "./common/effect/index.js":
/*!********************************!*\
  !*** ./common/effect/index.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _actionfollowup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionfollowup */ \"./common/effect/actionfollowup.js\");\n/* harmony import */ var _generatequery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generatequery */ \"./common/effect/generatequery.js\");\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action, send) => {\r\n  if (action.type == 'perform_action') fetch(`/actions?${(0,_generatequery__WEBPACK_IMPORTED_MODULE_1__.default)({action: action.action, node_id: action.node_id})}`, {method: 'POST'})\r\n    .then(res => res.json())\r\n    .then(res => send({...action, type: 'action_result', result: res.result, hostname: action.host, date: res.date}))\r\n  if (action.type == 'action_followup') (0,_actionfollowup__WEBPACK_IMPORTED_MODULE_0__.default)(state, action, send)\r\n});\n\n//# sourceURL=webpack://front/./common/effect/index.js?");

/***/ }),

/***/ "./common/effect/loadnoderesults.js":
/*!******************************************!*\
  !*** ./common/effect/loadnoderesults.js ***!
  \******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _generatequery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generatequery */ \"./common/effect/generatequery.js\");\n\r\n\r\nconst load_followup = (action, send, node, results, followups) => {\r\n  const row = results.find(v => v.node_id === node.node_id && v.action === action && v.function === followups[followups.length - 1].followup && v.label === followups[followups.length - 1].label)\r\n  if (!row) return\r\n  const result = JSON.parse(row.result)\r\n  send({\r\n    type: 'action_followup_result',\r\n    action,\r\n    result,\r\n    hostname: node.hostname,\r\n    date: row.date,\r\n    followups\r\n  })\r\n  send({\r\n    type: 'followup_foldout',\r\n    action,\r\n    hostname: node.hostname,\r\n    date: row.date,\r\n    followups,\r\n    value: false\r\n  })\r\n  result.forEach((r, i) => {\r\n    if (!r.followups) return\r\n    Object.values(r.followups).forEach(f => load_followup(action, send, node, results, [...followups, {label: r.label, followup: f.function}], ))\r\n  })\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((nodes, send) => {\r\n  fetch(`/results?${(0,_generatequery__WEBPACK_IMPORTED_MODULE_0__.default)({nodes: nodes.map(v => v.node_id)})}`)\r\n  .then(res => res.json())\r\n  .then(res => {\r\n    res.filter(v => v.function === 'run').forEach(v => {\r\n      const node = nodes.find(n => n.node_id === v.node_id)\r\n      const result = JSON.parse(v.result)\r\n      send({\r\n        type: 'action_result',\r\n        action: v.action,\r\n        result,\r\n        hostname: node.hostname,\r\n        date: v.date\r\n      })\r\n      send({\r\n        type: 'result_foldout',\r\n        action: v.action,\r\n        result,\r\n        hostname: node.hostname,\r\n        value: false\r\n      })\r\n      result.forEach((r, i) => {\r\n        if (!r.followups) return\r\n        Object.values(r.followups).forEach(f => load_followup(v.action, send, node, res, [{label: r.label, followup: f.function}]))\r\n      })\r\n    })\r\n  })\r\n});\n\n//# sourceURL=webpack://front/./common/effect/loadnoderesults.js?");

/***/ }),

/***/ "./common/node_modules/snabbdom/build/package/h.js":
/*!*********************************************************!*\
  !*** ./common/node_modules/snabbdom/build/package/h.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export h [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"h\": () => /* binding */ h\n/* harmony export */ });\n/* harmony import */ var _vnode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode.js */ \"./common/node_modules/snabbdom/build/package/vnode.js\");\n/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is.js */ \"./common/node_modules/snabbdom/build/package/is.js\");\n\n\nfunction addNS(data, children, sel) {\n    data.ns = 'http://www.w3.org/2000/svg';\n    if (sel !== 'foreignObject' && children !== undefined) {\n        for (let i = 0; i < children.length; ++i) {\n            const childData = children[i].data;\n            if (childData !== undefined) {\n                addNS(childData, children[i].children, children[i].sel);\n            }\n        }\n    }\n}\nfunction h(sel, b, c) {\n    var data = {};\n    var children;\n    var text;\n    var i;\n    if (c !== undefined) {\n        if (b !== null) {\n            data = b;\n        }\n        if (_is_js__WEBPACK_IMPORTED_MODULE_1__.array(c)) {\n            children = c;\n        }\n        else if (_is_js__WEBPACK_IMPORTED_MODULE_1__.primitive(c)) {\n            text = c;\n        }\n        else if (c && c.sel) {\n            children = [c];\n        }\n    }\n    else if (b !== undefined && b !== null) {\n        if (_is_js__WEBPACK_IMPORTED_MODULE_1__.array(b)) {\n            children = b;\n        }\n        else if (_is_js__WEBPACK_IMPORTED_MODULE_1__.primitive(b)) {\n            text = b;\n        }\n        else if (b && b.sel) {\n            children = [b];\n        }\n        else {\n            data = b;\n        }\n    }\n    if (children !== undefined) {\n        for (i = 0; i < children.length; ++i) {\n            if (_is_js__WEBPACK_IMPORTED_MODULE_1__.primitive(children[i]))\n                children[i] = (0,_vnode_js__WEBPACK_IMPORTED_MODULE_0__.vnode)(undefined, undefined, undefined, children[i], undefined);\n        }\n    }\n    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&\n        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {\n        addNS(data, children, sel);\n    }\n    return (0,_vnode_js__WEBPACK_IMPORTED_MODULE_0__.vnode)(sel, data, children, text, undefined);\n}\n;\n//# sourceMappingURL=h.js.map\n\n//# sourceURL=webpack://front/./common/node_modules/snabbdom/build/package/h.js?");

/***/ }),

/***/ "./common/node_modules/snabbdom/build/package/is.js":
/*!**********************************************************!*\
  !*** ./common/node_modules/snabbdom/build/package/is.js ***!
  \**********************************************************/
/*! namespace exports */
/*! export array [provided] [no usage info] [missing usage info prevents renaming] */
/*! export primitive [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"array\": () => /* binding */ array,\n/* harmony export */   \"primitive\": () => /* binding */ primitive\n/* harmony export */ });\nconst array = Array.isArray;\nfunction primitive(s) {\n    return typeof s === 'string' || typeof s === 'number';\n}\n//# sourceMappingURL=is.js.map\n\n//# sourceURL=webpack://front/./common/node_modules/snabbdom/build/package/is.js?");

/***/ }),

/***/ "./common/node_modules/snabbdom/build/package/vnode.js":
/*!*************************************************************!*\
  !*** ./common/node_modules/snabbdom/build/package/vnode.js ***!
  \*************************************************************/
/*! namespace exports */
/*! export vnode [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"vnode\": () => /* binding */ vnode\n/* harmony export */ });\nfunction vnode(sel, data, children, text, elm) {\n    const key = data === undefined ? undefined : data.key;\n    return { sel, data, children, text, elm, key };\n}\n//# sourceMappingURL=vnode.js.map\n\n//# sourceURL=webpack://front/./common/node_modules/snabbdom/build/package/vnode.js?");

/***/ }),

/***/ "./common/update/actionfollowup.js":
/*!*****************************************!*\
  !*** ./common/update/actionfollowup.js ***!
  \*****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action) => {\r\n  let action_result = state.action_results[action.host][action.action]\r\n  for (const key of action.followups) {\r\n    action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]\r\n  }\r\n  action_result.status = 'loading'\r\n  action_result.requests = (action_result.requests || 0) + 1 // track the number of requests we're waiting for relating to this followup\r\n});\n\n//# sourceURL=webpack://front/./common/update/actionfollowup.js?");

/***/ }),

/***/ "./common/update/actionresult.js":
/*!***************************************!*\
  !*** ./common/update/actionresult.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action) => {\r\n  if (Array.isArray(action.result) && !action.result.length) action.result = undefined\r\n  if (!state.action_results[action.hostname]) {\r\n    state.action_results[action.hostname] = {}\r\n  }\r\n  if (!state.action_results[action.hostname][action.action]) {\r\n    state.action_results[action.hostname][action.action] = {}\r\n  }\r\n  const action_result = state.action_results[action.hostname][action.action]\r\n  if (action.followup) {\r\n    action_result.result.find(v => v.label === action.followup.label).followups[action.followup.followup] = action.result.find(v => v.label === action.followup.label).followups[action.followup.followup]\r\n  }\r\n  else action_result.result = action.result\r\n  action_result.foldout = action.result ? true : undefined\r\n  action_result.status = 'loaded'\r\n  action_result.date = action.date\r\n});\n\n//# sourceURL=webpack://front/./common/update/actionresult.js?");

/***/ }),

/***/ "./common/update/followupfoldout.js":
/*!******************************************!*\
  !*** ./common/update/followupfoldout.js ***!
  \******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action) => {\r\n  let action_result = state.action_results[action.hostname][action.action]\r\n  for (const key of action.followups) {\r\n    action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]\r\n  }\r\n  action_result.foldout = action.value\r\n});\n\n//# sourceURL=webpack://front/./common/update/followupfoldout.js?");

/***/ }),

/***/ "./common/update/followupresult.js":
/*!*****************************************!*\
  !*** ./common/update/followupresult.js ***!
  \*****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action) => {\r\n  if (Array.isArray(action.result) && !action.result.length) action.result = undefined\r\n  let action_result = state.action_results[action.hostname][action.action]\r\n  for (const key of action.followups) {\r\n    action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]\r\n  }\r\n  if (action.followup) {\r\n    if (action.result) action_result.result.find(v => v.label === action.followup.label).followups[action.followup.followup] = action.result.find(v => v.label === action.followup.label).followups[action.followup.followup]\r\n  }\r\n  else action_result.result = action.result\r\n  action_result.foldout = true\r\n  action_result.requests && action_result.requests-- // we may not have any requests if we're loading the result from the history so we have to check it\r\n  if (!action_result.requests) action_result.status = 'loaded'\r\n  action_result.date = action.date\r\n});\n\n//# sourceURL=webpack://front/./common/update/followupresult.js?");

/***/ }),

/***/ "./common/update/index.js":
/*!********************************!*\
  !*** ./common/update/index.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _performaction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./performaction */ \"./common/update/performaction.js\");\n/* harmony import */ var _actionresult__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionresult */ \"./common/update/actionresult.js\");\n/* harmony import */ var _actionfollowup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actionfollowup */ \"./common/update/actionfollowup.js\");\n/* harmony import */ var _followupfoldout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./followupfoldout */ \"./common/update/followupfoldout.js\");\n/* harmony import */ var _followupresult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./followupresult */ \"./common/update/followupresult.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action) => {\r\n  if (action.type == 'actions') state.actions = action.actions\r\n  if (action.type == 'commands') state.commands = action.commands\r\n  if (action.type == 'quests') state.quests = action.quests\r\n  if (action.type == 'tests') state.tests = action.tests\r\n  if (action.type == 'perform_action') (0,_performaction__WEBPACK_IMPORTED_MODULE_0__.default)(state, action)\r\n  if (action.type == 'action_result') (0,_actionresult__WEBPACK_IMPORTED_MODULE_1__.default)(state, action)\r\n  if (action.type == 'result_foldout') state.action_results[action.hostname][action.action].foldout = action.value\r\n  if (action.type == 'action_followup') (0,_actionfollowup__WEBPACK_IMPORTED_MODULE_2__.default)(state, action)\r\n  if (action.type == 'action_followup_result') (0,_followupresult__WEBPACK_IMPORTED_MODULE_4__.default)(state, action)\r\n  if (action.type == 'followup_foldout') (0,_followupfoldout__WEBPACK_IMPORTED_MODULE_3__.default)(state, action)\r\n\r\n  return state\r\n});\n\n//# sourceURL=webpack://front/./common/update/index.js?");

/***/ }),

/***/ "./common/update/performaction.js":
/*!****************************************!*\
  !*** ./common/update/performaction.js ***!
  \****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action) => {\r\n  if (!state.action_results[action.host]) {\r\n    state.action_results[action.host] = {}\r\n  }\r\n  if (!state.action_results[action.host][action.action]) {\r\n    state.action_results[action.host][action.action] = {}\r\n  }\r\n  state.action_results[action.host][action.action].status = 'loading'\r\n});\n\n//# sourceURL=webpack://front/./common/update/performaction.js?");

/***/ }),

/***/ "./common/util/datestring.js":
/*!***********************************!*\
  !*** ./common/util/datestring.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nconst unit_string = (amount, unit) => `${amount} ${unit}${amount === 1 ? '' : 's'}`\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (minutes => {\r\n  minutes = Math.round(minutes)\r\n  if (minutes < 60) return unit_string(minutes, 'minute')\r\n  const hours = Math.floor(minutes / 60)\r\n  const minutes_remainder = minutes % 60\r\n  if (hours < 24) {\r\n    if (minutes_remainder) return `${unit_string(hours, 'hour')} and ${unit_string(minutes_remainder, 'minute')}`\r\n    return `${unit_string(hours, 'hour')}`\r\n  }\r\n  const days = Math.floor(hours / 24)\r\n  const hours_remainder = hours % 24\r\n  return `${unit_string(days, 'day')}${hours_remainder ? `, ${unit_string(hours_remainder, 'hour')}` : ''}${minutes_remainder ? `, ${unit_string(minutes_remainder, 'minute')}` : ''}`\r\n});\n\n//# sourceURL=webpack://front/./common/util/datestring.js?");

/***/ }),

/***/ "./common/util/hoststring.js":
/*!***********************************!*\
  !*** ./common/util/hoststring.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (host => {\r\n  if (host == 'local') return 'local host'\r\n  if (host == 'remote') return 'host with PowerShell remote access'\r\n});\n\n//# sourceURL=webpack://front/./common/util/hoststring.js?");

/***/ }),

/***/ "./common/util/ipaddress.js":
/*!**********************************!*\
  !*** ./common/util/ipaddress.js ***!
  \**********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((ip, port) => `${(ip.includes(':') ? `[${ip}]` : ip)}:${port}`);\n\n//# sourceURL=webpack://front/./common/util/ipaddress.js?");

/***/ }),

/***/ "./common/util/timeago.js":
/*!********************************!*\
  !*** ./common/util/timeago.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _datestring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datestring */ \"./common/util/datestring.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (date => {\r\n  const diff = Date.now() - date\r\n  if (diff < 60000) return 'just now'\r\n  return `${(0,_datestring__WEBPACK_IMPORTED_MODULE_0__.default)(diff / 1000 / 60)} ago`\r\n});\n\n//# sourceURL=webpack://front/./common/util/timeago.js?");

/***/ }),

/***/ "./common/view/actions/index.js":
/*!**************************************!*\
  !*** ./common/view/actions/index.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n/* harmony import */ var _util_hoststring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/hoststring */ \"./common/util/hoststring.js\");\n/* harmony import */ var _result__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./result */ \"./common/view/actions/result/index.js\");\n/* harmony import */ var _util_timeago__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/timeago */ \"./common/util/timeago.js\");\n\r\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, send, node) => {\r\n  if (!state.actions) return\r\n  const actions = Object.entries(state.actions).filter(v => v[1].hosts.includes('none') || v[1].hosts.includes(node.access)) \r\n  return (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll_container',\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll spaced', !actions.length ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll_item', 'No actions compatible with this host') : actions.map(v => {\r\n      const loading = state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] && state.action_results[node.hostname][v[0]].status === 'loading'\r\n      return (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll_item spaced', [\r\n        (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', [\r\n          (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h3', v[1].name),\r\n          (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.button', \r\n            { \r\n              on: loading ? undefined : {click: [send, {type: 'perform_action', action: v[0], node_id: node.node_id, host: node.hostname}]},\r\n              class: {loading}\r\n            }, \r\n            loading ? 'Running...' : 'Run')\r\n        ]),\r\n        (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('pre', v[1].commands.run),\r\n        v[1].description ? v[1].description : undefined,\r\n        (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.targets', [(0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('b', 'Valid targets:'), ` ${v[1].hosts.map(_util_hoststring__WEBPACK_IMPORTED_MODULE_1__.default).join(', ')}.`]),\r\n        state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] && state.action_results[node.hostname][v[0]].result ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.results', [\r\n          (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.followup', [\r\n            `Results from ${(0,_util_timeago__WEBPACK_IMPORTED_MODULE_3__.default)(state.action_results[node.hostname][v[0]].date)}`, \r\n            (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)(`div.foldout fas fa-${state.action_results[node.hostname][v[0]].foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {\r\n              on: {click: [send, {type: 'result_foldout', action: v[0], hostname: node.hostname, value: !state.action_results[node.hostname][v[0]].foldout}]}\r\n            })\r\n          ]),\r\n          ...(state.action_results[node.hostname][v[0]].foldout ? state.action_results[node.hostname][v[0]].result\r\n            .map(r => (0,_result__WEBPACK_IMPORTED_MODULE_2__.default)(state, v[0], r, node.node_id, node.hostname, loading, send)) : [])\r\n        ]) : undefined\r\n      ])\r\n    }))\r\n  )\r\n});\n\n//# sourceURL=webpack://front/./common/view/actions/index.js?");

/***/ }),

/***/ "./common/view/actions/result/followupbuttons.js":
/*!*******************************************************!*\
  !*** ./common/view/actions/result/followupbuttons.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n\r\nconst FormatString = __webpack_require__(/*! fantastic-utils/formatstring */ \"../packages/fantastic-utils/formatstring.js\")\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action, action_result, node_id, host, loading, send, followups) => action_result.followups ? Object.values(action_result.followups).map(v => {\r\n  const followup_label = v.label || (typeof v.enabled == 'boolean' && (v.enabled ? 'Enabled' : 'Disabled')) || state.actions[action].names[v.function]\r\n  if (v.not_permitted) return (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', followup_label)\r\n  const loading_followup = loading || v.status === 'loading'\r\n  const disabled = !loading_followup && typeof v.enabled !== 'undefined' && !v.enabled\r\n  return [\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.button', \r\n      {\r\n        on: loading_followup ? {} : {\r\n          click: [\r\n            send, \r\n            {\r\n              type: 'action_followup', \r\n              action,\r\n              node_id,\r\n              host,\r\n              followups: [...followups, {followup: v.function, label: action_result.label}],\r\n              refresh: true,\r\n              date: Date.now()\r\n            }\r\n          ]\r\n        },\r\n        class: {loading: loading_followup, disabled}\r\n      }, \r\n      (loading_followup && 'Running...') || followup_label\r\n    ),\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('pre', FormatString(state.actions[action].commands[v.function], v.data))\r\n  ]\r\n}).flat() : []);\n\n//# sourceURL=webpack://front/./common/view/actions/result/followupbuttons.js?");

/***/ }),

/***/ "./common/view/actions/result/followupresults.js":
/*!*******************************************************!*\
  !*** ./common/view/actions/result/followupresults.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n/* harmony import */ var _util_timeago__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/timeago */ \"./common/util/timeago.js\");\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action, action_result, node_id, host, loading, send, followups, result_func) => action_result.followups ? Object.values(action_result.followups)\r\n  .filter(v => v.result)\r\n  .map(v => {\r\n    return (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div', [\r\n      (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.result_time', [\r\n        (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h4', v.label || (typeof v.enabled == 'boolean' && (v.enabled ? 'Enable' : 'Disable')) || state.actions[action].names[v.function]),\r\n        (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.time', [\r\n          ` Results from ${(0,_util_timeago__WEBPACK_IMPORTED_MODULE_1__.default)(v.date)}`, \r\n          (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)(`div.foldout fas fa-${v.foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {\r\n            on: {click: [send, {\r\n              type: 'followup_foldout',\r\n              action,\r\n              node_id,\r\n              hostname: host,\r\n              followups: [...followups, {followup: v.function, label: action_result.label}],\r\n              value: !v.foldout\r\n            }]}\r\n          })\r\n        ])\r\n      ]),\r\n      ...(v.foldout ? v.result.map(r => \r\n        result_func(state, action, r, node_id, host, loading || v.status === 'loading', send, [...followups, {followup: v.function, label: action_result.label}])\r\n      ) : [])\r\n    ])\r\n  }).flat() : []);\n\n//# sourceURL=webpack://front/./common/view/actions/result/followupresults.js?");

/***/ }),

/***/ "./common/view/actions/result/index.js":
/*!*********************************************!*\
  !*** ./common/view/actions/result/index.js ***!
  \*********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n/* harmony import */ var _followupbuttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./followupbuttons */ \"./common/view/actions/result/followupbuttons.js\");\n/* harmony import */ var _followupresults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./followupresults */ \"./common/view/actions/result/followupresults.js\");\n/* harmony import */ var _util_timeago__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/timeago */ \"./common/util/timeago.js\");\n\r\n\r\n\r\n\r\n\r\nconst format_value = value => {\r\n  if (typeof value === 'object') {\r\n    if (value.date) return (0,_util_timeago__WEBPACK_IMPORTED_MODULE_3__.default)(value.date)\r\n  }\r\n  return `${value}`\r\n}\r\n\r\nconst result = (state, action, action_result, node_id, host, loading, send, followups = []) => (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.result', [\r\n  action_result.label ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h4', action_result.label) : undefined,\r\n  action_result.data ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div', action_result.data.map(v => (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div', format_value(v)))) : undefined,\r\n  ...(0,_followupbuttons__WEBPACK_IMPORTED_MODULE_1__.default)(state, action, action_result, node_id, host, loading, send, followups),\r\n  ...(0,_followupresults__WEBPACK_IMPORTED_MODULE_2__.default)(state, action, action_result, node_id, host, loading, send, followups, result)\r\n])\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (result);\n\n//# sourceURL=webpack://front/./common/view/actions/result/index.js?");

/***/ }),

/***/ "./common/view/connections.js":
/*!************************************!*\
  !*** ./common/view/connections.js ***!
  \************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n/* harmony import */ var _util_ipaddress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/ipaddress */ \"./common/util/ipaddress.js\");\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((connections, label) => [\r\n  (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h4', [label || 'Connections', ` (${connections.length}):`].flat()),\r\n  connections.length ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll', connections.map(v => (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll_item', [\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', `Local address: ${(0,_util_ipaddress__WEBPACK_IMPORTED_MODULE_1__.default)(v.local_address, v.local_port)}`),\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', `Remote address: ${(0,_util_ipaddress__WEBPACK_IMPORTED_MODULE_1__.default)(v.remote_address, v.remote_port)}`),\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', `Process: ${v.process.name}`),\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', `State: ${v.state.replace('_', ' ')}`)\r\n  ]))) : undefined\r\n]);\n\n//# sourceURL=webpack://front/./common/view/connections.js?");

/***/ }),

/***/ "./common/view/info/index.js":
/*!***********************************!*\
  !*** ./common/view/info/index.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n/* harmony import */ var _nodetop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodetop */ \"./common/view/info/nodetop.js\");\n/* harmony import */ var _connections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../connections */ \"./common/view/connections.js\");\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, send, node) => (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll_container', [\r\n    (0,_nodetop__WEBPACK_IMPORTED_MODULE_1__.default)(node),\r\n    ...(0,_connections__WEBPACK_IMPORTED_MODULE_2__.default)(node.connections)\r\n  ]));\n\n//# sourceURL=webpack://front/./common/view/info/index.js?");

/***/ }),

/***/ "./common/view/info/nodetop.js":
/*!*************************************!*\
  !*** ./common/view/info/nodetop.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n\r\nconst DefaultIPs = __webpack_require__(/*! fantastic-utils/defaultips */ \"../packages/fantastic-utils/defaultips.js\")\r\n\r\nconst node_type = node => {\r\n  if (!node.important) return 'Host outside my network'\r\n  if (node.access === 'local') return 'Local host'\r\n  if (node.access === 'remote') return 'Remote host with PowerShell access configured'\r\n  return 'Host on my network without remote access'\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (node => \r\n  (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.section', [\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h3', node_type(node)),\r\n    node.hostname || node.os ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div', [\r\n      node.hostname ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', `Hostname: ${node.hostname}`) : undefined,\r\n      node.os ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', `Operating System: ${node.os}`) : undefined\r\n    ]) : undefined,\r\n    node.macs && node.macs.length ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div', [\r\n      (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h4', 'MAC Addresses:'),\r\n      ...node.macs.map(v => (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', `${v.mac} (${v.vendor})`))\r\n    ]) : undefined,\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div', [\r\n      (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h4', 'IP Addresses:'),\r\n      ...node.ips.map(v => DefaultIPs.includes(v) ? undefined : (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', v))\r\n    ])\r\n  ]));\n\n//# sourceURL=webpack://front/./common/view/info/nodetop.js?");

/***/ }),

/***/ "./node_viewer/effect/index.js":
/*!*************************************!*\
  !*** ./node_viewer/effect/index.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _common_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/effect */ \"./common/effect/index.js\");\n/* harmony import */ var _common_effect_loadnoderesults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/effect/loadnoderesults */ \"./common/effect/loadnoderesults.js\");\n/* harmony import */ var _common_effect_fetchscripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/effect/fetchscripts */ \"./common/effect/fetchscripts.js\");\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action, send) => {\r\n  (0,_common_effect__WEBPACK_IMPORTED_MODULE_0__.default)(state, action, send)\r\n  if (action.type == 'init') (0,_common_effect_fetchscripts__WEBPACK_IMPORTED_MODULE_2__.default)(send, 'actions')\r\n  if (action.type == 'node_data') (0,_common_effect_loadnoderesults__WEBPACK_IMPORTED_MODULE_1__.default)([action.data], send)\r\n});\n\n//# sourceURL=webpack://front/./node_viewer/effect/index.js?");

/***/ }),

/***/ "./node_viewer/main.js":
/*!*****************************!*\
  !*** ./node_viewer/main.js ***!
  \*****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var snabbdom_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/init */ \"./node_viewer/node_modules/snabbdom/build/package/init.js\");\n/* harmony import */ var snabbdom_modules_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! snabbdom/modules/class */ \"./node_viewer/node_modules/snabbdom/build/package/modules/class.js\");\n/* harmony import */ var snabbdom_modules_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! snabbdom/modules/props */ \"./node_viewer/node_modules/snabbdom/build/package/modules/props.js\");\n/* harmony import */ var snabbdom_modules_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! snabbdom/modules/style */ \"./node_viewer/node_modules/snabbdom/build/package/modules/style.js\");\n/* harmony import */ var snabbdom_modules_attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! snabbdom/modules/attributes */ \"./node_viewer/node_modules/snabbdom/build/package/modules/attributes.js\");\n/* harmony import */ var snabbdom_modules_eventlisteners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! snabbdom/modules/eventlisteners */ \"./node_viewer/node_modules/snabbdom/build/package/modules/eventlisteners.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view */ \"./node_viewer/view/index.js\");\n/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./update */ \"./node_viewer/update/index.js\");\n/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./effect */ \"./node_viewer/effect/index.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst patch = (0,snabbdom_init__WEBPACK_IMPORTED_MODULE_0__.init)([\r\n  snabbdom_modules_class__WEBPACK_IMPORTED_MODULE_1__.classModule,\r\n  snabbdom_modules_props__WEBPACK_IMPORTED_MODULE_2__.propsModule,\r\n  snabbdom_modules_style__WEBPACK_IMPORTED_MODULE_3__.styleModule,\r\n  snabbdom_modules_attributes__WEBPACK_IMPORTED_MODULE_4__.attributesModule,\r\n  snabbdom_modules_eventlisteners__WEBPACK_IMPORTED_MODULE_5__.eventListenersModule,\r\n])\r\n\r\nlet state = { \r\n  action_results: {},\r\n}\r\nlet vnode = document.body\r\n\r\nconst send = action=> {\r\n  state = (0,_update__WEBPACK_IMPORTED_MODULE_7__.default)(state, action)\r\n  vnode = patch(vnode, (0,_view__WEBPACK_IMPORTED_MODULE_6__.default)(state, send))\r\n  Object(_effect__WEBPACK_IMPORTED_MODULE_8__.default)(state,action,send) \r\n}\r\n  \r\nsend({type:'init'})\r\n\r\nwindow.state = state\r\nwindow.send = send\n\n//# sourceURL=webpack://front/./node_viewer/main.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/build/package/h.js":
/*!**************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/build/package/h.js ***!
  \**************************************************************/
/*! namespace exports */
/*! export h [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"h\": () => /* binding */ h\n/* harmony export */ });\n/* harmony import */ var _vnode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode.js */ \"./node_viewer/node_modules/snabbdom/build/package/vnode.js\");\n/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is.js */ \"./node_viewer/node_modules/snabbdom/build/package/is.js\");\n\n\nfunction addNS(data, children, sel) {\n    data.ns = 'http://www.w3.org/2000/svg';\n    if (sel !== 'foreignObject' && children !== undefined) {\n        for (let i = 0; i < children.length; ++i) {\n            const childData = children[i].data;\n            if (childData !== undefined) {\n                addNS(childData, children[i].children, children[i].sel);\n            }\n        }\n    }\n}\nfunction h(sel, b, c) {\n    var data = {};\n    var children;\n    var text;\n    var i;\n    if (c !== undefined) {\n        if (b !== null) {\n            data = b;\n        }\n        if (_is_js__WEBPACK_IMPORTED_MODULE_1__.array(c)) {\n            children = c;\n        }\n        else if (_is_js__WEBPACK_IMPORTED_MODULE_1__.primitive(c)) {\n            text = c;\n        }\n        else if (c && c.sel) {\n            children = [c];\n        }\n    }\n    else if (b !== undefined && b !== null) {\n        if (_is_js__WEBPACK_IMPORTED_MODULE_1__.array(b)) {\n            children = b;\n        }\n        else if (_is_js__WEBPACK_IMPORTED_MODULE_1__.primitive(b)) {\n            text = b;\n        }\n        else if (b && b.sel) {\n            children = [b];\n        }\n        else {\n            data = b;\n        }\n    }\n    if (children !== undefined) {\n        for (i = 0; i < children.length; ++i) {\n            if (_is_js__WEBPACK_IMPORTED_MODULE_1__.primitive(children[i]))\n                children[i] = (0,_vnode_js__WEBPACK_IMPORTED_MODULE_0__.vnode)(undefined, undefined, undefined, children[i], undefined);\n        }\n    }\n    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&\n        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {\n        addNS(data, children, sel);\n    }\n    return (0,_vnode_js__WEBPACK_IMPORTED_MODULE_0__.vnode)(sel, data, children, text, undefined);\n}\n;\n//# sourceMappingURL=h.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/build/package/h.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/build/package/htmldomapi.js":
/*!***********************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/build/package/htmldomapi.js ***!
  \***********************************************************************/
/*! namespace exports */
/*! export htmlDomApi [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"htmlDomApi\": () => /* binding */ htmlDomApi\n/* harmony export */ });\nfunction createElement(tagName) {\n    return document.createElement(tagName);\n}\nfunction createElementNS(namespaceURI, qualifiedName) {\n    return document.createElementNS(namespaceURI, qualifiedName);\n}\nfunction createTextNode(text) {\n    return document.createTextNode(text);\n}\nfunction createComment(text) {\n    return document.createComment(text);\n}\nfunction insertBefore(parentNode, newNode, referenceNode) {\n    parentNode.insertBefore(newNode, referenceNode);\n}\nfunction removeChild(node, child) {\n    node.removeChild(child);\n}\nfunction appendChild(node, child) {\n    node.appendChild(child);\n}\nfunction parentNode(node) {\n    return node.parentNode;\n}\nfunction nextSibling(node) {\n    return node.nextSibling;\n}\nfunction tagName(elm) {\n    return elm.tagName;\n}\nfunction setTextContent(node, text) {\n    node.textContent = text;\n}\nfunction getTextContent(node) {\n    return node.textContent;\n}\nfunction isElement(node) {\n    return node.nodeType === 1;\n}\nfunction isText(node) {\n    return node.nodeType === 3;\n}\nfunction isComment(node) {\n    return node.nodeType === 8;\n}\nconst htmlDomApi = {\n    createElement,\n    createElementNS,\n    createTextNode,\n    createComment,\n    insertBefore,\n    removeChild,\n    appendChild,\n    parentNode,\n    nextSibling,\n    tagName,\n    setTextContent,\n    getTextContent,\n    isElement,\n    isText,\n    isComment,\n};\n//# sourceMappingURL=htmldomapi.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/build/package/htmldomapi.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/build/package/init.js":
/*!*****************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/build/package/init.js ***!
  \*****************************************************************/
/*! namespace exports */
/*! export init [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"init\": () => /* binding */ init\n/* harmony export */ });\n/* harmony import */ var _vnode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode.js */ \"./node_viewer/node_modules/snabbdom/build/package/vnode.js\");\n/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is.js */ \"./node_viewer/node_modules/snabbdom/build/package/is.js\");\n/* harmony import */ var _htmldomapi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./htmldomapi.js */ \"./node_viewer/node_modules/snabbdom/build/package/htmldomapi.js\");\n\n\n\nfunction isUndef(s) {\n    return s === undefined;\n}\nfunction isDef(s) {\n    return s !== undefined;\n}\nconst emptyNode = (0,_vnode_js__WEBPACK_IMPORTED_MODULE_0__.vnode)('', {}, [], undefined, undefined);\nfunction sameVnode(vnode1, vnode2) {\n    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;\n}\nfunction isVnode(vnode) {\n    return vnode.sel !== undefined;\n}\nfunction createKeyToOldIdx(children, beginIdx, endIdx) {\n    var _a;\n    const map = {};\n    for (let i = beginIdx; i <= endIdx; ++i) {\n        const key = (_a = children[i]) === null || _a === void 0 ? void 0 : _a.key;\n        if (key !== undefined) {\n            map[key] = i;\n        }\n    }\n    return map;\n}\nconst hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];\nfunction init(modules, domApi) {\n    let i;\n    let j;\n    const cbs = {\n        create: [],\n        update: [],\n        remove: [],\n        destroy: [],\n        pre: [],\n        post: []\n    };\n    const api = domApi !== undefined ? domApi : _htmldomapi_js__WEBPACK_IMPORTED_MODULE_2__.htmlDomApi;\n    for (i = 0; i < hooks.length; ++i) {\n        cbs[hooks[i]] = [];\n        for (j = 0; j < modules.length; ++j) {\n            const hook = modules[j][hooks[i]];\n            if (hook !== undefined) {\n                cbs[hooks[i]].push(hook);\n            }\n        }\n    }\n    function emptyNodeAt(elm) {\n        const id = elm.id ? '#' + elm.id : '';\n        const c = elm.className ? '.' + elm.className.split(' ').join('.') : '';\n        return (0,_vnode_js__WEBPACK_IMPORTED_MODULE_0__.vnode)(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);\n    }\n    function createRmCb(childElm, listeners) {\n        return function rmCb() {\n            if (--listeners === 0) {\n                const parent = api.parentNode(childElm);\n                api.removeChild(parent, childElm);\n            }\n        };\n    }\n    function createElm(vnode, insertedVnodeQueue) {\n        var _a, _b;\n        let i;\n        let data = vnode.data;\n        if (data !== undefined) {\n            const init = (_a = data.hook) === null || _a === void 0 ? void 0 : _a.init;\n            if (isDef(init)) {\n                init(vnode);\n                data = vnode.data;\n            }\n        }\n        const children = vnode.children;\n        const sel = vnode.sel;\n        if (sel === '!') {\n            if (isUndef(vnode.text)) {\n                vnode.text = '';\n            }\n            vnode.elm = api.createComment(vnode.text);\n        }\n        else if (sel !== undefined) {\n            // Parse selector\n            const hashIdx = sel.indexOf('#');\n            const dotIdx = sel.indexOf('.', hashIdx);\n            const hash = hashIdx > 0 ? hashIdx : sel.length;\n            const dot = dotIdx > 0 ? dotIdx : sel.length;\n            const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;\n            const elm = vnode.elm = isDef(data) && isDef(i = data.ns)\n                ? api.createElementNS(i, tag)\n                : api.createElement(tag);\n            if (hash < dot)\n                elm.setAttribute('id', sel.slice(hash + 1, dot));\n            if (dotIdx > 0)\n                elm.setAttribute('class', sel.slice(dot + 1).replace(/\\./g, ' '));\n            for (i = 0; i < cbs.create.length; ++i)\n                cbs.create[i](emptyNode, vnode);\n            if (_is_js__WEBPACK_IMPORTED_MODULE_1__.array(children)) {\n                for (i = 0; i < children.length; ++i) {\n                    const ch = children[i];\n                    if (ch != null) {\n                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));\n                    }\n                }\n            }\n            else if (_is_js__WEBPACK_IMPORTED_MODULE_1__.primitive(vnode.text)) {\n                api.appendChild(elm, api.createTextNode(vnode.text));\n            }\n            const hook = vnode.data.hook;\n            if (isDef(hook)) {\n                (_b = hook.create) === null || _b === void 0 ? void 0 : _b.call(hook, emptyNode, vnode);\n                if (hook.insert) {\n                    insertedVnodeQueue.push(vnode);\n                }\n            }\n        }\n        else {\n            vnode.elm = api.createTextNode(vnode.text);\n        }\n        return vnode.elm;\n    }\n    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {\n        for (; startIdx <= endIdx; ++startIdx) {\n            const ch = vnodes[startIdx];\n            if (ch != null) {\n                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);\n            }\n        }\n    }\n    function invokeDestroyHook(vnode) {\n        var _a, _b;\n        const data = vnode.data;\n        if (data !== undefined) {\n            (_b = (_a = data === null || data === void 0 ? void 0 : data.hook) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a, vnode);\n            for (let i = 0; i < cbs.destroy.length; ++i)\n                cbs.destroy[i](vnode);\n            if (vnode.children !== undefined) {\n                for (let j = 0; j < vnode.children.length; ++j) {\n                    const child = vnode.children[j];\n                    if (child != null && typeof child !== 'string') {\n                        invokeDestroyHook(child);\n                    }\n                }\n            }\n        }\n    }\n    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {\n        var _a, _b;\n        for (; startIdx <= endIdx; ++startIdx) {\n            let listeners;\n            let rm;\n            const ch = vnodes[startIdx];\n            if (ch != null) {\n                if (isDef(ch.sel)) {\n                    invokeDestroyHook(ch);\n                    listeners = cbs.remove.length + 1;\n                    rm = createRmCb(ch.elm, listeners);\n                    for (let i = 0; i < cbs.remove.length; ++i)\n                        cbs.remove[i](ch, rm);\n                    const removeHook = (_b = (_a = ch === null || ch === void 0 ? void 0 : ch.data) === null || _a === void 0 ? void 0 : _a.hook) === null || _b === void 0 ? void 0 : _b.remove;\n                    if (isDef(removeHook)) {\n                        removeHook(ch, rm);\n                    }\n                    else {\n                        rm();\n                    }\n                }\n                else { // Text node\n                    api.removeChild(parentElm, ch.elm);\n                }\n            }\n        }\n    }\n    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {\n        let oldStartIdx = 0;\n        let newStartIdx = 0;\n        let oldEndIdx = oldCh.length - 1;\n        let oldStartVnode = oldCh[0];\n        let oldEndVnode = oldCh[oldEndIdx];\n        let newEndIdx = newCh.length - 1;\n        let newStartVnode = newCh[0];\n        let newEndVnode = newCh[newEndIdx];\n        let oldKeyToIdx;\n        let idxInOld;\n        let elmToMove;\n        let before;\n        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {\n            if (oldStartVnode == null) {\n                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left\n            }\n            else if (oldEndVnode == null) {\n                oldEndVnode = oldCh[--oldEndIdx];\n            }\n            else if (newStartVnode == null) {\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else if (newEndVnode == null) {\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldStartVnode, newStartVnode)) {\n                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);\n                oldStartVnode = oldCh[++oldStartIdx];\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else if (sameVnode(oldEndVnode, newEndVnode)) {\n                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);\n                oldEndVnode = oldCh[--oldEndIdx];\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right\n                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);\n                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));\n                oldStartVnode = oldCh[++oldStartIdx];\n                newEndVnode = newCh[--newEndIdx];\n            }\n            else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left\n                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);\n                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);\n                oldEndVnode = oldCh[--oldEndIdx];\n                newStartVnode = newCh[++newStartIdx];\n            }\n            else {\n                if (oldKeyToIdx === undefined) {\n                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);\n                }\n                idxInOld = oldKeyToIdx[newStartVnode.key];\n                if (isUndef(idxInOld)) { // New element\n                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);\n                }\n                else {\n                    elmToMove = oldCh[idxInOld];\n                    if (elmToMove.sel !== newStartVnode.sel) {\n                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);\n                    }\n                    else {\n                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);\n                        oldCh[idxInOld] = undefined;\n                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);\n                    }\n                }\n                newStartVnode = newCh[++newStartIdx];\n            }\n        }\n        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {\n            if (oldStartIdx > oldEndIdx) {\n                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;\n                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);\n            }\n            else {\n                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);\n            }\n        }\n    }\n    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {\n        var _a, _b, _c, _d, _e;\n        const hook = (_a = vnode.data) === null || _a === void 0 ? void 0 : _a.hook;\n        (_b = hook === null || hook === void 0 ? void 0 : hook.prepatch) === null || _b === void 0 ? void 0 : _b.call(hook, oldVnode, vnode);\n        const elm = vnode.elm = oldVnode.elm;\n        const oldCh = oldVnode.children;\n        const ch = vnode.children;\n        if (oldVnode === vnode)\n            return;\n        if (vnode.data !== undefined) {\n            for (let i = 0; i < cbs.update.length; ++i)\n                cbs.update[i](oldVnode, vnode);\n            (_d = (_c = vnode.data.hook) === null || _c === void 0 ? void 0 : _c.update) === null || _d === void 0 ? void 0 : _d.call(_c, oldVnode, vnode);\n        }\n        if (isUndef(vnode.text)) {\n            if (isDef(oldCh) && isDef(ch)) {\n                if (oldCh !== ch)\n                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);\n            }\n            else if (isDef(ch)) {\n                if (isDef(oldVnode.text))\n                    api.setTextContent(elm, '');\n                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);\n            }\n            else if (isDef(oldCh)) {\n                removeVnodes(elm, oldCh, 0, oldCh.length - 1);\n            }\n            else if (isDef(oldVnode.text)) {\n                api.setTextContent(elm, '');\n            }\n        }\n        else if (oldVnode.text !== vnode.text) {\n            if (isDef(oldCh)) {\n                removeVnodes(elm, oldCh, 0, oldCh.length - 1);\n            }\n            api.setTextContent(elm, vnode.text);\n        }\n        (_e = hook === null || hook === void 0 ? void 0 : hook.postpatch) === null || _e === void 0 ? void 0 : _e.call(hook, oldVnode, vnode);\n    }\n    return function patch(oldVnode, vnode) {\n        let i, elm, parent;\n        const insertedVnodeQueue = [];\n        for (i = 0; i < cbs.pre.length; ++i)\n            cbs.pre[i]();\n        if (!isVnode(oldVnode)) {\n            oldVnode = emptyNodeAt(oldVnode);\n        }\n        if (sameVnode(oldVnode, vnode)) {\n            patchVnode(oldVnode, vnode, insertedVnodeQueue);\n        }\n        else {\n            elm = oldVnode.elm;\n            parent = api.parentNode(elm);\n            createElm(vnode, insertedVnodeQueue);\n            if (parent !== null) {\n                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));\n                removeVnodes(parent, [oldVnode], 0, 0);\n            }\n        }\n        for (i = 0; i < insertedVnodeQueue.length; ++i) {\n            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);\n        }\n        for (i = 0; i < cbs.post.length; ++i)\n            cbs.post[i]();\n        return vnode;\n    };\n}\n//# sourceMappingURL=init.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/build/package/init.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/build/package/is.js":
/*!***************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/build/package/is.js ***!
  \***************************************************************/
/*! namespace exports */
/*! export array [provided] [no usage info] [missing usage info prevents renaming] */
/*! export primitive [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"array\": () => /* binding */ array,\n/* harmony export */   \"primitive\": () => /* binding */ primitive\n/* harmony export */ });\nconst array = Array.isArray;\nfunction primitive(s) {\n    return typeof s === 'string' || typeof s === 'number';\n}\n//# sourceMappingURL=is.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/build/package/is.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/build/package/modules/attributes.js":
/*!*******************************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/build/package/modules/attributes.js ***!
  \*******************************************************************************/
/*! namespace exports */
/*! export attributesModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"attributesModule\": () => /* binding */ attributesModule\n/* harmony export */ });\nconst xlinkNS = 'http://www.w3.org/1999/xlink';\nconst xmlNS = 'http://www.w3.org/XML/1998/namespace';\nconst colonChar = 58;\nconst xChar = 120;\nfunction updateAttrs(oldVnode, vnode) {\n    var key;\n    var elm = vnode.elm;\n    var oldAttrs = oldVnode.data.attrs;\n    var attrs = vnode.data.attrs;\n    if (!oldAttrs && !attrs)\n        return;\n    if (oldAttrs === attrs)\n        return;\n    oldAttrs = oldAttrs || {};\n    attrs = attrs || {};\n    // update modified attributes, add new attributes\n    for (key in attrs) {\n        const cur = attrs[key];\n        const old = oldAttrs[key];\n        if (old !== cur) {\n            if (cur === true) {\n                elm.setAttribute(key, '');\n            }\n            else if (cur === false) {\n                elm.removeAttribute(key);\n            }\n            else {\n                if (key.charCodeAt(0) !== xChar) {\n                    elm.setAttribute(key, cur);\n                }\n                else if (key.charCodeAt(3) === colonChar) {\n                    // Assume xml namespace\n                    elm.setAttributeNS(xmlNS, key, cur);\n                }\n                else if (key.charCodeAt(5) === colonChar) {\n                    // Assume xlink namespace\n                    elm.setAttributeNS(xlinkNS, key, cur);\n                }\n                else {\n                    elm.setAttribute(key, cur);\n                }\n            }\n        }\n    }\n    // remove removed attributes\n    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)\n    // the other option is to remove all attributes with value == undefined\n    for (key in oldAttrs) {\n        if (!(key in attrs)) {\n            elm.removeAttribute(key);\n        }\n    }\n}\nconst attributesModule = { create: updateAttrs, update: updateAttrs };\n//# sourceMappingURL=attributes.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/build/package/modules/attributes.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/build/package/modules/class.js":
/*!**************************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/build/package/modules/class.js ***!
  \**************************************************************************/
/*! namespace exports */
/*! export classModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"classModule\": () => /* binding */ classModule\n/* harmony export */ });\nfunction updateClass(oldVnode, vnode) {\n    var cur;\n    var name;\n    var elm = vnode.elm;\n    var oldClass = oldVnode.data.class;\n    var klass = vnode.data.class;\n    if (!oldClass && !klass)\n        return;\n    if (oldClass === klass)\n        return;\n    oldClass = oldClass || {};\n    klass = klass || {};\n    for (name in oldClass) {\n        if (oldClass[name] &&\n            !Object.prototype.hasOwnProperty.call(klass, name)) {\n            // was `true` and now not provided\n            elm.classList.remove(name);\n        }\n    }\n    for (name in klass) {\n        cur = klass[name];\n        if (cur !== oldClass[name]) {\n            elm.classList[cur ? 'add' : 'remove'](name);\n        }\n    }\n}\nconst classModule = { create: updateClass, update: updateClass };\n//# sourceMappingURL=class.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/build/package/modules/class.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/build/package/modules/eventlisteners.js":
/*!***********************************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/build/package/modules/eventlisteners.js ***!
  \***********************************************************************************/
/*! namespace exports */
/*! export eventListenersModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"eventListenersModule\": () => /* binding */ eventListenersModule\n/* harmony export */ });\nfunction invokeHandler(handler, vnode, event) {\n    if (typeof handler === 'function') {\n        // call function handler\n        handler.call(vnode, event, vnode);\n    }\n    else if (typeof handler === 'object') {\n        // call handler with arguments\n        if (typeof handler[0] === 'function') {\n            // special case for single argument for performance\n            if (handler.length === 2) {\n                handler[0].call(vnode, handler[1], event, vnode);\n            }\n            else {\n                var args = handler.slice(1);\n                args.push(event);\n                args.push(vnode);\n                handler[0].apply(vnode, args);\n            }\n        }\n        else {\n            // call multiple handlers\n            for (var i = 0; i < handler.length; i++) {\n                invokeHandler(handler[i], vnode, event);\n            }\n        }\n    }\n}\nfunction handleEvent(event, vnode) {\n    var name = event.type;\n    var on = vnode.data.on;\n    // call event handler(s) if exists\n    if (on && on[name]) {\n        invokeHandler(on[name], vnode, event);\n    }\n}\nfunction createListener() {\n    return function handler(event) {\n        handleEvent(event, handler.vnode);\n    };\n}\nfunction updateEventListeners(oldVnode, vnode) {\n    var oldOn = oldVnode.data.on;\n    var oldListener = oldVnode.listener;\n    var oldElm = oldVnode.elm;\n    var on = vnode && vnode.data.on;\n    var elm = (vnode && vnode.elm);\n    var name;\n    // optimization for reused immutable handlers\n    if (oldOn === on) {\n        return;\n    }\n    // remove existing listeners which no longer used\n    if (oldOn && oldListener) {\n        // if element changed or deleted we remove all existing listeners unconditionally\n        if (!on) {\n            for (name in oldOn) {\n                // remove listener if element was changed or existing listeners removed\n                oldElm.removeEventListener(name, oldListener, false);\n            }\n        }\n        else {\n            for (name in oldOn) {\n                // remove listener if existing listener removed\n                if (!on[name]) {\n                    oldElm.removeEventListener(name, oldListener, false);\n                }\n            }\n        }\n    }\n    // add new listeners which has not already attached\n    if (on) {\n        // reuse existing listener or create new\n        var listener = vnode.listener = oldVnode.listener || createListener();\n        // update vnode for listener\n        listener.vnode = vnode;\n        // if element changed or added we add all needed listeners unconditionally\n        if (!oldOn) {\n            for (name in on) {\n                // add listener if element was changed or new listeners added\n                elm.addEventListener(name, listener, false);\n            }\n        }\n        else {\n            for (name in on) {\n                // add listener if new listener added\n                if (!oldOn[name]) {\n                    elm.addEventListener(name, listener, false);\n                }\n            }\n        }\n    }\n}\nconst eventListenersModule = {\n    create: updateEventListeners,\n    update: updateEventListeners,\n    destroy: updateEventListeners\n};\n//# sourceMappingURL=eventlisteners.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/build/package/modules/eventlisteners.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/build/package/modules/props.js":
/*!**************************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/build/package/modules/props.js ***!
  \**************************************************************************/
/*! namespace exports */
/*! export propsModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"propsModule\": () => /* binding */ propsModule\n/* harmony export */ });\nfunction updateProps(oldVnode, vnode) {\n    var key;\n    var cur;\n    var old;\n    var elm = vnode.elm;\n    var oldProps = oldVnode.data.props;\n    var props = vnode.data.props;\n    if (!oldProps && !props)\n        return;\n    if (oldProps === props)\n        return;\n    oldProps = oldProps || {};\n    props = props || {};\n    for (key in props) {\n        cur = props[key];\n        old = oldProps[key];\n        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {\n            elm[key] = cur;\n        }\n    }\n}\nconst propsModule = { create: updateProps, update: updateProps };\n//# sourceMappingURL=props.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/build/package/modules/props.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/build/package/modules/style.js":
/*!**************************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/build/package/modules/style.js ***!
  \**************************************************************************/
/*! namespace exports */
/*! export styleModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"styleModule\": () => /* binding */ styleModule\n/* harmony export */ });\n// Bindig `requestAnimationFrame` like this fixes a bug in IE/Edge. See #360 and #409.\nvar raf = (typeof window !== 'undefined' && (window.requestAnimationFrame).bind(window)) || setTimeout;\nvar nextFrame = function (fn) {\n    raf(function () {\n        raf(fn);\n    });\n};\nvar reflowForced = false;\nfunction setNextFrame(obj, prop, val) {\n    nextFrame(function () {\n        obj[prop] = val;\n    });\n}\nfunction updateStyle(oldVnode, vnode) {\n    var cur;\n    var name;\n    var elm = vnode.elm;\n    var oldStyle = oldVnode.data.style;\n    var style = vnode.data.style;\n    if (!oldStyle && !style)\n        return;\n    if (oldStyle === style)\n        return;\n    oldStyle = oldStyle || {};\n    style = style || {};\n    var oldHasDel = 'delayed' in oldStyle;\n    for (name in oldStyle) {\n        if (!style[name]) {\n            if (name[0] === '-' && name[1] === '-') {\n                elm.style.removeProperty(name);\n            }\n            else {\n                elm.style[name] = '';\n            }\n        }\n    }\n    for (name in style) {\n        cur = style[name];\n        if (name === 'delayed' && style.delayed) {\n            for (const name2 in style.delayed) {\n                cur = style.delayed[name2];\n                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {\n                    setNextFrame(elm.style, name2, cur);\n                }\n            }\n        }\n        else if (name !== 'remove' && cur !== oldStyle[name]) {\n            if (name[0] === '-' && name[1] === '-') {\n                elm.style.setProperty(name, cur);\n            }\n            else {\n                elm.style[name] = cur;\n            }\n        }\n    }\n}\nfunction applyDestroyStyle(vnode) {\n    var style;\n    var name;\n    var elm = vnode.elm;\n    var s = vnode.data.style;\n    if (!s || !(style = s.destroy))\n        return;\n    for (name in style) {\n        elm.style[name] = style[name];\n    }\n}\nfunction applyRemoveStyle(vnode, rm) {\n    var s = vnode.data.style;\n    if (!s || !s.remove) {\n        rm();\n        return;\n    }\n    if (!reflowForced) {\n        // eslint-disable-next-line @typescript-eslint/no-unused-expressions\n        vnode.elm.offsetLeft;\n        reflowForced = true;\n    }\n    var name;\n    var elm = vnode.elm;\n    var i = 0;\n    var compStyle;\n    var style = s.remove;\n    var amount = 0;\n    var applied = [];\n    for (name in style) {\n        applied.push(name);\n        elm.style[name] = style[name];\n    }\n    compStyle = getComputedStyle(elm);\n    var props = compStyle['transition-property'].split(', ');\n    for (; i < props.length; ++i) {\n        if (applied.indexOf(props[i]) !== -1)\n            amount++;\n    }\n    elm.addEventListener('transitionend', function (ev) {\n        if (ev.target === elm)\n            --amount;\n        if (amount === 0)\n            rm();\n    });\n}\nfunction forceReflow() {\n    reflowForced = false;\n}\nconst styleModule = {\n    pre: forceReflow,\n    create: updateStyle,\n    update: updateStyle,\n    destroy: applyDestroyStyle,\n    remove: applyRemoveStyle\n};\n//# sourceMappingURL=style.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/build/package/modules/style.js?");

/***/ }),

/***/ "./node_viewer/node_modules/snabbdom/build/package/vnode.js":
/*!******************************************************************!*\
  !*** ./node_viewer/node_modules/snabbdom/build/package/vnode.js ***!
  \******************************************************************/
/*! namespace exports */
/*! export vnode [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"vnode\": () => /* binding */ vnode\n/* harmony export */ });\nfunction vnode(sel, data, children, text, elm) {\n    const key = data === undefined ? undefined : data.key;\n    return { sel, data, children, text, elm, key };\n}\n//# sourceMappingURL=vnode.js.map\n\n//# sourceURL=webpack://front/./node_viewer/node_modules/snabbdom/build/package/vnode.js?");

/***/ }),

/***/ "./node_viewer/update/index.js":
/*!*************************************!*\
  !*** ./node_viewer/update/index.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _common_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/update */ \"./common/update/index.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action) => {\r\n  if (action.type == 'node_data') state.node_data = action.data\r\n  state = (0,_common_update__WEBPACK_IMPORTED_MODULE_0__.default)(state, action)\r\n  return state\r\n});\n\n//# sourceURL=webpack://front/./node_viewer/update/index.js?");

/***/ }),

/***/ "./node_viewer/view/index.js":
/*!***********************************!*\
  !*** ./node_viewer/view/index.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./node_viewer/node_modules/snabbdom/build/package/h.js\");\n/* harmony import */ var _common_view_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/view/info */ \"./common/view/info/index.js\");\n/* harmony import */ var _common_view_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/view/actions */ \"./common/view/actions/index.js\");\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, send) => \r\n  (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('body', (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div#container', state.node_data ? [\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.column', [\r\n      (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h2', 'Info'),\r\n      (0,_common_view_info__WEBPACK_IMPORTED_MODULE_1__.default)(state, send, state.node_data)\r\n    ]),\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.column', [\r\n      (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h2', 'Actions'),\r\n      (0,_common_view_actions__WEBPACK_IMPORTED_MODULE_2__.default)(state, send, state.node_data)\r\n    ])\r\n  ] : (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.title', 'Loading data...'))));\n\n//# sourceURL=webpack://front/./node_viewer/view/index.js?");

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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./node_viewer/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;