const path = require('path')
const buble = require('rollup-plugin-buble')
const flow = require('rollup-plugin-flow-no-whitespace')
const cjs = require('@rollup/plugin-commonjs')
const node = require('@rollup/plugin-node-resolve').nodeResolve
const replace = require('rollup-plugin-replace')
const vue = require('rollup-plugin-vue');
const packagejson = require('../package.json')
const banner =
  `/*!
  * ${packagejson.name} v${packagejson.version} - ${packagejson.description}
  * (c) ${new Date().getFullYear()} ${packagejson.author}
  * @license ${packagejson.license}
  */`

const resolve = _path => path.resolve(__dirname, '../', _path)

module.exports = [
  // browser dev
  {
    // dist/foobar.js
    file: resolve(packagejson.unpkg),
    format: 'umd',
    env: 'development',
  },
  {
    // dist/foobar.min.js
    file: resolve(packagejson.unpkg.replace('.js', '.min.js')),
    format: 'umd',
    env: 'production',
  },
  {
    // dist/foobar.common.js
    file: resolve(packagejson.main),
    format: 'cjs',
  },
  {
    // dist/foobar.esm.js
    file: resolve(packagejson.module),
    format: 'es',
  },
  {
    // dist/foobar.esm.browser.js
    file: resolve(packagejson.module.replace('.esm', '.esm.browser')),
    format: 'es',
    env: 'development',
    transpile: false,
  },
  {
    // dist/foobar.esm.browser.min.js
    file: resolve(packagejson.module.replace('.esm', '.esm.browser.min')),
    format: 'es',
    env: 'production',
    transpile: false,
  }
].map(genConfig)

function genConfig(opts) {
  const config = {
    input: {
      input: resolve('src/index.js'),
      plugins: [
        vue(),
        flow(),
        node(),
        cjs(),
        replace({
          __VERSION__: packagejson.version
        })
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: packagejson.globalName, //'FooBar'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  if (opts.transpile !== false) {
    // config.input.plugins.push(buble())
  }

  return config
}
