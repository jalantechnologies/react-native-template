import 'react-native';
import React from 'react';
import App from './app';

// Note: import explicitly to use the types shiped with jest.
import { it } from '@jest/globals';

// Note: test renderer must be required after react-native.
import { render } from '@testing-library/react-native';
import { CatContextProvider } from './contexts';

test('App', () => {
  it('App renders correctly', () => {
    const component = (
      <CatContextProvider>
        <App />
      </CatContextProvider>
    );

    render(component);

    expect(component).toBeDefined();
  });
});
