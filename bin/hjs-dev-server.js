#!/bin/env node
// runs a dev server
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var argv = require('minimist')(process.argv.slice(2))
var findRoot = require('find-root')
var rootFolder = findRoot(process.env.PWD)

// get config
if (argv.config) {
  argv.config = require(path.resolve(argv.config));
} else {
  argv.config = require(path.resolve(path.join(rootFolder, 'webpack.config.js')))
}

argv.port = argv.port || 3000;
argv.address = argv.address || argv.host || '0.0.0.0'

// run it
new WebpackDevServer(webpack(argv.config), {
  historyApiFallback: true,
  hot: true
}).listen(argv.port, argv.address, function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log('development server running at: http://localhost:' + argv.port)
})