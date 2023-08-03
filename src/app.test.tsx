import 'react-native';
import React from 'react';
import App from './app';

// Note: test renderer must be required after react-native.
import { render } from '@testing-library/react-native';
import { CatContextProvider } from './contexts';

test('App', () => {
  const component = (
    <CatContextProvider>
      <App />
    </CatContextProvider>
  );

  render(component);

  expect(component).toBeDefined();
});
