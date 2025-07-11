import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NativeBaseProvider, Box, Text } from 'native-base';

import appTheme from '../../app-theme';
import CustomTooltip from './customtooltips';


jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

const renderWithTheme = (ui: React.ReactElement) => (
  render(<NativeBaseProvider theme={appTheme}>{ui}</NativeBaseProvider>)
);

describe('CustomTooltip', () => {
  it('renders title and description when toggled', () => {
    const { getByText, queryByText } = renderWithTheme(
      <CustomTooltip title="Weekly Sales" description="Mar-Apr">
        <Box testID="trigger-box">
          <Text>Tap Me</Text>
        </Box>
      </CustomTooltip>
    );

    // Text not visible initially
    expect(queryByText('Weekly Sales')).toBeNull();
    expect(queryByText('Mar-Apr')).toBeNull();

    // Simulate touch to reveal tooltip
    fireEvent(getByText('Tap Me'), 'onTouchEnd');

    expect(getByText('Weekly Sales')).toBeTruthy();
    expect(getByText('Mar-Apr')).toBeTruthy();
  });

  it('shows triangle in all positions', () => {
    const positions: Array<'top' | 'bottom' | 'left' | 'right'> = [
      'top',
      'bottom',
      'left',
      'right',
    ];

    positions.forEach((position) => {
      const { getByText } = renderWithTheme(
        <CustomTooltip
          title={`Title ${position}`}
          description={`Desc ${position}`}
          position={position}
        >
          <Box testID={`trigger-${position}`}>
            <Text>{position.toUpperCase()}</Text>
          </Box>
        </CustomTooltip>
      );

      // Trigger tooltip
      fireEvent(getByText(position.toUpperCase()), 'onTouchEnd');

      expect(getByText(`Title ${position}`)).toBeTruthy();
      expect(getByText(`Desc ${position}`)).toBeTruthy();
    });
  });

  it('toggles tooltip visibility on press', () => {
    const { getByText, queryByText } = renderWithTheme(
      <CustomTooltip title="Details" description="Description">
        <Box>
          <Text>Tap</Text>
        </Box>
      </CustomTooltip>
    );

    expect(queryByText('Details')).toBeNull();

    fireEvent(getByText('Tap'), 'onTouchEnd');
    expect(getByText('Details')).toBeTruthy();

    fireEvent(getByText('Tap'), 'onTouchEnd');
    expect(queryByText('Details')).toBeNull();
  });
});
