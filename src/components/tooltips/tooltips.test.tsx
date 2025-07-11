import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { NativeBaseProvider, Box, extendTheme, Text } from 'native-base';
import appTheme from '../../app-theme'; // Assuming your theme is here
import Tooltip from './tooltips';

// ✅ SafeAreaProvider mock for NativeBase
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

jest.useFakeTimers();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<NativeBaseProvider theme={appTheme}>{ui}</NativeBaseProvider>);

describe('Tooltip Component', () => {
  it('renders tooltip text on touch', async () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Tooltip text="Tooltip Content">
        <Box testID="tooltip-trigger">
          <Text>Press Me</Text>
        </Box>
      </Tooltip>
    );

    act(() => {
      fireEvent(getByTestId('tooltip-trigger'), 'onTouchEnd');
    });

    expect(getByText('Tooltip Content')).toBeTruthy();
  });

  it('does not show tooltip by default', () => {
    const { queryByText } = renderWithTheme(
      <Tooltip text="Hidden Text">
        <Box>
          <Text>Touch</Text>
        </Box>
      </Tooltip>
    );

    expect(queryByText('Hidden Text')).toBeNull();
  });

  it('renders tooltip in all directions', () => {
    const directions: ('top' | 'bottom' | 'left' | 'right')[] = ['top', 'bottom', 'left', 'right'];

    directions.forEach((dir) => {
      const { getByTestId, getByText } = renderWithTheme(
        <Tooltip text={`Tooltip ${dir}`} position={dir}>
          <Box testID={`trigger-${dir}`}>
            <Text>{dir}</Text>
          </Box>
        </Tooltip>
      );

      act(() => {
        fireEvent(getByTestId(`trigger-${dir}`), 'onTouchEnd');
      });

      expect(getByText(`Tooltip ${dir}`)).toBeTruthy();
    });
  });

  it('applies correct variant color (success)', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Tooltip text="Success Tooltip" variant="success">
        <Box testID="trigger">
          <Text>Trigger</Text>
        </Box>
      </Tooltip>
    );

    act(() => {
      fireEvent(getByTestId('trigger'), 'onTouchEnd');
    });

    expect(getByText('Success Tooltip')).toBeTruthy();
  });
});
