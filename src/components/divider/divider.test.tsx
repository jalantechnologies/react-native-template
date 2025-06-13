import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { ViewStyle } from 'react-native';

import Divider, { DividerProps } from './divider';
import { DividerOrientation, DividerDashStyle } from './divider.styles';

jest.mock('@/utils/use-theme-color.hook', () => ({
  useThemeColor: jest.fn((color: string) => {
    const colorMap: { [key: string]: string } = {
      'neutral.200': '#E0E0E0',
      'primary.200': '#99C2FF',
    };
    return colorMap[color] || color;
  }),
}));

jest.mock('./divider.styles', () => {
  const actual = jest.requireActual('./divider.styles');
  return {
    ...actual,
    useDividerStyles: jest.fn(
      ({ orientation, thickness, length, dashStyle, dividerColor }: any) => {
        const baseStyle: ViewStyle = {
          backgroundColor: dividerColor,
          borderStyle: dashStyle === actual.DividerDashStyle.Solid ? undefined : dashStyle,
        };

        if (orientation === actual.DividerOrientation.Horizontal) {
          return {
            divider: {
              ...baseStyle,
              height: thickness,
              width: length || '100%',
            },
          };
        } else {
          return {
            divider: {
              ...baseStyle,
              width: thickness,
              height: length || '100%',
            },
          };
        }
      },
    ),
  };
});

describe('Divider', () => {
  const renderDivider = (props: Partial<DividerProps> = {}) => render(<Divider {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    renderDivider();
    const divider = screen.getByTestId('divider');

    expect(divider).toBeTruthy();
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        {
          backgroundColor: '#E0E0E0',
          height: 1,
          width: '100%',
        },
      ]),
    );
  });

  it('renders horizontal divider with custom thickness and color', () => {
    renderDivider({
      orientation: DividerOrientation.Horizontal,
      thickness: 2,
    });
    const divider = screen.getByTestId('divider');

    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        {
          backgroundColor: '#99C2FF',
          height: 2,
          width: '100%',
        },
      ]),
    );
  });

  it('renders vertical divider with custom length', () => {
    renderDivider({
      orientation: DividerOrientation.Vertical,
      thickness: 3,
      length: 50,
    });
    const divider = screen.getByTestId('divider');

    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        {
          backgroundColor: '#E0E0E0',
          width: 3,
          height: 50,
        },
      ]),
    );
  });

  it('applies dashed style correctly', () => {
    renderDivider({ dashStyle: DividerDashStyle.Dashed, thickness: 1 });
    const divider = screen.getByTestId('divider');

    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        {
          backgroundColor: '#E0E0E0',
          borderStyle: 'dashed',
          height: 1,
          width: '100%',
        },
      ]),
    );
  });

  it('applies custom style prop', () => {
    const customStyle: ViewStyle = { marginVertical: 10 };
    renderDivider({ style: customStyle });
    const divider = screen.getByTestId('divider');

    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        {
          backgroundColor: '#E0E0E0',
          height: 1,
          width: '100%',
        },
        customStyle,
      ]),
    );
  });

  it('renders with percentage length', () => {
    renderDivider({ length: '50%' });
    const divider = screen.getByTestId('divider');

    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        {
          backgroundColor: '#E0E0E0',
          height: 1,
          width: '50%',
        },
      ]),
    );
  });

  it('uses default props when none provided', () => {
    renderDivider({});
    const divider = screen.getByTestId('divider');

    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        {
          backgroundColor: '#E0E0E0',
          height: 1,
          width: '100%',
        },
      ]),
    );
  });
});
