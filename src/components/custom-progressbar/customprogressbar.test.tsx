import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import CustomProgressBar from './customprogressbar';

// Mock SafeAreaProvider for NativeBase compatibility
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<NativeBaseProvider>{ui}</NativeBaseProvider>);

describe('CustomProgressBar Component', () => {
  it('renders the default variant with progress label', async () => {
    const { findByTestId } = renderWithTheme(
      <CustomProgressBar completedSteps={2} totalSteps={5} />,
    );

    const label = await findByTestId('default-progress-label');
    expect(label).toBeTruthy();
  });

  it('renders step variant and completed step count', () => {
    const { getByText, getAllByTestId } = renderWithTheme(
      <CustomProgressBar variant="step" completedSteps={[1, 2]} totalSteps={5} />,
    );

    expect(getByText('2 of 5 steps completed')).toBeTruthy();
    expect(getAllByTestId('step-circle')).toHaveLength(5);
  });

  it('renders step variant with failed state', () => {
    const { getByText } = renderWithTheme(
      <CustomProgressBar variant="step" completedSteps={[1]} failedSteps={[3]} totalSteps={5} />,
    );

    expect(getByText('Progress Failed')).toBeTruthy();
  });

  it('renders card variant with status text', () => {
    const { getByText } = renderWithTheme(
      <CustomProgressBar variant="card" title="Growth" value={80} statusText="80%" />,
    );

    expect(getByText('Growth')).toBeTruthy();
    expect(getByText('80%')).toBeTruthy();
  });

  it('renders storage variant with upload progress', () => {
    const { getByText } = renderWithTheme(
      <CustomProgressBar
        variant="storage"
        value={60}
        current="600 MB"
        total="1 GB"
        label="Upload Status"
      />,
    );

    expect(getByText('Upload Status')).toBeTruthy();
    expect(getByText('60% complete')).toBeTruthy();
    expect(getByText('600 MB of 1 GB')).toBeTruthy();
  });

  it('renders bar variant correctly', () => {
    const { getAllByTestId } = renderWithTheme(
      <CustomProgressBar variant="bar" value={50} totalSteps={5} />,
    );

    // Since this variant doesn't expose text, we only check bar segments
    expect(getAllByTestId('progress-bar')).toBeTruthy();
  });

  it('renders level variant with all level marks', () => {
    const { getAllByTestId } = renderWithTheme(
      <CustomProgressBar variant="level" value={70} totalSteps={4} />,
    );

    // No visible text, but level indicators should be rendered
    expect(getAllByTestId('progress-bar')).toBeTruthy();
  });

  it('renders text variant with correct level', () => {
    const { getByText } = renderWithTheme(
      <CustomProgressBar variant="text" value={40} totalSteps={4} />,
    );

    expect(getByText('Lv 2')).toBeTruthy();
  });
});
