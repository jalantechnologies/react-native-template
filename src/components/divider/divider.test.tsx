import { render } from '@testing-library/react-native';
import React from 'react';

import Divider from './divider';

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
      expect.arrayContaining([
        expect.objectContaining({
          width: '100%',
          height: 1,
          backgroundColor: '#888888',
        }),
      ]),
    );
  });

  it('renders vertical divider', () => {
    const { getByTestId } = render(
      <Divider orientation="vertical" thickness={2} color="#123456" />,
    );
    const divider = getByTestId('divider');
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 2,
          height: '100%',
          backgroundColor: '#123456',
        }),
      ]),
    );
  });

  it('renders with palette color string', () => {
    const { getByTestId } = render(<Divider color="coolGray.500" />);
    const divider = getByTestId('divider');
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#555555',
        }),
      ]),
    );
  });

  it('accepts custom style', () => {
    const { getByTestId } = render(<Divider style={{ marginVertical: 8 }} />);
    const divider = getByTestId('divider');
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginVertical: 8,
        }),
      ]),
    );
  });

  it('accepts custom testID', () => {
    const { getByTestId } = render(<Divider testID="custom-divider" />);
    expect(getByTestId('custom-divider')).toBeTruthy();
  });
});
