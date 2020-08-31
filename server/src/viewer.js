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

/***/ "./common/effect/flexsearch/index.js":
/*!*******************************************!*\
  !*** ./common/effect/flexsearch/index.js ***!
  \*******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _initflex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initflex */ \"./common/effect/flexsearch/initflex.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action, send) => {\r\n  if (action.type == 'actions') (0,_initflex__WEBPACK_IMPORTED_MODULE_0__.default)(state, send, action.actions, 'actions')\r\n  if (action.type == 'tests') (0,_initflex__WEBPACK_IMPORTED_MODULE_0__.default)(state, send, action.tests, 'tests')\r\n  if (action.type == 'commands') (0,_initflex__WEBPACK_IMPORTED_MODULE_0__.default)(state, send, action.commands, 'commands')\r\n  if (action.type == 'search_input') {\r\n    const results = state.flex_search[action.search_type].index.search(action.query)\r\n    send({type: 'search_results', results, search_type: action.search_type})\r\n  }\r\n});\n\n//# sourceURL=webpack://front/./common/effect/flexsearch/index.js?");

/***/ }),

/***/ "./common/effect/flexsearch/initflex.js":
/*!**********************************************!*\
  !*** ./common/effect/flexsearch/initflex.js ***!
  \**********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nconst FlexSearch = __webpack_require__(/*! flexsearch */ \"./common/node_modules/flexsearch/dist/flexsearch.min.js\")\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, send, data, search_type) => {\r\n  if (!state.flex_search || !state.flex_search[search_type]) return\r\n  const index = new FlexSearch({\r\n    encode: 'advanced',\r\n    tokenize: 'full'  \r\n  })\r\n  Object.entries(data).forEach(v => index.add(v[0], v[1].name))\r\n  send({type: 'search_index', index, search_type})\r\n});\n\n//# sourceURL=webpack://front/./common/effect/flexsearch/initflex.js?");

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

/***/ "./common/node_modules/flexsearch/dist/flexsearch.min.js":
/*!***************************************************************!*\
  !*** ./common/node_modules/flexsearch/dist/flexsearch.min.js ***!
  \***************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, top-level-this-exports */
