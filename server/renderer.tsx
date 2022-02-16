import path from 'path';
import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';

import App from '../src/App';
import paths from '../config/paths';

const PORT = 5001;

const app = express();

app.enable('trust proxy');

if (process.env.NODE_ENV === 'development') {
  app.use('/', express.static(paths.buildClient));
}

const html = ({ styles, children, extractor }) => {
  return `
  <html lang="en" class="h-100">
    <head>
      <base href="/" />
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>KWARTS</title>
      ${styles}
      ${extractor.getStyleTags()}
    </head>
    <body>
      <div id="root">${children}</div>
      ${extractor.getScriptTags()}
    </body>
  </html>`;
};

app.use((req: express.Request, res: express.Response) => {
  const extractor = new ChunkExtractor({
    statsFile: path.join(process.cwd(), 'dist', 'client', 'loadable-stats.json'),
    entrypoints: ['client']
  });

  const stylesheet = new ServerStyleSheet();
  const content = renderToString(
    stylesheet.collectStyles(
      <ChunkExtractorManager extractor={extractor}>
        <App />
      </ChunkExtractorManager>
    )
  );
  const styles = stylesheet.getStyleTags();

  const data: any = {
    styles,
    children: content,
    extractor
  };

  res.status(200).send(html(data));
});

app.listen(PORT, () => {
  console.log(`[SERVER] App SSR running on http://localhost:${PORT} 🌎`);
});
