import * as React from 'react';
import Styled from 'styled-components';

import Button from 'components/Button';

const Root = Styled.div`
  --font-size: 1.6rem;
  --font-family: 'Roboto', sans-serif;
  --font-color: #333;

  font-size: var(--font-size);
  color: var(--font-color);
  font-family: var(--font-family);
`;

const App = () => {
  return (
    <Root>
      <header>Header</header>
      <main>
        <Button />
      </main>
      <footer>Footer</footer>
    </Root>
  );
};

export default App;
