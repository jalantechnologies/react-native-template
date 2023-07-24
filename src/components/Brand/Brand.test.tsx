import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Brand from './Brand';
import { AccountContextProvider } from 'boilerplate-react-native/src/contexts';

test('render correctly', () => {
  const component = (
    <AccountContextProvider>
      <Brand />
    </AccountContextProvider>
  );

  render(component);

  const wrapper = screen.getByTestId('brand-img-wrapper');
  const img = screen.getByTestId('brand-img');

  expect(wrapper.props.style.height).toBe(200);
  expect(wrapper.props.style.width).toBe(200);
  expect(img.props.resizeMode).toBe('contain');
});
