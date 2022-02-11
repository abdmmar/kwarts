import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

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
    serverSideRender: true,
    writeToDisk: false, // Toggle this to get webpack in-memory files to be written to disk
    headers: { 'Access-Control-Allow-Origin': '*' },
    // publicPath: '../dist/client',
    stats: 'minimal'
  })
);
app.use(webpackHotMiddleware(clientCompiler));

app.listen(8080, () => console.log('[SERVER] Server is running on http://localhost:3000'));