/***/ (function(module) {

"use strict";
eval("/*\n FlexSearch v0.6.30\n Copyright 2019 Nextapps GmbH\n Author: Thomas Wilkerling\n Released under the Apache 2.0 Licence\n https://github.com/nextapps-de/flexsearch\n*/\n(function(K,R,w){let L;(L=w.define)&&L.amd?L([],function(){return R}):(L=w.modules)?L[K.toLowerCase()]=R: true?module.exports=R:undefined})(\"FlexSearch\",function ma(K){function w(a,c){const b=c?c.id:a&&a.id;this.id=b||0===b?b:na++;this.init(a,c);fa(this,\"index\",function(){return this.a?Object.keys(this.a.index[this.a.keys[0]].c):Object.keys(this.c)});fa(this,\"length\",function(){return this.index.length})}function L(a,c,b,d){this.u!==this.g&&(this.o=this.o.concat(b),this.u++,\nd&&this.o.length>=d&&(this.u=this.g),this.u===this.g&&(this.cache&&this.j.set(c,this.o),this.F&&this.F(this.o)));return this}function S(a){const c=B();for(const b in a)if(a.hasOwnProperty(b)){const d=a[b];F(d)?c[b]=d.slice(0):G(d)?c[b]=S(d):c[b]=d}return c}function W(a,c){const b=a.length,d=O(c),e=[];for(let f=0,h=0;f<b;f++){const g=a[f];if(d&&c(g)||!d&&!c[g])e[h++]=g}return e}function P(a,c,b,d,e,f,h,g,k,l){b=ha(b,h?0:e,g,f,c,k,l);let p;g&&(g=b.page,p=b.next,b=b.result);if(h)c=this.where(h,null,\ne,b);else{c=b;b=this.l;e=c.length;f=Array(e);for(h=0;h<e;h++)f[h]=b[c[h]];c=f}b=c;d&&(O(d)||(M=d.split(\":\"),1<M.length?d=oa:(M=M[0],d=pa)),b.sort(d));b=T(g,p,b);this.cache&&this.j.set(a,b);return b}function fa(a,c,b){Object.defineProperty(a,c,{get:b})}function r(a){return new RegExp(a,\"g\")}function Q(a,c){for(let b=0;b<c.length;b+=2)a=a.replace(c[b],c[b+1]);return a}function V(a,c,b,d,e,f,h,g){if(c[b])return c[b];e=e?(g-(h||g/1.5))*f+(h||g/1.5)*e:f;c[b]=e;e>=h&&(a=a[g-(e+.5>>0)],a=a[b]||(a[b]=[]),\na[a.length]=d);return e}function ba(a,c){if(a){const b=Object.keys(a);for(let d=0,e=b.length;d<e;d++){const f=b[d],h=a[f];if(h)for(let g=0,k=h.length;g<k;g++)if(h[g]===c){1===k?delete a[f]:h.splice(g,1);break}else G(h[g])&&ba(h[g],c)}}}function ca(a){let c=\"\",b=\"\";var d=\"\";for(let e=0;e<a.length;e++){const f=a[e];if(f!==b)if(e&&\"h\"===f){if(d=\"a\"===d||\"e\"===d||\"i\"===d||\"o\"===d||\"u\"===d||\"y\"===d,(\"a\"===b||\"e\"===b||\"i\"===b||\"o\"===b||\"u\"===b||\"y\"===b)&&d||\" \"===b)c+=f}else c+=f;d=e===a.length-1?\"\":a[e+\n1];b=f}return c}function qa(a,c){a=a.length-c.length;return 0>a?1:a?-1:0}function pa(a,c){a=a[M];c=c[M];return a<c?-1:a>c?1:0}function oa(a,c){const b=M.length;for(let d=0;d<b;d++)a=a[M[d]],c=c[M[d]];return a<c?-1:a>c?1:0}function T(a,c,b){return a?{page:a,next:c?\"\"+c:null,result:b}:b}function ha(a,c,b,d,e,f,h){let g,k=[];if(!0===b){b=\"0\";var l=\"\"}else l=b&&b.split(\":\");const p=a.length;if(1<p){const y=B(),t=[];let v,x;var n=0,m;let I;var u=!0;let D,E=0,N,da,X,ea;l&&(2===l.length?(X=l,l=!1):l=ea=\nparseInt(l[0],10));if(h){for(v=B();n<p;n++)if(\"not\"===e[n])for(x=a[n],I=x.length,m=0;m<I;m++)v[\"@\"+x[m]]=1;else da=n+1;if(C(da))return T(b,g,k);n=0}else N=J(e)&&e;let Y;for(;n<p;n++){const ra=n===(da||p)-1;if(!N||!n)if((m=N||e&&e[n])&&\"and\"!==m)if(\"or\"===m)Y=!1;else continue;else Y=f=!0;x=a[n];if(I=x.length){if(u)if(D){var q=D.length;for(m=0;m<q;m++){u=D[m];var A=\"@\"+u;h&&v[A]||(y[A]=1,f||(k[E++]=u))}D=null;u=!1}else{D=x;continue}A=!1;for(m=0;m<I;m++){q=x[m];var z=\"@\"+q;const Z=f?y[z]||0:n;if(!(!Z&&\n!d||h&&v[z]||!f&&y[z]))if(Z===n){if(ra){if(!ea||--ea<E)if(k[E++]=q,c&&E===c)return T(b,E+(l||0),k)}else y[z]=n+1;A=!0}else d&&(z=t[Z]||(t[Z]=[]),z[z.length]=q)}if(Y&&!A&&!d)break}else if(Y&&!d)return T(b,g,x)}if(D)if(n=D.length,h)for(m=l?parseInt(l,10):0;m<n;m++)a=D[m],v[\"@\"+a]||(k[E++]=a);else k=D;if(d)for(E=k.length,X?(n=parseInt(X[0],10)+1,m=parseInt(X[1],10)+1):(n=t.length,m=0);n--;)if(q=t[n]){for(I=q.length;m<I;m++)if(d=q[m],!h||!v[\"@\"+d])if(k[E++]=d,c&&E===c)return T(b,n+\":\"+m,k);m=0}}else!p||\ne&&\"not\"===e[0]||(k=a[0],l&&(l=parseInt(l[0],10)));c&&(h=k.length,l&&l>h&&(l=0),l=l||0,g=l+c,g<h?k=k.slice(l,g):(g=0,l&&(k=k.slice(l))));return T(b,g,k)}function J(a){return\"string\"===typeof a}function F(a){return a.constructor===Array}function O(a){return\"function\"===typeof a}function G(a){return\"object\"===typeof a}function C(a){return\"undefined\"===typeof a}function ia(a){const c=Array(a);for(let b=0;b<a;b++)c[b]=B();return c}function B(){return Object.create(null)}function sa(){let a,c;self.onmessage=\nfunction(b){if(b=b.data)if(b.search){const d=c.search(b.content,b.threshold?{limit:b.limit,threshold:b.threshold,where:b.where}:b.limit);self.postMessage({id:a,content:b.content,limit:b.limit,result:d})}else b.add?c.add(b.id,b.content):b.update?c.update(b.id,b.content):b.remove?c.remove(b.id):b.clear?c.clear():b.info?(b=c.info(),b.worker=a,console.log(b)):b.register&&(a=b.id,b.options.cache=!1,b.options.async=!1,b.options.worker=!1,c=(new Function(b.register.substring(b.register.indexOf(\"{\")+1,b.register.lastIndexOf(\"}\"))))(),\nc=new c(b.options))}}function ta(a,c,b,d){a=K(\"flexsearch\",\"id\"+a,sa,function(f){(f=f.data)&&f.result&&d(f.id,f.content,f.result,f.limit,f.where,f.cursor,f.suggest)},c);const e=ma.toString();b.id=c;a.postMessage({register:e,options:b,id:c});return a}const H={encode:\"icase\",f:\"forward\",split:/\\W+/,cache:!1,async:!1,g:!1,D:!1,a:!1,b:9,threshold:0,depth:0},ja={memory:{encode:\"extra\",f:\"strict\",threshold:0,b:1},speed:{encode:\"icase\",f:\"strict\",threshold:1,b:3,depth:2},match:{encode:\"extra\",f:\"full\",threshold:1,\nb:3},score:{encode:\"extra\",f:\"strict\",threshold:1,b:9,depth:4},balance:{encode:\"balance\",f:\"strict\",threshold:0,b:3,depth:3},fast:{encode:\"icase\",f:\"strict\",threshold:8,b:9,depth:1}},aa=[];let na=0;const ka={},la={};w.create=function(a,c){return new w(a,c)};w.registerMatcher=function(a){for(const c in a)a.hasOwnProperty(c)&&aa.push(r(c),a[c]);return this};w.registerEncoder=function(a,c){U[a]=c.bind(U);return this};w.registerLanguage=function(a,c){ka[a]=c.filter;la[a]=c.stemmer;return this};w.encode=\nfunction(a,c){return U[a](c)};w.prototype.init=function(a,c){this.v=[];if(c){var b=c.preset;a=c}else a||(a=H),b=a.preset;c={};J(a)?(c=ja[a],a={}):b&&(c=ja[b]);if(b=a.worker)if(\"undefined\"===typeof Worker)a.worker=!1,this.m=null;else{var d=parseInt(b,10)||4;this.C=-1;this.u=0;this.o=[];this.F=null;this.m=Array(d);for(var e=0;e<d;e++)this.m[e]=ta(this.id,e,a,L.bind(this))}this.f=a.tokenize||c.f||this.f||H.f;this.split=C(b=a.split)?this.split||H.split:J(b)?r(b):b;this.D=a.rtl||this.D||H.D;this.async=\n\"undefined\"===typeof Promise||C(b=a.async)?this.async||H.async:b;this.g=C(b=a.worker)?this.g||H.g:b;this.threshold=C(b=a.threshold)?c.threshold||this.threshold||H.threshold:b;this.b=C(b=a.resolution)?b=c.b||this.b||H.b:b;b<=this.threshold&&(this.b=this.threshold+1);this.depth=\"strict\"!==this.f||C(b=a.depth)?c.depth||this.depth||H.depth:b;this.w=(b=C(b=a.encode)?c.encode||H.encode:b)&&U[b]&&U[b].bind(U)||(O(b)?b:this.w||!1);(b=a.matcher)&&this.addMatcher(b);if(b=(c=a.lang)||a.filter){J(b)&&(b=ka[b]);\nif(F(b)){d=this.w;e=B();for(var f=0;f<b.length;f++){var h=d?d(b[f]):b[f];e[h]=1}b=e}this.filter=b}if(b=c||a.stemmer){var g;c=J(b)?la[b]:b;d=this.w;e=[];for(g in c)c.hasOwnProperty(g)&&(f=d?d(g):g,e.push(r(f+\"($|\\\\W)\"),d?d(c[g]):c[g]));this.stemmer=g=e}this.a=e=(b=a.doc)?S(b):this.a||H.a;this.i=ia(this.b-(this.threshold||0));this.h=B();this.c=B();if(e){this.l=B();a.doc=null;g=e.index={};c=e.keys=[];d=e.field;f=e.tag;h=e.store;F(e.id)||(e.id=e.id.split(\":\"));if(h){var k=B();if(J(h))k[h]=1;else if(F(h))for(let l=\n0;l<h.length;l++)k[h[l]]=1;else G(h)&&(k=h);e.store=k}if(f){this.G=B();h=B();if(d)if(J(d))h[d]=a;else if(F(d))for(k=0;k<d.length;k++)h[d[k]]=a;else G(d)&&(h=d);F(f)||(e.tag=f=[f]);for(d=0;d<f.length;d++)this.G[f[d]]=B();this.I=f;d=h}if(d){let l;F(d)||(G(d)?(l=d,e.field=d=Object.keys(d)):e.field=d=[d]);for(e=0;e<d.length;e++)f=d[e],F(f)||(l&&(a=l[f]),c[e]=f,d[e]=f.split(\":\")),g[f]=new w(a)}a.doc=b}this.B=!0;this.j=(this.cache=b=C(b=a.cache)?this.cache||H.cache:b)?new ua(b):!1;return this};w.prototype.encode=\nfunction(a){a&&(aa.length&&(a=Q(a,aa)),this.v.length&&(a=Q(a,this.v)),this.w&&(a=this.w(a)),this.stemmer&&(a=Q(a,this.stemmer)));return a};w.prototype.addMatcher=function(a){const c=this.v;for(const b in a)a.hasOwnProperty(b)&&c.push(r(b),a[b]);return this};w.prototype.add=function(a,c,b,d,e){if(this.a&&G(a))return this.A(\"add\",a,c);if(c&&J(c)&&(a||0===a)){var f=\"@\"+a;if(this.c[f]&&!d)return this.update(a,c);if(this.g)return++this.C>=this.m.length&&(this.C=0),this.m[this.C].postMessage({add:!0,id:a,\ncontent:c}),this.c[f]=\"\"+this.C,b&&b(),this;if(!e){if(this.async&&\"function\"!==typeof importScripts){let t=this;f=new Promise(function(v){setTimeout(function(){t.add(a,c,null,d,!0);t=null;v()})});if(b)f.then(b);else return f;return this}if(b)return this.add(a,c,null,d,!0),b(),this}c=this.encode(c);if(!c.length)return this;b=this.f;e=O(b)?b(c):c.split(this.split);this.filter&&(e=W(e,this.filter));const n=B();n._ctx=B();const m=e.length,u=this.threshold,q=this.depth,A=this.b,z=this.i,y=this.D;for(let t=\n0;t<m;t++){var h=e[t];if(h){var g=h.length,k=(y?t+1:m-t)/m,l=\"\";switch(b){case \"reverse\":case \"both\":for(var p=g;--p;)l=h[p]+l,V(z,n,l,a,y?1:(g-p)/g,k,u,A-1);l=\"\";case \"forward\":for(p=0;p<g;p++)l+=h[p],V(z,n,l,a,y?(p+1)/g:1,k,u,A-1);break;case \"full\":for(p=0;p<g;p++){const v=(y?p+1:g-p)/g;for(let x=g;x>p;x--)l=h.substring(p,x),V(z,n,l,a,v,k,u,A-1)}break;default:if(g=V(z,n,h,a,1,k,u,A-1),q&&1<m&&g>=u)for(g=n._ctx[h]||(n._ctx[h]=B()),h=this.h[h]||(this.h[h]=ia(A-(u||0))),k=t-q,l=t+q+1,0>k&&(k=0),l>\nm&&(l=m);k<l;k++)k!==t&&V(h,g,e[k],a,0,A-(k<t?t-k:k-t),u,A-1)}}}this.c[f]=1;this.B=!1}return this};w.prototype.A=function(a,c,b){if(F(c)){var d=c.length;if(d--){for(var e=0;e<d;e++)this.A(a,c[e]);return this.A(a,c[d],b)}}else{var f=this.a.index,h=this.a.keys,g=this.a.tag;e=this.a.store;var k;var l=this.a.id;d=c;for(var p=0;p<l.length;p++)d=d[l[p]];if(\"remove\"===a&&(delete this.l[d],l=h.length,l--)){for(c=0;c<l;c++)f[h[c]].remove(d);return f[h[l]].remove(d,b)}if(g){for(k=0;k<g.length;k++){var n=g[k];\nvar m=c;l=n.split(\":\");for(p=0;p<l.length;p++)m=m[l[p]];m=\"@\"+m}k=this.G[n];k=k[m]||(k[m]=[])}l=this.a.field;for(let u=0,q=l.length;u<q;u++){n=l[u];g=c;for(m=0;m<n.length;m++)g=g[n[m]];n=f[h[u]];m=\"add\"===a?n.add:n.update;u===q-1?m.call(n,d,g,b):m.call(n,d,g)}if(e){b=Object.keys(e);a=B();for(f=0;f<b.length;f++)if(h=b[f],e[h]){h=h.split(\":\");let u,q;for(l=0;l<h.length;l++)g=h[l],u=(u||c)[g],q=(q||a)[g]=u}c=a}k&&(k[k.length]=c);this.l[d]=c}return this};w.prototype.update=function(a,c,b){if(this.a&&\nG(a))return this.A(\"update\",a,c);this.c[\"@\"+a]&&J(c)&&(this.remove(a),this.add(a,c,b,!0));return this};w.prototype.remove=function(a,c,b){if(this.a&&G(a))return this.A(\"remove\",a,c);var d=\"@\"+a;if(this.c[d]){if(this.g)return this.m[this.c[d]].postMessage({remove:!0,id:a}),delete this.c[d],c&&c(),this;if(!b){if(this.async&&\"function\"!==typeof importScripts){let e=this;d=new Promise(function(f){setTimeout(function(){e.remove(a,null,!0);e=null;f()})});if(c)d.then(c);else return d;return this}if(c)return this.remove(a,\nnull,!0),c(),this}for(c=0;c<this.b-(this.threshold||0);c++)ba(this.i[c],a);this.depth&&ba(this.h,a);delete this.c[d];this.B=!1}return this};let M;w.prototype.search=function(a,c,b,d){if(G(c)){if(F(c))for(var e=0;e<c.length;e++)c[e].query=a;else c.query=a;a=c;c=1E3}else c&&O(c)?(b=c,c=1E3):c||0===c||(c=1E3);if(this.g){this.F=b;this.u=0;this.o=[];for(var f=0;f<this.g;f++)this.m[f].postMessage({search:!0,limit:c,content:a})}else{var h=[],g=a;if(G(a)&&!F(a)){b||(b=a.callback)&&(g.callback=null);var k=\na.sort;var l=a.page;c=a.limit;f=a.threshold;var p=a.suggest;a=a.query}if(this.a){f=this.a.index;const y=g.where;var n=g.bool||\"or\",m=g.field;let t=n;let v,x;if(m)F(m)||(m=[m]);else if(F(g)){var u=g;m=[];t=[];for(var q=0;q<g.length;q++)d=g[q],e=d.bool||n,m[q]=d.field,t[q]=e,\"not\"===e?v=!0:\"and\"===e&&(x=!0)}else m=this.a.keys;n=m.length;for(q=0;q<n;q++)u&&(g=u[q]),l&&!J(g)&&(g.page=null,g.limit=0),h[q]=f[m[q]].search(g,0);if(b)return b(P.call(this,a,t,h,k,c,p,y,l,x,v));if(this.async){const I=this;return new Promise(function(D){Promise.all(h).then(function(E){D(P.call(I,\na,t,E,k,c,p,y,l,x,v))})})}return P.call(this,a,t,h,k,c,p,y,l,x,v)}f||(f=this.threshold||0);if(!d){if(this.async&&\"function\"!==typeof importScripts){let y=this;f=new Promise(function(t){setTimeout(function(){t(y.search(g,c,null,!0));y=null})});if(b)f.then(b);else return f;return this}if(b)return b(this.search(g,c,null,!0)),this}if(!a||!J(a))return h;g=a;if(this.cache)if(this.B){if(b=this.j.get(a))return b}else this.j.clear(),this.B=!0;g=this.encode(g);if(!g.length)return h;b=this.f;b=O(b)?b(g):g.split(this.split);\nthis.filter&&(b=W(b,this.filter));u=b.length;d=!0;e=[];var A=B(),z=0;1<u&&(this.depth&&\"strict\"===this.f?n=!0:b.sort(qa));if(!n||(q=this.h)){const y=this.b;for(;z<u;z++){let t=b[z];if(t){if(n){if(!m)if(q[t])m=t,A[t]=1;else if(!p)return h;if(p&&z===u-1&&!e.length)n=!1,t=m||t,A[t]=0;else if(!m)continue}if(!A[t]){const v=[];let x=!1,I=0;const D=n?q[m]:this.i;if(D){let E;for(let N=0;N<y-f;N++)if(E=D[N]&&D[N][t])v[I++]=E,x=!0}if(x)m=t,e[e.length]=1<I?v.concat.apply([],v):v[0];else if(!p){d=!1;break}A[t]=\n1}}}}else d=!1;d&&(h=ha(e,c,l,p));this.cache&&this.j.set(a,h);return h}};w.prototype.find=function(a,c){return this.where(a,c,1)[0]||null};w.prototype.where=function(a,c,b,d){const e=this.l,f=[];let h=0;let g;var k;let l;if(G(a)){b||(b=c);var p=Object.keys(a);var n=p.length;g=!1;if(1===n&&\"id\"===p[0])return[e[a.id]];if((k=this.I)&&!d)for(var m=0;m<k.length;m++){var u=k[m],q=a[u];if(!C(q)){l=this.G[u][\"@\"+q];if(0===--n)return l;p.splice(p.indexOf(u),1);delete a[u];break}}k=Array(n);for(m=0;m<n;m++)k[m]=\np[m].split(\":\")}else{if(O(a)){c=d||Object.keys(e);b=c.length;for(p=0;p<b;p++)n=e[c[p]],a(n)&&(f[h++]=n);return f}if(C(c))return[e[a]];if(\"id\"===a)return[e[c]];p=[a];n=1;k=[a.split(\":\")];g=!0}d=l||d||Object.keys(e);m=d.length;for(u=0;u<m;u++){q=l?d[u]:e[d[u]];let A=!0;for(let z=0;z<n;z++){g||(c=a[p[z]]);const y=k[z],t=y.length;let v=q;if(1<t)for(let x=0;x<t;x++)v=v[y[x]];else v=v[y[0]];if(v!==c){A=!1;break}}if(A&&(f[h++]=q,b&&h===b))break}return f};w.prototype.info=function(){if(this.g)for(let a=0;a<\nthis.g;a++)this.m[a].postMessage({info:!0,id:this.id});else return{id:this.id,items:this.length,cache:this.cache&&this.cache.s?this.cache.s.length:!1,matcher:aa.length+(this.v?this.v.length:0),worker:this.g,threshold:this.threshold,depth:this.depth,resolution:this.b,contextual:this.depth&&\"strict\"===this.f}};w.prototype.clear=function(){return this.destroy().init()};w.prototype.destroy=function(){this.cache&&(this.j.clear(),this.j=null);this.i=this.h=this.c=null;if(this.a){const a=this.a.keys;for(let c=\n0;c<a.length;c++)this.a.index[a[c]].destroy();this.a=this.l=null}return this};w.prototype.export=function(a){const c=!a||C(a.serialize)||a.serialize;if(this.a){const d=!a||C(a.doc)||a.doc;var b=!a||C(a.index)||a.index;a=[];let e=0;if(b)for(b=this.a.keys;e<b.length;e++){const f=this.a.index[b[e]];a[e]=[f.i,f.h,Object.keys(f.c)]}d&&(a[e]=this.l)}else a=[this.i,this.h,Object.keys(this.c)];c&&(a=JSON.stringify(a));return a};w.prototype.import=function(a,c){if(!c||C(c.serialize)||c.serialize)a=JSON.parse(a);\nconst b=B();if(this.a){var d=!c||C(c.doc)||c.doc,e=0;if(!c||C(c.index)||c.index){c=this.a.keys;const h=c.length;for(var f=a[0][2];e<f.length;e++)b[f[e]]=1;for(e=0;e<h;e++){f=this.a.index[c[e]];const g=a[e];g&&(f.i=g[0],f.h=g[1],f.c=b)}}d&&(this.l=G(d)?d:a[e])}else{d=a[2];for(e=0;e<d.length;e++)b[d[e]]=1;this.i=a[0];this.h=a[1];this.c=b}};const va=function(){const a=r(\"\\\\s+\"),c=r(\"[^a-z0-9 ]\"),b=[r(\"[-/]\"),\" \",c,\"\",a,\" \"];return function(d){return ca(Q(d.toLowerCase(),b))}}(),U={icase:function(a){return a.toLowerCase()},\nsimple:function(){const a=r(\"\\\\s+\"),c=r(\"[^a-z0-9 ]\"),b=r(\"[-/]\"),d=r(\"[\\u00e0\\u00e1\\u00e2\\u00e3\\u00e4\\u00e5]\"),e=r(\"[\\u00e8\\u00e9\\u00ea\\u00eb]\"),f=r(\"[\\u00ec\\u00ed\\u00ee\\u00ef]\"),h=r(\"[\\u00f2\\u00f3\\u00f4\\u00f5\\u00f6\\u0151]\"),g=r(\"[\\u00f9\\u00fa\\u00fb\\u00fc\\u0171]\"),k=r(\"[\\u00fd\\u0177\\u00ff]\"),l=r(\"\\u00f1\"),p=r(\"[\\u00e7c]\"),n=r(\"\\u00df\"),m=r(\" & \"),u=[d,\"a\",e,\"e\",f,\"i\",h,\"o\",g,\"u\",k,\"y\",l,\"n\",p,\"k\",n,\"s\",m,\" and \",b,\" \",c,\"\",a,\" \"];return function(q){q=Q(q.toLowerCase(),u);return\" \"===q?\"\":q}}(),advanced:function(){const a=\nr(\"ae\"),c=r(\"ai\"),b=r(\"ay\"),d=r(\"ey\"),e=r(\"oe\"),f=r(\"ue\"),h=r(\"ie\"),g=r(\"sz\"),k=r(\"zs\"),l=r(\"ck\"),p=r(\"cc\"),n=r(\"sh\"),m=r(\"th\"),u=r(\"dt\"),q=r(\"ph\"),A=r(\"pf\"),z=r(\"ou\"),y=r(\"uo\"),t=[a,\"a\",c,\"ei\",b,\"ei\",d,\"ei\",e,\"o\",f,\"u\",h,\"i\",g,\"s\",k,\"s\",n,\"s\",l,\"k\",p,\"k\",m,\"t\",u,\"t\",q,\"f\",A,\"f\",z,\"o\",y,\"u\"];return function(v,x){if(!v)return v;v=this.simple(v);2<v.length&&(v=Q(v,t));x||1<v.length&&(v=ca(v));return v}}(),extra:function(){const a=r(\"p\"),c=r(\"z\"),b=r(\"[cgq]\"),d=r(\"n\"),e=r(\"d\"),f=r(\"[vw]\"),h=r(\"[aeiouy]\"),\ng=[a,\"b\",c,\"s\",b,\"k\",d,\"m\",e,\"t\",f,\"f\",h,\"\"];return function(k){if(!k)return k;k=this.advanced(k,!0);if(1<k.length){k=k.split(\" \");for(let l=0;l<k.length;l++){const p=k[l];1<p.length&&(k[l]=p[0]+Q(p.substring(1),g))}k=k.join(\" \");k=ca(k)}return k}}(),balance:va},ua=function(){function a(c){this.clear();this.H=!0!==c&&c}a.prototype.clear=function(){this.cache=B();this.count=B();this.index=B();this.s=[]};a.prototype.set=function(c,b){if(this.H&&C(this.cache[c])){let d=this.s.length;if(d===this.H){d--;\nconst e=this.s[d];delete this.cache[e];delete this.count[e];delete this.index[e]}this.index[c]=d;this.s[d]=c;this.count[c]=-1;this.cache[c]=b;this.get(c)}else this.cache[c]=b};a.prototype.get=function(c){const b=this.cache[c];if(this.H&&b){var d=++this.count[c];const f=this.index;let h=f[c];if(0<h){const g=this.s;for(var e=h;this.count[g[--h]]<=d&&-1!==h;);h++;if(h!==e){for(d=e;d>h;d--)e=g[d-1],g[d]=e,f[e]=d;g[h]=c;f[c]=h}}}return b};return a}();return w}(function(){const K={},R=\"undefined\"!==typeof Blob&&\n\"undefined\"!==typeof URL&&URL.createObjectURL;return function(w,L,S,W,P){S=R?URL.createObjectURL(new Blob([\"(\"+S.toString()+\")()\"],{type:\"text/javascript\"})):w+\".min.js\";w+=\"-\"+L;K[w]||(K[w]=[]);K[w][P]=new Worker(S);K[w][P].onmessage=W;return K[w][P]}}()),this);\n\n\n//# sourceURL=webpack://front/./common/node_modules/flexsearch/dist/flexsearch.min.js?");

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

/***/ "./common/update/flexsearch.js":
/*!*************************************!*\
  !*** ./common/update/flexsearch.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action) => {\r\n  if (action.type == 'search_index') state.flex_search[action.search_type].index = action.index\r\n  if (action.type == 'search_results') state.flex_search[action.search_type].results = action.results\r\n  if (action.type == 'search_input') state.flex_search[action.search_type].query = action.query\r\n\r\n  return state\r\n});\n\n//# sourceURL=webpack://front/./common/update/flexsearch.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n/* harmony import */ var _util_hoststring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/hoststring */ \"./common/util/hoststring.js\");\n/* harmony import */ var _result__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./result */ \"./common/view/actions/result/index.js\");\n/* harmony import */ var _util_timeago__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/timeago */ \"./common/util/timeago.js\");\n/* harmony import */ var _searchbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../searchbar */ \"./common/view/searchbar.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, send, node) => {\r\n  if (!state.actions) return\r\n  const base_actions = state.flex_search.actions.query && state.flex_search.actions.results ? state.flex_search.actions.results.reduce((r, v) => ({...r, [v]: state.actions[v]}), {}) : state.actions\r\n  const actions = Object.entries(base_actions).filter(v => v[1].hosts.includes('none') || v[1].hosts.includes(node.access)) \r\n  return (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll_container', [\r\n    (0,_searchbar__WEBPACK_IMPORTED_MODULE_4__.default)(send, 'actions'),\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll spaced', !actions.length ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll_item', 'No actions compatible with this host') : actions.map(v => {\r\n      const loading = state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] && state.action_results[node.hostname][v[0]].status === 'loading'\r\n      return (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.scroll_item spaced', [\r\n        (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', [\r\n          (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h3', v[1].name),\r\n          (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.button', \r\n            { \r\n              on: loading ? undefined : {click: [send, {type: 'perform_action', action: v[0], node_id: node.node_id, host: node.hostname}]},\r\n              class: {disabled: loading}\r\n            }, \r\n            loading ? 'Running...' : 'Run')\r\n        ]),\r\n        (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('pre', v[1].commands.run),\r\n        v[1].description ? v[1].description : undefined,\r\n        (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.targets', [(0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('b', 'Valid targets:'), ` ${v[1].hosts.map(_util_hoststring__WEBPACK_IMPORTED_MODULE_1__.default).join(', ')}.`]),\r\n        state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] && state.action_results[node.hostname][v[0]].result ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.results', [\r\n          (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.followup', [\r\n            `Results from ${(0,_util_timeago__WEBPACK_IMPORTED_MODULE_3__.default)(state.action_results[node.hostname][v[0]].date)}`, \r\n            (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)(`div.foldout fas fa-${state.action_results[node.hostname][v[0]].foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {\r\n              on: {click: [send, {type: 'result_foldout', action: v[0], hostname: node.hostname, value: !state.action_results[node.hostname][v[0]].foldout}]}\r\n            })\r\n          ]),\r\n          ...(state.action_results[node.hostname][v[0]].foldout ? state.action_results[node.hostname][v[0]].result\r\n            .map(r => (0,_result__WEBPACK_IMPORTED_MODULE_2__.default)(state, v[0], r, node.node_id, node.hostname, loading, send)) : [])\r\n        ]) : undefined\r\n      ])\r\n    }))\r\n  ])\r\n});\n\n//# sourceURL=webpack://front/./common/view/actions/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n\r\nconst FormatString = __webpack_require__(/*! fantastic-utils/formatstring */ \"../packages/fantastic-utils/formatstring.js\")\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action, action_result, node_id, host, loading, send, followups) => action_result.followups ? Object.values(action_result.followups).map(v => {\r\n  const followup_label = v.label || (typeof v.enabled == 'boolean' && (v.enabled ? 'Enabled' : 'Disabled')) || state.actions[action].names[v.function]\r\n  if (v.not_permitted) return (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', followup_label)\r\n  const loading_followup = loading || v.status === 'loading'\r\n  return [\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.button', \r\n      {\r\n        on: loading_followup ? {} : {\r\n          click: [\r\n            send, \r\n            {\r\n              type: 'action_followup', \r\n              action,\r\n              node_id,\r\n              host,\r\n              followups: [...followups, {followup: v.function, label: action_result.label}],\r\n              refresh: true,\r\n              date: Date.now()\r\n            }\r\n          ]\r\n        },\r\n        class: {disabled: loading_followup}\r\n      }, \r\n      (loading_followup && 'Running...') || followup_label\r\n    ),\r\n    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('pre', FormatString(state.actions[action].commands[v.function], v.data))\r\n  ]\r\n}).flat() : []);\n\n//# sourceURL=webpack://front/./common/view/actions/result/followupbuttons.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n/* harmony import */ var _followupbuttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./followupbuttons */ \"./common/view/actions/result/followupbuttons.js\");\n/* harmony import */ var _followupresults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./followupresults */ \"./common/view/actions/result/followupresults.js\");\n/* harmony import */ var _util_timeago__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../util/timeago */ \"./common/util/timeago.js\");\n\r\n\r\n\r\n\r\n\r\nconst format_value = value => {\r\n  if (value === null) return 'null'\r\n  if (typeof value === 'undefined') return 'undefined'\r\n  if (typeof value === 'object') {\r\n    if (value.date) return (0,_util_timeago__WEBPACK_IMPORTED_MODULE_3__.default)(value.date)\r\n  }\r\n  return `${value}`\r\n}\r\n\r\nconst result = (state, action, action_result, node_id, host, loading, send, followups = []) => (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.result', [\r\n  action_result.label ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('h4', action_result.label) : undefined,\r\n  action_result.data ? (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div', action_result.data.map(v => (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div', format_value(v)))) : undefined,\r\n  ...(0,_followupbuttons__WEBPACK_IMPORTED_MODULE_1__.default)(state, action, action_result, node_id, host, loading, send, followups),\r\n  ...(0,_followupresults__WEBPACK_IMPORTED_MODULE_2__.default)(state, action, action_result, node_id, host, loading, send, followups, result)\r\n])\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (result);\n\n//# sourceURL=webpack://front/./common/view/actions/result/index.js?");

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

/***/ "./common/view/searchbar.js":
/*!**********************************!*\
  !*** ./common/view/searchbar.js ***!
  \**********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/h */ \"./common/node_modules/snabbdom/build/package/h.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((send, search_type) => (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('div.item', [\r\n  (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('input', {\r\n    attrs: {type: 'text'},\r\n    on: {input: e => send({type: 'search_input', query: e.target.value, search_type})}\r\n  }),\r\n  (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_0__.h)('label.fas fa-search fa-fw')\r\n]));\n\n//# sourceURL=webpack://front/./common/view/searchbar.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _common_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/effect */ \"./common/effect/index.js\");\n/* harmony import */ var _common_effect_loadnoderesults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/effect/loadnoderesults */ \"./common/effect/loadnoderesults.js\");\n/* harmony import */ var _common_effect_fetchscripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/effect/fetchscripts */ \"./common/effect/fetchscripts.js\");\n/* harmony import */ var _common_effect_flexsearch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/effect/flexsearch */ \"./common/effect/flexsearch/index.js\");\n\r\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action, send) => {\r\n  (0,_common_effect__WEBPACK_IMPORTED_MODULE_0__.default)(state, action, send)\r\n  Object(_common_effect_flexsearch__WEBPACK_IMPORTED_MODULE_3__.default)(state, action, send)\r\n  if (action.type == 'init') (0,_common_effect_fetchscripts__WEBPACK_IMPORTED_MODULE_2__.default)(send, 'actions')\r\n  if (action.type == 'node_data') (0,_common_effect_loadnoderesults__WEBPACK_IMPORTED_MODULE_1__.default)([action.data], send)\r\n});\n\n//# sourceURL=webpack://front/./node_viewer/effect/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var snabbdom_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! snabbdom/init */ \"./node_viewer/node_modules/snabbdom/build/package/init.js\");\n/* harmony import */ var snabbdom_modules_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! snabbdom/modules/class */ \"./node_viewer/node_modules/snabbdom/build/package/modules/class.js\");\n/* harmony import */ var snabbdom_modules_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! snabbdom/modules/props */ \"./node_viewer/node_modules/snabbdom/build/package/modules/props.js\");\n/* harmony import */ var snabbdom_modules_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! snabbdom/modules/style */ \"./node_viewer/node_modules/snabbdom/build/package/modules/style.js\");\n/* harmony import */ var snabbdom_modules_attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! snabbdom/modules/attributes */ \"./node_viewer/node_modules/snabbdom/build/package/modules/attributes.js\");\n/* harmony import */ var snabbdom_modules_eventlisteners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! snabbdom/modules/eventlisteners */ \"./node_viewer/node_modules/snabbdom/build/package/modules/eventlisteners.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view */ \"./node_viewer/view/index.js\");\n/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./update */ \"./node_viewer/update/index.js\");\n/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./effect */ \"./node_viewer/effect/index.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst patch = (0,snabbdom_init__WEBPACK_IMPORTED_MODULE_0__.init)([\r\n  snabbdom_modules_class__WEBPACK_IMPORTED_MODULE_1__.classModule,\r\n  snabbdom_modules_props__WEBPACK_IMPORTED_MODULE_2__.propsModule,\r\n  snabbdom_modules_style__WEBPACK_IMPORTED_MODULE_3__.styleModule,\r\n  snabbdom_modules_attributes__WEBPACK_IMPORTED_MODULE_4__.attributesModule,\r\n  snabbdom_modules_eventlisteners__WEBPACK_IMPORTED_MODULE_5__.eventListenersModule,\r\n])\r\n\r\nlet state = { \r\n  action_results: {},\r\n  flex_search: {actions: {}}\r\n}\r\nlet vnode = document.body\r\n\r\nconst send = action=> {\r\n  state = (0,_update__WEBPACK_IMPORTED_MODULE_7__.default)(state, action)\r\n  vnode = patch(vnode, (0,_view__WEBPACK_IMPORTED_MODULE_6__.default)(state, send))\r\n  Object(_effect__WEBPACK_IMPORTED_MODULE_8__.default)(state,action,send) \r\n}\r\n  \r\nsend({type:'init'})\r\n\r\nwindow.state = state\r\nwindow.send = send\n\n//# sourceURL=webpack://front/./node_viewer/main.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _common_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/update */ \"./common/update/index.js\");\n/* harmony import */ var _common_update_flexsearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/update/flexsearch */ \"./common/update/flexsearch.js\");\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((state, action) => {\r\n  if (action.type == 'node_data') state.node_data = action.data\r\n  state = (0,_common_update__WEBPACK_IMPORTED_MODULE_0__.default)(state, action)\r\n  state = (0,_common_update_flexsearch__WEBPACK_IMPORTED_MODULE_1__.default)(state, action)\r\n  return state\r\n});\n\n//# sourceURL=webpack://front/./node_viewer/update/index.js?");

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
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const JSToPS = __webpack_require__(/*! ./jstops */ \"../packages/fantastic-utils/jstops.js\")\r\n\r\nconst js_string = js => {\r\n  if (typeof js == 'undefined') return 'undefined'\r\n  if (typeof js == 'number') return `${js}`\r\n  if (typeof js == 'string') return `\"${js}\"`\r\n  if (typeof js == 'boolean') return js ? 'true' : 'false'\r\n}\r\n\r\n/**\r\n * Replace placeholders in the '$key' format with corresponding values from the parameters object\r\n * @param {string} string \r\n * @param {Object} parameters \r\n * @param {('powershell'|'js')} mode\r\n * @returns {string}\r\n */\r\nconst formatString = (string, parameters, mode = 'powershell') => {\r\n  Object.entries(parameters).forEach(v => {\r\n     // regex escape magic I found to preserve special characters when searching and replacing the key\r\n     // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions\r\n    const key_regex = new RegExp(`$${v[0]}`.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&', 'g'))\r\n    string = string.replace(key_regex, mode == 'powershell' ? JSToPS(v[1]) : js_string(v[1]))\r\n  }) \r\n  return string\r\n}\r\n\r\nmodule.exports = formatString\n\n//# sourceURL=webpack://front/../packages/fantastic-utils/formatstring.js?");

/***/ }),

/***/ "../packages/fantastic-utils/jstops.js":
/*!*********************************************!*\
  !*** ../packages/fantastic-utils/jstops.js ***!
  \*********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("/**\r\n * Convert a JavaScript value to a PowerShell variable\r\n * @param {*} js \r\n * @returns {string}\r\n */\r\nconst JStoPS = js => {\r\n  if (typeof js == 'undefined') return '$null'\r\n  if (typeof js == 'number') return `${js}`\r\n  if (typeof js == 'string') return `\"${js}\"`\r\n  if (typeof js == 'boolean') return js ? 'True' : 'False'\r\n}\r\n\r\nmodule.exports = JStoPS\n\n//# sourceURL=webpack://front/../packages/fantastic-utils/jstops.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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