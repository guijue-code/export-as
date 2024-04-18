"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rollupPluginTerser = require("rollup-plugin-terser");

var _pluginNodeResolve = _interopRequireDefault(require("@rollup/plugin-node-resolve"));

var _pluginBabel = _interopRequireDefault(require("@rollup/plugin-babel"));

var _rollupPluginCommonjs = _interopRequireDefault(require("rollup-plugin-commonjs"));

require("@babel/plugin-transform-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Author       : zp
 * @Date         : 2024-04-15 17:55:25
 * @LastEditors  : zp
 * @Description  : 描述
 */
var _default = {
  input: 'src/index.js',
  external: ['eslint'],
  // external: ['file-saver', 'html2canvas'],
  output: [{
    file: './lib/export-as.js',
    format: 'umd',
    name: 'exportas'
  }, {
    file: './lib/export-as.min.js',
    format: 'umd',
    name: 'exportas',
    plugins: [(0, _rollupPluginTerser.terser)()]
  }],
  plugins: [(0, _rollupPluginCommonjs["default"])(), (0, _pluginBabel["default"])({
    babelHelpers: 'runtime',
    'plugins': [['@babel/plugin-transform-runtime', {
      'regenerator': true
    }]]
  }), (0, _pluginNodeResolve["default"])({
    moduleDirectories: ['node_modules'] // customResolveOptions: {
    //   moduleDirectory: 'node_modules'
    // }

  })]
};
exports["default"] = _default;