import React from 'react';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import SimpleTooltip from './SimpleTooltip';
import appTheme from '../../app-theme';

// Mock SafeAreaContext
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

const renderWithTheme = (ui: React.ReactElement) =>
  render(<NativeBaseProvider theme={appTheme}>{ui}</NativeBaseProvider>);

describe('SimpleTooltip', () => {
  it('renders title and description correctly', () => {
    const { getByText } = renderWithTheme(
      <SimpleTooltip
        title="Server Status"
        description="Running Smoothly"
      />
    );

    expect(getByText('Server Status')).toBeTruthy();
    expect(getByText('Running Smoothly')).toBeTruthy();
  });

  it('renders triangle in all directions', () => {
    const directions: ('top' | 'bottom' | 'left' | 'right')[] = [
      'top',
      'bottom',
      'left',
      'right',
    ];

    directions.forEach((direction) => {
      const { getByText } = renderWithTheme(
        <SimpleTooltip
          title={`Title ${direction}`}
          description={`Desc ${direction}`}
          position={direction}
        />
      );

      expect(getByText(`Title ${direction}`)).toBeTruthy();
      expect(getByText(`Desc ${direction}`)).toBeTruthy();
    });
  });
});
