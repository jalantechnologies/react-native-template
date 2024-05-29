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

  expect(wrapper.props.style).toHaveLength(4);
  expect(wrapper.props.style[2].height).toBe(384);
  expect(wrapper.props.style[3].width).toBe(384);
});
