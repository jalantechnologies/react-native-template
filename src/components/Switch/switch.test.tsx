import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

jest.mock('native-base', () => ({
  useTheme: () => ({
    colors: {
      blue: { 500: '#2563eb' },
      gray: { 300: '#d1d5db', 400: '#9ca3af' },
      white: '#fff',
    },
  }),
}));

import Switch from './switch';

describe('Switch', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Switch value={false} onValueChange={jest.fn()} />);
    const switchComponent = getByTestId('switch');
    expect(switchComponent.props.value).toBe(false);
    expect(switchComponent.props.disabled).toBe(false);
  });

  it('toggles value when pressed', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(<Switch value={false} onValueChange={onValueChange} />);
    const switchComponent = getByTestId('switch');
    fireEvent(switchComponent, 'valueChange', true);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(<Switch value={false} onValueChange={onValueChange} disabled />);
    const switchComponent = getByTestId('switch');
    fireEvent(switchComponent, 'valueChange', true);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('applies custom style', () => {
    const customStyle = { margin: 10 };
    const { getByTestId } = render(
      <Switch value={false} onValueChange={jest.fn()} style={customStyle} />,
    );
    const switchComponent = getByTestId('switch');
    const flatStyle = Array.isArray(switchComponent.props.style)
      ? switchComponent.props.style.flat()
      : [switchComponent.props.style];
    expect(flatStyle.some(styleObj => styleObj && styleObj.margin === 10)).toBe(true);
  });
});
