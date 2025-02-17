import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';

import { MenuItem } from '../src/components/menu-item';

describe('MenuItem', () => {
  const mockPress = jest.fn();
  beforeEach(() => {
    mockPress.mockClear();
  });

  it('renders label', () => {
    const { getByText } = render(<MenuItem label="Test Item" />);
    expect(getByText('Test Item')).toBeTruthy();
  });

  it('triggers onPress when enabled', () => {
    const { getByText } = render(<MenuItem label="Test" onPress={mockPress} />);
    fireEvent.press(getByText('Test'));
    expect(mockPress).toHaveBeenCalled();
  });

  it('does not trigger when disabled', () => {
    const { getByText } = render(<MenuItem label="Test" disabled onPress={mockPress} />);
    fireEvent.press(getByText('Test'));
    expect(mockPress).not.toHaveBeenCalled();
  });

  it('displays left icon', () => {
    const icon = <View testID="icon" />;
    const { getByTestId } = render(<MenuItem label="Test" icon={icon} />);
    expect(getByTestId('icon')).toBeTruthy();
  });

});
