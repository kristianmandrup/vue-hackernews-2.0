const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'

// parse index.html template
// const html = (() => {
//   const template = fs.readFileSync(resolve('../index.html'), 'utf-8')
//   const i = template.indexOf('{{ APP }}')
//   // styles are injected dynamically via vue-style-loader in development
//   const style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">' : ''
//   return {
//     head: template.slice(0, i).replace('{{ STYLE }}', style),
//     tail: template.slice(i + '{{ APP }}'.length)
//   }
// })()

// const convert = require('koa-convert');
// const write = convert(require('koa-write'));

const router = require('koa-router')();
const renderFactory = require('../renderer');

module.exports = (app) => {
  const renderer = renderFactory(app);

  console.log('renderer', renderer);

  router.get('*', (ctx, next) => {
    // let ctx = this;

    console.log('entering default route');

    // if (!renderer) {
    //   return write(ctx, 'waiting for compilation... refresh in a moment.')
    // }

    // var s = Date.now()
    // const context = { url: ctx.url }
    // const renderStream = renderer.renderToStream(context)
    // let firstChunk = true;

    // const serialize = require('serialize-javascript');

    // console.log('writing head');

    // write(ctx, html.head)

    // console.log('writing on data');

    // renderStream.on('data', chunk => {
    //   console.log('received data chunk');

    //   if (firstChunk) {
    //     console.log('first chunk');

    //     // embed initial store state
    //     if (context.initialState) {
    //       console.log('initialState');

    //       write(ctx,
    //         `<script>window.__INITIAL_STATE__=${
    //           serialize(context.initialState, { isJSON: true })
    //         }</script>`
    //       )
    //     }
    //     firstChunk = false
    //   }
    //   write(ctx, chunk)
    // })

    // renderStream.on('end', () => {
    //   console.log('on end');

    //   write(ctx, html.tail)
    //   console.log(`whole request: ${Date.now() - s}ms`)
    // })

    // renderStream.on('error', err => {
    //   console.error('ERROR', err);
    //   throw err
    // })
  })

  return router;
}
