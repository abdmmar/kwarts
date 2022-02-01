import path from 'path';
import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';

import App from '../src/App';

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

export default (req: express.Request) => {
  const stylesheet = new ServerStyleSheet();
  const loadableJSON = path.resolve(__dirname, './loadable-stats.json');

  const extractor = new ChunkExtractor({
    statsFile: loadableJSON,
    entrypoints: ['client']
  });

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

  return html(data);
};
