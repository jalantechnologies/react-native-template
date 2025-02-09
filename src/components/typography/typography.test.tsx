import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';

import Typography from './typography';

// Mock theme object (based on @react-navigation/native)
const mockTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
  },
};

describe('Typography Component', () => {
  /**
   * Helper function to render the component with NavigationContainer.
   */
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<NavigationContainer theme={mockTheme}>{component}</NavigationContainer>);
  };

  test('renders with default props', () => {
    const { getByText } = renderWithTheme(<Typography>Default Text</Typography>);
    expect(getByText('Default Text')).toBeTruthy();
  });

  test('applies the h1 variant correctly', () => {
    const { getByText } = renderWithTheme(<Typography variant="h1">Heading 1</Typography>);
    expect(getByText('Heading 1').props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 32 }),
        expect.objectContaining({ fontWeight: 'bold' }),
      ]),
    );
  });

  test('inherits color from theme', () => {
    const { getByText } = renderWithTheme(<Typography variant="body">Body Text</Typography>);
    expect(getByText('Body Text')).toHaveStyle({ color: '#000000' });
  });
});
