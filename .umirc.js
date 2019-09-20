
// ref: https://umijs.org/config/
import { join } from "path";
import slash from 'slash';
const path = require('path');

import MonacoWebpackPlugin from'monaco-editor-webpack-plugin';
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');

export default {
  treeShaking: true,
  publicPath:'./',
  history: 'hash',
  // routes:[
  //   { path:'/', component:'./index.js' },
  // ],
  cssLoaderOptions:{
    localIdentName:'[local]'
  },

  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'oreo',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],

    // new MonacoWebpackPlugin({
    //   // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    //   languages: ['json']
    // })
  ],
  chainWebpack(config, { webpack }) {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // languages: ['yaml']
      }
    ])
  },
  outputPath:'./app/render', // 更改输出目录

  externals(context, request, callback) {
    const isDev = process.env.NODE_ENV === 'development';
    let isExternal = false;
    const load = [
      'electron',
      'fs',
      'path',
      'os',
      'url',
      'child_process'
    ];
    if (load.includes(request)) {
      isExternal = `require("${request}")`;
    }
    const appDeps = Object.keys(require('./app/package').dependencies);
    if (appDeps.includes(request)) {
      const orininalPath = slash(join(__dirname, './app/node_modules', request));
      const requireAbsolute = `require('${orininalPath}')`;
      isExternal = isDev ? requireAbsolute : `require('${request}')`;
    }
    callback(null, isExternal);
  },
}
