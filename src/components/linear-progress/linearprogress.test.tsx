import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import appTheme from '../../app-theme';

import LinearProgressBar from './linearprogress';

// Use same safe area context mock as SwitchComponent test
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<NativeBaseProvider theme={appTheme}>{ui}</NativeBaseProvider>);

describe('LinearProgressBar', () => {
  it('renders step variant with correct label and progress bars', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <LinearProgressBar variant="step" completedSteps={3} totalSteps={5} />,
    );
    expect(getByText('Step Progress (3/5)')).toBeTruthy();
    expect(getByTestId('step-bar-0')).toBeTruthy();
  });

  it('renders default variant with calculated progress', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <LinearProgressBar completedSteps={2} totalSteps={5} />,
    );
    expect(getByText('2 of 5 steps completed')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
  });

  it('renders bar variant with tick marks', () => {
    const { getByTestId } = renderWithTheme(
      <LinearProgressBar variant="bar" value={60} totalSteps={5} />,
    );
    expect(getByTestId('tick-mark-0')).toBeTruthy();
  });

  it('renders text variant and highlights correct level', () => {
    const value = 80;
    const totalSteps = 5;
    const currentLevel = Math.min(totalSteps, Math.max(1, Math.ceil((value / 100) * totalSteps)));

    const { getByText } = renderWithTheme(
      <LinearProgressBar variant="text" value={value} totalSteps={totalSteps} />,
    );
    expect(getByText(`Lv ${currentLevel}`)).toBeTruthy();
  });
});
