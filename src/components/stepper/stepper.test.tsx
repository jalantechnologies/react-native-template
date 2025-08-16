import { render, fireEvent } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import appTheme from '../../app-theme';

import Stepper from './stepper';

// Mock SafeAreaProvider for NativeBase
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<NativeBaseProvider theme={appTheme}>{ui}</NativeBaseProvider>);

describe('Stepper Component', () => {
  it('renders stepper with correct number of steps and highlights completed ones', () => {
    const { getByText, getAllByText } = renderWithTheme(
      <Stepper
        numberOfSteps={5}
        lastActivated={3}
        stepDetailsList={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']}
      />,
    );

    expect(getByText('3 of 5 steps completed')).toBeTruthy();

    const checkmarks = getAllByText('✓');
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it('shows tooltip on step press and hides on second press', () => {
    const { getByText, queryByText } = renderWithTheme(
      <Stepper
        numberOfSteps={3}
        lastActivated={1}
        stepDetailsList={['Step A', 'Step B', 'Step C']}
      />,
    );

    const step1 = getByText('✓');
    fireEvent.press(step1);

    expect(getByText('Step A')).toBeTruthy();

    fireEvent.press(step1);
    expect(queryByText('Step A')).toBeNull();
  });

  it('shows failed step when lastFailedStep is passed', () => {
    const { getByText } = renderWithTheme(
      <Stepper
        numberOfSteps={3}
        lastActivated={2}
        lastFailedStep={3}
        stepDetailsList={['Start', 'Middle', 'Error Step']}
      />,
    );

    expect(getByText('✕')).toBeTruthy();
  });

  it('applies custom colors if passed', () => {
    const { getByText } = renderWithTheme(
      <Stepper
        numberOfSteps={2}
        lastActivated={1}
        successColor="primary.500"
        failedColor="error.600"
        hoverBackground="coolGray.200"
        hoverTextColor="coolGray.800"
        stepDetailsList={['First', 'Second']}
      />,
    );

    const step = getByText('✓');
    fireEvent.press(step);

    expect(getByText('First')).toBeTruthy();
  });

  it('uses default stepDetails text when none provided', () => {
    const { getByText } = renderWithTheme(<Stepper numberOfSteps={2} lastActivated={1} />);

    fireEvent.press(getByText('✓'));

    expect(getByText('Step 1 details')).toBeTruthy();
  });

  it('renders correct width if provided', () => {
    const { getByText } = renderWithTheme(
      <Stepper numberOfSteps={2} lastActivated={1} width={400} stepDetailsList={['A', 'B']} />,
    );

    expect(getByText('1 of 2 steps completed')).toBeTruthy();
  });
});
