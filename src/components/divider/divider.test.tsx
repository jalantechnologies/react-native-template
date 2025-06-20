import { render, screen } from '@testing-library/react-native';
import React from 'react';

import Divider, { DividerProps } from './divider';
import { DividerOrientation, DividerDashStyle } from './divider.styles';

describe('Divider', () => {
  const renderDivider = (props: Partial<DividerProps> = {}) => render(<Divider {...props} />);

  it('renders correctly with default props', () => {
    renderDivider();
    const divider = screen.getByTestId('divider');
    expect(divider).toBeTruthy();
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#E0E0E0',
          height: 1,
          width: '100%',
        }),
      ]),
    );
  });

  it('renders horizontal divider with custom thickness and color', () => {
    renderDivider({
      orientation: DividerOrientation.Horizontal,
      thickness: 2,
      color: 'primary',
      shade: '200',
    });
    const divider = screen.getByTestId('divider');
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#99C2FF',
          height: 2,
          width: '100%',
        }),
      ]),
    );
  });

  it('renders vertical divider with custom thickness', () => {
    renderDivider({
      orientation: DividerOrientation.Vertical,
      thickness: 3,
    });
    const divider = screen.getByTestId('divider');
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#E0E0E0',
          width: 3,
          height: '100%',
        }),
      ]),
    );
  });

  it('applies dashed style correctly', () => {
    renderDivider({ dashStyle: DividerDashStyle.Dashed, thickness: 1 });
    const divider = screen.getByTestId('divider');
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: '#E0E0E0',
        }),
      ]),
    );
  });

  it('renders with percentage width', () => {
    renderDivider({ orientation: DividerOrientation.Horizontal, thickness: 1 });
    const divider = screen.getByTestId('divider');
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#E0E0E0',
          height: 1,
          width: '100%',
        }),
      ]),
    );
  });

  it('uses default props when none provided', () => {
    renderDivider({});
    const divider = screen.getByTestId('divider');
    expect(divider.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#E0E0E0',
          height: 1,
          width: '100%',
        }),
      ]),
    );
  });
});
