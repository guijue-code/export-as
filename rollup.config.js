/*
 * @Author       : zp
 * @Date         : 2024-04-15 17:55:25
 * @LastEditors  : zp
 * @Description  : 描述
 */
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import '@babel/plugin-transform-runtime'

export default {
  input: 'src/index.js',
  external:['eslint'],
  // external: ['file-saver', 'html2canvas'],
  output: [
    {
      file: './lib/export-as.js',
      format: 'umd',
      name: 'exportas'
    },
    {
      file: './lib/export-as.min.js',
      format: 'umd',
      name: 'exportas',
      plugins: [terser()]
    }
  ],
  plugins: [
    commonjs(),
    babel({ babelHelpers: 'runtime', 'plugins': [
      ['@babel/plugin-transform-runtime', {
        'regenerator': true
      }]
    ] }),
    resolve({
      moduleDirectories:['node_modules'],
      // customResolveOptions: {
      //   moduleDirectory: 'node_modules'
      // }
    })
  ]

}
