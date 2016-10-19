process.env.VUE_ENV = 'server'
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const koa = require('koa');
const serve = require('koa-static');
const favicon = require('koa-favicon');
const write = require('koa-write');

const paths = {
  dist: resolve('./dist'),
  favIcon: resolve('./src/assets/logo.png')
}

const app = new koa();
const router = require('./router')(app);

const port = process.env.PORT || 8080;

app
  .use(router.routes())
  .use(router.allowedMethods());

app
  .use(serve(paths.dist))
  .use(favicon(paths.favIcon))

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
