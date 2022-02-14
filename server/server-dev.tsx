import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import clientConfig from '../config/webpack.dev.client';
import serverConfig from '../config/webpack.dev.server';

const app = express();

app.use(express.static('public'));
app.use(express.static('dist'));

console.log('[SERVER] Installing development environment');

const compiler = webpack([clientConfig, serverConfig]);

const [clientCompiler] = compiler.compilers;

process.on('SIGINT', () => {
  console.log('[SERVER] Cleaning sensors..');
  process.exit();
});

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: './',
    serverSideRender: true
  })
);
app.use(webpackHotMiddleware(clientCompiler));
// app.use(webpackHotServerMiddleware(compiler));

app.listen(8080, () => console.log('[SERVER] Server is running on http://localhost:8080'));
