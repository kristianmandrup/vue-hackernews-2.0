const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

// https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const isProd = process.env.NODE_ENV === 'production'

function createRenderer (bundle) {
  return createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

module.exports = (app) => {
  // setup the server renderer, depending on dev/prod environment
  let renderer;

  if (isProd) {
    // create server renderer from real fs
    const bundlePath = resolve('../dist/server-bundle.js')
    renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'))
  } else {
    require('../build/setup-dev-server')(app, bundle => {
      renderer = createRenderer(bundle)
    })
  }
  
  return renderer;
}