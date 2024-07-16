import 'react-native';
import React from 'react';
import App from './app';

// Note: test renderer must be required after react-native.
import { render } from '@testing-library/react-native';

test('App', () => {
  const component = <App />;

  render(component);

  expect(component).toBeDefined();
});
