import * as express from 'express';
import * as webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import renderer from './renderer';

const app = express();

app.use(express.static('dist'));

if (process.env.NODE_ENV === 'development') {
  console.log('[SERVER] Installing development environment');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackConfig: webpack.Configuration = require('../config/webpack.dev.client.js');
  const compiler = webpack(webpackConfig);

  process.on('SIGINT', () => {
    console.log('[SERVER] Cleaning sensors..');
    process.exit();
  });

  app.use(
    WebpackDevMiddleware(compiler, {
      serverSideRender: true,
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      stats: 'minimal'
    })
  );
  app.use(WebpackHotMiddleware(compiler));
}

app.get('*', (req: express.Request, res: express.Response) => {
  try {
    res.send(renderer(req));
  } catch (error) {
    console.error('[SERVER] Error in rendering server side:', error);
  }
});

app.listen(3000, () => {
  console.log('[SERVER] Server is running on http://localhost:3000');
});
