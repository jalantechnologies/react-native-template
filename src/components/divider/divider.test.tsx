import { render } from '@testing-library/react-native';
import React from 'react';

import Divider from './divider';
import { DividerOrientation } from './divider.styles';

jest.mock('native-base', () => ({
  useTheme: () => ({
    colors: {
      gray: { 400: '#888888' },
      coolGray: { 500: '#555555' },
      warmGray: { 300: '#bbbbbb' },
      blueGray: { 700: '#222244' },
    },
  }),
}));

describe('Divider', () => {
  it('renders with default props (horizontal)', () => {
    const { getByTestId } = render(<Divider />);
    const divider = getByTestId('divider');
    expect(divider.props.style).toEqual(
      expect.objectContaining({
        width: '100%',
        height: 1,
        backgroundColor: '#888888',
      }),
    );
  });

  it('renders vertical divider', () => {
    const { getByTestId } = render(
      <Divider orientation={DividerOrientation.Vertical} thickness={2} />,
    );
    const divider = getByTestId('divider');
    expect(divider.props.style).toEqual(
      expect.objectContaining({
        width: 2,
        height: '100%',
        backgroundColor: '#888888',
      }),
    );
  });

  it('accepts custom testID', () => {
    const { getByTestId } = render(<Divider testID="custom-divider" />);
    expect(getByTestId('custom-divider')).toBeTruthy();
  });
});
