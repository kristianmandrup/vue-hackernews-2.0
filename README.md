# vue-hackernews-2.0

HackerNews clone built with Vue 2.0 + vue-router + vuex, with server-side rendering.

<p align="center">
  <a href="https://vue-hn.now.sh" target="_blank">
    <img src="https://cloud.githubusercontent.com/assets/499550/17546273/5aabc5fc-5eaf-11e6-8d6a-ad00937e8bd6.png" width="700px">
    <br>
    Live Demo
  </a>
</p>

> Note: the demo may need some spin up time if nobody has accessed it for a certain period.

## Features

- Express 4.x
- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
- Real-time List Updates with FLIP Animation

## WIP: Koa 2 

*Work in Progress* Please help out!

Requires Node 7+ (or using Babel with `async/await` transform plugin - see `.babelrc`)

[Koa 2](koajs.com) support:

`npm run koa-dev`

See `koa-server.js` 

*Issues*

Mainly in renderer and `build/setup-dev-server.js`

The webpack middleware modules: `webpack-dev-middleware` and `webpack-hot-middleware` are made for 
express and need to be converted for use with Koa2 using `koa-convert` or similar!?

Currently experimenting with async/await for better async handling 
(ie. waiting for file system when reading bundle updates in dev mode).

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

## Build Setup

**Requires Node.js 6+**

``` bash
# install dependencies
npm install

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```
