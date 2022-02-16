import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App';

const client = new ApolloClient({
  uri: process.env.URL_API,
  cache: new InMemoryCache()
});

loadableReady(() => {
  ReactDOM.hydrate(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );
});

if (module.hot) {
  module.hot.accept();
}
