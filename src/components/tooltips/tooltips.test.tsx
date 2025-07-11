import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import appTheme from '../../app-theme';
import Tooltip from './tooltips';

// Mock SafeAreaProvider (for NativeBase)
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
  it('should render text initially', () => {
    const { getByText } = renderWithTheme(
      <Tooltip text="Visible Tooltip" width={120} height={80} />
    );
    expect(getByText('Visible Tooltip')).toBeTruthy();
  });

  it('should show pressedText when pressed', () => {
    const { getByText } = renderWithTheme(
      <Tooltip text="Press me" pressedText="Clicked!" width={120} height={80} />
    );

    act(() => {
      fireEvent.press(getByText('Press me'));
    });

    expect(getByText('Clicked!')).toBeTruthy();
  });

  it('should render with custom position and variant', () => {
    const { getByText } = renderWithTheme(
      <Tooltip text="Stats Info" position="top" variant="success" width={120} height={80} />
    );

    expect(getByText('Stats Info')).toBeTruthy();
  });

  it('should handle long text in scrollable container', () => {
    const longText =
      'This is a very long tooltip message intended to test scrolling inside the tooltip content area. It should not overflow the fixed height box and should remain scrollable.';

    const { getByText } = renderWithTheme(
      <Tooltip text={longText} width={150} height={100} />
    );

    expect(getByText(/This is a very long tooltip message/)).toBeTruthy();
  });

  it('should show footer when provided', () => {
    const { getByText } = renderWithTheme(
      <Tooltip text="Has footer" footer="Footer content" width={150} height={100} />
    );

    expect(getByText('Footer content')).toBeTruthy();
  });

  it('should not show pressedText before press', () => {
    const { queryByText } = renderWithTheme(
      <Tooltip text="Hover me" pressedText="Now visible" width={120} height={80} />
    );

    expect(queryByText('Now visible')).toBeNull();
  });

  it('should toggle pressedText visibility on multiple presses', () => {
    const { getByText, queryByText } = renderWithTheme(
      <Tooltip text="Toggle" pressedText="Toggled!" width={120} height={80} />
    );

    const baseText = getByText('Toggle');
    act(() => {
      fireEvent.press(baseText);
    });
    expect(getByText('Toggled!')).toBeTruthy();

    act(() => {
      fireEvent.press(baseText);
    });
    expect(queryByText('Toggled!')).toBeNull();
  });
});
