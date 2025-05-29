import { render, screen } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import Brand from './brand';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

jest.mock('boilerplate-react-native/assets/img/logo.svg', () => {
  const TestReact = require('react');
  return () => TestReact.createElement('SvgMock');
});

test('App renders correctly', () => {
  const component = (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <Brand />
    </NativeBaseProvider>
  );

  render(component);

  const wrapper = screen.getByTestId('brand-img-wrapper');

  expect(wrapper.props.style).toBeInstanceOf(Object);
  expect(wrapper.props.style.height).toBe('100%');
  expect(wrapper.props.style.width).toBe('100%');
});
