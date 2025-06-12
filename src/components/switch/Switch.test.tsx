import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import Switch from './Switch';

describe('Switch', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Switch value={false} onValueChange={jest.fn()} />);
    const switchComponent = getByTestId('switch');
    expect(switchComponent.props.value).toBe(false);
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
    expect(switchComponent.props.style).toMatchObject(customStyle);
  });
});
