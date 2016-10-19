const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const promisify = require("promisify-node");
const convert = require('koa-convert');

module.exports = async function setupDevServer(app) {
  // setup on the fly compilation + hot-reload
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )

  const clientCompiler = webpack(clientConfig)

  let webpackMw = require('webpack-dev-middleware');
  let hotMw = require('webpack-hot-middleware');

  app.use(convert(webpackMw(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })))

  app.use(convert(hotMw(clientCompiler)))

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig)
  const mfs = promisify(new MFS());
  const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename)

  serverCompiler.outputFileSystem = mfs
  const watch = promisify(serverCompiler.watch);

  try {
    let stats = await watch({})  
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))        
  } catch (err) {
    throw err;
  }

  return await mfs.readFileSync(outputPath, 'utf-8');
}
