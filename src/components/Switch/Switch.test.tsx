import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useThemeColor } from '../../utils/use-theme-color.hook';

import Switch from './switch';

jest.mock('../../utils/use-theme-color.hook', () => ({
  useThemeColor: jest.fn(),
}));

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
    const flatStyle = StyleSheet.flatten(switchComponent.props.style);
    expect(flatStyle).toMatchObject(customStyle);
  });

  it('applies dynamic colors from useThemeColor based on colorMode', () => {
    (useThemeColor as jest.Mock).mockImplementation((key: string) => {
      if (key === 'trackColorOn') {
        return 'blue';
      }
      if (key === 'trackColorOff') {
        return 'gray';
      }
      if (key === 'thumbColor') {
        return 'white';
      }
      return 'transparent';
    });

    const { getByTestId } = render(<Switch value={true} onValueChange={jest.fn()} />);

    const switchComponent = getByTestId('switch');

    expect(switchComponent.props.trackColor).toEqual({
      true: 'blue',
      false: 'gray',
    });
    expect(switchComponent.props.thumbColor).toBe('white');
  });
});
