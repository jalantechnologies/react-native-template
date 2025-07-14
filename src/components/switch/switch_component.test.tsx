import { render, fireEvent, act } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import appTheme from '../../app-theme';

import SwitchComponent from './switch_component';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.useFakeTimers();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<NativeBaseProvider theme={appTheme}>{ui}</NativeBaseProvider>);

describe('SwitchComponent', () => {
  it('should render with correct initial state', () => {
    const { getByText } = renderWithTheme(
      <SwitchComponent value={true} onValueChange={() => {}} labelType="text" />,
    );
    expect(getByText('ON')).toBeTruthy();
  });

  it('should call onValueChange immediately when not loading', () => {
    const onValueChange = jest.fn();
    const { getByRole } = renderWithTheme(
      <SwitchComponent value={false} onValueChange={onValueChange} labelType="text" />,
    );

    act(() => {
      fireEvent.press(getByRole('button'));
    });

    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('should show loader and delay toggle when loading is true', () => {
    const onValueChange = jest.fn();
    const { getByRole, getByTestId } = renderWithTheme(
      <SwitchComponent value={false} onValueChange={onValueChange} labelType="text" loading />,
    );

    act(() => {
      fireEvent.press(getByRole('button'));
    });

    expect(getByTestId('circular-loader')).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });

    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('should not toggle if disabled', () => {
    const onValueChange = jest.fn();
    const { getByRole } = renderWithTheme(
      <SwitchComponent value={false} onValueChange={onValueChange} disabled labelType="text" />,
    );

    act(() => {
      fireEvent.press(getByRole('button'));
    });

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('should show icon labels when labelType is icon', () => {
    const { getByText } = renderWithTheme(
      <SwitchComponent value={true} onValueChange={() => {}} labelType="icon" />,
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('should hide label when labelType is none', () => {
    const { queryByText } = renderWithTheme(
      <SwitchComponent value={true} onValueChange={() => {}} labelType="none" />,
    );
    expect(queryByText('ON')).toBeNull();
  });
});
