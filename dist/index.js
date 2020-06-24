module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(562);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 562:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

// const fs = require('fs');
const path = __webpack_require__(622);
const core = __webpack_require__(722);
const github = __webpack_require__(826);
const octokit = github.getOctokit("myToken")

// most @actions toolkit packages have async methods
async function run() {
  try {
    const dist = core.getInput('dist');
    core.debug(`ISSUES_DIST = '${dist}'`)

    // GitHub workspace
    let githubWorkspacePath = process.env['GITHUB_WORKSPACE']
    if (!githubWorkspacePath) {
      throw new Error('GITHUB_WORKSPACE not defined')
    }
    githubWorkspacePath = path.resolve(githubWorkspacePath)
    core.debug(`GITHUB_WORKSPACE = '${githubWorkspacePath}'`)

    const { data: issues } = await octokit.issues.listForRepo({
      owner: 'saltbo',
      repo: 'blog',
    });
    console.log(issues)
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()


/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 722:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 826:
/***/ (function(module) {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ });