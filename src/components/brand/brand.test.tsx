import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Brand from './brand';
import { CatContextProvider } from 'boilerplate-react-native/src/contexts';

test('App renders correctly', () => {
  const component = (
    <CatContextProvider>
      <Brand />
    </CatContextProvider>
  );

  render(component);

  const wrapper = screen.getByTestId('brand-img-wrapper');

  expect(wrapper.props.style).toBeInstanceOf(Object);
  expect(wrapper.props.style.height).toBe(384);
  expect(wrapper.props.style.width).toBe(384);
});
