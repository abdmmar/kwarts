import path from 'path';
import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';

import App from '../src/App';

const router = express.Router();

type Data = {
  styles: string;
  children: string;
  extractor: ChunkExtractor;
};

const html = ({ styles, children, extractor }: Data) => {
  return `
  <html lang="en">
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

export const renderer = (req: express.Request, res: express.Response) => {
  const stylesheet = new ServerStyleSheet();
  const loadableJSON = path.resolve(__dirname, './loadable-stats.json');

  const extractor = new ChunkExtractor({
    statsFile: loadableJSON,
    entrypoints: ['./']
  });

  const content = renderToString(
    stylesheet.collectStyles(
      <ChunkExtractorManager extractor={extractor}>
        <App />
      </ChunkExtractorManager>
    )
  );

  const styles = stylesheet.getStyleTags();

  const data: Data = {
    styles,
    children: content,
    extractor
  };

  const rendered = html(data);

  console.log(rendered);

  res.status(200).send(rendered);
  res.end();
};

const serverRenderer = () => {
  router.use(renderer);
  return router;
};

export default serverRenderer;
