import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Button } from '../src/components/button';
import { BUTTON_KIND, BUTTON_SIZE, BUTTON_SHAPE } from '../src/components/button/constants';

describe('Button Component', () => {
  test('renders correctly with default props', () => {
    const { getByText } = render(<Button onPress={() => {}}>Click Me</Button>);
    expect(getByText('Click Me')).toBeTruthy();
  });

  test('triggers onPress function when clicked', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button onPress={mockOnPress}>Press Me</Button>);

    fireEvent.press(getByText('Press Me'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  test('displays loading indicator when isLoading is true', () => {
    const { getByTestId, queryByText } = render(<Button isLoading={true}>Loading Button</Button>);

    expect(getByTestId('loading-spinner')).toBeTruthy();
    expect(queryByText('Loading Button')).toBeNull();
  });

  test('renders left and right icons correctly', () => {
    const LeftIcon = () => <View testID="left-icon" />;
    const RightIcon = () => <View testID="right-icon" />;

    const { getByTestId } = render(
      <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        Icon Button
      </Button>,
    );

    expect(getByTestId('left-icon')).toBeTruthy();
    expect(getByTestId('right-icon')).toBeTruthy();
  });

  test('button is disabled when isDisabled is true', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button onPress={mockOnPress} isDisabled={true}>
        Disabled
      </Button>,
    );

    fireEvent.press(getByText('Disabled'));
    expect(mockOnPress).not.toHaveBeenCalled(); // Should not trigger onPress
  });

  test('supports different variants', () => {
    const { getByText } = render(<Button variant={BUTTON_KIND.secondary}>Secondary</Button>);
    expect(getByText('Secondary')).toBeTruthy();
  });

  test('supports different sizes', () => {
    const { getByText } = render(<Button size={BUTTON_SIZE.large}>Large Button</Button>);
    expect(getByText('Large Button')).toBeTruthy();
  });

  test('supports different shapes', () => {
    const { getByText } = render(<Button shape={BUTTON_SHAPE.pill}>Pill Button</Button>);
    expect(getByText('Pill Button')).toBeTruthy();
  });
});
