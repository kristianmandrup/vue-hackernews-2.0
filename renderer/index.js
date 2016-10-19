const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

// https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;

const isProd = process.env.NODE_ENV === 'production'

function createRenderer (bundle) {
  console.log('create renderer for bundle');

  return createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

function prodRenderer(app) {
  console.log('prod renderer...');
  // create server renderer from real fs
  const bundlePath = resolve('../dist/server-bundle.js')
  return createRenderer(fs.readFileSync(bundlePath, 'utf-8'))
}

function devRenderer(app) {
  console.log('dev renderer...');
  const setup = require('../build/setup-dev-server');

  // TODO: somehow await/async here!
  let bundle = await setup(app);
  console.log('create renderer');
  return createRenderer(bundle)  
}


module.exports = (app) => {
  // setup the server renderer, depending on dev/prod environment
  return isProd ? prodRenderer(app) : devRenderer(app);  
}