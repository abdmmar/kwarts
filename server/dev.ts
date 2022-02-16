import path from 'path';
import express from 'express';
import webpack, { Compiler } from 'webpack';
import nodemon from 'nodemon';
import { sync } from 'rimraf';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import clientConfig from '../config/webpack.dev.client';
import serverConfig from '../config/webpack.dev.server';
import { compilerListener, compilation } from './util';
import paths from '../config/paths';

const PORT = 5002;

const app = express();

(async () => {
  try {
    console.log('[SERVER] Installing development environment');

    sync(path.join(process.cwd(), 'dist'));

    const multiCompiler = webpack([clientConfig, serverConfig]);
    const clientCompiler = multiCompiler.compilers.find((compiler: Compiler) => compiler.name === 'client') as Compiler;
    const serverCompiler = multiCompiler.compilers.find((compiler: Compiler) => compiler.name === 'server') as Compiler;

    app.use(
      devMiddleware(clientCompiler, {
        publicPath: './',
        stats: 'minimal',
        writeToDisk: true,
        serverSideRender: true
      })
    );

    app.use(
      hotMiddleware(clientCompiler, {
        log: false,
        heartbeat: 2000,
        path: '/__webpack_hmr'
      })
    );

    serverCompiler.watch(
      {
        ignored: /node_modules/,
        aggregateTimeout: 200,
        poll: 1000
      },
      (err, stats) => compilation(err, stats, 'minimal')
    );

    await Promise.all([compilerListener('client', clientCompiler), compilerListener('server', serverCompiler)]);

    app.listen(PORT, () => {
      console.log(`[SERVER] Hot dev server middleware is running on port: ${PORT}`);
    });

    const script = nodemon({
      script: `${paths.buildServer}/server.js`,
      ignore: ['src', 'config', 'server', 'dist/client'],
      delay: 200
    });

    script.on('restart', () => {
      console.log('[SERVER] Server side app has been restarted');
    });

    script.on('quit', () => {
      console.log('[SERVER] Process ended');
      process.exit();
    });

    script.on('error', () => {
      console.log('[SERVER] An error occured. Exiting');
      process.exit(1);
    });

    process.on('SIGINT', () => {
      console.log('[SERVER] Cleaning sensors..');
      process.exit();
    });
  } catch (error) {
    console.error(error);
  }
})();
