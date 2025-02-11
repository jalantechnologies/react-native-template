import React from 'react';
import { render } from '@testing-library/react-native';
import Typography from '../src/components/typography/typography';

// Ensure the Typography component renders correctly with default props
describe('Typography Component', () => {
  test('renders correctly with default props', () => {
    const { getByText } = render(<Typography>Hello World</Typography>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  test('renders with different variants', () => {
    const { getByText } = render(<Typography variant="h1">Heading</Typography>);
    expect(getByText('Heading')).toBeTruthy();
  });

  test('renders with different color props', () => {
    const { getByText } = render(<Typography color="secondary">Secondary Text</Typography>);
    expect(getByText('Secondary Text')).toBeTruthy();
  });
});
