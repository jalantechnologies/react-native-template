import { render, act } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import appTheme from '../../app-theme';

import ProgressBar from './progressbar';

jest.mock('react-native-safe-area-context', () => {
  const ReactLib = require('react'); 
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});


jest.useFakeTimers();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<NativeBaseProvider theme={appTheme}>{ui}</NativeBaseProvider>);

describe('ProgressBar component', () => {
  it('renders correctly without color prop and shows correct progress text', async () => {
    const { getByTestId, findByText } = renderWithTheme(<ProgressBar progress={42} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('progress-container')).toBeTruthy();
    expect(getByTestId('progress-fill')).toBeTruthy();
    expect(await findByText('42%')).toBeTruthy();
  });

  it('clamps progress less than 0 to 0%', async () => {
    const { findByText } = renderWithTheme(<ProgressBar progress={-10} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(await findByText('0%')).toBeTruthy();
  });

  it('clamps progress greater than 100 to 100%', async () => {
    const { findByText } = renderWithTheme(<ProgressBar progress={150} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(await findByText('100%')).toBeTruthy();
  });
});
