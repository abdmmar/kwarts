import * as React from 'react';
import Styled from 'styled-components';

import Button from '@/components/Button';

const Main = Styled.main`
  display: grid;
  place-items: center;
  width:100%;
  height: 100%;
`;

const H = Styled.h1`
  --font-size: 1.6rem;
  --font-family: 'Roboto', sans-serif;
  --font-color: #333;

  font-size: var(--font-size);
  color: var(--font-color);
  font-family: var(--font-family);
`;

const App = () => {
  return (
    <Main>
      <H>Hello world!</H>
      <Button></Button>
    </Main>
  );
};

export default App;
